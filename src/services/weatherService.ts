import type { City } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

interface GeocodingResult {
  id: number;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

export class WeatherServiceError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'WeatherServiceError';
    this.status = status;
  }
}

export async function searchCities(name: string): Promise<City[]> {
  const query = name.trim();

  if (query.length === 0) {
    return [];
  }

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new WeatherServiceError(
      `Open-Meteo Geocoding respondeu com HTTP ${response.status}.`,
      response.status,
    );
  }

  const payload = (await response.json()) as GeocodingResponse;

  return (payload.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    region: result.admin1,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  }));
}
