import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client (will be null if env vars not properly set)
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Sign in with Google OAuth via Supabase
 */
export async function signInWithGoogle() {
  if (!supabase) {
    console.warn('Supabase not configured. Using mock auth.');
    return mockAuth();
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in with email/password
 */
export async function signInWithEmail(email, password) {
  if (!supabase) {
    console.warn('Supabase not configured. Using mock auth.');
    return mockAuth(email);
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign up with email/password
 */
export async function signUp(email, password, fullName) {
  if (!supabase) {
    console.warn('Supabase not configured. Using mock auth.');
    return mockAuth(email, fullName);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOutUser() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem('dicatatin-token');
  localStorage.removeItem('dicatatin-user');
}

/**
 * Get current session
 */
export async function getSession() {
  if (!supabase) {
    const mockUser = localStorage.getItem('dicatatin-user');
    if (mockUser) {
      return { user: JSON.parse(mockUser), session: { access_token: 'mock-token' } };
    }
    return { user: null, session: null };
  }

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;

  return {
    user: session?.user || null,
    session: session || null,
  };
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };

  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

/**
 * Mock auth for development without Supabase
 */
function mockAuth(email = 'demo@dicatatin.com', fullName = 'Demo User') {
  const mockUser = {
    id: 'mock-user-id',
    email,
    user_metadata: { full_name: fullName, avatar_url: null },
  };
  const mockSession = { access_token: 'mock-token', user: mockUser };

  localStorage.setItem('dicatatin-user', JSON.stringify(mockUser));
  localStorage.setItem('dicatatin-token', 'mock-token');

  return { user: mockUser, session: mockSession };
}
