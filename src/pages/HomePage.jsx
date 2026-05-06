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
          {/* Header */}
          <div className="home-header">
            <div>
              <h1 className="home-title">Library Catatan</h1>
              <p className="text-secondary">Kelola semua workspace catatan Anda</p>
            </div>
            <Button onClick={() => setShowNewModal(true)} icon={<Plus size={18} />}>
              New Workspace
            </Button>
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
              <p className="text-secondary">Buat workspace baru untuk mulai transformasi catatan.</p>
              <Button onClick={() => setShowNewModal(true)} icon={<Plus size={18} />}>
                Buat Workspace Pertama
              </Button>
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

      {/* New Workspace Modal */}
      <Modal
        isOpen={showNewModal}
        onClose={() => { setShowNewModal(false); setIsProcessing(false); setSelectedMethod(null); setUploadedFile(null); }}
        title="Workspace Baru"
        size="lg"
      >
        {isProcessing ? (
          <PipelineLoader stage={pipelineStage} />
        ) : (
          <div className="new-ws-content">
            {/* Upload area */}
            <div className="upload-area" onClick={() => document.getElementById('file-upload')?.click()}>
              {uploadedFile ? (
                <div className="upload-preview">
                  <img src={URL.createObjectURL(uploadedFile)} alt="Preview" />
                  <p className="text-sm">{uploadedFile.name}</p>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: '36px' }}>📷</span>
                  <p className="font-semibold">Upload Foto Catatan</p>
                  <p className="text-sm text-muted">JPG atau PNG — Drag & drop atau klik</p>
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

            {/* Method selector */}
            <h4 style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>Pilih Metode</h4>
            <div className="method-selector-grid">
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

            <Button
              fullWidth
              disabled={!selectedMethod}
              onClick={handleStartProcessing}
              style={{ marginTop: 'var(--space-6)' }}
            >
              Proses dengan AI ✨
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
