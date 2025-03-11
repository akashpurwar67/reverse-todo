import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ListTodo, Clock, TrendingUp } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const navigate = useNavigate();
  const {authUser} = useAuthStore();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Reverse To-Do List</h1>
        <p className="mt-4 text-lg md:text-xl">Track what you have accomplished, not what you need to do!</p>
        <div className="mt-6 space-x-4">
          <Link to="/task" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200">
            Get Started
          </Link>
          {!authUser && <Link to="/login" className="border-2 border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600">
            Login
          </Link>}
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Why Use Reverse To-Do?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <CheckCircle size={40} className="text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Task Completion Tracking</h3>
            <p className="text-gray-600 mt-2">Log what you have accomplished instead of planning ahead.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock size={40} className="text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Daily Progress Analysis</h3>
            <p className="text-gray-600 mt-2">Keep track of your productivity with daily streaks and stats.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <TrendingUp size={40} className="text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Motivation & Streaks</h3>
            <p className="text-gray-600 mt-2">Stay motivated by tracking your progress over time.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center">How It Works?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10 text-center">
          <div>
            <ListTodo size={40} className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Step 1: Add Completed Tasks</h3>
            <p className="mt-2">Log what you’ve done instead of planning tasks.</p>
          </div>
          <div>
            <CheckCircle size={40} className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Step 2: Track Your Progress</h3>
            <p className="mt-2">Analyze your daily achievements and streaks.</p>
          </div>
          <div>
            <TrendingUp size={40} className="mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Step 3: Stay Motivated</h3>
            <p className="mt-2">Build productivity habits with detailed insights.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Reverse To-Do List | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
