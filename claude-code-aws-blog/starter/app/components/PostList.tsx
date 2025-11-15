import { Post } from '@/app/lib/posts';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-aws-dark-gray text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard
          key={post.slug}
          post={post}
          featured={index === 4} // Feature the 5th post (Best Practices) as shown in the reference
        />
      ))}
    </div>
  );
}
