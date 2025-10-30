import { Link, useNavigate } from "react-router-dom";
import { clearSession } from "../../utils/auth";
import { ticketService } from "../../services/ticketService.js";
import { useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });

  useEffect(() => {
    ticketService.list().then((data) => {
      setStats({
        total: data.length,
        open: data.filter((t) => t.status === "open").length,
        closed: data.filter((t) => t.status === "closed").length,
      });
    });
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Add pt-28 to offset fixed navbar height */}
      <div className="max-w-[1440px] mx-auto p-6 pt-28 flex-1">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-lg font-semibold">Total</p>
            <h2 className="text-2xl font-bold">{stats.total}</h2>
          </div>
          <div className="bg-green-100 shadow rounded-lg p-6 text-center">
            <p className="text-lg font-semibold">Open</p>
            <h2 className="text-2xl font-bold">{stats.open}</h2>
          </div>
          <div className="bg-gray-100 shadow rounded-lg p-6 text-center">
            <p className="text-lg font-semibold">Closed</p>
            <h2 className="text-2xl font-bold">{stats.closed}</h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">

          <Link
            to="/tickets"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Manage Tickets
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
