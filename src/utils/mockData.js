/**
 * Mock data for all 7 note-taking methods.
 * Each method returns { nodes, edges, flashcards }.
 */
import { METHODS } from './constants';

const NOTE_THEMES = {
  biology: { background: '#F0FDF4', border: '#BBF7D0', title: '#166534' },
  cornell: { background: '#EFF6FF', border: '#BFDBFE', title: '#1D4ED8' },
  feynman: { background: '#FFF7ED', border: '#FED7AA', title: '#C2410C' },
  boxing: { background: '#F0FDFA', border: '#99F6E4', title: '#0F766E' },
  charting: { background: '#FEFCE8', border: '#FDE68A', title: '#A16207' },
  zettel: { background: '#FFFBEB', border: '#FCD34D', title: '#92400E' },
  sketch: { background: '#F8FAFC', border: '#CBD5E1', title: '#334155' },
};

function createPageFrame(prefix, title, themeKey) {
  const theme = NOTE_THEMES[themeKey] || NOTE_THEMES.biology;
  return [
    {
      id: `${prefix}-page-bg`,
      type: 'shape',
      position: { x: 28, y: 28 },
      zIndex: -100,
      data: {
        label: ' ',
        shapeType: 'rectangle',
        style: {
          width: 738,
          height: 1048,
          background: theme.background,
          border: `2px solid ${theme.border}`,
          borderRadius: '18px',
          pointerEvents: 'none',
        },
      },
      draggable: false,
      selectable: false,
    },
    {
      id: `${prefix}-title`,
      type: 'shape',
      position: { x: 58, y: 52 },
      zIndex: 20,
      data: {
        label: title,
        shapeType: 'text',
        style: {
          width: 680,
          height: 56,
          background: 'transparent',
          border: 'none',
          color: theme.title,
          fontSize: '26px',
          fontWeight: 800,
          justifyContent: 'flex-start',
          textAlign: 'left',
        },
      },
      style: {
        width: 680,
        height: 56,
        background: 'transparent',
        border: 'none',
        color: theme.title,
        fontSize: '26px',
        fontWeight: 800,
        justifyContent: 'flex-start',
        textAlign: 'left',
      },
    },
  ];
}

