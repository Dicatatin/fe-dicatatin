import { ShieldCheck, FileText, Lock } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4">
            🔒 Trust & Technology
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Dibangun dengan <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Teknologi Terbaik</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center group hover:bg-secondary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h4 className="text-lg font-bold mb-3">Powered by Advanced AI</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">OCR + GPT-4 Analysis untuk konteks bahasa Indonesia yang tidak baku.</p>
          </div>
          <div className="p-8 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center group hover:bg-secondary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
              <Lock size={28} />
            </div>
            <h4 className="text-lg font-bold mb-3">Data Aman & Terenkripsi</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Catatan Anda disimpan di Object Storage terenkripsi. Privasi terjaga.</p>
          </div>
          <div className="p-8 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center group hover:bg-secondary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <FileText size={28} />
            </div>
            <h4 className="text-lg font-bold mb-3">PDF Vector Export</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Hasil kerja bisa diprint tanpa pecah — kualitas vektor, bukan screenshot.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

