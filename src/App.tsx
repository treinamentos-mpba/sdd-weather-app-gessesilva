import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { mockWeatherData } from './mocks/weatherData';
import type { Unit, WeatherData } from './types/weather';

type ContentState = 'idle' | 'loading' | 'empty' | 'error' | 'success';

function normalizeCityName(value: string): string {
  return value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

function waitForMockResponse(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, 250));
}

export default function App() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const [contentState, setContentState] = useState<ContentState>('idle');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [lastQuery, setLastQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function searchCity(city: string) {
    const query = city.trim();
    setLastQuery(query);
    setContentState('loading');
    setErrorMessage('');

    try {
      await waitForMockResponse();

      if (normalizeCityName(query) !== normalizeCityName(mockWeatherData.city.name)) {
        setWeatherData(null);
        setContentState('empty');
        return;
      }

      if (!mockWeatherData.current || !mockWeatherData.forecast) {
        throw new Error('Os dados mockados de clima estão incompletos.');
      }

      setWeatherData(mockWeatherData);
      setContentState('success');
    } catch {
      setWeatherData(null);
      setErrorMessage('Não foi possível carregar os dados do clima. Tente novamente.');
      setContentState('error');
    }
  }

  return (
    <div className="min-h-screen bg-night-900 text-white">
      <header className="border-b border-white/10 bg-night-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a aria-label="Clima — início" className="flex w-fit items-center gap-3" href="/">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-lg border border-accent-400/30 bg-accent-500/15 text-xl font-bold text-accent-400"
            >
              °
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-wide text-white">Clima</span>
              <span className="block text-xs text-white/60">Weather</span>
            </span>
          </a>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:max-w-3xl">
            <SearchBar disabled={contentState === 'loading'} onSearch={searchCity} />
            <UnitToggle onChange={setUnit} unit={unit} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {contentState === 'idle' && (
          <EmptyState hint="Comece pela busca acima." title="Qual cidade você quer consultar?" />
        )}

        {contentState === 'loading' && <LoadingState message={`Buscando ${lastQuery}...`} />}

        {contentState === 'empty' && (
          <EmptyState
            hint="Confira a grafia e tente pesquisar outra cidade."
            title="Cidade não encontrada"
          />
        )}

        {contentState === 'error' && (
          <ErrorState message={errorMessage} onRetry={() => void searchCity(lastQuery)} />
        )}

        {contentState === 'success' && weatherData?.current && weatherData.forecast && (
          <>
            <p className="sr-only" role="status">
              Condições carregadas para {weatherData.city.name}.
            </p>
            <CurrentWeather city={weatherData.city} current={weatherData.current} unit={unit} />
            <ForecastList forecast={weatherData.forecast} unit={unit} />
          </>
        )}
      </main>
    </div>
  );
}
