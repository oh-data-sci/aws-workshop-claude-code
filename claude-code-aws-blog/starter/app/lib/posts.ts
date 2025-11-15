import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the structure of post frontmatter
export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
}

// Define the complete post structure
export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

// Path to the posts directory
const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all blog posts from the content/posts directory
 * @returns Array of posts with frontmatter and content
 */
export function getAllPosts(): Post[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // Get all markdown files
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      // Remove file extension to get slug
      const slug = fileName.replace(/\.mdx?$/, '');

      // Read file contents
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse frontmatter and content
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content
      };
    })
    // Filter out unpublished posts
    .filter(post => post.frontmatter.published)
    // Sort by date (newest first)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

/**
 * Get a single post by slug
 * @param slug - The post slug
 * @returns Post object or null if not found
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Try .md first, then .mdx
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        fileContents = fs.readFileSync(mdxPath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from posts
 * @returns Array of category names
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.frontmatter.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags from posts
 * @returns Array of tag names
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(post => post.frontmatter.tags));
  return Array.from(tags).sort();
}
