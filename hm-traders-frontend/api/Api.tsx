// Use environment variable or fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const API_URL = `${API_BASE_URL}/api`;


// ── Endpoints ──────────────────────────────────────
export const ENDPOINTS = {
  footer:      `${API_URL}/globals/footer`,
}
