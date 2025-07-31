import express from "express";
import users from "./routes/users";
import posts from './routes/posts';
import comments from './routes/comments';
import env from './env';

const app = express();
const port = env.PORT || 8080;

app.use(express.json());
app.use("/api/v1", users);
app.use("/api/v1", posts);
app.use("/api/v1", comments);

app.get("/api/v1/health", (_, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`API is listening at ${port} port.`);
});
