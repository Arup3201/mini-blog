import { useNavigate } from "react-router";

import { UserService } from "../services/user";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      await UserService.register(
        data.username as string,
        data.email as string,
        data.password as string
      );
      navigate("/login");
    } catch (err) {
      console.error("Register failed with error: ", err);
    }
  };

  return (
    <div className="mx-auto mt-5 w-25 card">
      <div className="card-body">
        <h5 className="card-title">Register to mBlog</h5>
        <p className="card-text">
          Start your blogging journey at mBlog by creating an account today.
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <p className="mt-3">
          Already an user at mBlog? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
