import DayBar from '@/components/DayBar';
import type { City } from '@/data/cities';
import { fmtHours, offsetLabel, offsetMs, pad, parts, wallToInstant, zoneAbbr } from '@/lib/time';

type Props = {
  city: City;
  instant: Date;
  anchorOffset: number;
  isAnchor: boolean;
  onRemove: () => void;
  onSetTime: (d: Date) => void;
};

export default function ZoneCard({
  city, instant, anchorOffset, isAnchor, onRemove, onSetTime,
}: Props) {
  const p = parts(instant, city.tz);
  const h = +p.hour;
  const h12 = ((h + 11) % 12) + 1;
  const dh = (offsetMs(instant, city.tz) - anchorOffset) / 3600000;

  return (
    <div className={`card${isAnchor ? ' anchor' : ''}`}>
      {isAnchor && <div className="badge">Anchor</div>}
      <button className="x" title={`Remove ${city.city}`} onClick={onRemove}>×</button>
      <div className="city">{city.city}</div>
      <div className="meta">
        {zoneAbbr(instant, city.tz)} · {offsetLabel(instant, city.tz)} · {city.cc}
      </div>
      <div className="time">
        {pad(h12)}:{p.minute}
        <span className="ap">{h < 12 ? 'AM' : 'PM'}</span>
      </div>
      <div className="sub">
        <span>{p.weekday} {p.month}/{p.day}</span>
        <span className="delta">
          {isAnchor ? 'anchor' : `${dh > 0 ? '+' : '−'}${fmtHours(Math.abs(dh))} vs anchor`}
        </span>
      </div>
      <DayBar hour={h} />
      <div className="setrow">
        <span>Set</span>
        <input
          type="time"
          value={`${p.hour}:${p.minute}`}
          onChange={(e) => {
            if (!e.target.value) return;
            const [hh, mm] = e.target.value.split(':').map(Number);
            onSetTime(wallToInstant(+p.year, +p.month, +p.day, hh, mm, city.tz));
          }}
        />
      </div>
    </div>
  );
}
