/* node --import ./test/register-cf.mjs test/test_kitkeep.mjs  (from server/live). Not deployed. */
import { register } from "node:module";
register("./cf-hooks.mjs", import.meta.url);
