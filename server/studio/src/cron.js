/* Logicers Studio — the nightly job (Chat A, 8 Nov 2026), the rooms' tidy-up pattern:
     a game nobody has opened for 12 months: deleted, with its images (Khayyam wants things kept long)
     an orphan image (no item and no cover uses it, a week after it was sent; or its game is gone): deleted, R2 too
       (a week, 11 Nov 2026: the editor keeps a maker's unsaved questions on the phone, their new pictures with them)
     queue rows done more than 90 days ago, reports closed more than a year ago, cap rows older than a week: deleted
   Review, 11 Nov 2026: the tidy-up goes first, in one call; each part runs on its own (one that fails does not stop the next);
   each part takes a night's share (NIGHT) and leaves the rest for the next night; deletes and labels go in batches. A night
   is a few database calls, not one or two per game and picture (Workers Paid allows 1,000 a run, the free plan 50). */
import { clock } from "./util.js";
import { all, st, deleteGames, r2Delete, queueRow, removeImage } from "./db.js";
import { imgUrl } from "./util.js";
import { aiCheck } from "./images.js";

export const KEEP_UNOPENED = 365 * 864e5;
export const NIGHT = { games: 40, orphans: 500, recheck: 40 };

export async function nightly(env) {
  const now = clock(), out = { games: 0, images: 0, rechecked: 0 };
  const part = async (fn) => { try { await fn(); } catch (e) { if (env.STUDIO_DEBUG) console.error("nightly", e && e.stack || e); } };

  await part(() => env.DB.batch([
    st(env, "DELETE FROM queue WHERE done = 1 AND done_at < ?", now - 90 * 864e5),
    st(env, "DELETE FROM reports WHERE done = 1 AND day < ?", new Date(now - 365 * 864e5).toISOString().slice(0, 10)),
    st(env, "DELETE FROM caps WHERE substr(day, 2) < ?", new Date(now - 7 * 864e5).toISOString().slice(0, 10)),   // "g2026-11-08"
  ]));

  await part(async () => {                                            // two calls
    const old = await all(env, "SELECT id FROM games WHERE last_open < ? ORDER BY last_open LIMIT ?", now - KEEP_UNOPENED, NIGHT.games);
    await deleteGames(env, old);
    out.games = old.length;
  });

  await part(async () => {                                            // two calls
    const orphans = await all(env, `SELECT im.id, im.key FROM images im LEFT JOIN games g ON g.id = im.game
       WHERE g.id IS NULL OR (im.made < ? AND (g.cover IS NULL OR g.cover <> im.id)
         AND NOT EXISTS (SELECT 1 FROM items i WHERE i.game = im.game AND i.image = im.id)) LIMIT ?`, now - 7 * 864e5, NIGHT.orphans);
    if (!orphans.length) return;
    const stmts = [];
    for (let i = 0; i < orphans.length; i += 50) {
      const p = orphans.slice(i, i + 50);
      stmts.push(st(env, "DELETE FROM images WHERE id IN (" + p.map(() => "?").join(",") + ")", ...p.map((x) => x.id)));
    }
    await env.DB.batch(stmts);
    await r2Delete(env, orphans.map((x) => x.key));
    out.images = orphans.length;
  });

  /* a picture the check could not answer for ("none": the model was busy or down) is asked again (F, 8 Nov 2026). It is shown
     meanwhile (9 Nov 2026). "sexual" now: removed (the maker's editor says so) and Khayyam is told; "flag": a row in his queue
     with the picture; "safe": noted. The labels go in one call at the end. */
  if (env.IMG && env.AI) await part(async () => {
    const wait = await all(env, "SELECT id, key, maker, game FROM images WHERE verdict = 'none' AND made < ? ORDER BY made LIMIT ?", now - 36e5, NIGHT.recheck);
    const later = [];
    for (const im of wait) {
      let v = "none";
      try { const o = await env.IMG.get(im.key); if (o) v = await aiCheck(env, new Uint8Array(await o.arrayBuffer()), im.id.endsWith(".webp") ? "webp" : "jpg"); } catch (e) { v = "none"; }
      if (v === "none") continue;
      out.rechecked++;
      if (v === "sexual") {
        await removeImage(env, im.id, "the check, again: sexual");
        later.push(queueRow(env, "image", { maker: im.maker, game: im.game, text: "check (again): sexual: removed" }));
      } else {
        later.push(st(env, "UPDATE images SET verdict = ? WHERE id = ? AND verdict = 'none'", v, im.id));
        if (v === "flag") later.push(queueRow(env, "image", { maker: im.maker, game: im.game, image: imgUrl(env, im.game, im.id), text: "check (again): flag" }));
      }
    }
    if (later.length) await env.DB.batch(later);
  });
  return out;
}
