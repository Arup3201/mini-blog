import { useState, useEffect } from "react";

import { PostService } from "../services/post";
import type { Post } from "../types/post";
import PostCard from "../components/post";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAllPosts() {
    setLoading(true);
    try {
      const posts = await PostService.getAllPosts();

      if (!posts) {
        console.error("Error: server returned null when fetching posts");
        return;
      }

      setPosts(() => {
        return posts.map((post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          author: post.author,
          createdAt: post.createdAt,
        }));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-5 container">
      <h2>All Posts ({posts.length})</h2>
      {posts.length === 0 && (
        <p className="text-center">
          No posts here yet. Become the first to create a post.
        </p>
      )}
      <div className="d-flex flex-column gap-2">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
