import { ChevronLeft, ChevronRight, X, Check, XCircle } from 'lucide-react';
import useFlashcardStore from '@/stores/useFlashcardStore';
import useUIStore from '@/stores/useUIStore';
import Button from '@/components/ui/Button';
import './FlashcardPopup.css';

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
    <div className="fc-popup animate-slide-up">
      {/* Header */}
      <div className="fc-header">
        <h4>🧠 Flashcards</h4>
        <div className="fc-counter">
          {currentIndex + 1} / {cards.length}
        </div>
        <button className="fc-close" onClick={handleClose}>
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="fc-progress-bar">
        <div className="fc-progress-fill" style={{ width: `${((progress.understood + progress.notUnderstood) / progress.total) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="fc-card-container" onClick={flipCard}>
        <div className={`fc-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="fc-card-front">
            <span className="fc-card-label">Pertanyaan</span>
            <p>{card.question}</p>
            <span className="fc-card-hint">Klik untuk melihat jawaban</span>
          </div>
          <div className="fc-card-back">
            <span className="fc-card-label" style={{ color: 'var(--accent-teal)' }}>Jawaban</span>
            <p>{card.answer}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fc-actions">
        <Button variant="ghost" size="sm" onClick={prevCard} disabled={currentIndex === 0} icon={<ChevronLeft size={16} />}>
          Prev
        </Button>

        <div className="fc-feedback">
          <Button variant="danger" size="sm" onClick={markNotUnderstood} icon={<XCircle size={16} />}>
            Belum Paham
          </Button>
          <Button variant="success" size="sm" onClick={markUnderstood} icon={<Check size={16} />}>
            Paham
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={nextCard} disabled={currentIndex >= cards.length - 1}>
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
