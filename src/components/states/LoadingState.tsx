interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Carregando...' }: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70 shadow-glass backdrop-blur-md"
      role="status"
    >
      {message}
    </div>
  );
}
