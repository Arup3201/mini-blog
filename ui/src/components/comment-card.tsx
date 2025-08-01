import type { Comment } from "../types/comment";

interface CommentCardComponent {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardComponent> = ({ comment }) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#888"
        className="bi bi-person-square"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
      </svg>
      <div className="d-flex flex-column flex-fill gap-2 p-2 border rounded-2">
        <div className="d-flex gap-1">
          <span className="text-body-emphasis">{comment.author}</span>
          <span className="text-secondary">
            • {new Date(comment.createdAt).toDateString()}
          </span>
        </div>
        <p className="fs-5">{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
