import { useNavigate } from "react-router";

import useAuth from "../hooks/use-auth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    await login(data.username as string, data.password as string);
    navigate("/");
  };

  return (
    <div className="mx-auto mt-5 w-25 card">
      <div className="card-body">
        <h5 className="card-title">Login to mBlog</h5>
        <p className="card-text">
          Welcome back to mBlog, login to resume your journey.
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="mt-3">
          Don't have an account yet? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
