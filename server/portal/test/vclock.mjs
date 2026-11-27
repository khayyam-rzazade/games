/* A fake clock for the nightly look's pacing (chat F2, 27 Nov 2026). The nightly look waits (a pause of 2 s after each answer
   of a host) through two functions it is given: now() and sleep(ms) (src/cron.js setPace). Here time stands still until every
   task has run as far as it can and only then moves, straight to the earliest sleeper: a night of pauses takes no real time,
   and what a test reads as "when" is the fake time, in ms. */
export function vclock() {
  let t = 0, seq = 0, pumping = false;
  const timers = [];
  const pump = () => {
    if (pumping || !timers.length) return;
    pumping = true;
    setImmediate(() => {
      pumping = false;
      if (!timers.length) return;
      timers.sort((a, b) => a.at - b.at || a.n - b.n);
      if (timers[0].at > t) t = timers[0].at;
      while (timers.length && timers[0].at <= t) timers.shift().res();
      pump();
    });
  };
  return {
    now: () => t,
    sleep: (ms) => new Promise((res) => { timers.push({ at: t + Math.max(0, ms), n: seq++, res }); pump(); }),
    /* the fake time moves on (a night to the next) */
    advance: (ms) => { t += ms; },
  };
}
