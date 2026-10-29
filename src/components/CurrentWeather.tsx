import { useId } from 'react';
import { formatTemperature } from '../lib/temperature';
import { getWeatherCondition } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherData, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherData;
  unit: Unit;
}

function formatMetric(value: number | null, unit: string, fractionDigits = 0): string {
  if (value === null || !Number.isFinite(value)) {
    return '—';
  }

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);

  return `${formattedValue} ${unit}`;
}

function formatObservedTime(value: string, timezone: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  }).format(date);
}

export default function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const titleId = useId();
  const condition = getWeatherCondition(current.conditionCode);
  const cityDetails = [city.region !== city.name ? city.region : undefined, city.country]
    .filter(Boolean)
    .join(' · ');

  return (
    <section
      aria-labelledby={titleId}
      className="w-full min-w-0 rounded-lg border border-white/10 bg-white/5 p-4 shadow-glass backdrop-blur-md sm:p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-white/70" id={titleId}>
            Clima atual
          </h2>
          <p className="mt-1 text-lg font-semibold text-white">{city.name}</p>
          <p className="text-sm text-white/60">{cityDetails}</p>
        </div>
        <p className="text-sm text-white/60">
          Observado às {formatObservedTime(current.observedAt, city.timezone)}
        </p>
      </header>

      <div className="flex min-w-0 flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:gap-5 sm:py-8">
        <span aria-hidden="true" className="shrink-0 text-5xl leading-none sm:text-6xl">
          {condition.icon}
        </span>
        <div className="w-full min-w-0 sm:w-auto">
          <p className="text-5xl font-semibold leading-tight text-white sm:text-7xl sm:leading-none">
            {formatTemperature(current.temperatureC, unit)}
          </p>
          <p className="mt-3 text-lg text-white/80">{condition.description}</p>
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm text-white/60">
            <span>Sensação {formatTemperature(current.feelsLikeC, unit)}</span>
            <span>Máx. {formatTemperature(current.todayMaxC, unit)}</span>
            <span>Mín. {formatTemperature(current.todayMinC, unit)}</span>
          </div>
        </div>
      </div>

      <dl className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-4 sm:gap-x-6">
        <div>
          <dt className="text-sm text-white/60">Umidade</dt>
          <dd className="mt-1 break-words text-base font-medium text-white">
            {formatMetric(current.relativeHumidityPercent, '%')}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-white/60">Vento</dt>
          <dd className="mt-1 break-words text-base font-medium text-white">
            {formatMetric(current.windSpeedKmh, 'km/h', 1)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-white/60">Chuva restante hoje</dt>
          <dd className="mt-1 break-words text-base font-medium text-white">
            {formatMetric(current.precipitationProbabilityRemainingDayPercent, '%')}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-white/60">Pressão</dt>
          <dd className="mt-1 break-words text-base font-medium text-white">
            {formatMetric(current.surfacePressureHpa, 'hPa', 1)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
