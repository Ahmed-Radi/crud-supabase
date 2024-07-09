
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.REACT_APP_SUPABASE_URL ?? "";
// const supabaseKey = import.meta.env.REACT_APP_SUPABASE_ANON_KEY ?? "";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase = createClient("https://xyixlaeedenimiwrkqjg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5aXhsYWVlZGVuaW1pd3JrcWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NzA2NDgsImV4cCI6MjAzNjA0NjY0OH0.DFCmsPAlWCM50FK5IrkfCT_CJqO3CGkzwNW1wIM_f-8");
