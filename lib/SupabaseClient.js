// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uwixomogyvygqonywfqz.supabase.co"; // Your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aXhvbW9neXZ5Z3Fvbnl3ZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MTgzNjQsImV4cCI6MjAxNTk5NDM2NH0.hAb1Q6wiv4JbAPLprFAeopOa3-Eizf9w8Hasg7JCmvo"; // Your Supabase Anon Key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
