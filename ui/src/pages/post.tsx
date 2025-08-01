import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PostService } from "../services/post";
import type { Post } from "../types/post";
import { CommentService } from "../services/comment";
import type { Comment } from "../types/comment";

const PostPage = () => {
  const { post_id: postId } = useParams();

  const [post, setPost] = useState<Post | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  async function getPost(id: string) {
    setLoading(true);
    try {
      const post = await PostService.getPost(id);

      if (!post) {
        console.error("Error: post has no content");
        return;
      }

      setPost({
        id: post.id,
        title: post.title,
        body: post.body,
        author: post.author,
        createdAt: post.createdAt,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getComments(id: string) {
    setLoading(true);
    try {
      const comments = await CommentService.getAllComments(id);

      if (!comments) {
        console.error("Error: post has no content");
        return;
      }

      setComments(() => {
        return comments.map((comment) => ({
          id: comment.id,
          body: comment.body,
          author: comment.body,
          post: comment.post,
          createdAt: comment.createdAt,
        }));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!postId) return;

    getPost(postId);
    getComments(postId);
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return (
      <p className="mt-5 text-center container">
        This post has been deleted or moved to some other location.
      </p>
    );
  }

  return (
    <div className="mt-2 container">
      <h2>{post.title}</h2>
      <span>{post.author}</span>
      <span>{new Date(post.createdAt).toDateString()}</span>
      <p>{post.body}</p>
      <div className="container">
        {comments.map((comment) => {
          return (
            <div className="">
              <p>{comment.body}</p>
              <span>{comment.author}</span>
              <span>{new Date(comment.createdAt).toDateString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostPage;
