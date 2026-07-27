export type City = {
  id: string;
  city: string;
  cc: string;
  tz: string;
  lat: number;
  lon: number;
};

export const CITIES: City[] = [
  { id: 'sfo', city: 'San Francisco', cc: 'United States', tz: 'America/Los_Angeles', lat: 37.77, lon: -122.42 },
  { id: 'den', city: 'Denver', cc: 'United States', tz: 'America/Denver', lat: 39.74, lon: -104.99 },
  { id: 'mex', city: 'Mexico City', cc: 'Mexico', tz: 'America/Mexico_City', lat: 19.43, lon: -99.13 },
  { id: 'chi', city: 'Chicago', cc: 'United States', tz: 'America/Chicago', lat: 41.88, lon: -87.63 },
  { id: 'nyc', city: 'New York', cc: 'United States', tz: 'America/New_York', lat: 40.71, lon: -74.01 },
  { id: 'yto', city: 'Toronto', cc: 'Canada', tz: 'America/Toronto', lat: 43.65, lon: -79.38 },
  { id: 'bog', city: 'Bogotá', cc: 'Colombia', tz: 'America/Bogota', lat: 4.71, lon: -74.07 },
  { id: 'sao', city: 'São Paulo', cc: 'Brazil', tz: 'America/Sao_Paulo', lat: -23.55, lon: -46.63 },
  { id: 'bue', city: 'Buenos Aires', cc: 'Argentina', tz: 'America/Argentina/Buenos_Aires', lat: -34.6, lon: -58.38 },
  { id: 'lis', city: 'Lisbon', cc: 'Portugal', tz: 'Europe/Lisbon', lat: 38.72, lon: -9.14 },
  { id: 'lon', city: 'London', cc: 'United Kingdom', tz: 'Europe/London', lat: 51.51, lon: -0.13 },
  { id: 'par', city: 'Paris', cc: 'France', tz: 'Europe/Paris', lat: 48.86, lon: 2.35 },
  { id: 'ber', city: 'Berlin', cc: 'Germany', tz: 'Europe/Berlin', lat: 52.52, lon: 13.4 },
  { id: 'lag', city: 'Lagos', cc: 'Nigeria', tz: 'Africa/Lagos', lat: 6.52, lon: 3.38 },
  { id: 'cai', city: 'Cairo', cc: 'Egypt', tz: 'Africa/Cairo', lat: 30.04, lon: 31.24 },
  { id: 'jnb', city: 'Johannesburg', cc: 'South Africa', tz: 'Africa/Johannesburg', lat: -26.2, lon: 28.05 },
  { id: 'ist', city: 'Istanbul', cc: 'Türkiye', tz: 'Europe/Istanbul', lat: 41.01, lon: 28.98 },
  { id: 'mow', city: 'Moscow', cc: 'Russia', tz: 'Europe/Moscow', lat: 55.76, lon: 37.62 },
  { id: 'dxb', city: 'Dubai', cc: 'UAE', tz: 'Asia/Dubai', lat: 25.2, lon: 55.27 },
  { id: 'khi', city: 'Karachi', cc: 'Pakistan', tz: 'Asia/Karachi', lat: 24.86, lon: 67.01 },
  { id: 'blr', city: 'Bengaluru', cc: 'India', tz: 'Asia/Kolkata', lat: 12.97, lon: 77.59 },
  { id: 'dac', city: 'Dhaka', cc: 'Bangladesh', tz: 'Asia/Dhaka', lat: 23.81, lon: 90.41 },
  { id: 'bkk', city: 'Bangkok', cc: 'Thailand', tz: 'Asia/Bangkok', lat: 13.76, lon: 100.5 },
  { id: 'sin', city: 'Singapore', cc: 'Singapore', tz: 'Asia/Singapore', lat: 1.35, lon: 103.82 },
  { id: 'hkg', city: 'Hong Kong', cc: 'Hong Kong SAR', tz: 'Asia/Hong_Kong', lat: 22.32, lon: 114.17 },
  { id: 'sha', city: 'Shanghai', cc: 'China', tz: 'Asia/Shanghai', lat: 31.23, lon: 121.47 },
  { id: 'tyo', city: 'Tokyo', cc: 'Japan', tz: 'Asia/Tokyo', lat: 35.68, lon: 139.69 },
  { id: 'sel', city: 'Seoul', cc: 'South Korea', tz: 'Asia/Seoul', lat: 37.57, lon: 126.98 },
  { id: 'syd', city: 'Sydney', cc: 'Australia', tz: 'Australia/Sydney', lat: -33.87, lon: 151.21 },
  { id: 'per', city: 'Perth', cc: 'Australia', tz: 'Australia/Perth', lat: -31.95, lon: 115.86 },
  { id: 'akl', city: 'Auckland', cc: 'New Zealand', tz: 'Pacific/Auckland', lat: -36.85, lon: 174.76 },
  { id: 'hnl', city: 'Honolulu', cc: 'United States', tz: 'Pacific/Honolulu', lat: 21.31, lon: -157.86 },
  { id: 'anc', city: 'Anchorage', cc: 'United States', tz: 'America/Anchorage', lat: 61.22, lon: -149.9 },
  { id: 'rey', city: 'Reykjavík', cc: 'Iceland', tz: 'Atlantic/Reykjavik', lat: 64.15, lon: -21.94 },
];

export const byId: Record<string, City> = Object.fromEntries(CITIES.map((c) => [c.id, c]));
