import { cn } from "@/lib/utils";

export function Spinner({ size = 24, className }) {
  return (
    <svg
      className={cn("animate-spin text-primary", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PipelineLoader({ stage = 'scanning' }) {
  const stages = [
    { key: 'scanning', label: 'Scanning', icon: '📷' },
    { key: 'sanitizing', label: 'AI Processing', icon: '🤖' },
    { key: 'visualizing', label: 'Visualizing', icon: '✨' },
  ];

  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-secondary/80 border border-border rounded-lg backdrop-blur-md max-w-sm w-full mx-auto shadow-lg">
      <div className="flex items-start justify-between w-full mb-6 relative">
        {stages.map((s, i) => (
          <div key={s.key} className={`flex flex-col items-center relative z-10 w-24 transition-opacity duration-300 ${i <= currentIndex ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 shadow-sm transition-all duration-300 ${i < currentIndex ? 'bg-success text-success-foreground' : i === currentIndex ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-110' : 'bg-background border border-border'}`}>
              {i < currentIndex ? '✓' : s.icon}
            </div>
            <span className={`text-xs font-semibold text-center ${i === currentIndex ? 'text-primary' : 'text-muted-foreground'}`}>{s.label}</span>
            {i < stages.length - 1 && <div className={`absolute top-5 left-[50%] w-[100px] h-1 -z-10 -translate-y-1/2 transition-colors duration-300 ${i < currentIndex ? 'bg-success' : 'bg-border'}`} />}
          </div>
        ))}
      </div>
      <p className="text-sm text-foreground font-medium text-center animate-pulse">
        {stage === 'scanning' && 'Membaca catatan tangan Anda...'}
        {stage === 'sanitizing' && 'Memperbaiki dan menyusun ulang teks...'}
        {stage === 'visualizing' && 'Membuat visualisasi catatan...'}
      </p>
    </div>
  );
}

export function SkeletonBlock({ width = '100%', height = '20px', className }) {
  return (
    <div
      className={cn("animate-pulse bg-muted rounded-md", className)}
      style={{ width, height }}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background gap-4">
      <Spinner size={40} />
      <p className="text-muted-foreground font-medium animate-pulse">Memuat...</p>
    </div>
  );
}
