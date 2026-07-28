import { useEffect, useMemo, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule10, geoCircle } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import { CITIES } from '@/data/cities';
import { parts, subsolarPoint } from '@/lib/time';

const W = 1200;
const H = 560;
const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

const projection = geoNaturalEarth1().scale(215).translate([W / 2, H / 2 + 14]);
const path = geoPath(projection);
const SPHERE = path({ type: 'Sphere' }) ?? '';
const GRAT = path(geoGraticule10()) ?? '';

function useWorld(): string[] {
  const [paths, setPaths] = useState<string[]>([]);
  useEffect(() => {
    let ok = true;
    fetch(WORLD_URL)
      .then((r) => r.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((topo: any) => {
        if (!ok) return;
        const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>;
        setPaths(fc.features.map((f) => path(f) ?? ''));
      })
      .catch(() => undefined);
    return () => { ok = false; };
  }, []);
  return paths;
}

type Props = {
  instant: Date;
  selected: string[];
  onToggle: (id: string) => void;
};

export default function WorldMap({ instant, selected, onToggle }: Props) {
  const land = useWorld();
  const box = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; city: string; t: string } | null>(null);

  // recompute the terminator once a minute, not every render
  const minuteKey = Math.floor(instant.getTime() / 60000);
  const night = useMemo(() => {
    const [lon, dec] = subsolarPoint(new Date(minuteKey * 60000));
    return path(geoCircle().center([lon + 180, -dec]).radius(90)()) ?? '';
  }, [minuteKey]);

  return (
    <div className="mapcard" ref={box}>
      <div className="maphead">
        <div className="k">Zone selector</div>
        <div className="v">Click a marker to add or remove a city</div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map for selecting time zones">
        <path d={GRAT} fill="none" stroke="#151d26" strokeWidth={0.6} />
        <path d={SPHERE} fill="none" stroke="#1e2833" strokeWidth={1} />
        <g>
          {land.map((d, i) => (
            <path key={i} d={d} fill="var(--land)" stroke="#2a3542" strokeWidth={0.5} />
          ))}
        </g>
        <path d={night} fill="#05080b" opacity={0.42} pointerEvents="none" />
        <g>
          {CITIES.map((c) => {
            const [x, y] = projection([c.lon, c.lat]) ?? [0, 0];
            const on = selected.includes(c.id);
            return (
              <g
                key={c.id}
                transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-pressed={on}
                aria-label={`${on ? 'Remove' : 'Add'} ${c.city}`}
                onClick={() => onToggle(c.id)}
                onMouseMove={(e) => {
                  const r = box.current?.getBoundingClientRect();
                  if (!r) return;
                  const p = parts(instant, c.tz);
                  setTip({
                    x: e.clientX - r.left,
                    y: e.clientY - r.top,
                    city: c.city,
                    t: `${p.hour}:${p.minute}`,
                  });
                }}
                onMouseLeave={() => setTip(null)}
              >
                <circle r={12} fill="transparent" />
                {on && <circle r={9} fill="none" stroke="var(--amber)" strokeWidth={1} opacity={0.5} />}
                <circle r={on ? 4.2 : 3.2} fill={on ? 'var(--amber)' : '#46586a'} />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="legend">
        <span><i style={{ background: 'var(--amber)' }} />Selected</span>
        <span><i style={{ background: '#46586a' }} />Available</span>
      </div>

      {tip && (
        <div className="tip" style={{ left: tip.x, top: tip.y }}>
          <b>{tip.city}</b>
          <span>{tip.t}</span>
        </div>
      )}
    </div>
  );
}
