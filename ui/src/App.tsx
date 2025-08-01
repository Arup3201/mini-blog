import { BrowserRouter as Router, Routes, Route } from "react-router";

import AuthProvider from "./context/auth-provider";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProtectedRoute from "./components/protected-route";
import HomePage from "./pages/home";
import PostPage from "./pages/post";
import CreatePost from "./pages/create-post";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<LoginPage />} path="/login" />

          <Route element={<ProtectedRoute />}>
            <Route element={<HomePage />} path="/" />
            <Route element={<PostPage />} path="/posts/:post_id" />
            <Route element={<CreatePost />} path="/posts/create" />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
