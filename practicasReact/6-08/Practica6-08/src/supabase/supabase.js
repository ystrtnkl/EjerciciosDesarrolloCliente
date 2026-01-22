import { createClient } from "@supabase/supabase-js"; //CUIDADO: se está usando una versión específica del SDK, no la más nueva.

const URL_APP = "http://localhost:5173";

const supabaseConexion = createClient(
  "https://ghqmsuesddsysrdqxerv.supabase.co",
  "sb_publishable_-Vix_KFqO4jlKAHjqpR7TQ_XyQjgFgc"
);

//En caso de querer usar el .env en lugar de datos hardcodeados.
//const URL_APP = import.meta.env.VITE_APP_URL;
/*const supabaseConexion = createClient(
    import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY
);*/

export { supabaseConexion, URL_APP };