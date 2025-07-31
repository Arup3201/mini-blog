import { BrowserRouter as Router, Routes, Route } from "react-router";

import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </Router>
  );
}

export default App;
