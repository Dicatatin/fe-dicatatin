import { useEffect, useRef, useCallback } from 'react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useUIStore from '@/stores/useUIStore';

/**
 * useAutosave — debounced autosave (2s after last change).
 * Compares current state vs last saved state. Updates save status indicator.
 */
export default function useAutosave(debounceMs = 2000) {
  const nodes = useWorkspaceStore((s) => s.nodes);
  const edges = useWorkspaceStore((s) => s.edges);
  const workspaceName = useWorkspaceStore((s) => s.workspaceName);
  const method = useWorkspaceStore((s) => s.method);
  const flashcards = useWorkspaceStore((s) => s.flashcards);
  const currentWorkspace = useWorkspaceStore((s) => s.currentWorkspace);
  const saveCurrentWorkspace = useWorkspaceStore((s) => s.saveCurrentWorkspace);
  const setSaveStatus = useUIStore((s) => s.setSaveStatus);

  const lastSavedRef = useRef(null);
  const timerRef = useRef(null);

  const serialize = useCallback(() => {
    return JSON.stringify({ nodes, edges, workspaceName, method, flashcards });
  }, [nodes, edges, workspaceName, method, flashcards]);

  // Initialize last saved state
  useEffect(() => {
    const state = useWorkspaceStore.getState();
    lastSavedRef.current = JSON.stringify({
      nodes: state.nodes,
      edges: state.edges,
      workspaceName: state.workspaceName,
      method: state.method,
      flashcards: state.flashcards,
    });
    setSaveStatus('saved');
  }, [currentWorkspace?.id, setSaveStatus]);

  // Detect changes and debounce save
  useEffect(() => {
    const current = serialize();
    if (!currentWorkspace?.id) return;
    if (current === lastSavedRef.current) return;

    setSaveStatus('unsaved');

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        await saveCurrentWorkspace();
        lastSavedRef.current = serialize();
        setSaveStatus('saved');
      } catch (error) {
        console.error('Autosave failed:', error);
        setSaveStatus('unsaved');
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentWorkspace?.id, debounceMs, saveCurrentWorkspace, serialize, setSaveStatus]);
}
