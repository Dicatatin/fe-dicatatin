import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import './CTASection.css';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="landing-section cta-section">
      <div className="container">
        <div className="cta-box">
          <div className="cta-bg-glow" />
          <h2 className="cta-title">Mulai Belajar Lebih Cerdas</h2>
          <p className="cta-subtitle">Gratis untuk mahasiswa. Gabung sekarang dan rasakan perbedaannya.</p>
          <Button size="xl" onClick={() => navigate('/signup')}>
            Mulai Sekarang <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
