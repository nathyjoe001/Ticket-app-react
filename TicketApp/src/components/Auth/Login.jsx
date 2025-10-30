import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveSession } from "../../utils/auth";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Check demo credentials
    if (email === "demo@ticketapp.test" && password === "password123") {
      saveSession(email);
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#531CB3]">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 active:scale-95 transition transform">
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-500">
        Go back to{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
      </p>
    </div>
  );
}
