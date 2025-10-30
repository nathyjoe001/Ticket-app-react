import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TicketForm from "../Tickets/TicketForm";
import TicketCard from "../Tickets/TicketCard";
import { ticketService } from "../../services/ticketService.js";
import { clearSession } from "../../utils/auth";

export default function TicketList() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadTickets = () => {
    ticketService.list().then(setTickets);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleSave = (data) => {
    if (editing) {
      ticketService.update(editing.id, data).then(() => {
        toast.success("Ticket updated!");
        setEditing(null);
        setShowForm(false);
        loadTickets();
      });
    } else {
      ticketService.create(data).then(() => {
        toast.success("Ticket created!");
        setShowForm(false);
        loadTickets();
      });
    }
  };

  const handleDelete = (ticket) => {
    if (window.confirm("Delete this ticket?")) {
      ticketService.remove(ticket.id).then(() => {
        toast.info("Ticket deleted");
        loadTickets();
      });
    }
  };

  const handleLogout = () => {
    clearSession();
    navigate("/auth/login");
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleCreateClick = () => {
    setEditing(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Tickets</h2>
        <div className="flex gap-3">
          <button
            onClick={handleCreateClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Ticket
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Professional Summary Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">Ticket Management Overview</h3>
        <p className="text-gray-700 mb-3">
          Welcome to your <strong>Ticket Management Dashboard</strong>. Here, you can efficiently
          create, view, edit, and delete tickets. Each ticket has a <strong>title</strong>, 
          <strong>status</strong>, and an optional <strong>description</strong> that provides 
          additional context.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Status Indicators:</strong>
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 align-middle"></span>
            <strong>Open:</strong> New ticket that requires attention.
          </li>
          <li>
            <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2 align-middle"></span>
            <strong>In Progress:</strong> Ticket is currently being worked on.
          </li>
          <li>
            <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2 align-middle"></span>
            <strong>Closed:</strong> Ticket has been resolved and no further action is needed.
          </li>
        </ul>
        <p className="text-gray-700 mt-3">
          Click <span className="font-semibold">Create Ticket</span>  Ticket above to add a new ticket, or select an existing ticket to edit or delete it. 
         This dashboard allows you to track all tickets efficiently, 
         ensuring no task or issue is overlooked. Status indicators show whether a ticket is Open, 
         In Progress, or Closed, helping you quickly prioritize work.
        </p>
      </div>

      {/* Ticket Form */}
      {showForm && (
        <div className="mb-6">
          <TicketForm onSave={handleSave} editing={editing} />
          <button
            onClick={handleCancel}
            className="mt-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Ticket Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {tickets.length ? (
          tickets.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              onEdit={(ticket) => {
                setEditing(ticket);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-2 text-center">No tickets yet</p>
        )}
      </div>
    </div>
  );
}
