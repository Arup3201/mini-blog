import { Router } from "express";
import { UserService } from "../services/user";

const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await UserService.register(username, email, password);
    res.send({
      status: 200,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(`/register route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.login(username, password);
    res.send({
      status: 200,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    console.error(`/register route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

usersRouter.get("/users/:id", async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await UserService.getUser(userId);
    res.send({
      status: 200,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    console.error(`/register route error: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

export default usersRouter;
