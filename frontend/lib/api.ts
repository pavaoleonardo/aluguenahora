import axios from 'axios';

// NEXT_PUBLIC_* is inlined at build time. A production build made without it would ship
// a bundle calling localhost:1337, which shows up as "the catalogue is empty" instead of
// an error. This module is imported during prerender, so throwing here fails `next build`
// on the VPS rather than shipping a bundle that points at the wrong host.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL && process.env.NODE_ENV === 'production') {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not set. A production build must inline the public API host ' +
      '(see frontend/.env.local); refusing to fall back to http://localhost:1337.'
  );
}

export const api = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:1337', // Local dev fallback
});
