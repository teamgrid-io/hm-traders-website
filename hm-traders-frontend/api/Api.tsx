// Use environment variable or fallback to localhost for development
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const API_URL = `https://headlesswp.teamgrid.co.in/wp-json/wp/v2`;


// ── Endpoints ──────────────────────────────────────
export const ENDPOINTS = {
  footer:      `${API_URL}/globals/footer`,
}
