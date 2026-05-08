import { useCallback, useEffect, useState } from 'react';
import {
  AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, X, MousePointer,
} from 'lucide-react';
import useUIStore from '@/stores/useUIStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';

/**
 * DetailPanel — right sidebar for editing selected node properties.
 */
export default function DetailPanel() {
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const setSelectedNode = useUIStore((s) => s.setSelectedNode);
  const nodes = useWorkspaceStore((s) => s.nodes);
  const setNodes = useWorkspaceStore((s) => s.setNodes);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const [localStyle, setLocalStyle] = useState({});
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (selectedNode) {
      setLocalStyle(selectedNode.style || {});
      setLocalData(selectedNode.data || {});
    }
  }, [selectedNode]);

  const applyStyle = useCallback((updates) => {
    const newStyle = { ...localStyle, ...updates };
    setLocalStyle(newStyle);
    setNodes(
      nodes.map((n) =>
        n.id === selectedNodeId ? { ...n, style: { ...n.style, ...updates } } : n
      )
    );
  }, [localStyle, nodes, selectedNodeId, setNodes]);

  const applySize = useCallback((key, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      applyStyle({ [key]: num });
    }
  }, [applyStyle]);

  if (!selectedNode) {
    return (
      <div className="detail-panel">
        <div className="detail-panel__header">
          <span className="detail-panel__title">Properties</span>
        </div>
        <div className="detail-panel__empty">
          <div className="detail-panel__empty-icon"><MousePointer size={32} /></div>
          <p>Select a node to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-panel">
      <div className="detail-panel__header">
        <span className="detail-panel__title">Node Properties</span>
        <button className="detail-panel__btn" onClick={() => setSelectedNode(null)} title="Close">
          <X size={14} />
        </button>
      </div>

      {/* Text Section */}
      <div className="detail-panel__section">
        <div className="detail-panel__section-title">Text</div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Align</span>
          <div className="detail-panel__btn-group">
            {[
              { val: 'left', icon: <AlignLeft size={14} /> },
              { val: 'center', icon: <AlignCenter size={14} /> },
              { val: 'right', icon: <AlignRight size={14} /> },
            ].map((a) => (
              <button
                key={a.val}
                className={`detail-panel__btn ${localStyle.textAlign === a.val ? 'active' : ''}`}
                onClick={() => applyStyle({ textAlign: a.val })}
              >
                {a.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Style</span>
          <div className="detail-panel__btn-group">
            <button
              className={`detail-panel__btn ${localStyle.fontWeight >= 700 ? 'active' : ''}`}
              onClick={() => applyStyle({ fontWeight: localStyle.fontWeight >= 700 ? 400 : 700 })}
            >
              <Bold size={14} />
            </button>
            <button
              className={`detail-panel__btn ${localStyle.fontStyle === 'italic' ? 'active' : ''}`}
              onClick={() => applyStyle({ fontStyle: localStyle.fontStyle === 'italic' ? 'normal' : 'italic' })}
            >
              <Italic size={14} />
            </button>
            <button
              className={`detail-panel__btn ${localStyle.textDecoration === 'underline' ? 'active' : ''}`}
              onClick={() => applyStyle({ textDecoration: localStyle.textDecoration === 'underline' ? 'none' : 'underline' })}
            >
              <Underline size={14} />
            </button>
          </div>
        </div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Size</span>
          <input
            type="number"
            className="detail-panel__input"
            value={parseInt(localStyle.fontSize, 10) || 14}
            onChange={(e) => applyStyle({ fontSize: `${e.target.value}px` })}
            min={8}
            max={72}
            style={{ width: 60 }}
          />
          <span className="text-xs text-muted">px</span>
        </div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Color</span>
          <input
            type="color"
            className="detail-panel__color-input"
            value={localStyle.color || '#334155'}
            onChange={(e) => applyStyle({ color: e.target.value })}
          />
          <span className="text-xs text-muted">{localStyle.color || '#334155'}</span>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="detail-panel__section">
        <div className="detail-panel__section-title">Appearance</div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Fill</span>
          <input
            type="color"
            className="detail-panel__color-input"
            value={localStyle.background || localStyle.backgroundColor || '#FFFFFF'}
            onChange={(e) => applyStyle({ background: e.target.value })}
          />
          <span className="text-xs text-muted">{localStyle.background || '#FFFFFF'}</span>
        </div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Border</span>
          <input
            type="color"
            className="detail-panel__color-input"
            value={localStyle.borderColor || '#E2E8F0'}
            onChange={(e) => applyStyle({ borderColor: e.target.value, border: `1.5px solid ${e.target.value}` })}
          />
        </div>

        <div className="detail-panel__row">
          <span className="detail-panel__label">Radius</span>
          <input
            type="number"
            className="detail-panel__input"
            value={parseInt(localStyle.borderRadius, 10) || 8}
            onChange={(e) => applyStyle({ borderRadius: `${e.target.value}px` })}
            min={0}
            max={50}
            style={{ width: 60 }}
          />
          <span className="text-xs text-muted">px</span>
        </div>
      </div>

      {/* Size Section */}
      <div className="detail-panel__section">
        <div className="detail-panel__section-title">Size</div>
        <div className="detail-panel__row">
          <span className="detail-panel__label">W</span>
          <input
            type="number"
            className="detail-panel__input"
            value={localStyle.width || ''}
            placeholder="auto"
            onChange={(e) => applySize('width', e.target.value)}
            style={{ width: 70 }}
          />
          <span className="detail-panel__label" style={{ marginLeft: 8 }}>H</span>
          <input
            type="number"
            className="detail-panel__input"
            value={localStyle.height || ''}
            placeholder="auto"
            onChange={(e) => applySize('height', e.target.value)}
            style={{ width: 70 }}
          />
        </div>
      </div>

      {/* Node Info */}
      <div className="detail-panel__section">
        <div className="detail-panel__section-title">Info</div>
        <div className="detail-panel__row">
          <span className="detail-panel__label">ID</span>
          <span className="text-xs text-muted">{selectedNode.id}</span>
        </div>
        <div className="detail-panel__row">
          <span className="detail-panel__label">Type</span>
          <span className="text-xs text-muted">{selectedNode.type}</span>
        </div>
      </div>
    </div>
  );
}
