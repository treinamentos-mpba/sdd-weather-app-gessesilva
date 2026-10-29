export type Unit = 'celsius' | 'fahrenheit';

export interface City {
  id: number; // Identificador da localidade retornado pelo geocoding.
  name: string; // Nome da cidade.
  region?: string; // Estado ou região administrativa, quando disponível.
  country: string; // País da cidade.
  latitude: number; // Latitude da cidade selecionada.
  longitude: number; // Longitude da cidade selecionada.
  timezone: string; // Fuso IANA usado para datas e horários locais.
}

export interface CurrentWeather {
  observedAt: string; // Horário ISO 8601 da observação, com offset local.
  conditionCode: number | null; // Código WMO da condição atual.
  temperatureC: number | null; // Temperatura atual normalizada para Celsius.
  feelsLikeC: number | null; // Sensação térmica normalizada para Celsius.
  todayMinC: number | null; // Mínima do dia local, em Celsius.
  todayMaxC: number | null; // Máxima do dia local, em Celsius.
  windSpeedKmh: number | null; // Velocidade do vento em km/h.
  relativeHumidityPercent: number | null; // Umidade relativa em porcentagem.
  surfacePressureHpa: number | null; // Pressão de superfície em hectopascais.
  precipitationProbabilityRemainingDayPercent: number | null; // Probabilidade restante do dia; null até a regra de agregação ser aprovada.
}

export interface ForecastDay {
  date: string; // Data local no formato YYYY-MM-DD.
  conditionCode: number | null; // Código WMO da condição diária.
  minC: number | null; // Temperatura mínima em Celsius.
  maxC: number | null; // Temperatura máxima em Celsius.
  precipitationProbabilityMaxPercent: number | null; // Máximo diário de probabilidade de precipitação, em porcentagem.
}

export interface HistoricalDay {
  date: string; // Data local no formato YYYY-MM-DD.
  conditionCode: number | null; // Código WMO da condição observada.
  minC: number | null; // Temperatura mínima observada em Celsius.
  maxC: number | null; // Temperatura máxima observada em Celsius.
  precipitationObservedMm: number | null; // Precipitação observada em milímetros.
}

export interface WeatherData {
  city: City; // Cidade a que os dados pertencem.
  current: CurrentWeather | null; // Clima atual, null quando indisponível.
  forecast: ForecastDay[] | null; // Dias previstos, null quando indisponíveis.
  fetchedAt: string; // Instante da consulta em ISO 8601 UTC.
  history?: HistoricalDay[]; // Histórico opcional, condicionado à PoC.
}

export type WeatherBlock = 'current' | 'forecast' | 'history';
export type DataFreshness = 'fresh' | 'stale';

export type AsyncBlock<T> =
  | { status: 'idle' }
  | { status: 'loading'; previous?: T }
  | { status: 'empty'; message: string }
  | {
      status: 'success';
      data: T;
      freshness: DataFreshness;
      fetchedAt: string;
      sourceError?: WeatherErrorCode;
    }
  | {
      status: 'error';
      code: WeatherErrorCode;
      message: string;
      fallback?: T;
      missingFields?: string[];
      fetchedAt?: string;
    };

export type WeatherErrorCode =
  | 'network'
  | 'timeout'
  | 'http'
  | 'invalid_response'
  | 'quota'
  | 'not_found'
  | 'unsupported';

export interface FavoriteCity {
  city: City; // Cidade salva localmente.
  savedAt: string; // Instante em que foi adicionada, em ISO 8601 UTC.
}

export interface StoredValue<T> {
  schemaVersion: 1; // Versão do formato persistido.
  savedAt: string; // Instante de gravação em ISO 8601 UTC.
  value: T; // Valor serializado.
}
