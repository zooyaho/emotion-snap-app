export const toMs = (v: Date | number) => (v instanceof Date ? v.getTime() : v);

/** 로컬 타임존 기준 시작/끝 */
export function startEndOfDay(d: Date = new Date()) {
  const s = new Date(d);
  s.setHours(0, 0, 0, 0);
  const e = new Date(d);
  e.setHours(23, 59, 59, 999);
  return { start: s.getTime(), end: e.getTime() };
}

export function startEndOfMonth(d: Date = new Date()) {
  const s = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
  const e = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start: s.getTime(), end: e.getTime() };
}

export function startEndOfYear(d: Date = new Date()) {
  const s = new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
  const e = new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
  return { start: s.getTime(), end: e.getTime() };
}
