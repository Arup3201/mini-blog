import { Router } from "express";
import { CommentService } from "../services/comment";

const commentRouter = Router();

commentRouter.get("/comments/:post_id/all", async (req, res) => {
  const { post_id: postId } = req.params;
  try {
    const comments = await CommentService.getAllComments(postId);
    res.send({
      status: 200,
      message: "All comments fetched successfully",
      data: comments,
    });
  } catch (err) {
    console.error(`/comments/:post_id/all route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

commentRouter.post("/comments/:post_id/create", async (req, res) => {
  const { post_id: postId } = req.params;
  const { content, author } = req.body;
  try {
    const comment = await CommentService.createComment(postId, content, author);
    res.send({
      status: 200,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (err) {
    console.error(`/comments/:post_id/create route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

export default commentRouter;
