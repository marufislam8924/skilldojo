import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  let cookieStore = null;
  try {
    cookieStore = cookies();
  } catch {
    cookieStore = null;
  }

  const options = cookieStore
    ? {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                // cookieStore.set supports (name, value, options) in this runtime
                // or an object — either form is fine depending on Next.js version
                // so we try the common (name, value, options) signature
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore cookie errors in Server Components
            }
          },
        },
      }
    : undefined;

  return createServerClient(supabaseUrl, supabaseAnonKey, options);
}
