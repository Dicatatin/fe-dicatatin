import { FileX, BookOpen, Eye } from 'lucide-react';

const problems = [
  {
    icon: <FileX size={32} />,
    title: 'Catatan Mati',
    desc: 'Catatan yang ditulis cepat dan berantakan — sulit dibaca ulang, akhirnya tidak pernah dipelajari kembali.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Belajar Pasif',
    desc: 'Membaca ulang catatan berulang kali tanpa menguji ingatan. Metode ini terbukti tidak efektif.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: <Eye size={32} />,
    title: 'Hambatan Belajar',
    desc: 'Pelajar dengan disleksia membutuhkan tipografi dan visual khusus yang jarang tersedia di tools belajar.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-20 md:py-32 bg-secondary/20" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Kenapa Catatan Anda <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Tidak Bekerja?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            3 masalah utama yang dihadapi mahasiswa Indonesia dalam belajar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((p, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${p.bg} ${p.color}`}>
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="text-3xl animate-bounce text-muted-foreground/30">↓</div>
            <div className="w-full p-8 md:p-12 rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Solusi: AI yang Memahami Konteks</h3>
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
                  DICATAT.IN tidak sekadar menyalin teks — AI kami memahami singkatan bahasa Indonesia 
                  (<code>mhs</code> → mahasiswa, <code>tdk</code> → tidak), memperbaiki struktur kalimat, 
                  dan mengorganisir materi ke dalam metode belajar yang terbukti efektif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

