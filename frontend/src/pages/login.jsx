import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("User ID and Password are required");
      return;
    }
    setError("");
    login(formData);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?work,focus,productivity')`,
      }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-70"></div>

      <div className="relative w-full max-w-md p-8 shadow-lg bg-white bg-opacity-95 rounded-lg">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Welcome Back! 👋
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-1">User ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition flex items-center justify-center"
            disabled={isLoggingIn}
          >
            {isLoggingIn && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
            {isLoggingIn ? "Signing In..." : "Log In"}
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
