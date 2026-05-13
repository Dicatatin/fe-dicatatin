import api from '@/services/api';

const TOKEN_KEY = 'dicatatin-token';
const USER_KEY = 'dicatatin-user';

const normalizeUser = (user) => {
  if (!user) return null;

  return {
    ...user,
    user_metadata: {
      full_name: user.name || user.user_metadata?.full_name || user.email,
      avatar_url: user.user_metadata?.avatar_url || null,
    },
  };
};

const persistAuth = ({ token, user }) => {
  const normalizedUser = normalizeUser(user);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));

  return {
    user: normalizedUser,
    session: { access_token: token, user: normalizedUser },
  };
};

/**
 * Sign in with Google OAuth.
 */
export async function signInWithGoogle() {
  throw new Error('Login Google belum tersedia di backend Dicatat.in.');
}

/**
 * Sign in with email/password
 */
export async function signInWithEmail(email, password) {
  const response = await api.post('/auth/login', { email, password });
  return persistAuth(response.data.data);
}

/**
 * Sign up with email/password
 */
export async function signUp(email, password, fullName) {
  const response = await api.post('/auth/register', {
    name: fullName,
    email,
    password,
    password_confirmation: password,
  });
  return persistAuth(response.data.data);
}

/**
 * Sign out
 */
export async function signOutUser() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    }
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Get current session
 */
export async function getSession() {
  const token = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  if (!token || !storedUser) {
    return { user: null, session: null };
  }

  const user = normalizeUser(JSON.parse(storedUser));

  return {
    user,
    session: { access_token: token, user },
  };
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback) {
  const handleStorage = (event) => {
    if (![TOKEN_KEY, USER_KEY].includes(event.key)) return;
    getSession().then(({ session }) => callback('TOKEN_CHANGED', session));
  };

  window.addEventListener('storage', handleStorage);

  return {
    data: {
      subscription: {
        unsubscribe: () => window.removeEventListener('storage', handleStorage),
      },
    },
  };
}
