import type { Post } from "../types/post";
import { GET, POST } from "../utils/http";

const PostService = {
  async getAllPosts() {
    try {
      const apiResponse = await GET("/posts/all");

      return apiResponse.data as Post[];
    } catch (err) {
      console.error(err);
    }
  },
  async getPost(postId: string) {
    try {
      const apiResponse = await GET(`/posts/${postId}`);

      return apiResponse.data as Post;
    } catch (err) {
      console.error(err);
    }
  },
  async createPost(title: string, content: string, author: string) {
    try {
      const apiResponse = await POST("/posts/create", {
        title: title,
        content: content,
        author: author,
      });

      return apiResponse.data as Post;
    } catch (err) {
      console.error(err);
    }
  },
};

export { PostService };
