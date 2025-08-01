import { useState, useEffect } from "react";

import { PostService } from "../services/post";
import type { Post } from "../types/post";

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
    <div className="mt-5 container">
      {posts.length === 0 ? (
        <p className="text-center">
          No posts here yet. Become the first to create a post.
        </p>
      ) : (
        posts.map((post) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body.slice(0, 30) + "..."}</p>
              <a href={`/posts/${post.id}`} className="btn btn-primary">
                Click here to continue reading
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
