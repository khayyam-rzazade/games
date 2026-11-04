/* The story game's settings, read by the story page (story/story.js) and by the home page's tile (story/tile.js).
   `launch` must be a Monday (UTC) and `weeks` how many weeks of story there are: both must say the same as LAUNCH and
   WEEKS in story/worker/wrangler.jsonc (the server checks the calendar with its own copy).
   `titles` is the name of each week's story, for the home tile (so the home page does not have to load the story files):
   add a line when a week's file is added. */
window.STORY_CONFIG = {
  launch: "2026-11-09",
  weeks: 4,
  titles: { 1: "The Ferry Comes Sunday", 2: "Rain Until Sunday", 3: "The Wedding Bread", 4: "The Last Train Up" },
  /* The server answers on two addresses (like the other Workers): story.logicers.com first, because some campus
     Wi-Fi blocks workers.dev; the workers.dev one only when the first gives no answer at all. */
  api: "https://story.logicers.com",
  apiOld: "https://logicers-story.rza-khay.workers.dev"
};
