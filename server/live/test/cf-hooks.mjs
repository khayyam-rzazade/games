/* Node module hook: "cloudflare:workers" resolves to cf-shim.mjs. Registered by register-cf.mjs. Not deployed. */
export async function resolve(specifier, context, next) {
  if (specifier === "cloudflare:workers") return { url: new URL("./cf-shim.mjs", import.meta.url).href, shortCircuit: true };
  return next(specifier, context);
}
