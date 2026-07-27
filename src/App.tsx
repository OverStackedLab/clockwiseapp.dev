import { useCallback, useEffect, useMemo, useState } from 'react';
import WorldMap from '@/components/WorldMap';
import ZoneCard from '@/components/ZoneCard';
import { CITIES, byId } from '@/data/cities';
import { offsetMs, pad, parts, wallToInstant, zoneAbbr } from '@/lib/time';

const DEFAULT_ZONES = ['sfo', 'nyc', 'lon', 'ber', 'blr', 'tyo'];

export default function App() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_ZONES);
  const [instant, setInstant] = useState(() => new Date());
  const [live, setLive] = useState(true);
  const [utc, setUtc] = useState(() => parts(new Date(), 'UTC'));

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setUtc(parts(now, 'UTC'));
      if (live) setInstant(now);
    }, 1000);
    return () => clearInterval(t);
  }, [live]);

  const setMoment = useCallback((d: Date) => {
    setLive(false);
    setInstant(d);
  }, []);

  const toggle = useCallback((id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }, []);

  const anchor = selected.length ? byId[selected[0]] : null;
  const anchorOffset = anchor ? offsetMs(instant, anchor.tz) : 0;
  const ap = anchor ? parts(instant, anchor.tz) : null;
  const scrubMins = ap ? +ap.hour * 60 + +ap.minute : 0;
  const sorted = useMemo(
    () => CITIES.slice().sort((a, b) => a.city.localeCompare(b.city)),
    [],
  );

  return (
    <div className="wrap">
      <header>
        <div className="brand">
          <div className="mark" />
          <div>
            <h1>ClockWise</h1>
            <div className="tag">Pick zones on the map · set one time · read them all</div>
          </div>
        </div>
        <div className="utcbox">
          <div className="l">Reference · UTC</div>
          <div className="t mono">{utc.hour}:{utc.minute}:{utc.second}</div>
        </div>
      </header>

      <WorldMap instant={instant} selected={selected} onToggle={toggle} />

      <div className="controls">
        <div className="seg">
          <label className="lbl" htmlFor="picker">Add zone</label>
          <select
            id="picker"
            value=""
            onChange={(e) => {
              const id = e.target.value;
              if (id) setSelected((s) => (s.includes(id) ? s : [...s, id]));
            }}
          >
            <option value="">Search list…</option>
            {sorted.map((c) => (
              <option key={c.id} value={c.id}>{c.city} — {c.cc}</option>
            ))}
          </select>
        </div>

        <div className="scrub">
          <span className="lbl">Set time</span>
          <input
            type="range"
            min={0}
            max={1439}
            step={5}
            value={scrubMins}
            disabled={!anchor}
            aria-label="Set time in the anchor zone"
            onChange={(e) => {
              if (!anchor || !ap) return;
              const m = +e.target.value;
              setMoment(
                wallToInstant(+ap.year, +ap.month, +ap.day, Math.floor(m / 60), m % 60, anchor.tz),
              );
            }}
          />
          <div className="sv">
            {anchor && ap ? `${ap.hour}:${ap.minute} ${zoneAbbr(instant, anchor.tz)}` : '—'}
          </div>
        </div>

        <button onClick={() => { setLive(true); setInstant(new Date()); }}>Now</button>
      </div>

      <div className="sechead">
        <h2>Selected zones</h2>
        <div className="rule" />
        <div className="n">{pad(selected.length)} zones</div>
      </div>

      <div className="grid">
        {selected.length === 0 ? (
          <div className="empty">
            No zones selected — click markers on the map above, or use <b>Add zone</b>.
          </div>
        ) : (
          selected.map((id, i) => (
            <ZoneCard
              key={id}
              city={byId[id]}
              instant={instant}
              anchorOffset={anchorOffset}
              isAnchor={i === 0}
              onRemove={() => toggle(id)}
              onSetTime={setMoment}
            />
          ))
        )}
      </div>
    </div>
  );
}
