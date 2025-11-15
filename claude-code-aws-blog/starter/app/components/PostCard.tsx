import Link from 'next/link';
import { Post } from '@/app/lib/posts';
import { withBasePath } from '@/app/lib/basePath';
import { getCommentCount } from '@/app/lib/comments';
import ReadingTimeBadge from './ReadingTimeBadge';
import CommentCountBadge from './CommentCountBadge';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

/**
 * PostCard Component
 *
 * Displays a blog post card with title, excerpt, meta information, and reading time.
 * Styled with AWS theme colors and includes hover effects.
 *
 * @param post - The blog post data
 * @param featured - Whether to highlight this post with special styling
 */
export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const commentCount = getCommentCount(slug);

  return (
    <Link
      href={withBasePath(`/posts/${slug}`)}
      className="no-underline group"
    >
      <article
        className={`bg-white rounded-2xl p-8 transition-all duration-300 h-full flex flex-col ${
          featured
            ? 'border-4 border-aws-orange shadow-xl hover:shadow-2xl hover:scale-[1.02]'
            : 'border-2 border-aws-light-gray hover:border-aws-blue shadow-md hover:shadow-xl hover:scale-[1.02]'
        }`}
      >
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-aws-orange text-white px-4 py-2 rounded-3xl text-sm font-semibold inline-block shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            {frontmatter.category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-aws-dark mb-4 transition-colors duration-300 group-hover:text-aws-blue">
          {frontmatter.title}
        </h3>

        {/* Excerpt */}
        <p className="text-aws-dark-gray mb-6 flex-1">
          {frontmatter.excerpt}
        </p>

        {/* Meta Information */}
        <div className="text-aws-dark-gray text-sm mb-4 flex flex-wrap items-center gap-2">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <span className="mx-1">•</span>
          <span className="italic">by {frontmatter.author}</span>
          <span className="mx-1">•</span>
          <ReadingTimeBadge minutes={readingTime} />
          <span className="mx-1">•</span>
          <CommentCountBadge count={commentCount} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="bg-aws-light-gray text-aws-dark-gray px-3 py-1 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
