import { ChevronLeft, ChevronRight, X, Check, XCircle } from 'lucide-react';
import useFlashcardStore from '@/stores/useFlashcardStore';
import useUIStore from '@/stores/useUIStore';
import Button from '@/components/ui/Button';

export default function FlashcardPopup() {
  const { cards, currentIndex, isFlipped, flipCard, nextCard, prevCard, markUnderstood, markNotUnderstood, getProgress } = useFlashcardStore();
  const { setFlashcardOpen, setEditMode } = useUIStore();
  const card = cards[currentIndex];
  const progress = getProgress();

  const handleClose = () => {
    setFlashcardOpen(false);
    setEditMode(true);
  };

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-background border border-border rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-lg">Flashcards</h4>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black">
              {currentIndex + 1} / {cards.length}
            </div>
            <button 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" 
              onClick={handleClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-secondary overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]" 
            style={{ width: `${((progress.understood + progress.notUnderstood) / progress.total) * 100}%` }} 
          />
        </div>

        {/* Card Area */}
        <div className="p-8">
          <div 
            className="perspective-1000 w-full h-80 cursor-pointer group" 
            onClick={flipCard}
          >
            <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-10 bg-secondary/50 border-2 border-border rounded-[2rem] text-center group-hover:border-primary/30 transition-all duration-300 ${isFlipped ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">Pertanyaan</span>
                <p className="text-xl md:text-2xl font-bold leading-relaxed">{card.question}</p>
                <span className="mt-10 text-[10px] text-muted-foreground italic font-medium opacity-50 group-hover:opacity-100 transition-opacity">Klik untuk melihat jawaban</span>
              </div>
              
              {/* Back */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-10 bg-primary/5 border-2 border-primary/30 rounded-[2rem] text-center transition-all duration-300 ${isFlipped ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <p className="text-xl md:text-2xl font-bold leading-relaxed text-foreground">{card.answer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); prevCard(); }} 
              disabled={currentIndex === 0} 
              className="font-bold"
            >
              <ChevronLeft size={18} className="mr-1" /> Prev
            </Button>

            <div className="flex gap-2">
              <Button 
                variant="danger" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); markNotUnderstood(); }} 
                className="rounded-full px-6"
              >
                <XCircle size={18} className="mr-2" /> Belum Paham
              </Button>
              <Button 
                variant="success" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); markUnderstood(); }} 
                className="rounded-full px-6"
              >
                <Check size={18} className="mr-2" /> Paham
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); nextCard(); }} 
              disabled={currentIndex >= cards.length - 1}
              className="font-bold"
            >
              Next <ChevronRight size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

