import { formatForecastDay } from '../lib/format';
import { formatTemperature } from '../lib/temperature';
import { getWeatherCondition } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
  firstForecastDate: string;
  unit: Unit;
}

function formatPrecipitationProbability(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return '—';
  }

  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(value)}%`;
}

export default function ForecastCard({ day, firstForecastDate, unit }: ForecastCardProps) {
  const condition = getWeatherCondition(day.conditionCode);

  return (
    <li className="min-w-0">
      <article className="flex h-full flex-col items-center rounded-lg border border-white/10 bg-white/5 p-4 text-center shadow-glass backdrop-blur-md">
        <h3 className="text-sm font-semibold text-white">
          {formatForecastDay(day.date, firstForecastDate)}
        </h3>
        <span aria-hidden="true" className="my-3 text-4xl leading-none">
          {condition.icon}
        </span>
        <p className="min-h-10 text-sm text-white/70">{condition.description}</p>
        <dl className="mt-3 grid w-full grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-white/60">Máx.</dt>
            <dd className="mt-1 font-medium text-white">{formatTemperature(day.maxC, unit)}</dd>
          </div>
          <div>
            <dt className="text-white/60">Mín.</dt>
            <dd className="mt-1 font-medium text-white">{formatTemperature(day.minC, unit)}</dd>
          </div>
        </dl>
        <p className="mt-auto w-full border-t border-white/10 pt-3 text-sm text-white/70">
          Chuva {formatPrecipitationProbability(day.precipitationProbabilityMaxPercent)}
        </p>
      </article>
    </li>
  );
}
