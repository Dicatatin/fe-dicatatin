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
  const updateNodeStyle = useWorkspaceStore((s) => s.updateNodeStyle);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const [localStyle, setLocalStyle] = useState({});

  useEffect(() => {
    if (selectedNode) {
      setLocalStyle({ ...(selectedNode.data?.style || {}), ...(selectedNode.style || {}) });
    }
  }, [selectedNode]);

  const applyStyle = useCallback((updates) => {
    const newStyle = { ...localStyle, ...updates };
    setLocalStyle(newStyle);
    updateNodeStyle(selectedNodeId, updates);
  }, [localStyle, selectedNodeId, updateNodeStyle]);

  const applySize = useCallback((key, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      applyStyle({ [key]: num });
    }
  }, [applyStyle]);

  if (!selectedNode) {
    return (
      <div className="w-[280px] h-full bg-secondary border-l border-border overflow-y-auto shrink-0 animate-in slide-in-from-right-4">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Properties</span>
        </div>
        <div className="p-10 text-center text-muted-foreground text-sm flex flex-col items-center justify-center">
          <div className="text-3xl mb-3 opacity-40"><MousePointer size={32} /></div>
          <p>Select a node to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[280px] h-full bg-secondary border-l border-border overflow-y-auto shrink-0 animate-in slide-in-from-right-4">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Node Properties</span>
        <button className="flex items-center justify-center w-7 h-7 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" onClick={() => setSelectedNode(null)} title="Close">
          <X size={14} />
        </button>
      </div>

      {/* Text Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Text</div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Align</span>
          <div className="flex gap-1">
            {[
              { val: 'left', icon: <AlignLeft size={14} /> },
              { val: 'center', icon: <AlignCenter size={14} /> },
              { val: 'right', icon: <AlignRight size={14} /> },
            ].map((a) => (
              <button
                key={a.val}
                className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.textAlign === a.val ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                onClick={() => applyStyle({ textAlign: a.val })}
              >
                {a.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Style</span>
          <div className="flex gap-1">
            <button
              className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.fontWeight >= 700 ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              onClick={() => applyStyle({ fontWeight: localStyle.fontWeight >= 700 ? 400 : 700 })}
            >
              <Bold size={14} />
            </button>
            <button
              className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.fontStyle === 'italic' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              onClick={() => applyStyle({ fontStyle: localStyle.fontStyle === 'italic' ? 'normal' : 'italic' })}
            >
              <Italic size={14} />
            </button>
            <button
              className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.textDecoration === 'underline' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              onClick={() => applyStyle({ textDecoration: localStyle.textDecoration === 'underline' ? 'none' : 'underline' })}
            >
              <Underline size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Size</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[60px]"
            value={parseInt(localStyle.fontSize, 10) || 14}
            onChange={(e) => applyStyle({ fontSize: `${e.target.value}px` })}
            min={8}
            max={72}
          />
          <span className="text-[10px] text-muted-foreground">px</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Color</span>
          <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
            <input
              type="color"
              className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
              value={localStyle.color || '#334155'}
              onChange={(e) => applyStyle({ color: e.target.value })}
            />
          </div>
          <span className="text-xs text-muted-foreground uppercase">{localStyle.color || '#334155'}</span>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Appearance</div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Fill</span>
          <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
            <input
              type="color"
              className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
              value={localStyle.background || localStyle.backgroundColor || '#FFFFFF'}
              onChange={(e) => applyStyle({ background: e.target.value })}
            />
          </div>
          <span className="text-xs text-muted-foreground uppercase">{localStyle.background || '#FFFFFF'}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Border</span>
          <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
            <input
              type="color"
              className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
              value={localStyle.borderColor || '#E2E8F0'}
              onChange={(e) => applyStyle({ borderColor: e.target.value, border: `1.5px solid ${e.target.value}` })}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Radius</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[60px]"
            value={parseInt(localStyle.borderRadius, 10) || 8}
            onChange={(e) => applyStyle({ borderRadius: `${e.target.value}px` })}
            min={0}
            max={50}
          />
          <span className="text-[10px] text-muted-foreground">px</span>
        </div>
      </div>

      {/* Size Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Size</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-4">W</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[70px]"
            value={localStyle.width || ''}
            placeholder="auto"
            onChange={(e) => applySize('width', e.target.value)}
          />
          <span className="text-xs text-muted-foreground w-4 ml-2">H</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[70px]"
            value={localStyle.height || ''}
            placeholder="auto"
            onChange={(e) => applySize('height', e.target.value)}
          />
        </div>
      </div>

      {/* Node Info */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Info</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">ID</span>
          <span className="text-xs text-muted-foreground truncate">{selectedNode.id}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Type</span>
          <span className="text-xs text-muted-foreground">{selectedNode.type}</span>
        </div>
      </div>
    </div>
  );
}
