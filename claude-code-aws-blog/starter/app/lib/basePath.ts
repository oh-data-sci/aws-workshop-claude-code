/**
 * Helper function to add the CloudFront proxy path prefix to URLs
 *
 * The CloudFront proxy strips `/proxy/3000/` before forwarding to Next.js,
 * so we need to add it back for client-side navigation.
 *
 * @param path - The internal path (e.g., "/posts/my-post")
 * @returns The full path with proxy prefix (e.g., "/proxy/3000/posts/my-post")
 */
export function withBasePath(path: string): string {
  // In production or when not using the proxy, you can conditionally return just the path
  const basePath = '/proxy/3000';

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
