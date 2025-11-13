export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="hero-gradient rounded-3xl px-6 md:px-8 py-12 md:py-20 text-center animate-fadeIn">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Build AI-Powered Applications with Claude Code on AWS
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 animation-delay-200 animate-fadeIn">
              Learn how to leverage Claude Code with AWS Bedrock to build intelligent applications. Discover integration patterns, MCP servers, CI/CD workflows, and industry best practices for AI-powered development.
            </p>
            <a
              href="#posts"
              className="btn bg-aws-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold inline-block no-underline animation-delay-400 animate-fadeIn"
            >
              Explore AWS Bedrock
            </a>
          </div>
        </div>
      </section>

      {/* Post List - Students will build this in Exercise 006 */}
      <section id="posts">
        <h2 className="text-4xl font-bold mb-6">Recent Posts</h2>
        <div className="text-aws-dark-gray">
          <p>Post list will be added in Exercise 006</p>
        </div>
      </section>
    </div>
  );
}
