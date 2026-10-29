import { type FormEvent, useId, useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
  const inputId = useId();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled || normalizedQuery.length === 0) {
      return;
    }

    onSearch(normalizedQuery);
  }

  return (
    <form
      aria-label="Buscar cidade"
      className="flex w-full max-w-2xl items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 shadow-glass backdrop-blur-md"
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor={inputId}>
        Buscar cidade
      </label>
      <input
        autoComplete="off"
        className="min-w-0 flex-1 rounded-md bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-accent-400 disabled:cursor-not-allowed"
        disabled={disabled}
        id={inputId}
        name="city"
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Digite o nome da cidade"
        type="search"
        value={query}
      />
      <button
        className="shrink-0 rounded-md bg-accent-500 px-5 py-3 font-medium text-white transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || normalizedQuery.length === 0}
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}
