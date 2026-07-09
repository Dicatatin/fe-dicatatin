import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Save, RotateCcw, Eye, Sparkles, LayoutDashboard, FileText } from 'lucide-react';
import { getHeroSection, updateHeroSection, resetHeroSection } from '@/services/cmsService';

const defaultHeroData = {
  titlePrefix: "Ubah Catatan Berantakan Menjadi ",
  titleHighlight: "Pengetahuan Terstruktur",
  titleSuffix: " dalam Hitungan Detik",
  subtitle: "Platform AI yang memahami tulisan tanganmu. Pilih dari 7 metode belajar dan transformasi catatanmu menjadi alat belajar aktif."
};

export default function CMSPage() {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(defaultHeroData);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Load existing hero text
  useEffect(() => {
    setLoading(true);
    getHeroSection()
      .then((data) => {
        if (data) {
          setHeroData(data);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat teks hero dari API, menggunakan fallback localStorage/default:', err);
        const saved = localStorage.getItem('dicatatin-hero-text');
        if (saved) {
          try {
            setHeroData(JSON.parse(saved));
          } catch (e) {
            console.error('Failed to parse hero text', e);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const updated = await updateHeroSection(heroData);
      if (updated) {
        setHeroData(updated);
        localStorage.setItem('dicatatin-hero-text', JSON.stringify(updated));
      }
      setSuccessMsg('Perubahan berhasil disimpan! Silakan periksa Halaman Utama untuk melihat hasilnya.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg('Gagal menyimpan perubahan ke server. Silakan coba lagi.');
      setTimeout(() => setErrorMsg(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan teks hero ke bawaan pabrik?')) {
      setLoading(true);
      setSuccessMsg('');
      setErrorMsg('');
      try {
        const resetData = await resetHeroSection();
        if (resetData) {
          setHeroData(resetData);
          localStorage.setItem('dicatatin-hero-text', JSON.stringify(resetData));
        } else {
          setHeroData(defaultHeroData);
          localStorage.removeItem('dicatatin-hero-text');
        }
        setSuccessMsg('Teks hero dikembalikan ke default.');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (err) {
        setErrorMsg('Gagal melakukan reset ke server. Silakan coba lagi.');
        setTimeout(() => setErrorMsg(''), 5000);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showAuth={false} />
      
      <main className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                <LayoutDashboard size={14} />
                Panel Admin CMS
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Kelola Konten Landing Page</h1>
              <p className="text-muted-foreground text-sm">Sesuaikan pesan utama pada Hero Section aplikasi Dicatat.in</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')} 
                className="font-medium"
              >
                Lihat Landing Page
              </Button>
            </div>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium text-sm text-center animate-in fade-in slide-in-from-top-1 duration-200">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive font-medium text-sm text-center animate-in fade-in slide-in-from-top-1 duration-200">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editor Panel */}
            <div className="lg:col-span-5">
              <Card className="border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Sparkles size={18} className="text-primary" />
                    Editor Teks Hero
                  </CardTitle>
                  <CardDescription>
                    Perubahan akan langsung terlihat pada panel preview di sebelah kanan.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title Prefix (Awal Judul)</label>
                      <Input
                        type="text"
                        placeholder="Contoh: Ubah Catatan Berantakan Menjadi "
                        value={heroData.titlePrefix}
                        onChange={(e) => setHeroData({ ...heroData, titlePrefix: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-primary">Title Highlight (Teks Gradien)</label>
                      <Input
                        type="text"
                        placeholder="Contoh: Pengetahuan Terstruktur"
                        value={heroData.titleHighlight}
                        onChange={(e) => setHeroData({ ...heroData, titleHighlight: e.target.value })}
                        className="border-primary/40 focus:border-primary"
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title Suffix (Akhir Judul)</label>
                      <Input
                        type="text"
                        placeholder="Contoh:  dalam Hitungan Detik"
                        value={heroData.titleSuffix}
                        onChange={(e) => setHeroData({ ...heroData, titleSuffix: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subtitle (Deskripsi)</label>
                      <textarea
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y"
                        placeholder="Masukkan deskripsi di bawah judul..."
                        value={heroData.subtitle}
                        onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleReset} 
                        className="flex-1"
                        icon={<RotateCcw size={16} />}
                        disabled={loading}
                      >
                        Reset Default
                      </Button>
                      
                      <Button 
                        type="submit" 
                        className="flex-1 shadow-lg shadow-primary/20"
                        icon={<Save size={16} />}
                        disabled={loading}
                      >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Live Preview Panel */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                <Eye size={14} className="text-primary animate-pulse" />
                Live Preview (Pratinjau Langsung)
              </div>
              
              <div className="border border-border rounded-2xl bg-card overflow-hidden shadow-2xl relative min-h-[480px] flex items-center p-8 md:p-12">
                {/* Simulated Hero background effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary/10 blur-[80px] rounded-full pointer-events-none -z-10" />
                
                <div className="w-full flex flex-col md:flex-row items-center gap-8 z-10">
                  <div className="flex-1 text-center md:text-left space-y-6">
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-[1.1]">
                      {heroData.titlePrefix}
                      <span className="bg-gradient-to-r from-primary via-blue-400 to-teal-400 bg-clip-text text-transparent">
                        {heroData.titleHighlight}
                      </span>
                      {heroData.titleSuffix}
                    </h2>
                    
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {heroData.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                      <Button size="sm" className="min-w-[120px] pointer-events-none">
                        Mulai Gratis
                      </Button>
                      <Button variant="outline" size="sm" className="min-w-[130px] pointer-events-none">
                        Lihat Cara Kerja
                      </Button>
                    </div>
                  </div>

                  {/* Tiny mockup card to visually represent the layout */}
                  <div className="w-full max-w-[220px] bg-background border border-border p-4 rounded-xl shadow-lg relative hidden md:block">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-primary mb-3 flex justify-between items-center">
                      <span>Sesudah</span>
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[6px]">Mind Map</span>
                    </div>
                    <div className="h-20 flex items-center justify-center relative bg-secondary/50 rounded-lg overflow-hidden border border-border">
                      <div className="bg-primary text-white text-[7px] font-bold px-2 py-1 rounded shadow-sm z-10">Biologi Sel</div>
                      <div className="absolute top-1 left-2 bg-background border border-border text-[6px] font-bold px-1 rounded shadow-sm">Mitosis</div>
                      <div className="absolute bottom-1 right-2 bg-background border border-border text-[6px] font-bold px-1 rounded shadow-sm">Meiosis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
