/* A stand-in for Chat A2's server/me/passkey.js, used only by the tests when that file is not there yet (test/load.mjs).
   Never delivered: the real file is Chat A2's. */
export async function handlePasskey(req, env, url) {
  return new Response(JSON.stringify({ ok: false, error: "stand-in", path: url.pathname }), { status: 501, headers: { "Content-Type": "application/json" } });
}
