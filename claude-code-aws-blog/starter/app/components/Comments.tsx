/**
 * Comments Component
 *
 * Server-side rendered comments section for blog posts.
 * This is a demo/mock implementation for training purposes.
 * Comments are static and pre-defined - no actual form submission.
 */

interface Comment {
  id: string;
  author: string;
  email: string;
  date: string;
  message: string;
}

interface CommentsProps {
  postSlug: string;
}

// Mock comment data for demonstration
// In a real implementation, this would come from a database or API
const mockComments: Record<string, Comment[]> = {
  'getting-started-claude-code-aws': [
    {
      id: '1',
      author: 'Alex Thompson',
      email: 'alex@example.com',
      date: '2025-10-23T10:30:00Z',
      message: 'Great introduction! The setup instructions were clear and easy to follow. Got Claude Code running with Bedrock in under 30 minutes.'
    },
    {
      id: '2',
      author: 'Maria Garcia',
      email: 'maria@example.com',
      date: '2025-10-24T14:15:00Z',
      message: 'Very helpful guide. Would love to see more examples of advanced use cases with Claude Code and AWS services.'
    }
  ],
  'building-custom-mcp-servers': [
    {
      id: '3',
      author: 'David Chen',
      email: 'david@example.com',
      date: '2025-10-21T09:00:00Z',
      message: 'This is exactly what I was looking for! The MCP server architecture makes so much sense now. Already started building a custom server for our internal tools.'
    }
  ],
  'aws-bedrock-integration-patterns': [
    {
      id: '4',
      author: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2025-10-19T16:45:00Z',
      message: 'The integration patterns section is gold. Using the circuit breaker pattern saved us from rate limit issues in production.'
    },
    {
      id: '5',
      author: 'James Wilson',
      email: 'james@example.com',
      date: '2025-10-20T11:20:00Z',
      message: 'Excellent deep dive into production patterns. Would appreciate more content on cost optimization strategies.'
    }
  ],
  '2025-11-14-bedrock-fundamentals': [
    {
      id: '6',
      author: 'Emily Rodriguez',
      email: 'emily@example.com',
      date: '2025-11-15T08:30:00Z',
      message: 'Comprehensive guide! The error handling section was particularly useful. This should be required reading for anyone starting with Bedrock.'
    }
  ]
};

export default function Comments({ postSlug }: CommentsProps) {
  const comments = mockComments[postSlug] || [];

  return (
    <section className="mt-16 border-t-2 border-aws-light-gray pt-12">
      {/* Comments Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-2">
          Comments ({comments.length})
        </h2>
        <p className="text-aws-dark-gray">
          Join the discussion and share your thoughts on this post.
        </p>
      </div>

      {/* Comment Form (Demo Only - Non-functional) */}
      <div className="bg-aws-light-gray/50 rounded-2xl p-8 mb-12 border-2 border-aws-light-gray">
        <h3 className="text-xl font-bold text-aws-dark mb-6">Leave a Comment</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-aws-dark mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border-2 border-aws-light-gray focus:border-aws-orange focus:outline-none transition-colors bg-white"
                placeholder="Your name"
                disabled
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-aws-dark mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border-2 border-aws-light-gray focus:border-aws-orange focus:outline-none transition-colors bg-white"
                placeholder="your@email.com"
                disabled
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-aws-dark mb-2">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-aws-light-gray focus:border-aws-orange focus:outline-none transition-colors bg-white resize-none"
              placeholder="Share your thoughts..."
              disabled
            />
          </div>
          <div className="flex items-start gap-3 bg-aws-orange/10 p-4 rounded-lg border-l-4 border-aws-orange">
            <span className="text-2xl">ℹ️</span>
            <p className="text-sm text-aws-dark-gray">
              <strong className="text-aws-dark">Demo Mode:</strong> This is a demonstration comment form for training purposes.
              In a production implementation, this would be connected to a backend API for real comment submission and moderation.
            </p>
          </div>
          <button
            type="button"
            className="bg-aws-light-gray text-aws-dark-gray px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
            disabled
          >
            Submit Comment (Demo)
          </button>
        </div>
      </div>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="bg-white rounded-2xl p-6 border-2 border-aws-light-gray shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-aws-orange/20 flex items-center justify-center">
                    <span className="text-aws-orange font-bold text-lg">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {/* Author Info */}
                  <div>
                    <h4 className="font-bold text-aws-dark">{comment.author}</h4>
                    <time className="text-sm text-aws-dark-gray">
                      {new Date(comment.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </div>
                </div>
              </div>

              {/* Comment Message */}
              <p className="text-aws-dark-gray leading-relaxed pl-15">
                {comment.message}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-aws-light-gray/30 rounded-2xl">
          <p className="text-aws-dark-gray text-lg mb-2">No comments yet</p>
          <p className="text-aws-dark-gray text-sm">Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  );
}
