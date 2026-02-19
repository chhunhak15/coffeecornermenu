import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cglevmureasunaepnfjv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbGV2bXVyZWFzdW5hZXBuZmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MTExNDMsImV4cCI6MjA4NzA4NzE0M30.WqF1SPoWsBM2ZmvKCkyH2SZNKvB35g4YwFatzDCOKJM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
