export default function DayBar({ hour }: { hour: number }) {
  return (
    <div className="daybar">
      {Array.from({ length: 24 }, (_, i) => {
        const col =
          i === hour ? '#e9b84f'
          : i < 6 || i >= 20 ? '#152030'
          : i < 8 || i >= 18 ? '#3c4a5e'
          : '#5c7794';
        return <i key={i} style={{ flex: 1, background: col, display: 'block', height: '100%' }} />;
      })}
    </div>
  );
}
