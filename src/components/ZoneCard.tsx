import { useState } from 'react';
import DayBar from '@/components/DayBar';
import type { City } from '@/data/cities';
import { fmtHours, offsetLabel, offsetMs, pad, parts, zoneAbbr } from '@/lib/time';

type Props = {
  city: City;
  instant: Date;
  anchorOffset: number;
  isAnchor: boolean;
  dragging: boolean;
  onRemove: () => void;
  onMakeAnchor: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
};

export default function ZoneCard({
  city, instant, anchorOffset, isAnchor, dragging,
  onRemove, onMakeAnchor, onDragStart, onDragEnd, onDragOver,
}: Props) {
  // draggable only while the grip is held, so text selection and the
  // time input never start a card drag
  const [grabbed, setGrabbed] = useState(false);
  const p = parts(instant, city.tz);
  const h = +p.hour;
  const h12 = ((h + 11) % 12) + 1;
  const dh = (offsetMs(instant, city.tz) - anchorOffset) / 3600000;

  return (
    <div
      className={`card${isAnchor ? ' anchor' : ''}${dragging ? ' dragging' : ''}`}
      draggable={grabbed}
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart(); }}
      onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
      onDrop={(e) => e.preventDefault()}
      onDragEnd={() => { setGrabbed(false); onDragEnd(); }}
    >
      {isAnchor ? (
        <div className="badge">Anchor</div>
      ) : (
        <button
          className="setanchor"
          title={`Make ${city.city} the anchor zone`}
          onClick={onMakeAnchor}
        >Set anchor</button>
      )}
      <button
        className="grip"
        title={`Drag to reorder ${city.city}`}
        onMouseDown={() => setGrabbed(true)}
        onMouseUp={() => setGrabbed(false)}
        onBlur={() => setGrabbed(false)}
      >⠿</button>
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
    </div>
  );
}
