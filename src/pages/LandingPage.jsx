import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/features/landing/HeroSection';
import ProblemSolution from '@/features/landing/ProblemSolution';
import MethodShowcase from '@/features/landing/MethodShowcase';
import HowItWorks from '@/features/landing/HowItWorks';
import AccessibilitySpotlight from '@/features/landing/AccessibilitySpotlight';
import TrustSection from '@/features/landing/TrustSection';
import CTASection from '@/features/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
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
      <footer className="border-t border-border py-12 mt-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl font-bold tracking-tighter">
                DICATAT<span className="text-primary">.IN</span>
              </span>
              <p className="text-sm text-muted-foreground">Elevating the Way You Learn, Inclusively.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex gap-6 text-sm font-medium text-muted-foreground mb-2">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </div>
              <p className="text-xs text-muted-foreground opacity-60">© 2026 DICATAT.IN — All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

