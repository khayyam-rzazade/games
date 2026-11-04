// Shared by the tests: one phone's answers, every item filled in the middle; o overrides.
export function answers(o) {
  return Object.assign({ role: "student", w1: 3, w2: 3, w3: 3, w4: 3, w5: 3, st: 3, y_load: 3, y_control: 3, y_support: 3, y_recog: 3, y_meaning: 3, y_future: 3, sleep: 3, mind: "money", p_say: 3, p_deserve: 3, p_better: 3, p_leftout: 2, ladder: 5 }, o || {});
}
