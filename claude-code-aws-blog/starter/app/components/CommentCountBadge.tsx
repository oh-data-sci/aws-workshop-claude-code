interface CommentCountBadgeProps {
  count: number;
}

/**
 * CommentCountBadge Component
 *
 * Displays a comment count badge with AWS Orange styling.
 * This is a Server Component (no client-side JavaScript).
 *
 * @param count - Number of comments
 */
export default function CommentCountBadge({ count }: CommentCountBadgeProps) {
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span>{count} {count === 1 ? 'comment' : 'comments'}</span>
    </span>
  );
}
