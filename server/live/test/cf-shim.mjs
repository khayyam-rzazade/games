/* Stand-in for the "cloudflare:workers" module, for the checks that run the Durable Object classes in plain Node
   (test_kitkeep.mjs): a DurableObject is its ctx and env, nothing more. Not deployed. */
export class DurableObject {
  constructor(ctx, env) { this.ctx = ctx; this.env = env; }
}
