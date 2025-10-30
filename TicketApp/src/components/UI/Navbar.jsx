import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSession } from "../../utils/auth";
import { Menu, X } from "lucide-react"; // nice responsive icons

export default function Navbar() {
  const [user, setUser] = useState(getSession());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => setUser(getSession());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav className="w-full bg-[#56351E] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-extrabold text-[#E3E4DB]">
          🎟️ TicketApp
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {!user ? (
            <>
              <Link
                to="/auth/login"
                className="text-[#E3E4DB] hover:text-[#58B09C] font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-[#531CB3] text-white px-4 py-2 rounded-lg hover:bg-[#58B09C] transition duration-300 shadow-md"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-[#E3E4DB] hover:text-[#58B09C] font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#E3E4DB] text-[#56351E] px-3 py-1 rounded-lg font-semibold hover:bg-[#58B09C] transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#E3E4DB] focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#56351E] border-t border-[#9F838C] px-6 py-3 space-y-3">
          {!user ? (
            <>
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block text-[#E3E4DB] hover:text-[#58B09C] font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-[#531CB3] text-white px-4 py-2 rounded-lg text-center hover:bg-[#58B09C] transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-[#E3E4DB] hover:text-[#58B09C] font-medium transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full bg-[#E3E4DB] text-[#56351E] px-4 py-2 rounded-lg font-semibold hover:bg-[#58B09C] transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
