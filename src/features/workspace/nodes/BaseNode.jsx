import { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import useUIStore from '@/stores/useUIStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';

/**
 * BaseNode — shared base component for all custom node types.
 * Features: inline text editing (double click), resizable, handles on hover,
 * selectable highlight, and customizable styling.
 */
export default function BaseNode({
  id,
  data,
  selected,
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
  const activeTool = useUIStore((s) => s.activeTool);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const setSelectedNode = useUIStore((s) => s.setSelectedNode);
  const updateNode = useWorkspaceStore((s) => s.updateNode);
  const updateNodeStyle = useWorkspaceStore((s) => s.updateNodeStyle);
  const isSelected = selected || selectedNodeId === id;
  const shapeClass = data?.shapeType ? `shape-node shape-node--${data.shapeType}` : '';
  const mergedStyle = {
    minWidth,
    minHeight,
    ...data?.style,
    ...style,
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = useCallback((e) => {
    if (!isEditMode || activeTool !== 'select') return;
    e.stopPropagation();
    setEditValue(data?.label || '');
    setIsEditing(true);
  }, [activeTool, data?.label, isEditMode]);

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
    if (activeTool !== 'select') return;
    setSelectedNode(id);
  }, [activeTool, id, setSelectedNode]);

  const positionMap = {
    top: Position.Top,
    bottom: Position.Bottom,
    left: Position.Left,
    right: Position.Right,
  };

  return (
    <div
      className={`base-node ${isSelected ? 'base-node--selected' : ''} ${shapeClass} ${className}`}
      style={mergedStyle}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {/* Resizer */}
      {resizable && isEditMode && (
        <NodeResizer
          color="#3B82F6"
          isVisible={isSelected}
          minWidth={minWidth}
          minHeight={minHeight}
          onResizeEnd={(_, params) => updateNodeStyle(id, { width: params.width, height: params.height })}
          lineStyle={{ borderColor: '#3B82F6', borderWidth: 1 }}
          handleStyle={{
            width: 8,
            height: 8,
            backgroundColor: '#3B82F6',
            borderRadius: 2,
          }}
        />
      )}

      {/* Fallback explicit handles for AI generated edges that lack handle context */}
      <Handle type="source" position={Position.Bottom} id="fallback-source" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, pointerEvents: 'none', zIndex: -1 }} />
      <Handle type="target" position={Position.Top} id="fallback-target" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, pointerEvents: 'none', zIndex: -1 }} />

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
      {/* Content */}
      {typeof children === 'function' ? (
        children({
          isEditing,
          editor: (
            <textarea
              ref={textareaRef}
              className="base-node__editor"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              rows={Math.max(1, editValue.split('\n').length)}
              style={{ width: '100%', height: '100%', resize: 'none', background: 'transparent', border: 'none', outline: 'none' }}
            />
          )
        })
      ) : children ? (
        children
      ) : (
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
