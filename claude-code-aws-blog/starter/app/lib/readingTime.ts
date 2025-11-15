/**
 * Reading Time Calculator
 *
 * Calculates estimated reading time for blog posts based on word count.
 * Uses 200 words per minute as the average reading speed.
 */

/**
 * Calculate reading time in minutes for the given content
 * @param content - The markdown content to analyze
 * @returns Reading time in minutes (minimum 1 minute)
 */
export function calculateReadingTime(content: string): number {
  // Remove code blocks (```...```)
  let text = content.replace(/```[\s\S]*?```/g, '');

  // Remove inline code (`...`)
  text = text.replace(/`[^`]+`/g, '');

  // Remove markdown headings (# ## ### etc.)
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove markdown links but keep the text [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove bold and italic markers (**, *, __, _)
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');

  // Remove HTML tags if any
  text = text.replace(/<[^>]+>/g, '');

  // Remove extra whitespace and newlines
  text = text.replace(/\s+/g, ' ').trim();

  // Count words (split by whitespace)
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

  // Calculate reading time (200 words per minute)
  const minutes = Math.ceil(wordCount / 200);

  // Return minimum of 1 minute
  return Math.max(1, minutes);
}

/**
 * Format reading time as a human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
