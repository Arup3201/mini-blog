import { Router } from "express";
import { PostService } from "../services/posts";

const postRouter = Router();

postRouter.get("/posts/all", async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    res.send({
      status: 200,
      message: "All posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    console.error(`/posts/all route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

postRouter.get("/posts/:id", async (req, res) => {
  const { id: postId } = req.params;
  try {
    const post = await PostService.getPost(postId);
    res.send({
      status: 200,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (err) {
    console.error(`/posts/:id route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

postRouter.post("/posts/create", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const post = await PostService.createPost(title, content, author);
    res.send({
      status: 200,
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    console.error(`/posts/create route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

export default postRouter;