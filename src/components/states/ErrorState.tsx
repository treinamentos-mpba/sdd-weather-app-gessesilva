interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      aria-live="assertive"
      className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-300/20 bg-red-300/5 p-4 text-white shadow-glass backdrop-blur-md"
      role="alert"
    >
      <p className="text-sm text-white/80">{message}</p>
      <button
        className="rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
        onClick={onRetry}
        type="button"
      >
        Tentar novamente
      </button>
    </div>
  );
}
