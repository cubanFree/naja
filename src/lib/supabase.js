import { createClient } from "@supabase/supabase-js";

// Creamos la instancia del cliente de supabase.
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)