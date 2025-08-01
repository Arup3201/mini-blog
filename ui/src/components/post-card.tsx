import type { Post } from "../types/post";

interface PostComponent {
  post: Post;
}

const PostCard: React.FC<PostComponent> = ({ post }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-0 card-title">
          <a className="link-underline-info" href={`/posts/${post.id}`}>
            {post.title}
          </a>
        </h5>
        <div className="d-flex gap-2 text-secondary">
          <span>Last Modified: {new Date(post.createdAt).toDateString()}</span>
          <span>|</span>
          <span>By: {post.author}</span>
        </div>
        <p className="mt-1 card-text">{post.body.slice(0, 200) + "..."}</p>
      </div>
    </div>
  );
};

export default PostCard;
