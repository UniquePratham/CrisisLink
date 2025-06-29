import { createClient } from '@supabase/supabase-js';

// Use demo/placeholder values that won't cause network errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Create a mock client if using demo values
const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (isDemoMode) {
  // Create a mock Supabase client for demo purposes
  supabase = {
    auth: {
      signInWithPassword: async () => {
        throw new Error('Demo mode: Please use Demo Login button');
      },
      signOut: async () => {
        return { error: null };
      },
      onAuthStateChange: (callback: any) => {
        // Return a mock subscription
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        };
      }
    }
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };