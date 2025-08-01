import { useNavigate } from "react-router";

import useAuth from "../hooks/use-auth";
import { PostService } from "../services/post";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePost: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    if (!user?.id) {
      console.error("Error: User information missing");
      return;
    }

    try {
      const post = await PostService.createPost(
        data.title as string,
        data.content as string,
        user.id as string
      );

      if (!post) {
        console.error("Error: server returned null while creating post");
        return;
      }

      navigate(`/posts/${post.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-5 container">
      <h5>Create Post</h5>
      <form onSubmit={handlePost}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" name="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea className="form-control" name="content" />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Post
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
