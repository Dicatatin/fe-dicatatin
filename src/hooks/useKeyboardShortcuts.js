import { useEffect, useCallback } from 'react';
import useUIStore from '@/stores/useUIStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';

/**
 * useKeyboardShortcuts - global keyboard shortcuts for workspace.
 * Ctrl+S: Save, Ctrl+E: Toggle edit mode, Ctrl+Z/Y: Undo/Redo, Escape: Deselect
 */
export default function useKeyboardShortcuts({ onSave }) {
  const toggleEditMode = useUIStore((s) => s.toggleEditMode);
  const clearSelection = useUIStore((s) => s.clearSelection);
  const setFlashcardOpen = useUIStore((s) => s.setFlashcardOpen);
  const isFlashcardOpen = useUIStore((s) => s.isFlashcardOpen);
  const undo = useWorkspaceStore((s) => s.undo);
  const redo = useWorkspaceStore((s) => s.redo);

  const handleKeyDown = useCallback((e) => {
    const isCtrl = e.ctrlKey || e.metaKey;
    const targetTag = e.target?.tagName?.toLowerCase();
    const isTyping = targetTag === 'input' || targetTag === 'textarea' || e.target?.isContentEditable;

    if (isCtrl && e.key.toLowerCase() === 's') {
      e.preventDefault();
      onSave?.();
      return;
    }

    if (isCtrl && !isTyping && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
      return;
    }

    if (isCtrl && !isTyping && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redo();
      return;
    }

    if (isCtrl && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      toggleEditMode();
      return;
    }

    if (e.key === 'Escape') {
      if (isFlashcardOpen) {
        setFlashcardOpen(false);
      } else {
        clearSelection();
      }
    }
  }, [onSave, toggleEditMode, clearSelection, setFlashcardOpen, isFlashcardOpen, undo, redo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
