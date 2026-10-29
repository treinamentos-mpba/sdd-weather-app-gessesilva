import { useId } from 'react';

interface EmptyStateProps {
  title: string;
  hint: string;
}

export default function EmptyState({ title, hint }: EmptyStateProps) {
  const titleId = useId();

  return (
    <div
      aria-labelledby={titleId}
      className="rounded-lg border border-white/10 bg-white/5 p-5 text-white shadow-glass backdrop-blur-md"
      role="status"
    >
      <h2 className="text-base font-semibold" id={titleId}>
        {title}
      </h2>
      <p className="mt-1 text-sm text-white/65">{hint}</p>
    </div>
  );
}
