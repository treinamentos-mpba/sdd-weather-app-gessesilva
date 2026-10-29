function parseLocalDate(date: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsedDate = new Date(Date.UTC(year, month - 1, day, 12));

  return parsedDate.toISOString().slice(0, 10) === date ? parsedDate : null;
}

export function formatForecastDay(date: string, firstForecastDate: string): string {
  const currentDate = parseLocalDate(firstForecastDate);
  const forecastDate = parseLocalDate(date);

  if (!currentDate || !forecastDate) {
    return 'Data indisponível';
  }

  if (date === firstForecastDate) {
    return 'Hoje';
  }

  const dayDifference = (forecastDate.getTime() - currentDate.getTime()) / 86_400_000;

  if (dayDifference === 1) {
    return 'Amanhã';
  }

  const label = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    weekday: 'short',
  }).format(forecastDate);

  return label.charAt(0).toLocaleUpperCase('pt-BR') + label.slice(1);
}
