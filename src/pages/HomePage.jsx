import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Grid, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { PipelineLoader } from '@/components/ui/Loader';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import { METHOD_INFO } from '@/utils/constants';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { workspaces, workspacesLoading, fetchWorkspaces } = useWorkspaceStore();
  const [showNewModal, setShowNewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStage, setPipelineStage] = useState('scanning');

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const filteredWorkspaces = workspaces.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartProcessing = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    setPipelineStage('scanning');

    // Simulate AI pipeline
    setTimeout(() => setPipelineStage('sanitizing'), 2000);
    setTimeout(() => setPipelineStage('visualizing'), 4000);
    setTimeout(() => {
      setIsProcessing(false);
      setShowNewModal(false);
      navigate('/workspace/new');
    }, 6000);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <div className="container">
          
          {/* AI Prompt Section - Replaces Modal */}
          <div className="ai-prompt-section glass-card">
            <h2 className="ai-prompt-title">
              <span className="gradient-text">Ubah Catatan Jadi Pengetahuan</span> ✨
            </h2>
            <p className="text-secondary mb-6">
              Upload foto catatan tanganmu dan biarkan AI menyusunnya menjadi struktur yang rapih.
            </p>
            
            {isProcessing ? (
              <div className="ai-processing-state">
                <PipelineLoader stage={pipelineStage} />
              </div>
            ) : (
              <div className="ai-prompt-container">
                {/* Upload area */}
                <div className="upload-area inline-upload" onClick={() => document.getElementById('file-upload')?.click()}>
                  {uploadedFile ? (
                    <div className="upload-preview inline-preview">
                      <img src={URL.createObjectURL(uploadedFile)} alt="Preview" />
                      <p className="text-sm font-medium mt-2">{uploadedFile.name}</p>
                      <button 
                        className="btn btn-ghost btn-sm mt-2" 
                        onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                      >
                        Ganti Foto
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon-wrapper">📷</div>
                      <p className="font-semibold mt-3">Upload Foto Catatan</p>
                      <p className="text-sm text-muted mt-1">JPG atau PNG — Drag & drop atau klik</p>
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{ display: 'none' }}
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  />
                </div>

                {/* Method selector inline */}
                <div className="inline-method-selector">
                  <h4 className="mb-3">Pilih Metode Belajar</h4>
                  <div className="method-selector-grid inline-grid">
                    {Object.entries(METHOD_INFO).map(([key, info]) => (
                      <div
                        key={key}
                        className={`method-option ${selectedMethod === key ? 'active' : ''}`}
                        onClick={() => setSelectedMethod(key)}
                        style={selectedMethod === key ? { borderColor: info.color, background: `${info.color}10` } : {}}
                      >
                        <span className="method-option-icon">{info.icon}</span>
                        <span className="method-option-label">{info.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button
                      disabled={!selectedMethod || !uploadedFile}
                      onClick={handleStartProcessing}
                      size="lg"
                    >
                      Mulai Proses AI ✨
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="divider mt-8 mb-8" />

          {/* Header */}
          <div className="home-header">
            <div>
              <h1 className="home-title">Library Catatan</h1>
              <p className="text-secondary">Kelola semua workspace catatan Anda</p>
            </div>
            
            {/* Search */}
            <div className="home-search">
              <Search size={18} className="home-search-icon" />
              <input
                type="text"
                placeholder="Cari catatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="home-search-input"
              />
            </div>
          </div>

          {/* Grid */}
          {workspacesLoading ? (
            <div className="home-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" style={{ height: '220px', borderRadius: 'var(--radius-lg)' }} />
              ))}
            </div>
          ) : filteredWorkspaces.length === 0 ? (
            <div className="home-empty">
              <Grid size={48} className="text-muted" />
              <h3>Belum ada catatan</h3>
              <p className="text-secondary">Mulai buat workspace baru menggunakan AI di atas.</p>
            </div>
          ) : (
            <div className="home-grid">
              {filteredWorkspaces.map((ws, i) => (
                <Card
                  key={ws.id}
                  padding="none"
                  className={`workspace-card animate-fade-in-up stagger-${i + 1}`}
                  onClick={() => navigate(`/workspace/${ws.id}`)}
                >
                  <div className="ws-card-thumb">
                    <div className="ws-card-thumb-placeholder">
                      <span style={{ fontSize: '32px' }}>{METHOD_INFO[ws.method]?.icon || '📝'}</span>
                    </div>
                  </div>
                  <div className="ws-card-info">
                    <h3 className="ws-card-title">{ws.name}</h3>
                    <div className="ws-card-meta">
                      <Badge method={ws.method} />
                      <span className="text-xs text-muted">{formatDate(ws.updatedAt)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
