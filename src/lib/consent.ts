/**
 * Analytics consent.
 *
 * Google Analytics is strictly opt-in: gtag.js is not requested from Google
 * until the visitor clicks Accept. Consent Mode v2 defaults are set to denied
 * before anything else, and only analytics_storage is ever granted; the ad
 * signals stay denied.
 */

export type ConsentChoice = 'granted' | 'denied';

export const CONSENT_KEY = 'clockwise.analyticsConsent';
export const GA_ID: string = import.meta.env.VITE_GA_ID || 'G-92VWRR3WX7';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function storeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* storage unavailable (private mode): choice lasts for this page view only */
  }
}

let loaded = false;

function loadAnalytics(): void {
  if (loaded || !GA_ID) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  const gtag = window.gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('js', new Date());
  gtag('config', GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

/** Call once on startup: loads analytics only if the visitor previously accepted. */
export function initAnalytics(): void {
  if (getConsent() === 'granted') loadAnalytics();
}

export function acceptAnalytics(): void {
  storeConsent('granted');
  loadAnalytics();
}

/** Decline, or withdraw an earlier Accept. Withdrawal clears GA cookies and reloads. */
export function declineAnalytics(): void {
  const wasGranted = getConsent() === 'granted' || loaded;
  storeConsent('denied');
  if (!wasGranted) return;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  deleteGaCookies();
  // gtag.js is already running in this page; a reload guarantees it stops.
  window.location.reload();
}

function deleteGaCookies(): void {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid' || n === '_gat');
  // GA sets cookies on the top-most writable domain (e.g. .clockwiseapp.dev).
  const labels = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < labels.length - 1; i++) domains.push(`; domain=.${labels.slice(i).join('.')}`);
  for (const n of names) {
    for (const d of domains) {
      document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
    }
  }
}
