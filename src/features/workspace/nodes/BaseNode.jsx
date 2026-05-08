import { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import useUIStore from '@/stores/useUIStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import './nodes.css';

/**
 * BaseNode — shared base component for all custom node types.
 * Features: inline text editing (double click), resizable, handles on hover,
 * selectable highlight, and customizable styling.
 */
export default function BaseNode({
  id,
  data,
  selected,
  type,
  // Customization props
  className = '',
  style = {},
  minWidth = 80,
  minHeight = 40,
  showHandles = true,
  handlePositions = ['top', 'bottom', 'left', 'right'],
  resizable = true,
  children,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data?.label || '');
  const textareaRef = useRef(null);
  const isEditMode = useUIStore((s) => s.isEditMode);
  const setSelectedNode = useUIStore((s) => s.setSelectedNode);
  const updateNode = useWorkspaceStore((s) => s.updateNode);

  useEffect(() => {
    setEditValue(data?.label || '');
  }, [data?.label]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = useCallback((e) => {
    if (!isEditMode) return;
    e.stopPropagation();
    setIsEditing(true);
  }, [isEditMode]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (editValue.trim() !== (data?.label || '')) {
      updateNode(id, { label: editValue.trim() || 'Untitled' });
    }
  }, [editValue, data?.label, id, updateNode]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditValue(data?.label || '');
      setIsEditing(false);
    }
  }, [handleBlur, data?.label]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setSelectedNode(id);
  }, [id, setSelectedNode]);

  const positionMap = {
    top: Position.Top,
    bottom: Position.Bottom,
    left: Position.Left,
    right: Position.Right,
  };

  return (
    <div
      className={`base-node ${selected ? 'base-node--selected' : ''} ${className}`}
      style={{
        minWidth,
        minHeight,
        ...data?.style,
        ...style,
      }}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {/* Resizer */}
      {resizable && isEditMode && (
        <NodeResizer
          color="var(--accent-primary)"
          isVisible={selected}
          minWidth={minWidth}
          minHeight={minHeight}
          lineStyle={{ borderColor: 'var(--accent-primary)', borderWidth: 1 }}
          handleStyle={{
            width: 8,
            height: 8,
            backgroundColor: 'var(--accent-primary)',
            borderRadius: 2,
          }}
        />
      )}

      {/* Handles */}
      {showHandles && handlePositions.map((pos) => (
        <Handle
          key={`${pos}-source`}
          type="source"
          position={positionMap[pos]}
          id={`${pos}-source`}
          className="base-node__handle"
        />
      ))}
      {showHandles && handlePositions.map((pos) => (
        <Handle
          key={`${pos}-target`}
          type="target"
          position={positionMap[pos]}
          id={`${pos}-target`}
          className="base-node__handle"
        />
      ))}

      {/* Content */}
      {children || (
        <div className="base-node__content">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              className="base-node__editor"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              rows={Math.max(1, editValue.split('\n').length)}
            />
          ) : (
            <span className="base-node__label">{data?.label || 'Untitled'}</span>
          )}
        </div>
      )}
    </div>
  );
}
