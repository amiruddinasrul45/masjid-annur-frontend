import React, { useState } from 'react';

const semuaLaporan = [
  { id: 1, judul: "Tahap Akhir Pengecatan Ornamen Kaligrafi Kubah", lokasi: "MASJID UTAMA", tanggal: "2026-05-28", deskripsi: "Pengerjaan kaligrafi menggunakan cat khusus anti-jamur...", capaian: "100%" },
  { id: 2, judul: "Pemasangan Tiang Scaffolding Penyangga Mezzanine", lokasi: "MASJID UTAMA", tanggal: "2026-05-26", deskripsi: "Pengerjaan penyangga besi silang scaffolding...", capaian: "78%" }
];

export const LaporanProgres = () => {
  const [showAll, setShowAll] = useState(false);
  const dataTampil = showAll ? semuaLaporan : semuaLaporan.slice(0, 2);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-gray-800">LAPORAN PROGRES TERBARU</h3>
        {!showAll && (
          <button onClick={() => setShowAll(true)} className="text-sm text-green-700 font-semibold">Selengkapnya →</button>
        )}
      </div>
      <div className="space-y-4">
        {dataTampil.map((item) => (
          <div key={item.id} className="flex gap-3 border-b pb-4">
            {/* Mengganti IMG dengan DIV warna agar tidak loading */}
            <div className="w-16 h-16 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-[10px]">IMG</div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-800">{item.judul}</h4>
              <p className="text-[11px] text-gray-500">Capaian: {item.capaian}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};