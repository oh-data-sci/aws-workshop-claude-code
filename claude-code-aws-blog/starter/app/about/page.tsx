export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-aws-dark mb-6">
            About This Project
          </h1>
          <div className="h-1 w-24 bg-aws-orange rounded-full mb-8"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-aws-light-gray">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-aws-dark mb-6">Training and Experimentation</h2>

            <p className="text-lg text-aws-dark-gray mb-6">
              This blog is a demonstration project created for <strong>training and experimentation purposes</strong>
              as part of the AWS Claude Code Workshop. It showcases the capabilities of AI-assisted development
              using Claude Code with AWS services.
            </p>

            <h3 className="text-2xl font-bold text-aws-dark mb-4 mt-8">Purpose</h3>
            <p className="text-lg text-aws-dark-gray mb-6">
              The primary objectives of this project are to:
            </p>
            <ul className="list-disc pl-6 text-lg text-aws-dark-gray mb-6 space-y-2">
              <li>Demonstrate how to build modern web applications using Claude Code</li>
              <li>Explore AWS Bedrock integration patterns for AI-powered development</li>
              <li>Experiment with Next.js 14, React Server Components, and Tailwind CSS</li>
              <li>Practice implementing AWS-themed design systems</li>
              <li>Learn best practices for AI-assisted software engineering</li>
            </ul>

            <h3 className="text-2xl font-bold text-aws-dark mb-4 mt-8">Technology Stack</h3>
            <div className="bg-aws-light-gray p-6 rounded-lg mb-6">
              <ul className="space-y-3 text-aws-dark-gray">
                <li><strong className="text-aws-dark">Framework:</strong> Next.js 14 with App Router</li>
                <li><strong className="text-aws-dark">Language:</strong> TypeScript with strict mode</li>
                <li><strong className="text-aws-dark">Styling:</strong> Tailwind CSS 4 with AWS theme</li>
                <li><strong className="text-aws-dark">Content:</strong> MDX for blog posts</li>
                <li><strong className="text-aws-dark">Deployment:</strong> CloudFront proxy architecture</li>
                <li><strong className="text-aws-dark">AI Assistant:</strong> Claude Code via AWS Bedrock</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-aws-dark mb-4 mt-8">Workshop Context</h3>
            <p className="text-lg text-aws-dark-gray mb-6">
              This project is built progressively through a series of workshop exercises that cover:
            </p>
            <ul className="list-disc pl-6 text-lg text-aws-dark-gray mb-6 space-y-2">
              <li>Context management and memory modes</li>
              <li>Visual development with screenshots and Plan Mode</li>
              <li>Custom commands for content generation</li>
              <li>MCP (Model Context Protocol) servers for extended capabilities</li>
              <li>GitHub integration and collaborative workflows</li>
              <li>Hooks for automation and validation</li>
              <li>Claude Code SDK integration</li>
            </ul>

            <div className="bg-aws-orange/10 border-l-4 border-aws-orange p-6 rounded-r-lg mt-8">
              <p className="text-lg text-aws-dark italic">
                <strong>Note:</strong> This is a learning project and should not be used for production purposes.
                All content and code examples are for educational demonstration only.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <a
            href="/proxy/3000"
            className="inline-block bg-aws-orange text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#ff8800] transition-all duration-300 no-underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
