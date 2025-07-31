import db from "../db/index";
import { UserComment } from "../models/comment.dt";
import { generateId } from "../utils";

const CommentService = {
  getAllComments: async (postId: string) => {
    const sql = "SELECT * FROM comments WHERE post=($1)";
    const values = [postId];
    const { rows } = await db.queryWithParams(sql, values);

    const comments = rows.map((r) => {
      return {
        id: r.id,
        body: r.body,
        author: r.author,
        post: r.post,
        createdAt: r.created_at,
      } as UserComment;
    });

    return comments;
  },
  getComment: async (commentId: string, postId: string) => {
    const sql = "SELECT * FROM comments WHERE id=($1) AND post=($2)";
    const values = [commentId, postId];
    const { rows } = await db.queryWithParams(sql, values);

    const comment = {
      id: rows[0].id,
      body: rows[0].body,
      post: rows[0].post,
      author: rows[0].author,
      createdAt: rows[0].created_at,
    } as UserComment;

    return comment;
  },
  createComment: async (postId: string, content: string, author: string) => {
    const commentId = generateId("COMMENT_");
    const currentTime = new Date();
    let sql =
      "INSERT INTO comments(id, body, post, author, created_at) VALUES($1, $2, $3, $4, $5)";
    let values = [commentId, content, postId, author, currentTime];
    await db.queryWithParams(sql, values);

    const comment = CommentService.getComment(commentId, postId);
    return comment;
  },
};

export { CommentService };
