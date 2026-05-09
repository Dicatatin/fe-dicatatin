export default function AccessibilitySpotlight() {
  return (
    <section className="py-20 md:py-32 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">Dyslexia-Friendly <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Mode</span></h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Platform ini dirancang inklusif. Pelajar dengan disleksia mendapat akses ke font 
              <span className="text-foreground font-semibold"> OpenDyslexic</span>, spacing yang lebih lega, dan visual yang membantu pemrosesan informasi.
            </p>
            <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-background border border-border shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">United Nations Goal</span>
                <span className="text-sm font-semibold">SDG 4: Quality Education — Inclusive & Equitable</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal-500/20 blur-[100px] rounded-full -z-10" />
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-background border border-border shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <span className="text-[10px] font-black uppercase text-muted-foreground mb-4 block">Standard Typography</span>
                <p className="text-base text-foreground leading-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Mahasiswa sering mencatat dengan cepat dan berantakan. OCR standar seringkali gagal menangkap konteks singkatan unik bahasa Indonesia.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-background border-2 border-teal-500/30 shadow-2xl shadow-teal-500/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase text-teal-400">OpenDyslexic Mode</span>
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-[8px] font-bold text-teal-400 uppercase">Active</span>
                </div>
                <p className="text-lg text-foreground leading-loose tracking-wide" style={{ fontFamily: 'OpenDyslexic, sans-serif' }}>
                  Mahasiswa sering mencatat dengan cepat dan berantakan. OCR standar seringkali gagal menangkap konteks singkatan unik bahasa Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

