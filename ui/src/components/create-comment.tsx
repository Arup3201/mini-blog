interface CreateCommentComponent {
  onComment(_: string): Promise<void>;
}

const CreateComment: React.FC<CreateCommentComponent> = ({ onComment }) => {
  async function handlePostComment(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    await onComment(data.comment as string);
  }

  return (
    <div className="">
      <h4>Post a comment</h4>
      <form onSubmit={handlePostComment}>
        <div className="mb-2">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea className="form-control" id="comment" name="comment" />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
