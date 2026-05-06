import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      session: null,
      isLoading: true,
      isDyslexiaMode: false,

      // Actions
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      
      setDyslexiaMode: (enabled) => {
        set({ isDyslexiaMode: enabled });
        if (enabled) {
          document.body.classList.add('dyslexia-mode');
        } else {
          document.body.classList.remove('dyslexia-mode');
        }
      },

      initDyslexiaMode: () => {
        const { isDyslexiaMode } = get();
        if (isDyslexiaMode) {
          document.body.classList.add('dyslexia-mode');
        }
      },

      signOut: () => {
        set({ user: null, session: null });
      },

      isAuthenticated: () => {
        const { user, session } = get();
        return !!(user && session);
      },
    }),
    {
      name: 'dicatatin-auth',
      partialize: (state) => ({
        isDyslexiaMode: state.isDyslexiaMode,
      }),
    }
  )
);

export default useAuthStore;
