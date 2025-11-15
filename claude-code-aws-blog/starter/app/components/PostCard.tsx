import Link from 'next/link';
import { Post } from '@/app/lib/posts';
import { withBasePath } from '@/app/lib/basePath';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter } = post;

  return (
    <Link
      href={withBasePath(`/posts/${slug}`)}
      className="no-underline"
    >
      <article
        className={`bg-white rounded-2xl p-8 transition-all h-full flex flex-col ${
          featured
            ? 'border-4 border-aws-orange shadow-lg'
            : 'border-2 border-aws-light-gray hover:border-aws-blue'
        }`}
      >
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-aws-orange text-white px-4 py-2 rounded-3xl text-sm font-semibold inline-block">
            {frontmatter.category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-aws-dark mb-4">
          {frontmatter.title}
        </h3>

        {/* Excerpt */}
        <p className="text-aws-dark-gray mb-6 flex-1">
          {frontmatter.excerpt}
        </p>

        {/* Meta Information */}
        <div className="text-aws-dark-gray text-sm mb-4">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <span className="mx-2">•</span>
          <span className="italic">by {frontmatter.author}</span>
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
