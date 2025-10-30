export default function TicketCard({ ticket, onEdit, onDelete }) {
  // Status color mapping according to project design
  const colorMap = {
    open: "bg-[#D1F0D7] text-[#0F7C3F]",          // green tone
    in_progress: "bg-[#FFF3D1] text-[#B77C0F]",   // amber/yellow tone
    closed: "bg-[#E5E5E5] text-[#4A4A4A]",        // gray tone
  };

  // Format status nicely: replace underscores and capitalize words
  const formattedStatus = ticket.status
    .replace("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-lg text-[#56351E]">{ticket.title}</h4>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${colorMap[ticket.status]}`}
        >
          {formattedStatus}
        </span>
      </div>
      
      {ticket.description && (
        <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(ticket)}
          className="bg-[#FFB74D] text-white px-4 py-2 rounded-lg hover:bg-[#FFA726] transition duration-300 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(ticket)}
          className="bg-[#E57373] text-white px-4 py-2 rounded-lg hover:bg-[#EF5350] transition duration-300 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
