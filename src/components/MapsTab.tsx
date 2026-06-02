/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Navigation, Car, Landmark, Eye, Layers, Copy, Map } from 'lucide-react';

export const MapsTab: React.FC = () => {
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite' | 'blueprint'>('streets');
  const [gpsAccuracy, setGpsAccuracy] = useState(5); // in meters
  const [isCopied, setIsCopied] = useState(false);

  // Simulate real-time GPS accuracy fluctuates
  useEffect(() => {
    const timer = setInterval(() => {
      setGpsAccuracy((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const newAcc = prev + delta;
        return Math.max(3, Math.min(8, newAcc));
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText('-6.28452, 106.91428');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const addressText = "Jl. Bumi Daya Raya No. 42 (Area Fasos-Fasum RT 04 / RW 12), Perumahan Bumi Daya Indah, Tambun Selatan, Bekasi - Jawa Barat";

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. VISUAL SIMULATED INTEGRATED MAP CANVAS */}
      <div className="relative h-72 bg-emerald-950/20 shrink-0 border-b border-slate-100 overflow-hidden select-none">
        
        {/* Layer 1: Simulated Map Graphic with Canvas Elements */}
        {mapLayer === 'streets' && (
          <div className="absolute inset-0 bg-[#E2E8F0] p-4 flex items-center justify-center relative">
            {/* Grid pattern mimicking roads */}
            <div className="absolute inset-x-0 h-4 bg-white top-12 -rotate-12 flex items-center px-10 text-[7px] font-sans font-semibold tracking-wider text-slate-400">Jl. BUMI DAYA UTAMA</div>
            <div className="absolute inset-x-0 h-3 bg-white top-28 rotate-6 flex items-center px-10 text-[7px] font-sans font-semibold tracking-wider text-slate-400">Jl. Flamboyan Indah</div>
            <div className="absolute inset-x-0 h-4 bg-white bottom-12 -rotate-3 flex items-center px-4 text-[7px] font-sans font-semibold text-slate-400">Jl. Bumi Daya Raya (Main Road)</div>
            <div className="absolute inset-y-0 w-3 bg-white left-28 -rotate-12" />
            <div className="absolute inset-y-0 w-4.5 bg-white right-24 rotate-12" />
            
            {/* Area Blocks */}
            <div className="absolute top-4 left-6 h-10 w-16 bg-[#F8FAFC] border rounded-lg flex items-center justify-center text-[7.5px] font-bold text-slate-400 text-center">Blok A (BDI)</div>
            <div className="absolute bottom-4 left-4 h-11 w-20 bg-[#F8FAFC] border rounded-lg flex items-center justify-center text-[7.5px] font-bold text-slate-400 text-center">Blok B (BDI)</div>
            <div className="absolute top-16 right-4 h-12 w-16 bg-[#F8FAFC] border rounded-lg flex items-center justify-center text-[7.5px] font-bold text-slate-400 text-center font-mono">Lap. Tenis</div>

            {/* Target Marker Masjid An-Nur */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-10 w-10 bg-deep rounded-full opacity-35 animate-ping" />
                <div className="absolute h-6 w-6 bg-deep rounded-full flex items-center justify-center text-white shadow border border-white">
                  <Landmark size={12} />
                </div>
              </div>
              <span className="bg-deep text-white font-bold text-[9px] px-2 py-0.5 rounded shadow mt-2 border border-olive whitespace-nowrap">
                Masjid An-Nur (Lokasi Pembangunan)
              </span>
            </div>
          </div>
        )}

        {mapLayer === 'satellite' && (
          <div className="absolute inset-0 bg-[#0F172A] relative overflow-hidden">
            {/* satellite image layout simulation */}
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=85"
              alt="Satellite View"
              className="w-full h-full object-cover opacity-50 filter saturate-50 brightness-75 scale-105"
            />
            {/* Satellite Target Finder Overlay */}
            <div className="absolute inset-0 border border-emerald-500/20 flex items-center justify-center">
              <div className="border border-dashed border-emerald-400/40 h-44 w-44 rounded-full flex items-center justify-center">
                <div className="border border-dashed border-emerald-400/50 h-28 w-28 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-amber-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 shadow-xl border border-white">
                <MapPin size={11} className="stroke-[3px]" />
              </div>
              <span className="bg-black/80 backdrop-blur-xs text-amber-400 font-bold text-[9px] px-2 py-0.5 rounded shadow mt-2 border border-amber-500/20 whitespace-nowrap">
                SAT SYNC: -6.28452,106.91428
              </span>
            </div>
          </div>
        )}

        {mapLayer === 'blueprint' && (
          <div className="absolute inset-0 bg-[#1e293b] p-3 flex flex-col justify-between select-none">
            {/* Blueprint Grid schematic */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="relative border border-emerald-500/30 rounded-2xl p-3 bg-slate-900/40 flex-1 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-emerald-400 block uppercase font-bold tracking-widest">Master Blueprint Site Plan V2</span>
              
              <div className="grid grid-cols-2 gap-4 my-2 text-[9px] font-mono text-slate-400">
                <div className="border border-dashed border-slate-700 p-1.5 rounded bg-slate-950/30">
                  <span className="text-emerald-400 block font-bold">Lantai Utama Ibadah</span>
                  <span>20m x 20m (400 m²) Cap: 450 Jemaah</span>
                </div>
                <div className="border border-dashed border-slate-700 p-1.5 rounded bg-slate-950/30">
                  <span className="text-emerald-400 block font-bold">Sektor Mihrab & Imam</span>
                  <span>4m x 4m (16 m²) Steel Vault</span>
                </div>
                <div className="border border-dashed border-slate-700 p-1.5 rounded bg-slate-950/30">
                  <span className="text-emerald-400 block font-bold">Halaman & Parkiran Masjid</span>
                  <span>15m x 20m Pavestone (300 m²)</span>
                </div>
                <div className="border border-dashed border-slate-700 p-1.5 rounded bg-slate-950/30">
                  <span className="text-emerald-400 block font-bold">Menara GRC (Lainnya)</span>
                  <span>D3m x T15m - Independent Foundation</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
                <span>Skala: 1 : 250 m</span>
                <span className="text-emerald-500 font-bold">Masa Pembangunan Terhitung Aman</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Controls to Switch Map Layer */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-xl shadow-md border flex gap-1 select-none z-10">
          <button
            onClick={() => setMapLayer('streets')}
            className={`px-2 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
              mapLayer === 'streets' ? 'bg-deep text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Peta Jalan
          </button>
          <button
            onClick={() => setMapLayer('satellite')}
            className={`px-2 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
              mapLayer === 'satellite' ? 'bg-deep text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Satelit
          </button>
          <button
            onClick={() => setMapLayer('blueprint')}
            className={`px-2 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
              mapLayer === 'blueprint' ? 'bg-deep text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Cetak Tapak
          </button>
        </div>

        {/* Real-Time GPS Accurary Stat Badge */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white font-mono text-[8px] flex items-center gap-1.5 border border-white/10 shadow">
          <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
          <span>GPS SYNCED (±{gpsAccuracy}m)</span>
        </div>
      </div>

      {/* 2. AREA PROFILE & PHYSICAL SPECIFICATIONS */}
      <div className="p-4 space-y-4 flex-1">
        
        {/* Address Card details */}
        <div className="bg-white border border-sage/10 rounded-3xl p-4 card-shadow space-y-3">
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-sage/15 rounded-2xl flex items-center justify-center text-deep shrink-0 select-none">
              <MapPin size={22} className="stroke-[2.2px]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Lokasi Resmi</span>
              <strong className="serif text-xs text-deep leading-snug mt-0.5 block">
                Perumahan Bumi Daya Indah (BDI)
              </strong>
              <p className="text-[11px] text-slate-650 leading-relaxed mt-1">{addressText}</p>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Coordinates copy block */}
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded-2xl border border-slate-150 select-none">
            <div className="text-[10px] font-mono text-slate-600">
              <span>Sat. Coordinates: </span>
              <strong className="text-slate-800 font-bold">-6.28452, 106.91428</strong>
            </div>
            <button
              onClick={handleCopyCoordinates}
              className="text-[10px] font-bold text-deep hover:text-olive px-2 py-1 bg-white border border-slate-200 rounded-lg hover:shadow-xs transition-shadow cursor-pointer"
            >
              {isCopied ? 'Tersalin' : 'Salin GPS'}
            </button>
          </div>
        </div>

        {/* Directions details */}
        <div className="bg-white border border-sage/10 rounded-3xl p-4 card-shadow space-y-3 select-none">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-deep font-bold" />
              <h4 className="serif font-bold text-[11px] text-deep uppercase tracking-wider">Navigasi Aksesibilitas</h4>
            </div>
            <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 font-bold text-slate-500 uppercase rounded">650 Meter Dari Gerbang</span>
          </div>

          <div className="space-y-2.5">
            {[
              { step: '1', title: 'Gerbang Utama Perumahan Bumi Daya Indah', desc: 'Masuk melalui gapura penjagaan pos satpam utama, lurus menyusuri rute utama Jl. Bumi Daya Raya.', dist: '0 m' },
              { step: '2', title: 'Belok Kiri di Pertigaan Blok C', desc: 'Setelah melewati ruko fasum, belok kiri menyusuri pinggir taman bermain warga.', dist: '400 m' },
              { step: '3', title: 'Area Fasos Kompleks Masjid (Selesai)', desc: 'Lokasi pembangunan berada di sisi kiri persis sebelah balai rukun tetangga.', dist: '250 m' }
            ].map((route) => (
              <div key={route.step} className="flex gap-3 text-xs">
                <span className="h-5 w-5 bg-sage/10 text-deep border border-sage/20 rounded-full flex items-center justify-center font-bold font-mono text-[10px] shrink-0">
                  {route.step}
                </span>
                <div className="flex-1 min-w-0 pr-2">
                  <h5 className="font-semibold text-[11px] text-slate-800 leading-tight">{route.title}</h5>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">{route.desc}</p>
                </div>
                <span className="text-[10px] font-bold font-mono text-slate-400 self-center">{route.dist}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                window.open('https://maps.google.com/?q=-6.28452,106.91428', '_blank');
              }}
              className="w-full py-2.5 bg-olive hover:bg-deep text-white font-bold rounded-2xl text-[10.5px] flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-98 transition-transform"
            >
              <Car size={14} />
              Buka Navigasi Google Maps Asli
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
