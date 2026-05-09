import { useState } from 'react';
import { METHOD_INFO, METHODS } from '@/utils/constants';

const methodKeys = Object.keys(METHOD_INFO);

export default function MethodShowcase() {
  const [activeMethod, setActiveMethod] = useState(METHODS.MIND_MAP);
  const info = METHOD_INFO[activeMethod];

  return (
    <section className="py-20 md:py-32" id="methods">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Bukan Sekadar <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">AI Wrapper</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informasi yang sama, disusun ulang otomatis ke metode belajar pilihan Anda
          </p>
        </div>

        {/* Method tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {methodKeys.map((key) => {
            const m = METHOD_INFO[key];
            const isActive = activeMethod === key;
            return (
              <button
                key={key}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all duration-300 ${isActive ? 'bg-background border-primary shadow-lg shadow-primary/10' : 'bg-secondary/50 border-border text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                onClick={() => setActiveMethod(key)}
                style={isActive ? { color: m.color, borderColor: m.color } : {}}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-[10px] font-black" style={{ color: m.color }}>{m.icon}</span>
                <span className="whitespace-nowrap uppercase tracking-wider text-[10px]">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preview area */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-secondary/20 p-8 md:p-12 rounded-[2rem] border border-border animate-in fade-in slide-in-from-bottom-8 duration-700" key={activeMethod}>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ background: info.color }} />
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: info.color }}>{info.label}</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {info.description || 'Metode ini membantu Anda menyusun informasi secara visual dan terstruktur untuk pemahaman yang lebih dalam.'}
            </p>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px]">✓</div>
                <span>Otomatis dari foto catatan</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px]">✓</div>
                <span>Siap diekspor ke PDF</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px]">✓</div>
                <span>Mendukung mode disleksia</span>
              </div>
            </div>
          </div>

          {/* Visual representation per method */}
          <div className="bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-2xl">
            {activeMethod === METHODS.MIND_MAP && <MindMapPreview color={info.color} />}
            {activeMethod === METHODS.CORNELL && <CornellPreview color={info.color} />}
            {activeMethod === METHODS.BOXING && <BoxingPreview />}
            {activeMethod === METHODS.CHARTING && <ChartingPreview />}
            {activeMethod === METHODS.ZETTELKASTEN && <ZettelkastenPreview />}
            {activeMethod === METHODS.SKETCHNOTING && <SketchnotingPreview />}
            {activeMethod === METHODS.FEYNMAN && <FeynmanPreview />}
          </div>
        </div>
      </div>
    </section>
  );
}

function MindMapPreview({ color }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="px-4 py-2 rounded-lg bg-primary text-white text-[10px] font-bold z-10 shadow-lg" style={{ backgroundColor: color }}>Konsep Utama</div>
      <div className="absolute top-1/4 left-10 px-3 py-1.5 rounded bg-secondary border border-border text-[8px] font-bold shadow-sm">Sub-topik A</div>
      <div className="absolute top-1/4 right-10 px-3 py-1.5 rounded bg-secondary border border-border text-[8px] font-bold shadow-sm">Sub-topik B</div>
      <div className="absolute bottom-1/4 left-8 px-3 py-1.5 rounded bg-secondary border border-border text-[8px] font-bold shadow-sm">Detail 1</div>
      <div className="absolute bottom-1/4 right-8 px-3 py-1.5 rounded bg-secondary border border-border text-[8px] font-bold shadow-sm">Detail 2</div>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 150">
        <line x1="100" y1="75" x2="50" y2="35" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="75" x2="150" y2="35" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="75" x2="40" y2="120" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="75" x2="160" y2="120" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

function CornellPreview({ color }) {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex gap-3 flex-1">
        <div className="w-1/3 border-r border-border p-2 space-y-3">
          <div className="h-2 w-full rounded bg-primary/20" style={{ backgroundColor: `${color}30` }} />
          <div className="h-2 w-3/4 rounded bg-primary/20" style={{ backgroundColor: `${color}30` }} />
        </div>
        <div className="flex-1 p-2 space-y-4">
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded bg-muted-foreground/10" />
            <div className="h-1.5 w-full rounded bg-muted-foreground/10" />
            <div className="h-1.5 w-4/5 rounded bg-muted-foreground/10" />
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded bg-muted-foreground/10" />
            <div className="h-1.5 w-full rounded bg-muted-foreground/10" />
          </div>
        </div>
      </div>
      <div className="h-1/4 border-t border-border p-3 flex items-center justify-center">
        <p className="text-[8px] text-muted-foreground font-medium italic">Ringkasan materi otomatis...</p>
      </div>
    </div>
  );
}

