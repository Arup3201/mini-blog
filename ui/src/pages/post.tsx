import { useEffect, useState } from "react";
import { useParams } from "react-router";

import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

import { PostService } from "../services/post";
import { CommentService } from "../services/comment";

import CommentCard from "../components/comment-card";
import CreateComment from "../components/create-comment";

import useAuth from "../hooks/use-auth";

const PostPage = () => {
  const { post_id: postId } = useParams();

  const { user } = useAuth();

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
          author: comment.author,
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

  async function handleComment(content: string) {
    try {
      if (!post?.id) {
        console.error("Error: post id missing");
        return;
      }

      if (!user?.username) {
        console.error("Error: user has no username");
        return;
      }

      const comment = await CommentService.createComment(
        post.id,
        content,
        user.username
      );

      if (!comment) {
        console.error("Error: server returned null when creating comment");
        return;
      }

      setComments((snap) => [comment, ...snap]);
    } catch (err) {
      console.error("Error: failed to create comment");
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2 container">
      <h2 className="mb-0">{post.title}</h2>
      <div className="d-flex gap-2 mb-2 text-secondary">
        <span>Author: {post.author}</span>
        <span>|</span>
        <span>Last Updated: {new Date(post.createdAt).toDateString()}</span>
      </div>
      <p>{post.body}</p>
      <div className="pt-2 border-top container">
        <CreateComment onComment={handleComment} />
        <div className="py-4">
          {comments.map((comment) => {
            return <CommentCard comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
