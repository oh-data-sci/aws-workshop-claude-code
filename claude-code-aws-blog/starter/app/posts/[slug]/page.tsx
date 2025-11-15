import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/app/lib/posts';
import type { Metadata } from 'next';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | AWS Claude Code Blog`,
    description: post.frontmatter.excerpt,
    authors: [{ name: post.frontmatter.author }],
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="bg-aws-orange text-white px-6 py-2 rounded-3xl text-sm font-semibold inline-block">
            {frontmatter.category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-aws-dark mb-6">
          {frontmatter.title}
        </h1>

        {/* Meta Information */}
        <div className="text-aws-dark-gray mb-8">
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
        <div className="flex flex-wrap gap-2 mb-12">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="bg-aws-light-gray text-aws-dark-gray px-4 py-2 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
