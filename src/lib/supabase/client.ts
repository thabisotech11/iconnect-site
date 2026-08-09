import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components. Safe to call repeatedly —
 * each call returns a new lightweight client bound to the same project.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Until those are set this throws, which is intentional: every call site
 * in this codebase (see mock-data.ts) uses mock data instead by default,
 * so nothing accidentally ships pointing at an empty database.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local — see README."
    );
  }

  return createBrowserClient(url, anonKey);
}
