import type { WeatherData } from '../types/weather';

export const mockWeatherData: WeatherData = {
  city: {
    id: 3448439,
    name: 'São Paulo',
    region: 'São Paulo',
    country: 'Brasil',
    latitude: -23.5475,
    longitude: -46.63611,
    timezone: 'America/Sao_Paulo',
  },
  current: {
    observedAt: '2026-10-29T15:30:00-03:00',
    conditionCode: 81,
    temperatureC: 19.8,
    feelsLikeC: 21.7,
    todayMinC: 16.3,
    todayMaxC: 20.3,
    windSpeedKmh: 4.4,
    relativeHumidityPercent: 85,
    surfacePressureHpa: 931,
    precipitationProbabilityRemainingDayPercent: null,
  },
  forecast: [
    {
      date: '2026-10-29',
      conditionCode: 81,
      minC: 16.3,
      maxC: 20.3,
      precipitationProbabilityMaxPercent: 98,
    },
    {
      date: '2026-10-30',
      conditionCode: 80,
      minC: 17,
      maxC: 25.6,
      precipitationProbabilityMaxPercent: 100,
    },
    {
      date: '2026-10-31',
      conditionCode: 80,
      minC: 15.7,
      maxC: 21.3,
      precipitationProbabilityMaxPercent: 98,
    },
    {
      date: '2026-11-01',
      conditionCode: 53,
      minC: 15.6,
      maxC: 25,
      precipitationProbabilityMaxPercent: 85,
    },
    {
      date: '2026-11-02',
      conditionCode: 95,
      minC: 17.7,
      maxC: 28.4,
      precipitationProbabilityMaxPercent: 92,
    },
  ],
  fetchedAt: '2026-10-29T18:30:00.000Z',
};
