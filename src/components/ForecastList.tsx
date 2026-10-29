import { useId } from 'react';
import type { ForecastDay, Unit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[] | null;
  unit: Unit;
}

export default function ForecastList({ forecast, unit }: ForecastListProps) {
  const titleId = useId();

  if (!forecast || forecast.length === 0) {
    return (
      <p className="text-sm text-white/70" role="status">
        Previsão indisponível.
      </p>
    );
  }

  const firstForecastDate = forecast[0].date;

  return (
    <section aria-labelledby={titleId} className="w-full min-w-0">
      <h2 className="mb-4 text-lg font-semibold text-white" id={titleId}>
        Previsão para os próximos dias
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.map((day) => (
          <ForecastCard
            day={day}
            firstForecastDate={firstForecastDate}
            key={day.date}
            unit={unit}
          />
        ))}
      </ul>
    </section>
  );
}
