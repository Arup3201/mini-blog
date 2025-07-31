import { GET, POST } from "../utils/http";
import type {User} from '../types/user';

const UserService = {
  async register(username: string, email: string, password: string) {
    try {
      const apiResponse = await POST("/register", {
        username: username,
        email: email,
        password: password,
      });

      return apiResponse.message;
    } catch (err) {
      console.error(err);
    }
  },
  async login(username: string, password: string) {
    try {
      const apiResponse = await POST("/login", {
        username: username,
        password: password,
      });

      return apiResponse.data as User;
    } catch (err) {
      console.error(err);
    }
  },
  async getUser(userId: string) {
    try {
      const apiResponse = await GET(`/users/${userId}`);

      return apiResponse.data as User;
    } catch (err) {
      console.error(err);
    }
  },
};

export { UserService };
