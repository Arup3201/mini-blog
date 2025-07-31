import db from "../db/index";
import { Post } from "../models/post.dt";
import { generateId } from "../utils";

const PostService = {
  getAllPosts: async () => {
    const sql = "SELECT * FROM posts";
    const { rows } = await db.query(sql);

    const posts = rows.map((r) => {
      return {
        id: r.id,
        title: r.title,
        body: r.body,
        author: r.author,
        createdAt: r.created_at,
      } as Post;
    });

    return posts;
  },
  getPost: async (postId: string) => {
    const sql = "SELECT * FROM posts WHERE id=($1)";
    const values = [postId];
    const { rows } = await db.queryWithParams(sql, values);

    const post = {
      id: rows[0].id,
      title: rows[0].title,
      body: rows[0].body,
      author: rows[0].author,
      createdAt: rows[0].created_at,
    } as Post;

    return post;
  },
  createPost: async (title: string, content: string, author: string) => {
    const postId = generateId("POST_");
    const currentTime = new Date();
    let sql =
      "INSERT INTO posts(id, title, body, author, created_at) VALUES($1, $2, $3, $4, $5)";
    let values = [postId, title, content, author, currentTime];
    await db.queryWithParams(sql, values);

    const post = PostService.getPost(postId);
    return post;
  },
};

export { PostService };
