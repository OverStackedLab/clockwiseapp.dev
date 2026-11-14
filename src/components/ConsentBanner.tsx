import { useEffect, useRef } from 'react';

type Props = {
  onAccept: () => void;
  onDecline: () => void;
  /** Move focus into the banner (when reopened from "Cookie settings"). */
  autoFocus?: boolean;
};

export default function ConsentBanner({ onAccept, onDecline, autoFocus }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <div
      ref={ref}
      className="consent"
      role="region"
      aria-label="Cookie consent"
      aria-describedby="consent-text"
      tabIndex={-1}
    >
      <p id="consent-text">
        ClockWise uses Google Analytics to count visits, only if you allow it. Nothing is
        loaded or stored for analytics until you choose Accept. You can change this any time
        under Cookie settings. <a href="/privacy.html">Privacy policy</a>
      </p>
      <div className="consent-actions">
        <button type="button" onClick={onDecline}>Decline</button>
        <button type="button" onClick={onAccept}>Accept</button>
      </div>
    </div>
  );
}
