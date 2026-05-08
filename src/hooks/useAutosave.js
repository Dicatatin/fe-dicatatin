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
  const setSaveStatus = useUIStore((s) => s.setSaveStatus);

  const lastSavedRef = useRef(null);
  const timerRef = useRef(null);

  const serialize = useCallback(() => {
    return JSON.stringify({ nodes, edges, workspaceName });
  }, [nodes, edges, workspaceName]);

  // Initialize last saved state
  useEffect(() => {
    if (!lastSavedRef.current) {
      lastSavedRef.current = serialize();
    }
  }, [serialize]);

  // Detect changes and debounce save
  useEffect(() => {
    const current = serialize();
    if (current === lastSavedRef.current) return;

    setSaveStatus('unsaved');

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setSaveStatus('saving');
      // Simulate API save
      setTimeout(() => {
        lastSavedRef.current = serialize();
        setSaveStatus('saved');
      }, 500);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [nodes, edges, workspaceName, debounceMs, serialize, setSaveStatus]);
}
