import type { Unit } from '../types/weather';

export function convertTemperature(temperatureC: number | null, unit: Unit): number | null {
  if (temperatureC === null || !Number.isFinite(temperatureC)) {
    return null;
  }

  return unit === 'fahrenheit' ? (temperatureC * 9) / 5 + 32 : temperatureC;
}

export function formatTemperature(temperatureC: number | null, unit: Unit): string {
  const temperature = convertTemperature(temperatureC, unit);

  if (temperature === null) {
    return '—';
  }

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';
  return `${temperature.toFixed(1)} ${unitSymbol}`;
}
