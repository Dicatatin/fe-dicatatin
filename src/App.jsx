import '@/styles/index.css';
import '@/styles/animations.css';
import '@xyflow/react/dist/style.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import HomePage from '@/pages/HomePage';
import WorkspacePage from '@/pages/WorkspacePage';
import CMSPage from '@/pages/CMSPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Auth
import AuthGuard from '@/features/auth/AuthGuard';
import AuthCallback from '@/features/auth/AuthCallback';

export default function App() {
  const { initDyslexiaMode } = useAuthStore();

  useEffect(() => {
    initDyslexiaMode();
  }, [initDyslexiaMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected routes */}
        <Route path="/home" element={
          <AuthGuard requireRole="user"><HomePage /></AuthGuard>
        } />
        <Route path="/workspace/:id" element={
          <AuthGuard requireRole="user"><WorkspacePage /></AuthGuard>
        } />
        <Route path="/cms" element={
          <AuthGuard requireRole="admin"><CMSPage /></AuthGuard>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
