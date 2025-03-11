import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import HomePage from "./pages/home";
import ReverseTodo from "./pages/task";
import Navbar from "./component/navbar";
import Report from "./pages/report";

function App() {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>

      <Router>
        <Navbar />
        <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task" element={!authUser ? <Login /> : <ReverseTodo />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path="report" element={!authUser ? <Login /> : <Report />} />
        </Routes>
        </div>
        
      </Router>
    </div>

  );
}

export default App;
