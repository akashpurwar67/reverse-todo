import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react"; // Icons
import { useAuthStore } from "../store/useAuthStore"; // Authentication store

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-4 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold text-white hover:text-gray-300 transition tracking-wide">
                    Reverse To-Do
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 text-lg font-medium">
                    <Link to="/" className="hover:text-gray-300 transition">Home</Link>
                    {authUser && <Link to="/task" className="hover:text-gray-300 transition">Tasks</Link>}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
                </button>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full bg-blue-900 md:hidden flex flex-col items-center space-y-4 py-4 shadow-md">
                        <Link to="/" className="text-white hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Home</Link>
                        {authUser && <Link to="/task" className="text-white hover:text-gray-300 transition" onClick={() => setIsOpen(false)}>Tasks</Link>}
                    </div>
                )}

                {/* Auth Section */}
                <div className="hidden md:flex items-center space-x-4">
                    {authUser ? (
                        // User Icon with Dropdown
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 transition"
                            >
                                <User size={24} />
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden">
                                    <Link
                                        to="/report"
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        See Report
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Login Button
                        <button
                            onClick={handleLogin}
                            className="px-4 py-2 text-sm font-medium bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
