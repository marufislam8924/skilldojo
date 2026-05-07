import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  let cookieStore;
  try {
    cookieStore = cookies();
  } catch {
    cookieStore = null;
  }

  const options = cookieStore
    ? {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch {
              // Setting cookies can fail in Server Components; middleware can refresh auth.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: "", ...options, maxAge: 0 });
            } catch {
              // Removing cookies can fail in Server Components; middleware can refresh auth.
            }
          },
        },
      }
    : undefined;

  return createServerClient(supabaseUrl, supabaseAnonKey, options);
}
