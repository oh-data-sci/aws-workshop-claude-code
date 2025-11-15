import { formatReadingTime } from '@/app/lib/readingTime';

interface ReadingTimeBadgeProps {
  minutes: number;
}

/**
 * ReadingTimeBadge Component
 *
 * Displays an estimated reading time badge with AWS Orange styling and an open book icon.
 * This is a Server Component (no client-side JavaScript).
 *
 * @param minutes - Reading time in minutes
 */
export default function ReadingTimeBadge({ minutes }: ReadingTimeBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-aws-orange/10 text-aws-orange px-3 py-1 rounded-full text-sm font-medium">
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      <span>{formatReadingTime(minutes)}</span>
    </span>
  );
}