// ── Mind Map ──
export function getMindMapMockData() {
  const nodes = [
    ...createPageFrame('mm', 'Biologi Sel: Mitosis dan Meiosis', 'biology'),
    { id: 'mm1', type: 'mindMapRoot', position: { x: 305, y: 135 }, data: { label: 'Biologi Sel' }, zIndex: 10 },
    { id: 'mm2', type: 'mindMapBranch', position: { x: 135, y: 270 }, data: { label: 'Mitosis', depth: 1 }, zIndex: 10 },
    { id: 'mm3', type: 'mindMapBranch', position: { x: 455, y: 270 }, data: { label: 'Meiosis', depth: 1 }, zIndex: 10 },
    { id: 'mm4', type: 'mindMapBranch', position: { x: 54, y: 420 }, data: { label: 'Profase', depth: 2 }, zIndex: 10 },
    { id: 'mm5', type: 'mindMapBranch', position: { x: 214, y: 420 }, data: { label: 'Metafase', depth: 2 }, zIndex: 10 },
    { id: 'mm6', type: 'mindMapBranch', position: { x: 394, y: 420 }, data: { label: 'Meiosis I', depth: 2 }, zIndex: 10 },
    { id: 'mm7', type: 'mindMapBranch', position: { x: 554, y: 420 }, data: { label: 'Meiosis II', depth: 2 }, zIndex: 10 },
    { id: 'mm8', type: 'mindMapBranch', position: { x: 26, y: 560 }, data: { label: 'Kromosom kondensasi', depth: 3 }, zIndex: 10 },
    { id: 'mm9', type: 'mindMapBranch', position: { x: 190, y: 560 }, data: { label: 'Kromosom di equator', depth: 3 }, zIndex: 10 },
  ];
  const edges = [
    { id: 'e-mm1-2', source: 'mm1', target: 'mm2', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#93C5FD', strokeWidth: 2 } },
    { id: 'e-mm1-3', source: 'mm1', target: 'mm3', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#86EFAC', strokeWidth: 2 } },
    { id: 'e-mm2-4', source: 'mm2', target: 'mm4', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#93C5FD', strokeWidth: 1.5 } },
    { id: 'e-mm2-5', source: 'mm2', target: 'mm5', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#93C5FD', strokeWidth: 1.5 } },
    { id: 'e-mm3-6', source: 'mm3', target: 'mm6', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#86EFAC', strokeWidth: 1.5 } },
    { id: 'e-mm3-7', source: 'mm3', target: 'mm7', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#86EFAC', strokeWidth: 1.5 } },
    { id: 'e-mm4-8', source: 'mm4', target: 'mm8', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#FCD34D', strokeWidth: 1 } },
    { id: 'e-mm5-9', source: 'mm5', target: 'mm9', sourceHandle: 'bottom-source', targetHandle: 'top-target', type: 'smoothstep', style: { stroke: '#FCD34D', strokeWidth: 1 } },
  ];
  const flashcards = [
    { id: 'fc1', question: 'Apa perbedaan utama Mitosis dan Meiosis?', answer: 'Mitosis: 2 sel diploid identik. Meiosis: 4 sel haploid berbeda.' },
    { id: 'fc2', question: 'Sebutkan tahapan Mitosis!', answer: 'Profase → Metafase → Anafase → Telofase (PMAT).' },
    { id: 'fc3', question: 'Apa yang terjadi pada Profase?', answer: 'Kromosom mengalami kondensasi dan menjadi terlihat.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Cornell ──
export function getCornellMockData() {
  const CW = 190;
  const NX = 270;
  const headingStyle = {
    background: 'transparent',
    border: 'none',
    color: '#1D4ED8',
    fontSize: '13px',
    fontWeight: 800,
    justifyContent: 'flex-start',
    textAlign: 'left',
  };
  const nodes = [
    ...createPageFrame('cn', 'Fotosintesis - Cornell Notes', 'cornell'),
    { id: 'cornell-cue-heading', type: 'shape', position: { x: 58, y: 130 }, data: { label: 'CUE', shapeType: 'text', style: { ...headingStyle, width: 170, height: 28 } }, style: { ...headingStyle, width: 170, height: 28 }, zIndex: 10 },
    { id: 'cornell-notes-heading', type: 'shape', position: { x: NX, y: 130 }, data: { label: 'NOTES', shapeType: 'text', style: { ...headingStyle, width: 440, height: 28 } }, style: { ...headingStyle, width: 440, height: 28 }, zIndex: 10 },
    { id: 'cc1', type: 'cornellCue', position: { x: 58, y: 172 }, data: { label: 'Fotosintesis' }, style: { width: CW, textAlign: 'left' }, zIndex: 10 },
    { id: 'cn1', type: 'cornellNote', position: { x: NX, y: 164 }, data: { label: 'Tumbuhan mengubah cahaya matahari, air, dan CO2 menjadi glukosa dan O2.\n6CO2 + 6H2O -> C6H12O6 + 6O2' }, style: { width: 455, minHeight: 96, textAlign: 'left' }, zIndex: 10 },
    { id: 'cc2', type: 'cornellCue', position: { x: 58, y: 292 }, data: { label: 'Reaksi Terang' }, style: { width: CW, textAlign: 'left' }, zIndex: 10 },
    { id: 'cn2', type: 'cornellNote', position: { x: NX, y: 286 }, data: { label: 'Terjadi di tilakoid, membutuhkan cahaya, menghasilkan ATP, NADPH, dan O2.' }, style: { width: 455, minHeight: 72, textAlign: 'left' }, zIndex: 10 },
    { id: 'cc3', type: 'cornellCue', position: { x: 58, y: 398 }, data: { label: 'Siklus Calvin' }, style: { width: CW, textAlign: 'left' }, zIndex: 10 },
    { id: 'cn3', type: 'cornellNote', position: { x: NX, y: 390 }, data: { label: 'Terjadi di stroma. Tidak membutuhkan cahaya langsung. Fiksasi CO2 menjadi G3P lalu glukosa.' }, style: { width: 455, minHeight: 80, textAlign: 'left' }, zIndex: 10 },
    { id: 'cornell-summary-heading', type: 'shape', position: { x: 58, y: 535 }, data: { label: 'SUMMARY', shapeType: 'text', style: { ...headingStyle, width: 680, height: 28 } }, style: { ...headingStyle, width: 680, height: 28 }, zIndex: 10 },
    { id: 'cs1', type: 'cornellSummary', position: { x: 58, y: 578 }, data: { label: 'Fotosintesis terdiri dari dua tahap yang saling bergantung: reaksi terang membuat ATP dan NADPH, lalu siklus Calvin memakai energi itu untuk membentuk glukosa.' }, style: { width: 668, minHeight: 105, textAlign: 'left' }, zIndex: 10 },
  ];
  const edges = [];
  const flashcards = [
    { id: 'fc1', question: 'Di mana reaksi terang terjadi?', answer: 'Di membran tilakoid kloroplas.' },
    { id: 'fc2', question: 'Apa produk siklus Calvin?', answer: 'G3P (gliseraldehida-3-fosfat) → Glukosa.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Boxing ──
export function getBoxingMockData() {
  const nodes = [
    ...createPageFrame('bx', 'Sistem Tubuh Manusia - Boxing Method', 'boxing'),
    { id: 'bg1', type: 'boxingGroup', position: { x: 58, y: 140 }, data: { label: 'Sistem Pencernaan', colorIndex: 0, width: 318, height: 230 }, zIndex: 10 },
    { id: 'bc1', type: 'boxingChild', position: { x: 18, y: 54 }, data: { label: 'Mulut: pencernaan mekanik dan enzim amilase' }, style: { width: 282, height: 42, textAlign: 'left' }, parentId: 'bg1', extent: 'parent', zIndex: 11 },
    { id: 'bc2', type: 'boxingChild', position: { x: 18, y: 108 }, data: { label: 'Lambung: HCl dan pepsin memecah protein' }, style: { width: 282, height: 42, textAlign: 'left' }, parentId: 'bg1', extent: 'parent', zIndex: 11 },
    { id: 'bc3', type: 'boxingChild', position: { x: 18, y: 162 }, data: { label: 'Usus halus: penyerapan nutrisi utama' }, style: { width: 282, height: 42, textAlign: 'left' }, parentId: 'bg1', extent: 'parent', zIndex: 11 },
    { id: 'bg2', type: 'boxingGroup', position: { x: 418, y: 140 }, data: { label: 'Sistem Pernapasan', colorIndex: 1, width: 318, height: 230 }, zIndex: 10 },
    { id: 'bc4', type: 'boxingChild', position: { x: 18, y: 54 }, data: { label: 'Hidung -> faring -> laring -> trakea' }, style: { width: 282, height: 42, textAlign: 'left' }, parentId: 'bg2', extent: 'parent', zIndex: 11 },
    { id: 'bc5', type: 'boxingChild', position: { x: 18, y: 108 }, data: { label: 'Bronkus -> bronkiolus -> alveolus' }, style: { width: 282, height: 42, textAlign: 'left' }, parentId: 'bg2', extent: 'parent', zIndex: 11 },
    { id: 'bc6', type: 'boxingChild', position: { x: 18, y: 162 }, data: { label: 'Pertukaran O2 dan CO2 terjadi di alveolus' }, style: { width: 282, height: 42, textAlign: 'left' }, parentId: 'bg2', extent: 'parent', zIndex: 11 },
    { id: 'bg3', type: 'boxingGroup', position: { x: 58, y: 420 }, data: { label: 'Sistem Peredaran Darah', colorIndex: 2, width: 678, height: 190 }, zIndex: 10 },
    { id: 'bc7', type: 'boxingChild', position: { x: 22, y: 58 }, data: { label: 'Jantung memompa darah ke paru-paru dan seluruh tubuh' }, style: { width: 305, height: 46, textAlign: 'left' }, parentId: 'bg3', extent: 'parent', zIndex: 11 },
    { id: 'bc8', type: 'boxingChild', position: { x: 350, y: 58 }, data: { label: 'Arteri, vena, dan kapiler membentuk jaringan transportasi' }, style: { width: 305, height: 46, textAlign: 'left' }, parentId: 'bg3', extent: 'parent', zIndex: 11 },
  ];
  const edges = [];
  const flashcards = [
    { id: 'fc1', question: 'Apa fungsi enzim amilase?', answer: 'Memecah pati menjadi maltosa di mulut.' },
    { id: 'fc2', question: 'Di mana pertukaran gas terjadi?', answer: 'Di alveolus paru-paru.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Charting ──
export function getChartingMockData() {
  const W = 150, H = 50, GAP = 2;
  const headers = ['Aspek', 'Mitosis', 'Meiosis'];
  const rows = [
    ['Jumlah Pembelahan', '1 kali', '2 kali'],
    ['Hasil', '2 sel diploid', '4 sel haploid'],
    ['Fungsi', 'Pertumbuhan', 'Reproduksi seksual'],
    ['Crossing Over', 'Tidak ada', 'Ada (Profase I)'],
  ];

  const nodes = createPageFrame('ch', 'Mitosis vs Meiosis - Charting', 'charting');
  headers.forEach((h, col) => {
    nodes.push({
      id: `ch-0-${col}`,
      type: 'chartingCell',
      position: { x: 170 + col * (W + GAP), y: 150 },
      data: { label: h, isHeader: true, cellWidth: W, cellHeight: H },
      zIndex: 10,
    });
  });
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      nodes.push({
        id: `ch-${ri + 1}-${ci}`,
        type: 'chartingCell',
        position: { x: 170 + ci * (W + GAP), y: 150 + (ri + 1) * (H + GAP) },
        data: { label: cell, isRowHeader: ci === 0, cellWidth: W, cellHeight: H },
        zIndex: 10,
      });
    });
  });

  const flashcards = [
    { id: 'fc1', question: 'Berapa sel yang dihasilkan mitosis?', answer: '2 sel diploid identik.' },
    { id: 'fc2', question: 'Kapan crossing over terjadi?', answer: 'Pada Profase I meiosis.' },
  ];
  return { nodes, edges: [], flashcards };
}

// ── Zettelkasten ──
export function getZettelkastenMockData() {
  const nodes = [
    ...createPageFrame('zk', 'Evolusi Darwin - Zettelkasten', 'zettel'),
    { id: 'z1', type: 'zettel', position: { x: 302, y: 140 }, data: { label: 'Index: Evolusi Darwin', zettelId: '1', isIndex: true }, style: { width: 190, minHeight: 72, textAlign: 'left' }, zIndex: 10 },
    { id: 'z2', type: 'zettel', position: { x: 92, y: 270 }, data: { label: 'Seleksi alam memilih sifat yang meningkatkan peluang bertahan hidup.', zettelId: '1a' }, style: { width: 220, minHeight: 92, textAlign: 'left' }, zIndex: 10 },
    { id: 'z3', type: 'zettel', position: { x: 482, y: 270 }, data: { label: 'Variasi genetik muncul dari mutasi dan rekombinasi.', zettelId: '1b' }, style: { width: 220, minHeight: 92, textAlign: 'left' }, zIndex: 10 },
    { id: 'z4', type: 'zettel', position: { x: 74, y: 450 }, data: { label: 'Survival of the fittest berarti paling adaptif, bukan paling kuat.', zettelId: '1a1' }, style: { width: 220, minHeight: 92, textAlign: 'left' }, zIndex: 10 },
    { id: 'z5', type: 'zettel', position: { x: 292, y: 530 }, data: { label: 'Spesiasi terjadi ketika populasi terisolasi berubah menjadi spesies baru.', zettelId: '2' }, style: { width: 220, minHeight: 98, textAlign: 'left' }, zIndex: 10 },
    { id: 'z6', type: 'zettel', position: { x: 510, y: 450 }, data: { label: 'Bukti evolusi: fosil, homologi organ, embriologi, dan DNA.', zettelId: '3' }, style: { width: 220, minHeight: 92, textAlign: 'left' }, zIndex: 10 },
  ];
  const edges = [
    { id: 'ez1-2', source: 'z1', target: 'z2', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#D97706', strokeWidth: 2 } },
    { id: 'ez1-3', source: 'z1', target: 'z3', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#D97706', strokeWidth: 2 } },
    { id: 'ez2-4', source: 'z2', target: 'z4', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B', strokeWidth: 1.8 } },
    { id: 'ez2-5', source: 'z2', target: 'z5', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B', strokeWidth: 1.8, strokeDasharray: '6 4' } },
    { id: 'ez3-6', source: 'z3', target: 'z6', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B', strokeWidth: 1.8 } },
    { id: 'ez6-5', source: 'z6', target: 'z5', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#FBBF24', strokeWidth: 1.5, strokeDasharray: '6 4' } },
  ];
  const flashcards = [
    { id: 'fc1', question: 'Apa arti "survival of the fittest"?', answer: 'Bukan terkuat, tapi organisme paling adaptif terhadap lingkungannya.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Sketchnoting ──
export function getSketchnotingMockData() {
  const nodes = [
    ...createPageFrame('sk', 'Tata Surya - Sketchnoting', 'sketch'),
    { id: 'sk1', type: 'sketchnote', position: { x: 270, y: 145 }, data: { label: 'Tata Surya', importance: 'large', icon: 'star', iconColor: '#F59E0B' }, style: { transform: 'rotate(-2deg)' }, zIndex: 10 },
    { id: 'sk2', type: 'sketchnote', position: { x: 90, y: 265 }, data: { label: 'Matahari\nbintang pusat', importance: 'medium', icon: 'lightbulb', iconColor: '#EF4444' }, style: { width: 210, textAlign: 'left', transform: 'rotate(2deg)' }, zIndex: 10 },
    { id: 'sk3', type: 'sketchnote', position: { x: 488, y: 265 }, data: { label: 'Planet\nDalam vs Luar', importance: 'medium', icon: 'layers', iconColor: '#3B82F6' }, style: { width: 210, textAlign: 'left', transform: 'rotate(-1deg)' }, zIndex: 10 },
    { id: 'sk4', type: 'sketchnote', position: { x: 110, y: 440 }, data: { label: 'Dalam:\nMerkurius, Venus,\nBumi, Mars', importance: 'small', icon: 'target', iconColor: '#2DD4BF' }, style: { width: 220, textAlign: 'left', transform: 'rotate(-2deg)' }, zIndex: 10 },
    { id: 'sk5', type: 'sketchnote', position: { x: 465, y: 440 }, data: { label: 'Luar:\nJupiter, Saturnus,\nUranus, Neptunus', importance: 'small', icon: 'target', iconColor: '#A78BFA' }, style: { width: 230, textAlign: 'left', transform: 'rotate(2deg)' }, zIndex: 10 },
    { id: 'sk6', type: 'sketchnote', position: { x: 270, y: 610 }, data: { label: 'Sabuk asteroid\nantara Mars dan Jupiter', importance: 'small', icon: 'zap', iconColor: '#F97316' }, style: { width: 250, textAlign: 'left', transform: 'rotate(-1deg)' }, zIndex: 10 },
  ];
  const edges = [
    { id: 'esk1-2', source: 'sk1', target: 'sk2', type: 'smoothstep', style: { stroke: '#64748B', strokeWidth: 2.2, strokeDasharray: '8 4' } },
    { id: 'esk1-3', source: 'sk1', target: 'sk3', type: 'smoothstep', style: { stroke: '#64748B', strokeWidth: 2.2, strokeDasharray: '8 4' } },
    { id: 'esk3-4', source: 'sk3', target: 'sk4', type: 'smoothstep', style: { stroke: '#94A3B8', strokeWidth: 1.8, strokeDasharray: '5 4' } },
    { id: 'esk3-5', source: 'sk3', target: 'sk5', type: 'smoothstep', style: { stroke: '#94A3B8', strokeWidth: 1.8, strokeDasharray: '5 4' } },
    { id: 'esk4-6', source: 'sk4', target: 'sk6', type: 'smoothstep', style: { stroke: '#CBD5E1', strokeWidth: 1.5, strokeDasharray: '4 5' } },
  ];
  const flashcards = [
    { id: 'fc1', question: 'Planet apa saja yang termasuk planet dalam?', answer: 'Merkurius, Venus, Bumi, Mars.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Feynman ──
export function getFeynmanMockData() {
  const nodes = [
    ...createPageFrame('fy', 'Hukum Newton - Feynman Method', 'feynman'),
    { id: 'f1', type: 'feynmanStep', position: { x: 210, y: 140 }, data: { label: 'Hukum Newton menjelaskan hubungan gaya dan gerak benda.', step: 'concept' }, style: { width: 375, textAlign: 'left' }, zIndex: 10 },
    { id: 'f2', type: 'feynmanStep', position: { x: 210, y: 290 }, data: { label: 'Hukum 1: benda mempertahankan keadaan geraknya. Hukum 2: F = m x a. Hukum 3: setiap aksi punya reaksi sama besar berlawanan arah.', step: 'explain' }, style: { width: 375, textAlign: 'left' }, zIndex: 10 },
    { id: 'f3', type: 'feynmanStep', position: { x: 210, y: 470 }, data: { label: 'Gap: kapan memakai Hukum 1 atau 2? Bagaimana gaya gesek mengubah percepatan?', step: 'gaps' }, style: { width: 375, textAlign: 'left' }, zIndex: 10 },
    { id: 'f4', type: 'feynmanStep', position: { x: 210, y: 660 }, data: { label: 'Analogi: meja berat lebih sulit dipercepat. Dengan gaya sama, massa lebih besar membuat percepatan lebih kecil.', step: 'analogy' }, style: { width: 375, textAlign: 'left' }, zIndex: 10 },
    { id: 'f5', type: 'feynmanRefinement', position: { x: 595, y: 470 }, data: { label: 'Baca ulang gaya gesek statis vs kinetis' }, style: { width: 145, color: '#9A3412', textAlign: 'left' }, zIndex: 10 },
    { id: 'f6', type: 'feynmanRefinement', position: { x: 595, y: 570 }, data: { label: 'Latihan soal diagram gaya bebas' }, style: { width: 145, color: '#9A3412', textAlign: 'left' }, zIndex: 10 },
  ];
  const edges = [
    { id: 'ef1-2', source: 'f1', target: 'f2', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#3B82F6', strokeWidth: 3 } },
    { id: 'ef2-3', source: 'f2', target: 'f3', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#2DD4BF', strokeWidth: 3 } },
    { id: 'ef3-4', source: 'f3', target: 'f4', type: 'smoothstep', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B', strokeWidth: 3 } },
    { id: 'ef3-5', source: 'f3', target: 'f5', type: 'smoothstep', style: { stroke: '#FB923C', strokeWidth: 1.8, strokeDasharray: '6 3' } },
    { id: 'ef3-6', source: 'f3', target: 'f6', type: 'smoothstep', style: { stroke: '#FB923C', strokeWidth: 1.8, strokeDasharray: '6 3' } },
  ];
  const flashcards = [
    { id: 'fc1', question: 'Apa rumus Hukum Newton ke-2?', answer: 'F = m × a (Gaya = massa × percepatan).' },
    { id: 'fc2', question: 'Apa contoh Hukum Newton ke-3?', answer: 'Saat mendorong tembok, tembok mendorong balik dengan gaya yang sama besar tapi arah berlawanan.' },
  ];
  return { nodes, edges, flashcards };
}

/**
 * Get mock data by method type
 */
export function getMockDataByMethod(method) {
  const map = {
    [METHODS.MIND_MAP]: getMindMapMockData,
    [METHODS.CORNELL]: getCornellMockData,
    [METHODS.BOXING]: getBoxingMockData,
    [METHODS.CHARTING]: getChartingMockData,
    [METHODS.ZETTELKASTEN]: getZettelkastenMockData,
    [METHODS.SKETCHNOTING]: getSketchnotingMockData,
    [METHODS.FEYNMAN]: getFeynmanMockData,
  };
  return (map[method] || getMindMapMockData)();
}
