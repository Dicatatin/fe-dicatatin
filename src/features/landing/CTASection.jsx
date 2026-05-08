import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 md:p-20 text-center shadow-2xl shadow-primary/30 group">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/20 blur-[80px] rounded-full -ml-32 -mb-32 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Mulai Belajar Lebih Cerdas</h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-medium">
              Gratis untuk mahasiswa. Gabung sekarang dan rasakan perbedaannya.
            </p>
            <div className="flex justify-center">
              <Button 
                size="xl" 
                onClick={() => navigate('/signup')}
                className="bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/10 px-10 h-14 text-lg font-bold"
              >
                Mulai Sekarang 
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

