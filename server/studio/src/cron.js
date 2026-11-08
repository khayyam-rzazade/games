/* Logicers Studio — the nightly job (Chat A, 8 Nov 2026), the rooms' tidy-up pattern:
     a game nobody has opened for 12 months: deleted, with its images (Khayyam wants things kept long)
     an orphan image (no item and no cover uses it, a day after it was sent; or its game is gone): deleted, R2 too
     queue rows done more than 90 days ago, reports closed more than a year ago, cap rows older than a week: deleted */
import { clock } from "./util.js";
import { all, run, deleteGame, r2Delete, queueRow } from "./db.js";
import { aiCheck } from "./images.js";

export const KEEP_UNOPENED = 365 * 864e5;
export async function nightly(env) {
  const now = clock();
  const old = await all(env, "SELECT * FROM games WHERE last_open < ?", now - KEEP_UNOPENED);
  for (const g of old) await deleteGame(env, g);
  const orphans = await all(env, `SELECT im.id, im.key FROM images im LEFT JOIN games g ON g.id = im.game
     WHERE g.id IS NULL OR (im.made < ? AND (g.cover IS NULL OR g.cover <> im.id)
       AND NOT EXISTS (SELECT 1 FROM items i WHERE i.game = im.game AND i.image = im.id)) LIMIT 2000`, now - 864e5);
  if (orphans.length) {
    for (let i = 0; i < orphans.length; i += 50) {
      const part = orphans.slice(i, i + 50);
      await run(env, "DELETE FROM images WHERE id IN (" + part.map(() => "?").join(",") + ")", ...part.map((x) => x.id));
    }
    await r2Delete(env, orphans.map((x) => x.key));
  }
  /* a picture the check could not answer for ("none": the model was busy or down) is asked again, 40 a night (F, 8 Nov 2026);
     it stays held until the answer is "safe" or Khayyam shows it. "sexual": deleted now. */
  let rechecked = 0;
  if (env.IMG && env.AI) {
    const wait = await all(env, "SELECT id, key, maker, game FROM images WHERE verdict = 'none' AND made < ? ORDER BY made LIMIT 40", now - 36e5);
    for (const im of wait) {
      let v = "none";
      try { const o = await env.IMG.get(im.key); if (o) v = await aiCheck(env, new Uint8Array(await o.arrayBuffer()), im.id.endsWith(".webp") ? "webp" : "jpg"); } catch (e) { v = "none"; }
      if (v === "none") continue;
      rechecked++;
      if (v === "sexual") {
        await run(env, "UPDATE items SET image = NULL WHERE game = ? AND image = ?", im.game, im.id);
        await run(env, "DELETE FROM images WHERE id = ?", im.id); await r2Delete(env, [im.key]);
        await env.DB.batch([queueRow(env, "image", { maker: im.maker, game: im.game, text: "check (again): sexual: deleted" })]);
      } else {
        await run(env, "UPDATE images SET verdict = ? WHERE id = ?", v, im.id);
        if (v === "flag") await env.DB.batch([queueRow(env, "image", { maker: im.maker, game: im.game, image: im.id, text: "check (again): flag" })]);
      }
    }
  }
  await run(env, "DELETE FROM queue WHERE done = 1 AND done_at < ?", now - 90 * 864e5);
  await run(env, "DELETE FROM reports WHERE done = 1 AND day < ?", new Date(now - 365 * 864e5).toISOString().slice(0, 10));
  await run(env, "DELETE FROM caps WHERE substr(day, 2) < ?", new Date(now - 7 * 864e5).toISOString().slice(0, 10));   // "g2026-11-08"
  return { games: old.length, images: orphans.length, rechecked };
}
