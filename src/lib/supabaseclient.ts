import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Read env vars (may be undefined during build or on contributor machines)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If env vars are present, create a real client. Otherwise export a safe stub
// so build/prerendering doesn't crash. At runtime, on a properly configured
// deployment these env vars should be set and a real client will be used.
let supabase: SupabaseClient | any = null;

if (supabaseUrl && supabaseAnonKey) {
	supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
	// Minimal stub covering the APIs used in the codebase to avoid runtime errors
	supabase = {
		auth: {
			getUser: async () => ({ data: { user: null } }),
			onAuthStateChange: () => ({ subscription: { unsubscribe: () => {} } }),
		},
		storage: {
			from: (_bucket: string) => ({
				upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
				getPublicUrl: (_path: string) => ({ publicUrl: '' }),
			}),
		},
		from: (_table: string) => ({
			insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
		}),
	};
}

export { supabase };
