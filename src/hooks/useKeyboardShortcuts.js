import { useEffect, useCallback } from 'react';
import useUIStore from '@/stores/useUIStore';

/**
 * useKeyboardShortcuts — global keyboard shortcuts for workspace.
 * Ctrl+S: Save, Ctrl+E: Toggle edit mode, Escape: Deselect
 */
export default function useKeyboardShortcuts({ onSave }) {
  const toggleEditMode = useUIStore((s) => s.toggleEditMode);
  const clearSelection = useUIStore((s) => s.clearSelection);
  const setFlashcardOpen = useUIStore((s) => s.setFlashcardOpen);
  const isFlashcardOpen = useUIStore((s) => s.isFlashcardOpen);

  const handleKeyDown = useCallback((e) => {
    const isCtrl = e.ctrlKey || e.metaKey;

    // Ctrl+S — Save
    if (isCtrl && e.key === 's') {
      e.preventDefault();
      onSave?.();
      return;
    }

    // Ctrl+E — Toggle edit mode
    if (isCtrl && e.key === 'e') {
      e.preventDefault();
      toggleEditMode();
      return;
    }

    // Escape — Deselect or close flashcard
    if (e.key === 'Escape') {
      if (isFlashcardOpen) {
        setFlashcardOpen(false);
      } else {
        clearSelection();
      }
      return;
    }
  }, [onSave, toggleEditMode, clearSelection, setFlashcardOpen, isFlashcardOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
