import db from "../db";
import { User } from "../models/user.dt";
import { generateId } from "../utils";

const UserService = {
  register: async (username: string, email: string, password: string) => {
    if (!username || !email || !password) {
      throw Error(
        "UserService register: username, email or password can't be empty"
      );
    }

    const userId = generateId("USER_");
    const currentTime = new Date();
    const sql = "INSERT INTO users(id, username, email, password, created_at) VALUES($1, $2, $3, $4, $5)";
    const values = [userId, username, email, password, currentTime];

    await db.query(sql, values);
  },
  login: async (username: string, password: string) => {
    if (!username || !password) {
      throw Error("Userservice login: username or password can't be empty");
    }

    const sql =
      "SELECT * FROM users WHERE username=($1)";
    const values = [username];
    const { rows } = await db.query(sql, values);
    if (rows.length === 0) {
      throw Error("UserService login: username is not found");
    }

    if (rows[0].password !== password) {
      throw Error("UserService login: password is incorrect");
    }

    const user = {
      id: rows[0].id,
      username: rows[0].username,
      email: rows[0].email,
      createdAt: rows[0].created_at,
    } as User;

    return user;
  },
  getUser: async (userId: string) => {
    if (!userId) {
      throw Error("UserService getUser: user_id can't be null");
    }

    const sql =
      "SELECT id, username, email, created_at FROM users WHERE id=($1)";
    const values = [userId];
    const { rows } = await db.query(sql, values);
    if (rows.length === 0) {
      throw Error(`UserService getUser: user with id ${userId} not found`);
    }

    const user = {
      id: rows[0].id,
      username: rows[0].username,
      email: rows[0].email,
      createdAt: rows[0].created_at,
    } as User;

    return user;
  },
};

export { UserService };
