import express from "express";
import DB from "./db";

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`DB connected: ${JSON.stringify(DB)}`);
  console.log(`API is listening at ${port} port.`);
});
