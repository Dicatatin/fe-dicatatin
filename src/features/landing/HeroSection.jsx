import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getHeroSection } from '@/services/cmsService';

export default function HeroSection() {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState({
    titlePrefix: "Ubah Catatan Berantakan Menjadi ",
    titleHighlight: "Pengetahuan Terstruktur",
    titleSuffix: " dalam Hitungan Detik",
    subtitle: "Platform AI yang memahami tulisan tanganmu. Pilih dari 7 metode belajar dan transformasi catatanmu menjadi alat belajar aktif."
  });

  useEffect(() => {
    getHeroSection()
      .then((data) => {
        if (data) {
          setHeroData(data);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat teks hero dari API, menggunakan fallback localStorage/default:', err);
        const saved = localStorage.getItem('dicatatin-hero-text');
        if (saved) {
          try {
            setHeroData(JSON.parse(saved));
          } catch (e) {
            console.error('Error parsing hero text from localStorage', e);
          }
        }
      });
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="hero">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              {heroData.titlePrefix}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-teal-400 bg-clip-text text-transparent">
                {heroData.titleHighlight}
              </span>
              {heroData.titleSuffix}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 mb-16">
              <Button size="xl" onClick={() => navigate('/signup')} className="min-w-[180px] shadow-xl shadow-primary/20">
                Mulai Gratis
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="min-w-[190px]">
                Lihat Cara Kerja
              </Button>
            </div>

            {/* Stats removed as requested */}
          </div>

          {/* Visual preview */}
          <div className="flex-1 relative perspective-1000 hidden lg:block">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Before Card */}
              <div className="absolute top-1/4 left-0 w-64 p-6 rounded-2xl bg-secondary/50 border border-border backdrop-blur-xl shadow-2xl -rotate-12 hover:rotate-0 transition-all duration-500 z-10 group cursor-default">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Sebelum</div>
                <div className="space-y-3">
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-[80%] -rotate-2" />
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-[65%] rotate-1" />
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-[90%] -rotate-1" />
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-[70%] rotate-2" />
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-[40%] -rotate-3" />
                </div>
              </div>

              {/* Sparkle transition */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-primary/30">
                  <Sparkles size={32} />
                </div>
              </div>

              {/* After Card */}
              <div className="absolute bottom-1/4 right-0 w-80 p-6 rounded-2xl bg-background border border-border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-6 hover:rotate-0 transition-all duration-500 z-30 group cursor-default">
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6 flex justify-between items-center">
                  <span>Sesudah</span>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-[8px]">Mind Map</span>
                </div>
                <div className="relative w-full h-40 flex items-center justify-center">
                  <div className="bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-xl z-10 shadow-lg shadow-primary/20">Biologi Sel</div>
                  <div className="absolute top-0 left-4 bg-secondary border border-border text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm">Mitosis</div>
                  <div className="absolute top-0 right-4 bg-secondary border border-border text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm">Meiosis</div>
                  <div className="absolute bottom-4 left-0 bg-secondary border border-border text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm">Organel</div>
                  <div className="absolute bottom-0 right-8 bg-secondary border border-border text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm">Membran</div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 240 160">
                    <line x1="120" y1="80" x2="60" y2="30" stroke="currentColor" strokeWidth="2" />
                    <line x1="120" y1="80" x2="180" y2="30" stroke="currentColor" strokeWidth="2" />
                    <line x1="120" y1="80" x2="40" y2="130" stroke="currentColor" strokeWidth="2" />
                    <line x1="120" y1="80" x2="180" y2="140" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

