import { getAllPosts } from '@/app/lib/posts';
import PostList from '@/app/components/PostList';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="hero-gradient rounded-3xl px-6 md:px-8 py-12 md:py-20 text-center animate-fadeIn shadow-xl border-2 border-aws-orange/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
              Build AI-Powered Applications with Claude Code on AWS
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 animation-delay-200 animate-fadeIn drop-shadow-md">
              Learn how to leverage Claude Code with AWS Bedrock to build intelligent applications. Discover integration patterns, MCP servers, CI/CD workflows, and industry best practices for AI-powered development.
            </p>
            <a
              href="#posts"
              className="btn bg-aws-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold inline-block no-underline animation-delay-400 animate-fadeIn shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#1a242e] transition-all duration-300 border-2 border-aws-orange/30 hover:border-aws-orange"
            >
              Explore AWS Bedrock
            </a>
          </div>
        </div>
      </section>

      {/* Post List */}
      <section id="posts">
        <h2 className="text-4xl font-bold mb-8 text-aws-dark relative inline-block after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-aws-orange after:rounded-full">
          Recent Posts
        </h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
