/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Calendar, User, ArrowRight, Check, Plus, Filter, Image as ImageIcon, X } from 'lucide-react';
import { ProgressReport } from '../types';

interface ProgressTabProps {
  progressReports: ProgressReport[];
  onAddProgressReport: (newReport: Omit<ProgressReport, 'id' | 'date'>) => void;
}

const TEMPLATE_PHOTOS = [
  {
    category: 'Kubah',
    name: 'Kubah & Kaligrafi',
    url: 'https://images.unsplash.com/photo-1590076211181-4351cddc290c?auto=format&fit=crop&w=800&q=80',
    description: 'Interior ornamen kubah keemasan'
  },
  {
    category: 'Struktur',
    name: 'Scaffolding & Cor',
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    description: 'Bekisting dan rangka tiang penopang'
  },
  {
    category: 'Finishing',
    name: 'Pemasangan Bata & Plester',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Pengerjaan dinding presisi dan semen'
  },
  {
    category: 'Fasilitas',
    name: 'Instalasi Listrik & Pipa',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Peralatan mekanikal-elektrikal air kran'
  },
  {
    category: 'Lainnya',
    name: 'Paving Area Parkir',
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: 'Pengerasan lahan dasar luar halaman'
  }
];

interface ProgressTabProps {
  progressReports: ProgressReport[];
  onAddProgressReport: (newReport: Omit<ProgressReport, 'id' | 'date'>) => void;
  initialSubView?: 'logs' | 'ded';
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  progressReports,
  onAddProgressReport,
  initialSubView = 'ded'
}) => {
  const [subView, setSubView] = useState<'logs' | 'ded'>(initialSubView);

  React.useEffect(() => {
    if (initialSubView) {
      setSubView(initialSubView);
    }
  }, [initialSubView]);

  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'Masjid Utama' | 'Rumah Imam & Tempat Wudhu' | 'Gudang'>('Semua');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // DED Chart Data
  const dedCategories = [
    {
      title: "A. RENOVASI BANGUNAN UTAMA MASJID",
      budget: 1381043614,
      overallProgress: 78,
      items: [
        { name: "I. PEKERJAAN PONDASI DAN BETON (Borepile & Cakar Ayam)", cost: 747723713.80, progress: 100 },
        { name: "II. PEKERJAAN PASANGAN (Dinding Bata, Plester & GRC Ornamen)", cost: 579062779.60, progress: 58 },
        { name: "III. PEKERJAAN PINTU DAN JENDELA (Kusen Aluminium Cust.)", cost: 33283521.40, progress: 15 },
        { name: "IV. PEKERJAAN ELEKTRIKAL (Wiring & Jaringan Lampu)", cost: 20973600.00, progress: 30 }
      ]
    },
    {
      title: "B. RUMAH IMAM & TEMPAT WUDHU",
      budget: 157812330.26,
      overallProgress: 62,
      items: [
        { name: "I. PEKERJAAN PONDASI DAN BETON SLOOP", cost: 51625917.90, progress: 100 },
        { name: "II. PEKERJAAN PASANGAN DINDING & KERAMIK SEKAT", cost: 91808788.36, progress: 50 },
        { name: "III. PEKERJAAN PINTU DAN JENDELA", cost: 10453324.00, progress: 0 },
        { name: "IV. PEKERJAAN ELEKTRIKAL & TEKNIS SANITAIR", cost: 3924300.00, progress: 20 }
      ]
    },
    {
      title: "C. PEMBANGUNAN GUDANG MASJID",
      budget: 71134193.70,
      overallProgress: 42,
      items: [
        { name: "I. PEKERJAAN PONDASI DAN BETON COR", cost: 31593413.77, progress: 75 },
        { name: "II. PEKERJAAN PASANGAN BATAKO RINGAN & ATAP", cost: 30334500.93, progress: 20 },
        { name: "III. PEKERJAAN PINTU BESI LIPAT GUDANG", cost: 7999179.00, progress: 0 },
        { name: "IV. PEKERJAAN ELEKTRIKAL", cost: 1207100.00, progress: 0 }
      ]
    }
  ];

  const formattedRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Masjid Utama' | 'Rumah Imam & Tempat Wudhu' | 'Gudang'>('Masjid Utama');
  const [reporter, setReporter] = useState('Haji Ahmad Mudzakir (Ketua)');
  const [percentageBefore, setPercentageBefore] = useState(60);
  const [percentageAfter, setPercentageAfter] = useState(75);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(TEMPLATE_PHOTOS[1].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !reporter) return;

    onAddProgressReport({
      title,
      description,
      category,
      reporter,
      percentageBefore: Number(percentageBefore),
      percentageAfter: Number(percentageAfter),
      photoUrl: customPhotoUrl || selectedPhotoUrl
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setCategory('Masjid Utama');
    setPercentageBefore(60);
    setPercentageAfter(75);
    setCustomPhotoUrl('');
    setShowAddForm(false);
    setUploadSuccess(false);
  };

  const handleSimulatedFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      // Give a random Unsplash construction photo as uploaded file
      const randPhoto = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 9999999)}?auto=format&fit=crop&w=800&q=80`;
      setCustomPhotoUrl(randPhoto);
    }, 1500);
  };

  const filteredReports = progressReports.filter(r => 
    selectedFilter === 'Semua' ? true : r.category === selectedFilter
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Tab Splash Image Banner */}
      <div className="relative h-44 shrink-0 bg-deep overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1590076211181-4351cddc290c?auto=format&fit=crop&w=800&q=80"
          alt="Masjid"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] bg-sage/20 text-deep border border-sage/35 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Akuntabilitas Harian
          </span>
          <h2 className="serif text-xl font-bold text-deep tracking-tight mt-2">
            {subView === 'logs' ? 'Laporan Progres Harian' : 'Struktur Progres DED'}
          </h2>
          <p className="text-xs text-slate-755 leading-tight">
            {subView === 'logs' 
              ? 'Dokumentasi real-time pembangunan fisik Masjid An-Nur' 
              : 'Akuntabilitas bobot teknis fisik berdasarkan Rencana Anggaran Biaya'}
          </p>
        </div>
      </div>

      {/* Sub-View Navigation Segment */}
      <div className="grid grid-cols-2 gap-2 bg-sage/10 border border-sage/20 p-1 rounded-2xl select-none mx-4 mb-3 shrink-0">
        <button
          type="button"
          onClick={() => setSubView('ded')}
          id="tab-ded-progres"
          className={`py-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subView === 'ded' ? 'bg-white text-deep shadow-xs' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Progres Fisik (DED)
          <span className="block text-[8px] font-medium text-olive mt-0.5">Struktur Kerja 74.0%</span>
        </button>
        <button
          type="button"
          onClick={() => setSubView('logs')}
          className={`py-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subView === 'logs' ? 'bg-white text-deep shadow-xs' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Laporan Harian
          <span className="block text-[8px] font-medium text-slate-400 mt-0.5">Dokumentasi & Foto</span>
        </button>
      </div>

      {subView === 'ded' ? (
        /* DED CHART VIEW RENDERING */
        <div className="p-4 space-y-5 flex-1 select-none animate-fade-in">
          {/* Headline status info */}
          <div className="bg-deep text-white rounded-3xl p-4 card-shadow space-y-3 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-3 translate-y-3 scale-110">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/></svg>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest border border-white/5">
                Total Capaian Fisik
              </span>
              <span className="font-mono font-bold text-xs">Target: 100% lunas</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-mono tracking-tight leading-none block">74.0% Selesai</h3>
              <p className="text-[10px] text-cream opacity-90 mt-1">
                Akumulasi bobot realisasi kerja lapangan mencakup seluruh komponen gedung utama, sarana wudhu, dan pergudangan masjid.
              </p>
            </div>
            {/* ProgressBar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-amber-400 rounded-full transition-all duration-1000" style={{ width: '74%' }} />
            </div>
          </div>

          {/* Categories Render */}
          <div className="space-y-4">
            {dedCategories.map((cat, i) => (
              <div key={i} className="bg-white border border-sage/10 rounded-3xl p-4 card-shadow space-y-3">
                <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-xs text-slate-800 leading-snug max-w-[190px]">{cat.title}</h4>
                  <div className="text-right">
                    <span className="text-[10px] font-bold font-mono text-deep">{cat.overallProgress}%</span>
                    <span className="block text-[8px] text-slate-400 font-mono mt-0.5">{formattedRupiah(cat.budget)}</span>
                  </div>
                </div>

                {/* Sub items */}
                <div className="space-y-3">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10.5px] text-slate-700 leading-tight">
                        <span className="font-medium pr-2">{item.name}</span>
                        <div className="text-right shrink-0">
                          <strong className="font-mono text-slate-900">{item.progress}%</strong>
                          <span className="block font-mono text-slate-400 text-[8px] mt-0.5">{formattedRupiah(item.cost)}</span>
                        </div>
                      </div>

                      {/* Custom Horizontal Bar */}
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.progress === 100 
                              ? 'bg-deep' 
                              : item.progress >= 50 
                              ? 'bg-olive' 
                              : item.progress > 0 
                              ? 'bg-amber-400' 
                              : 'bg-slate-200'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ORIGINAL PROGRESS REPORTS STREAM VIEW */
        <div className="p-4 space-y-4 flex-1">
          {/* Filter Categories Grid - Utuh & No Horizontal Scroll */}
          <div className="grid grid-cols-2 gap-2 select-none w-full mb-1">
            {(['Semua', 'Masjid Utama', 'Rumah Imam & Tempat Wudhu', 'Gudang'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`py-2 px-2 border rounded-2xl text-[10.5px] font-bold text-center transition-all cursor-pointer leading-tight ${
                  selectedFilter === cat
                    ? 'bg-deep text-white border-deep shadow-sm font-extrabold'
                    : 'bg-white text-slate-500 hover:text-slate-800 border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reports Timeline List */}
          <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-sage/10 card-shadow p-6 text-slate-400 text-xs">
              Tidak ada laporan dalam kategori ini.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-3xl overflow-hidden card-shadow border border-sage/10 hover:shadow transition-shadow flex flex-col"
              >
                {/* Photo Display */}
                <div className="h-44 bg-slate-100 relative">
                  <img
                    src={report.photoUrl}
                    alt={report.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Badge category */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-deep/95 backdrop-blur-xs text-white text-[9px] font-bold rounded-lg uppercase tracking-wider">
                    {report.category}
                  </span>
                  {/* Date badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-slate-900/85 backdrop-blur-xs text-white rounded-lg flex items-center gap-1 shadow">
                    <Calendar size={10} />
                    <span className="text-[9px] font-mono font-bold">{report.date}</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-xs text-slate-900 leading-tight">
                    {report.title}
                  </h3>

                  {/* Percentage progression bar */}
                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100/50 flex items-center justify-between gap-3 text-[11px] select-none">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-1">
                        <span>Pengerjaan Sektor</span>
                        <span className="font-semibold text-slate-700">Progression</span>
                      </div>
                      <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        {/* Before level */}
                        <div 
                          className="absolute left-0 top-0 h-full bg-amber-400 transition-all rounded-full"
                          style={{ width: `${report.percentageBefore}%` }}
                        />
                        {/* After progress */}
                        <div 
                          className="absolute left-0 top-0 h-full bg-deep transition-all rounded-full"
                          style={{ width: `${report.percentageAfter}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 font-semibold text-slate-505">
                        <span>{report.percentageBefore}%</span>
                        <ArrowRight size={10} className="text-slate-400" />
                        <span className="text-deep text-xs font-bold">{report.percentageAfter}%</span>
                      </div>
                      <span className="text-[9px] text-deep font-bold bg-sage/20 px-1 rounded">
                        +{report.percentageAfter - report.percentageBefore}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {report.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 select-none">
                    <div className="flex items-center gap-1 font-medium">
                      <User size={11} />
                      <span className="truncate max-w-[170px]">{report.reporter}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-deep">
                      <div className="h-1.5 w-1.5 bg-olive rounded-full animate-ping" />
                      <span>Terverifikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      )}
    </div>
  );
};
