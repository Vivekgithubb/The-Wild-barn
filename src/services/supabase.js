// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);
// export default supabase;
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kwetpmhemedhdffnfcij.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZXRwbWhlbWVkaGRmZm5mY2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MzczNjEsImV4cCI6MjA2NTQxMzM2MX0.4oyOnyMPFsUggDObYwf5tv9_m1jXf-hOeADz7qQ6pJ8";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl };
export default supabase;
