import { createClient } from "@supabase/supabase-js";

console.log("URL =", process.env.SUPABASE_URL);
console.log(
  "KEY EXISTS =",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);