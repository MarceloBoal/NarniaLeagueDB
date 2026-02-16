import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://sdlfzxmwpwuacmomuekf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkbGZ6eG13cHd1YWNtb211ZWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMTIwNjUsImV4cCI6MjA4NjY4ODA2NX0.42n-jaTnLDhi_oE8MpXL7k5yEJIYifLdl3cTnEZeXoo";

export const supabase = createClient(supabaseUrl, supabaseKey);
