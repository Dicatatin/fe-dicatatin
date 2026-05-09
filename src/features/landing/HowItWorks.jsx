import { Camera, Cpu, MousePointer, Zap } from 'lucide-react';

const steps = [
  { icon: <Camera size={28} />, num: '01', title: 'Scan', desc: 'Upload foto catatan tangan Anda (JPG/PNG). Tulis sebebas mungkin.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: <Cpu size={28} />, num: '02', title: 'AI Transform', desc: 'AI membersihkan teks, memperbaiki singkatan, dan mengidentifikasi konsep kunci.', color: 'text-teal-400', bg: 'bg-teal-400/10' },
  { icon: <MousePointer size={28} />, num: '03', title: 'Interact', desc: 'Edit dan atur catatan di kanvas React Flow yang interaktif.', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: <Zap size={28} />, num: '04', title: 'Recall', desc: 'Belajar aktif dengan Flashcards otomatis dari materi catatan Anda.', color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">4 Langkah Menuju <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Catatan Cerdas</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-teal-400/20 to-amber-400/20 -z-10" />
          
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-background border-4 border-background ring-2 ring-border shadow-lg ${s.color}`}>
                  {s.icon}
                </div>
                <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black bg-background border border-border shadow-md ${s.color}`}>
                  {s.num}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm px-4">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