function BoxingPreview() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
      <div className="border-2 border-dashed border-teal-500/40 rounded-xl p-3 flex flex-col gap-2 bg-teal-500/5">
        <div className="text-[8px] font-black uppercase text-teal-500 mb-1">Topik A</div>
        <div className="h-2 w-full rounded bg-teal-500/10" />
        <div className="h-2 w-3/4 rounded bg-teal-500/10" />
      </div>
      <div className="border-2 border-dashed border-purple-500/40 rounded-xl p-3 flex flex-col gap-2 bg-purple-500/5">
        <div className="text-[8px] font-black uppercase text-purple-500 mb-1">Topik B</div>
        <div className="h-2 w-full rounded bg-purple-500/10" />
        <div className="h-2 w-4/5 rounded bg-purple-500/10" />
      </div>
      <div className="col-span-2 border-2 border-dashed border-blue-500/40 rounded-xl p-3 flex flex-col gap-2 bg-blue-500/5">
        <div className="text-[8px] font-black uppercase text-blue-500 mb-1">Konklusi</div>
        <div className="h-2 w-full rounded bg-blue-500/10" />
      </div>
    </div>
  );
}

function ChartingPreview() {
  return (
    <div className="w-full h-full flex flex-col border border-border rounded-lg overflow-hidden bg-background">
      <div className="grid grid-cols-3 bg-secondary p-3 border-b border-border">
        <div className="h-2 w-12 rounded bg-muted-foreground/30" />
        <div className="h-2 w-12 rounded bg-muted-foreground/30" />
        <div className="h-2 w-12 rounded bg-muted-foreground/30" />
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="grid grid-cols-3 p-3 border-b border-border last:border-0">
          <div className="h-1.5 w-10 rounded bg-muted-foreground/10" />
          <div className="h-1.5 w-14 rounded bg-primary/20" />
          <div className="h-1.5 w-8 rounded bg-muted-foreground/10" />
        </div>
      ))}
    </div>
  );
}

function ZettelkastenPreview() {
  return (
    <div className="relative w-full h-full p-4">
      <div className="absolute top-4 left-4 w-24 p-2 rounded bg-amber-500/10 border border-amber-500/30 shadow-lg">
        <div className="text-[6px] font-mono text-amber-500 mb-1">#101</div>
        <div className="h-1 w-full bg-amber-500/20 rounded mb-1" />
        <div className="h-1 w-2/3 bg-amber-500/20 rounded" />
      </div>
      <div className="absolute top-1/2 right-4 w-28 p-2 rounded bg-blue-500/10 border border-blue-500/30 shadow-lg">
        <div className="text-[6px] font-mono text-blue-500 mb-1">#101a</div>
        <div className="h-1 w-full bg-blue-500/20 rounded mb-1" />
        <div className="h-1 w-3/4 bg-blue-500/20 rounded" />
      </div>
      <div className="absolute bottom-4 left-1/4 w-20 p-2 rounded bg-purple-500/10 border border-purple-500/30 shadow-lg">
        <div className="text-[6px] font-mono text-purple-500 mb-1">#102</div>
        <div className="h-1 w-full bg-purple-500/20 rounded" />
      </div>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 150">
        <path d="M60 40 Q 100 60 140 80" stroke="currentColor" fill="transparent" strokeDasharray="4" />
        <path d="M140 100 Q 100 120 70 130" stroke="currentColor" fill="transparent" strokeDasharray="4" />
      </svg>
    </div>
  );
}

function SketchnotingPreview() {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-6 items-center justify-center">
      <div className="text-xl font-black italic rotate-[-2deg] bg-yellow-500/20 px-4 py-2 border-2 border-yellow-500/40 rounded-xl">JUDUL BESAR</div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-teal-400" />
          <div className="h-1.5 w-12 bg-muted-foreground/20 rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded border-2 border-amber-400 rotate-3" />
          <div className="h-1.5 w-12 bg-muted-foreground/20 rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-lg border-2 border-blue-400 -rotate-3" />
          <div className="h-1.5 w-12 bg-muted-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function FeynmanPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-[8px] font-bold uppercase tracking-widest text-blue-400">The Concept</div>
      <div className="w-px h-4 bg-border" />
      <div className="px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-[8px] font-bold uppercase tracking-widest text-teal-400">Simple Explanation</div>
      <div className="w-px h-4 bg-border" />
      <div className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-[8px] font-bold uppercase tracking-widest text-amber-400">Gap Identification</div>
      <div className="w-px h-4 bg-border" />
      <div className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-[8px] font-bold uppercase tracking-widest text-purple-400">Analogy</div>
    </div>
  );
}

