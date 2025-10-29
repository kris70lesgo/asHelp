// src/lib/supabase.ts (or wherever this file is)

// TEMPORARILY DISABLED FOR LOCAL DEVELOPMENT
// This allows us to work with mock data without needing Supabase credentials
// TODO: Re-enable when environment variables are properly set up

/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
*/

// Mock export for development - prevents errors when Supabase is imported elsewhere
export const supabase = null;