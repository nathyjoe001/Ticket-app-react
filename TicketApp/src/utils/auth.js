const SESSION_KEY = "ticketapp_session";

export function saveSession(user) {
  const data = {
    user,
    token: Math.random().toString(36).substring(2),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24h expiry
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  const session = JSON.parse(data);
  if (Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return !!getSession();
}
