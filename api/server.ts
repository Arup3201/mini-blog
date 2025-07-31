import express from "express";
import users from "./routes/users";
import posts from './routes/posts';
import comments from './routes/comments';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(users);
app.use(posts);
app.use(comments);

app.get("/health", (_, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`API is listening at ${port} port.`);
});
