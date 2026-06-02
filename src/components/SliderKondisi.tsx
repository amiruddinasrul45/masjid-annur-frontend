import React from 'react';

const fotoMasjid = [
  "https://via.placeholder.com/300x150?text=Kondisi+Area+Wudhu",
  "https://via.placeholder.com/300x150?text=Struktur+Kubah",
  "https://via.placeholder.com/300x150?text=Area+Mezzanine"
];

export const SliderKondisi = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <h3 className="font-bold text-gray-800 mb-4">Kondisi Masjid Saat Ini</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        <div className="w-64 h-36 rounded-xl bg-gray-300 flex-shrink-0" />
        <div className="w-64 h-36 rounded-xl bg-gray-400 flex-shrink-0" />
      </div>
    </div>
  );
};