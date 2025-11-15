/**
 * Comments Utility
 *
 * Helper functions for comment counts (demo/mock implementation)
 */

// Mock comment counts for demonstration
const mockCommentCounts: Record<string, number> = {
  'getting-started-claude-code-aws': 2,
  'building-custom-mcp-servers': 1,
  'aws-bedrock-integration-patterns': 2,
  '2025-11-14-bedrock-fundamentals': 1,
  '2025-11-14-mcp-servers-ecs': 0,
  '2025-11-14-the-role-of-the-data-function-inside-businesses': 0
};

/**
 * Get comment count for a post
 * @param postSlug - The post slug
 * @returns Number of comments
 */
export function getCommentCount(postSlug: string): number {
  return mockCommentCounts[postSlug] || 0;
}
