import { useState, useEffect } from "react";

export default function TicketForm({ onSave, editing }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("open");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setStatus(editing.status);
      setDescription(editing.description || "");
    } else {
      setTitle("");
      setStatus("open");
      setDescription("");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    if (!["open", "in_progress", "closed"].includes(status))
      return alert("Invalid status");
    onSave({ title, status, description });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
      <h3 className="font-bold text-xl mb-4 text-[#56351E]">{editing ? "Edit Ticket" : "New Ticket"}</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#531CB3]"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#531CB3]"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#531CB3] resize-none"
        rows={4}
      />

      <button
        type="submit"
        className="bg-[#531CB3] hover:bg-[#58B09C] text-white w-full py-3 rounded-lg font-medium transition duration-300"
      >
        {editing ? "Update" : "Create"}
      </button>
    </form>
  );
}
