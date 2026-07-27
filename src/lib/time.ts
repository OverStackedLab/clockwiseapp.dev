/** Time-zone math built on Intl — real IANA zones and DST, no date library. */

export type Parts = {
  year: string; month: string; day: string;
  hour: string; minute: string; second: string; weekday: string;
};

const fmtCache = new Map<string, Intl.DateTimeFormat>();

export function parts(date: Date, tz: string): Parts {
  let f = fmtCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short',
    });
    fmtCache.set(tz, f);
  }
  const o: Record<string, string> = {};
  for (const p of f.formatToParts(date)) if (p.type !== 'literal') o[p.type] = p.value;
  if (o.hour === '24') o.hour = '00';
  return o as Parts;
}

/** Zone offset from UTC, in ms, at a given instant. */
export function offsetMs(date: Date, tz: string): number {
  const p = parts(date, tz);
  return (
    Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) -
    Math.floor(date.getTime() / 1000) * 1000
  );
}

/** Wall-clock time in a zone → the instant it refers to (two passes settle DST). */
export function wallToInstant(
  y: number, mo: number, d: number, h: number, mi: number, tz: string,
): Date {
  let g = Date.UTC(y, mo - 1, d, h, mi, 0);
  for (let i = 0; i < 2; i++) g = Date.UTC(y, mo - 1, d, h, mi, 0) - offsetMs(new Date(g), tz);
  return new Date(g);
}

export const pad = (n: number | string) => String(n).padStart(2, '0');

export function offsetLabel(date: Date, tz: string): string {
  const m = offsetMs(date, tz) / 60000;
  const a = Math.abs(m);
  return `UTC${m < 0 ? '−' : '+'}${pad(Math.floor(a / 60))}:${pad(a % 60)}`;
}

export function zoneAbbr(date: Date, tz: string): string {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
    .formatToParts(date)
    .find((x) => x.type === 'timeZoneName');
  return p ? p.value : '';
}

export const fmtHours = (h: number) => `${h % 1 ? h.toFixed(2).replace(/0$/, '') : h}h`;

/** Sub-solar point for the given instant — antipode + 90° radius = the night disc. */
export function subsolarPoint(date: Date): [number, number] {
  const n = date.getTime() / 86400000 + 2440587.5 - 2451545.0;
  const L = (280.46 + 0.9856474 * n) % 360;
  const gr = (((357.528 + 0.9856003 * n) % 360) * Math.PI) / 180;
  const lam = ((L + 1.915 * Math.sin(gr) + 0.02 * Math.sin(2 * gr)) * Math.PI) / 180;
  const dec = (Math.asin(Math.sin((23.439 * Math.PI) / 180) * Math.sin(lam)) * 180) / Math.PI;
  const utc = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  return [-15 * (utc - 12), dec];
}
