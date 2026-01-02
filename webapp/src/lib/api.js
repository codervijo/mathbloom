// Centralized API helpers and base URL for the webapp.
// Use `VITE_API_BASE` in your .env to change the server base for all requests.

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

const stripTrailing = (s) => s.replace(/\/$/, '');
const ensureLeading = (p) => (p.startsWith('/') ? p : `/${p}`);

export const buildUrl = (path) => `${stripTrailing(API_BASE)}${ensureLeading(path)}`;

export const getJson = async (path, fetchOptions = {}) => {
  const res = await fetch(buildUrl(path), { method: 'GET', ...fetchOptions });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export const postJson = async (path, body = {}, fetchOptions = {}) => {
  const res = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...fetchOptions,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export default {
  API_BASE,
  buildUrl,
  getJson,
  postJson,
};
