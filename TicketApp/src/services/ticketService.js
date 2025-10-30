const STORAGE_KEY = "ticketapp_tickets";

function getAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveAll(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export const ticketService = {
  list: () => Promise.resolve(getAll()),

  create: (data) => {
    const all = getAll();
    const newTicket = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    all.unshift(newTicket);
    saveAll(all);
    return Promise.resolve(newTicket);
  },

  update: (id, updates) => {
    const all = getAll();
    const index = all.findIndex(t => t.id === id);
    if (index === -1) return Promise.reject("Ticket not found");
    all[index] = { ...all[index], ...updates };
    saveAll(all);
    return Promise.resolve(all[index]);
  },

  remove: (id) => {
    const all = getAll().filter(t => t.id !== id);
    saveAll(all);
    return Promise.resolve();
  },
};
