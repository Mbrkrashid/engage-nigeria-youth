// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xxohoauvmuiyushsbugb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4b2hvYXV2bXVpeXVzaHNidWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTUzMTksImV4cCI6MjA1MjQzMTMxOX0.A2RPR9-vv9FIyh7RNwfBGpKFEaYzNdWIZwYFIBFT570";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);