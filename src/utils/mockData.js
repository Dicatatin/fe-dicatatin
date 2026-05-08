/**
 * Mock data for all 7 note-taking methods.
 * Each method returns { nodes, edges, flashcards }.
 */
import { METHODS } from './constants';

// ── Mind Map ──
export function getMindMapMockData() {
  const nodes = [
    { id: 'mm1', type: 'mindMapRoot', position: { x: 305, y: 48 }, data: { label: 'Biologi Sel' } },
    { id: 'mm2', type: 'mindMapBranch', position: { x: 135, y: 182 }, data: { label: 'Mitosis', depth: 1 } },
    { id: 'mm3', type: 'mindMapBranch', position: { x: 455, y: 182 }, data: { label: 'Meiosis', depth: 1 } },
    { id: 'mm4', type: 'mindMapBranch', position: { x: 54, y: 332 }, data: { label: 'Profase', depth: 2 } },
    { id: 'mm5', type: 'mindMapBranch', position: { x: 214, y: 332 }, data: { label: 'Metafase', depth: 2 } },
    { id: 'mm6', type: 'mindMapBranch', position: { x: 394, y: 332 }, data: { label: 'Meiosis I', depth: 2 } },
    { id: 'mm7', type: 'mindMapBranch', position: { x: 554, y: 332 }, data: { label: 'Meiosis II', depth: 2 } },
    { id: 'mm8', type: 'mindMapBranch', position: { x: 26, y: 472 }, data: { label: 'Kromosom kondensasi', depth: 3 } },
    { id: 'mm9', type: 'mindMapBranch', position: { x: 190, y: 472 }, data: { label: 'Kromosom di equator', depth: 3 } },
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
  const CW = 200; // cue width area
  const NX = CW + 30; // notes X start
  const nodes = [
    { id: 'cc1', type: 'cornellCue', position: { x: 20, y: 30 }, data: { label: 'Fotosintesis' } },
    { id: 'cn1', type: 'cornellNote', position: { x: NX, y: 20 }, data: { label: 'Proses di mana tumbuhan mengubah cahaya matahari, air, dan CO₂ menjadi glukosa dan O₂.\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' } },
    { id: 'cc2', type: 'cornellCue', position: { x: 20, y: 150 }, data: { label: 'Reaksi Terang' } },
    { id: 'cn2', type: 'cornellNote', position: { x: NX, y: 140 }, data: { label: 'Terjadi di tilakoid. Membutuhkan cahaya. Menghasilkan ATP, NADPH, dan O₂.' } },
    { id: 'cc3', type: 'cornellCue', position: { x: 20, y: 270 }, data: { label: 'Siklus Calvin' } },
    { id: 'cn3', type: 'cornellNote', position: { x: NX, y: 260 }, data: { label: 'Terjadi di stroma. Tidak membutuhkan cahaya langsung. Fiksasi CO₂ menjadi G3P → Glukosa.' } },
    { id: 'cs1', type: 'cornellSummary', position: { x: 20, y: 420 }, data: { label: 'Fotosintesis terdiri dari 2 tahap: reaksi terang (tilakoid → ATP, NADPH) dan siklus Calvin (stroma → glukosa). Keduanya saling bergantung.' } },
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
    { id: 'bg1', type: 'boxingGroup', position: { x: 20, y: 20 }, data: { label: 'Sistem Pencernaan', colorIndex: 0, width: 340, height: 200 } },
    { id: 'bc1', type: 'boxingChild', position: { x: 15, y: 45 }, data: { label: 'Mulut: pencernaan mekanik + enzim amilase' }, parentId: 'bg1', extent: 'parent' },
    { id: 'bc2', type: 'boxingChild', position: { x: 15, y: 95 }, data: { label: 'Lambung: HCl + pepsin' }, parentId: 'bg1', extent: 'parent' },
    { id: 'bc3', type: 'boxingChild', position: { x: 15, y: 145 }, data: { label: 'Usus halus: penyerapan nutrisi' }, parentId: 'bg1', extent: 'parent' },
    { id: 'bg2', type: 'boxingGroup', position: { x: 400, y: 20 }, data: { label: 'Sistem Pernapasan', colorIndex: 1, width: 340, height: 200 } },
    { id: 'bc4', type: 'boxingChild', position: { x: 15, y: 45 }, data: { label: 'Hidung → Faring → Laring → Trakea' }, parentId: 'bg2', extent: 'parent' },
    { id: 'bc5', type: 'boxingChild', position: { x: 15, y: 95 }, data: { label: 'Bronkus → Bronkiolus → Alveolus' }, parentId: 'bg2', extent: 'parent' },
    { id: 'bc6', type: 'boxingChild', position: { x: 15, y: 145 }, data: { label: 'Pertukaran gas O₂ dan CO₂ di alveolus' }, parentId: 'bg2', extent: 'parent' },
    { id: 'bg3', type: 'boxingGroup', position: { x: 20, y: 260 }, data: { label: 'Sistem Peredaran Darah', colorIndex: 2, width: 340, height: 180 } },
    { id: 'bc7', type: 'boxingChild', position: { x: 15, y: 45 }, data: { label: 'Jantung: pompa darah ke seluruh tubuh' }, parentId: 'bg3', extent: 'parent' },
    { id: 'bc8', type: 'boxingChild', position: { x: 15, y: 95 }, data: { label: 'Arteri, Vena, Kapiler' }, parentId: 'bg3', extent: 'parent' },
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

  const nodes = [];
  headers.forEach((h, col) => {
    nodes.push({
      id: `ch-0-${col}`,
      type: 'chartingCell',
      position: { x: 40 + col * (W + GAP), y: 30 },
      data: { label: h, isHeader: true, cellWidth: W, cellHeight: H },
    });
  });
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      nodes.push({
        id: `ch-${ri + 1}-${ci}`,
        type: 'chartingCell',
        position: { x: 40 + ci * (W + GAP), y: 30 + (ri + 1) * (H + GAP) },
        data: { label: cell, isRowHeader: ci === 0, cellWidth: W, cellHeight: H },
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
    { id: 'z1', type: 'zettel', position: { x: 300, y: 30 }, data: { label: 'Evolusi Darwin', zettelId: '1', isIndex: true } },
    { id: 'z2', type: 'zettel', position: { x: 100, y: 160 }, data: { label: 'Seleksi alam: organisme dengan sifat menguntungkan lebih survive', zettelId: '1a' } },
    { id: 'z3', type: 'zettel', position: { x: 450, y: 160 }, data: { label: 'Variasi genetik: mutasi, rekombinasi', zettelId: '1b' } },
    { id: 'z4', type: 'zettel', position: { x: 50, y: 300 }, data: { label: 'Survival of the fittest ≠ terkuat, tapi paling adaptif', zettelId: '1a1' } },
    { id: 'z5', type: 'zettel', position: { x: 300, y: 300 }, data: { label: 'Spesiasi: populasi terisolasi → spesies baru', zettelId: '2' } },
    { id: 'z6', type: 'zettel', position: { x: 530, y: 300 }, data: { label: 'Bukti evolusi: fosil, homologi, embriologi', zettelId: '3' } },
  ];
  const edges = [
    { id: 'ez1-2', source: 'z1', target: 'z2', type: 'step', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B' } },
    { id: 'ez1-3', source: 'z1', target: 'z3', type: 'step', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B' } },
    { id: 'ez2-4', source: 'z2', target: 'z4', type: 'step', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#FBBF24' } },
    { id: 'ez2-5', source: 'z2', target: 'z5', type: 'step', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#FBBF24' } },
    { id: 'ez3-6', source: 'z3', target: 'z6', type: 'step', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#FBBF24' } },
  ];
  const flashcards = [
    { id: 'fc1', question: 'Apa arti "survival of the fittest"?', answer: 'Bukan terkuat, tapi organisme paling adaptif terhadap lingkungannya.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Sketchnoting ──
export function getSketchnotingMockData() {
  const nodes = [
    { id: 'sk1', type: 'sketchnote', position: { x: 200, y: 20 }, data: { label: 'Tata Surya', importance: 'large', icon: 'star', iconColor: '#F59E0B' } },
    { id: 'sk2', type: 'sketchnote', position: { x: 60, y: 140 }, data: { label: 'Matahari: bintang pusat', importance: 'medium', icon: 'lightbulb', iconColor: '#EF4444' } },
    { id: 'sk3', type: 'sketchnote', position: { x: 380, y: 140 }, data: { label: 'Planet Dalam vs Luar', importance: 'medium', icon: 'layers', iconColor: '#3B82F6' } },
    { id: 'sk4', type: 'sketchnote', position: { x: 30, y: 270 }, data: { label: 'Merkurius, Venus, Bumi, Mars', importance: 'small', icon: 'target', iconColor: '#2DD4BF' } },
    { id: 'sk5', type: 'sketchnote', position: { x: 350, y: 270 }, data: { label: 'Jupiter, Saturnus, Uranus, Neptunus', importance: 'small', icon: 'target', iconColor: '#A78BFA' } },
    { id: 'sk6', type: 'sketchnote', position: { x: 180, y: 380 }, data: { label: 'Sabuk asteroid antara Mars & Jupiter', importance: 'small', icon: 'zap', iconColor: '#F97316' } },
  ];
  const edges = [
    { id: 'esk1-2', source: 'sk1', target: 'sk2', type: 'smoothstep', style: { stroke: '#CBD5E1', strokeWidth: 2 } },
    { id: 'esk1-3', source: 'sk1', target: 'sk3', type: 'smoothstep', style: { stroke: '#CBD5E1', strokeWidth: 2 } },
    { id: 'esk3-4', source: 'sk3', target: 'sk4', type: 'smoothstep', style: { stroke: '#CBD5E1', strokeWidth: 1.5 } },
    { id: 'esk3-5', source: 'sk3', target: 'sk5', type: 'smoothstep', style: { stroke: '#CBD5E1', strokeWidth: 1.5 } },
    { id: 'esk4-6', source: 'sk4', target: 'sk6', type: 'smoothstep', style: { stroke: '#CBD5E1', strokeWidth: 1 } },
  ];
  const flashcards = [
    { id: 'fc1', question: 'Planet apa saja yang termasuk planet dalam?', answer: 'Merkurius, Venus, Bumi, Mars.' },
  ];
  return { nodes, edges, flashcards };
}

// ── Feynman ──
export function getFeynmanMockData() {
  const nodes = [
    { id: 'f1', type: 'feynmanStep', position: { x: 200, y: 30 }, data: { label: 'Hukum Newton: 3 hukum yang menjelaskan gerak benda.', step: 'concept' } },
    { id: 'f2', type: 'feynmanStep', position: { x: 200, y: 180 }, data: { label: 'Hukum 1: Benda diam tetap diam kecuali ada gaya. Hukum 2: F=ma. Hukum 3: Aksi-reaksi.', step: 'explain' } },
    { id: 'f3', type: 'feynmanStep', position: { x: 200, y: 350 }, data: { label: 'Belum paham: kapan Hukum 1 vs 2 digunakan? Bagaimana gaya gesek mempengaruhi?', step: 'gaps' } },
    { id: 'f4', type: 'feynmanStep', position: { x: 200, y: 520 }, data: { label: 'Bayangkan mendorong meja: makin berat (m besar), makin susah (a kecil) untuk F yang sama.', step: 'analogy' } },
    { id: 'f5', type: 'feynmanRefinement', position: { x: 560, y: 340 }, data: { label: 'Baca ulang bab gaya gesek statis vs kinetis' } },
    { id: 'f6', type: 'feynmanRefinement', position: { x: 560, y: 430 }, data: { label: 'Latihan soal diagram gaya bebas' } },
  ];
  const edges = [
    { id: 'ef1-2', source: 'f1', target: 'f2', type: 'default', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#3B82F6', strokeWidth: 3 } },
    { id: 'ef2-3', source: 'f2', target: 'f3', type: 'default', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#2DD4BF', strokeWidth: 3 } },
    { id: 'ef3-4', source: 'f3', target: 'f4', type: 'default', markerEnd: { type: 'arrowclosed' }, style: { stroke: '#F59E0B', strokeWidth: 3 } },
    { id: 'ef3-5', source: 'f3', target: 'f5', type: 'default', style: { stroke: '#FB923C', strokeWidth: 1.5, strokeDasharray: '6 3' } },
    { id: 'ef3-6', source: 'f3', target: 'f6', type: 'default', style: { stroke: '#FB923C', strokeWidth: 1.5, strokeDasharray: '6 3' } },
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
