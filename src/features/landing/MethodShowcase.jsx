import { useState } from 'react';
import { METHOD_INFO, METHODS } from '@/utils/constants';
import './MethodShowcase.css';

const methodKeys = Object.keys(METHOD_INFO);

export default function MethodShowcase() {
  const [activeMethod, setActiveMethod] = useState(METHODS.MIND_MAP);
  const info = METHOD_INFO[activeMethod];

  return (
    <section className="landing-section method-section" id="methods">
      <div className="container">
        <div className="text-center">
          <span className="section-label">🎯 6+ Metode Belajar</span>
          <h2 className="section-title">
            Bukan Sekadar <span className="gradient-text">AI Wrapper</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-10)' }}>
            Informasi yang sama, disusun ulang otomatis ke metode belajar pilihan Anda
          </p>
        </div>

        {/* Method tabs */}
        <div className="method-tabs">
          {methodKeys.map((key) => {
            const m = METHOD_INFO[key];
            return (
              <button
                key={key}
                className={`method-tab ${activeMethod === key ? 'active' : ''}`}
                onClick={() => setActiveMethod(key)}
                style={activeMethod === key ? { borderColor: m.color, color: m.color } : {}}
              >
                <span className="method-tab-icon">{m.icon}</span>
                <span className="method-tab-label">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preview area */}
        <div className="method-preview animate-fade-in" key={activeMethod}>
          <div className="method-preview-header">
            <div className="method-preview-dot" style={{ background: info.color }} />
            <h3 style={{ color: info.color }}>{info.label}</h3>
          </div>
          <p className="method-preview-desc">{info.description}</p>

          {/* Visual representation per method */}
          <div className="method-visual">
            {activeMethod === METHODS.MIND_MAP && <MindMapPreview />}
            {activeMethod === METHODS.CORNELL && <CornellPreview />}
            {activeMethod === METHODS.BOXING && <BoxingPreview />}
            {activeMethod === METHODS.CHARTING && <ChartingPreview />}
            {activeMethod === METHODS.ZETTELKASTEN && <ZettelkastenPreview />}
            {activeMethod === METHODS.SKETCHNOTING && <SketchnotingPreview />}
            {activeMethod === METHODS.FEYNMAN && <FeynmanPreview />}
          </div>
        </div>
      </div>
    </section>
  );
}

function MindMapPreview() {
  return (
    <div className="preview-mindmap">
      <div className="pm-root">Konsep Utama</div>
      <div className="pm-node pm-n1">Sub-topik A</div>
      <div className="pm-node pm-n2">Sub-topik B</div>
      <div className="pm-node pm-n3">Detail 1</div>
      <div className="pm-node pm-n4">Detail 2</div>
    </div>
  );
}

function CornellPreview() {
  return (
    <div className="preview-cornell">
      <div className="pc-cues">
        <div className="pc-cue-item">Kata Kunci 1</div>
        <div className="pc-cue-item">Kata Kunci 2</div>
      </div>
      <div className="pc-notes">
        <div className="pc-note-line" />
        <div className="pc-note-line short" />
        <div className="pc-note-line" />
      </div>
      <div className="pc-summary">Ringkasan materi...</div>
    </div>
  );
}

function BoxingPreview() {
  return (
    <div className="preview-boxing">
      <div className="pb-box" style={{ borderColor: 'var(--accent-teal)' }}>
        <span className="pb-label">Topik A</span>
        <div className="pb-item" /><div className="pb-item" />
      </div>
      <div className="pb-box" style={{ borderColor: 'var(--accent-purple)' }}>
        <span className="pb-label">Topik B</span>
        <div className="pb-item" /><div className="pb-item" />
      </div>
    </div>
  );
}

function ChartingPreview() {
  return (
    <div className="preview-chart">
      <div className="pch-header"><span>Kategori</span><span>Variabel A</span><span>Variabel B</span></div>
      <div className="pch-row"><span>Item 1</span><span className="pch-cell" /><span className="pch-cell" /></div>
      <div className="pch-row"><span>Item 2</span><span className="pch-cell" /><span className="pch-cell" /></div>
    </div>
  );
}

function ZettelkastenPreview() {
  return (
    <div className="preview-zettel">
      <div className="pz-note" style={{ top: '10%', left: '15%' }}><span className="pz-id">1a</span> Ide Utama</div>
      <div className="pz-note" style={{ top: '35%', left: '55%' }}><span className="pz-id">1b</span> Terhubung</div>
      <div className="pz-note" style={{ top: '65%', left: '25%' }}><span className="pz-id">2a</span> Referensi</div>
    </div>
  );
}

function SketchnotingPreview() {
  return (
    <div className="preview-sketch">
      <div className="ps-big">🎨 Judul Besar</div>
      <div className="ps-med">📌 Poin Penting</div>
      <div className="ps-small">💡 Detail kecil</div>
      <div className="ps-small">🔗 Catatan tambahan</div>
    </div>
  );
}

function FeynmanPreview() {
  return (
    <div className="preview-feynman">
      <div className="pf-step pf-concept">📘 The Concept</div>
      <div className="pf-arrow">↓</div>
      <div className="pf-step pf-simple">💬 Simple Explanation</div>
      <div className="pf-arrow">↓</div>
      <div className="pf-step pf-gap">❓ Gap Identification</div>
      <div className="pf-arrow">↓</div>
      <div className="pf-step pf-analogy">🔄 Analogy</div>
    </div>
  );
}
