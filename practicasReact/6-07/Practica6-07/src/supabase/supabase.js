import { createClient } from "@supabase/supabase-js";

const URL_APP = "http://localhost:5173/";

const supabaseConexion = createClient(
  "https://hlasxrarxhwimmekwjqr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYXN4cmFyeGh3aW1tZWt3anFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0Mjk4MDcsImV4cCI6MjA1MDAwNTgwN30.G9FWnt-6gvH7PPzMb_i0vT55L8cNMZ6568V7RxqB-Xc"
);

/*const supabaseConexion = createClient(
    import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_KEY
);*/

export { supabaseConexion, URL_APP };