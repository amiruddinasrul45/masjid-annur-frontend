/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Image as ImageIcon, Calendar, X, Filter } from 'lucide-react';
import { ActivityGallery } from '../types';

interface GalleryTabProps {
  gallery: ActivityGallery[];
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Kerja Bakti' | 'Rapat' | 'Pembangunan' | 'Pengajian'>('Semua');
  const [activePhoto, setActivePhoto] = useState<ActivityGallery | null>(null);

  const filteredGallery = gallery.filter((item) =>
    selectedCategory === 'Semua' ? true : item.category === selectedCategory
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Banner */}
      <div className="relative h-44 shrink-0 bg-emerald-950 overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
          alt="Galeri Kegiatan"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] bg-emerald-100 text-emerald-850 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Dokumentasi Sosial
          </span>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight mt-1">Galeri Dokumentasi Kegiatan</h2>
          <p className="text-xs text-slate-650 leading-tight">Momen silaturahmi, musyawarah, dan gotong-royong warga</p>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Filters */}
        <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none select-none">
          {(['Semua', 'Kerja Bakti', 'Rapat', 'Pembangunan', 'Pengajian'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-emerald-855 text-white border-emerald-850 shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-800 border-slate-205'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like dynamic Photo Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow transition-shadow cursor-pointer group"
            >
              <div className="h-28 bg-slate-100 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold rounded uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <div className="p-2 space-y-1 select-none">
                <span className="text-[8px] text-slate-400 font-mono font-medium block flex items-center gap-0.5">
                  <Calendar size={8} />
                  {item.date}
                </span>
                <h4 className="font-bold text-[10.5px] text-slate-800 leading-tight line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Photo Overlay Modal */}
        {activePhoto && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="w-full max-w-[360px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3.5 right-3.5 p-1.5 bg-black/65 hover:bg-black/85 rounded-full text-white cursor-pointer transition-colors z-10"
              >
                <X size={16} />
              </button>

              <div className="h-52 bg-slate-100">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2 select-none">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-500/10 rounded-full font-bold uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span className="font-mono flex items-center gap-1">
                    <Calendar size={10} />
                    {activePhoto.date}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 leading-snug">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Tutup Galeri
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
