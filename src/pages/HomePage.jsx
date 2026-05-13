import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Grid, Search, Sparkles, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { PipelineLoader } from '@/components/ui/Loader';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import { createWorkspace, getWorkspace, deleteWorkspace } from '@/services/workspaceService';
import { METHOD_INFO } from '@/utils/constants';

export default function HomePage() {
  const navigate = useNavigate();
  const { workspaces, workspacesLoading, workspacesError, fetchWorkspaces } = useWorkspaceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStage, setPipelineStage] = useState('scanning');
  const [uploadError, setUploadError] = useState('');
  const [deletingWorkspaceId, setDeletingWorkspaceId] = useState(null);
  const [confirmDeleteWorkspace, setConfirmDeleteWorkspace] = useState(null);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const filteredWorkspaces = workspaces.filter((w) =>
    (w.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartProcessing = async () => {
    if (!selectedMethod || !uploadedFile) return;
    setIsProcessing(true);
    setPipelineStage('scanning');
    setUploadError('');

    const sanitizingTimer = setTimeout(() => setPipelineStage('sanitizing'), 1200);
    const visualizingTimer = setTimeout(() => setPipelineStage('visualizing'), 2400);

    try {
      const workspace = await createWorkspace({
        file: uploadedFile,
        method: selectedMethod,
        name: uploadedFile.name.replace(/\.[^/.]+$/, '') || 'Untitled Note',
      });

      let isReady = false;
      let attempt = 0;
      while (!isReady && attempt < 40) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        try {
          const updatedWorkspace = await getWorkspace(workspace.id);
          const hasContent = updatedWorkspace.nodes?.length > 0 || updatedWorkspace.edges?.length > 0 || updatedWorkspace.flashcards?.length > 0;
          if (hasContent) {
            isReady = true;
          }
        } catch (e) {
          // ignore getWorkspace error during polling
        }
        attempt++;
      }

      navigate(`/workspace/${workspace.id}`);
    } catch (error) {
      console.error('Failed to create workspace:', error);
      setUploadError(error.response?.data?.message || 'Gagal mengupload catatan. Coba lagi.');
      setIsProcessing(false);
    } finally {
      clearTimeout(sanitizingTimer);
      clearTimeout(visualizingTimer);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    if (!workspaceId) return;
    setConfirmDeleteWorkspace(workspaceId);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteWorkspace) return;
    setDeletingWorkspaceId(confirmDeleteWorkspace);
    setConfirmDeleteWorkspace(null);
    try {
      await deleteWorkspace(confirmDeleteWorkspace);
      await fetchWorkspaces();
    } catch (err) {
      console.error('Failed to delete workspace', err);
    } finally {
      setDeletingWorkspaceId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
          {/* AI Prompt Section */}
          <Card className="p-8 mb-6 text-center glass-card border-none">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Ubah Catatan Jadi Pengetahuan</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload foto catatan tanganmu dan biarkan AI menyusunnya menjadi struktur yang rapih.
            </p>
            
            {isProcessing ? (
              <div className="py-10">
                <PipelineLoader stage={pipelineStage} />
              </div>
            ) : (
              <div className="flex flex-col gap-6 text-left w-full max-w-[1100px] mx-auto">
                {/* Upload area */}
                <div 
                  className="bg-background border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-secondary/50 transition-all group" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  {uploadedFile ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(uploadedFile)} 
                        alt="Preview" 
                        className="max-h-[150px] rounded-lg shadow-md mb-4"
                      />
                      <p className="text-sm font-medium">{uploadedFile.name}</p>
                      <button 
                        className="mt-2 text-xs text-primary font-semibold hover:underline" 
                        onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                      >
                        Ganti Foto
                      </button>
                    </div>
                  ) : (
                    <>
                      <Camera size={44} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <p className="font-bold text-lg">Upload Foto Catatan</p>
                      <p className="text-sm text-muted-foreground mt-1">JPG atau PNG — Drag & drop atau klik</p>
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  />
                </div>

                {/* Method selector inline */}
                <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Grid size={18} className="text-primary" />
                    Pilih Metode Belajar
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {Object.entries(METHOD_INFO).map(([key, info]) => (
                      <div
                        key={key}
                        className={`flex flex-col items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all hover:bg-muted ${selectedMethod === key ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-border'}`}
                        onClick={() => setSelectedMethod(key)}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-tight text-center leading-tight mb-1" style={{ color: info.color }}>{info.label}</span>
                        <span className="text-[9px] font-medium text-center text-muted-foreground leading-tight">{info.description}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    {uploadError && (
                      <p className="mr-auto self-center text-sm font-medium text-destructive">
                        {uploadError}
                      </p>
                    )}
                    <Button
                      disabled={!selectedMethod || !uploadedFile}
                      onClick={handleStartProcessing}
                      size="lg"
                      className="px-8 shadow-lg shadow-primary/20"
                    >
                      Mulai Proses AI
                      <Sparkles size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <div className="border-t border-border my-12" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Library Catatan</h1>
              <p className="text-muted-foreground">Kelola semua workspace catatan Anda</p>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari catatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Grid */}
          {workspacesError ? (
            <div className="text-center py-16 px-8 flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold">Gagal memuat library</h3>
              <p className="text-muted-foreground max-w-md">{workspacesError}</p>
              <Button variant="outline" onClick={fetchWorkspaces}>Coba Lagi</Button>
            </div>
          ) : workspacesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="h-[220px] animate-pulse bg-muted/50 border-none" />
              ))}
            </div>
          ) : filteredWorkspaces.length === 0 ? (
            <div className="text-center py-20 px-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2">
                <Grid size={32} className="text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-bold">Belum ada catatan</h3>
              <p className="text-muted-foreground max-w-md">Mulai buat workspace baru menggunakan AI di atas untuk melihat catatan Anda di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredWorkspaces.map((ws) => (
                <Card
                  key={ws.id}
                  className="group overflow-hidden cursor-pointer border-border hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative"
                  onClick={() => navigate(`/workspace/${ws.id}`)}
                >
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground text-muted-foreground rounded-md backdrop-blur-sm transition-colors shadow-sm"
                      disabled={deletingWorkspaceId === ws.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkspace(ws.id);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="h-[140px] bg-gradient-to-br from-secondary/50 to-muted/30 flex items-center justify-center relative overflow-hidden">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-background/70 text-xl font-black opacity-60 group-hover:scale-125 transition-transform duration-500">
                      {METHOD_INFO[ws.method]?.icon || 'DC'}
                    </div>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4 px-5">
                    <h3 className="text-base font-bold mb-1 truncate group-hover:text-primary transition-colors">{ws.name}</h3>
                    <p className="text-[10px] text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                      {ws.nodes?.slice(0, 3).map(n => n.data?.label).filter(Boolean).join(' ').substring(0, 80) + (ws.nodes?.length > 0 ? '...' : 'Belum ada catatan')}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge method={ws.method} />
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{formatDate(ws.updatedAt)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!confirmDeleteWorkspace}
        onClose={() => setConfirmDeleteWorkspace(null)}
        className="max-w-md border-destructive/20"
      >
        <div className="flex flex-col items-center text-center pt-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
            <Trash2 size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Hapus Workspace</h3>
          <p className="text-muted-foreground mb-6">
            Apakah Anda yakin ingin menghapus workspace ini? Semua catatan di dalamnya akan hilang permanen.
          </p>
          <div className="flex w-full gap-3">
            <Button className="flex-1" variant="outline" onClick={() => setConfirmDeleteWorkspace(null)}>
              Batal
            </Button>
            <Button className="flex-1" variant="destructive" onClick={confirmDelete}>
              Ya, Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
