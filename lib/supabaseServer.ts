import { createServerClient } from "@supabase/ssr";
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
    cookieStore = undefined;
  }

  const options = {
    cookies: {
      getAll() {
        try {
          return cookieStore?.getAll() ?? [];
        } catch {
          return [];
        }
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        if (!cookieStore) return;
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Ignore cookie errors in Server Components
        }
      },
    },
  };

  return createServerClient(supabaseUrl, supabaseAnonKey, options);
}
