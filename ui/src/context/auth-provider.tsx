import { createContext, useEffect, useState } from "react";

import { UserService } from "../services/user";
import type { User } from "../types/user";

const AuthContext = createContext({
  loading: true,
  isAuthenticated: false,
  user: {} as User | undefined,
  login: async (_: string, __: string) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && Object.keys(user).length > 0) {
      setUser(user);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await UserService.login(username, password);

      if (!data) {
        throw Error("User not found in the response");
      }

      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        createdAt: data.createdAt,
      };
      setUser(user);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
    } catch (err) {
      console.error("Login failed with error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const ctxValue = {
    loading: loading,
    isAuthenticated: isAuthenticated,
    user: user,
    login: login,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
