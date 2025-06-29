import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user for demo
const DEMO_USER = {
  id: 'demo-user-123',
  email: 'admin@crisislink.gov',
  user_metadata: {
    full_name: 'Emergency Coordinator'
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  aud: 'authenticated',
  role: 'authenticated'
} as User;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem('crisislink_demo_user');
    if (demoUser === 'true') {
      setUser(DEMO_USER);
    }
    setLoading(false);

    // Listen for auth changes (for real Supabase integration)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else if (!localStorage.getItem('crisislink_demo_user')) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    localStorage.removeItem('crisislink_demo_user');
    setUser(null);
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Supabase signout error:', error);
  };

  const demoLogin = () => {
    localStorage.setItem('crisislink_demo_user', 'true');
    setUser(DEMO_USER);
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    demoLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};