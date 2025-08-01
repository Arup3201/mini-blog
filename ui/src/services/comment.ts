import type { Comment } from "../types/comment";
import { GET, POST } from "../utils/http";

const CommentService = {
  async getAllComments(postId: string) {
    try {
      const apiResponse = await GET(`/comments/${postId}/all`);

      return apiResponse.data as Comment[];
    } catch (err) {
      console.error(err);
    }
  },
  async createComment(postId: string, content: string, author: string) {
    try {
      const apiResponse = await POST(`/comments/${postId}/create`, {
        content: content,
        author: author,
      });

      return apiResponse.data as Comment;
    } catch (err) {
      console.error(err);
    }
  },
};

export { CommentService };
