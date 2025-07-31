import { useContext } from "react";

import { AuthContext } from "../context/auth-provider";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;