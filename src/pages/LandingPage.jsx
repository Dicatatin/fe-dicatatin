import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/features/landing/HeroSection';
import ProblemSolution from '@/features/landing/ProblemSolution';
import MethodShowcase from '@/features/landing/MethodShowcase';
import HowItWorks from '@/features/landing/HowItWorks';
import AccessibilitySpotlight from '@/features/landing/AccessibilitySpotlight';
import TrustSection from '@/features/landing/TrustSection';
import CTASection from '@/features/landing/CTASection';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar showAuth={true} />
      <main>
        <HeroSection />
        <ProblemSolution />
        <MethodShowcase />
        <HowItWorks />
        <AccessibilitySpotlight />
        <TrustSection />
        <CTASection />
      </main>
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="navbar-logo">DICATAT<span>.IN</span></span>
              <p className="text-sm text-secondary">Elevating the Way You Learn, Inclusively.</p>
            </div>
            <p className="text-xs text-muted">© 2026 DICATAT.IN — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
