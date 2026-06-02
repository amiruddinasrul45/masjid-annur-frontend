import React from 'react';

export const HeaderMasjid = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4 text-center">
      <div className="flex justify-center mb-3">
        {/* Kamu bisa ganti dengan logo image jika ada */}
        <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
          AN
        </div>
      </div>
      <h1 className="text-xl font-bold text-gray-800">MASJID AN-NUR</h1>
      <p className="text-sm text-gray-600 mt-1">
        Perumahan Bumi Daya Indah<br />
        Kec. Biringkanaya Kel. Sudiang Raya<br />
        Kota Makassar
      </p>
      <p className="text-xs text-gray-400 mt-3 italic">
        Sistem Akuntabilitas pembangunan Masjid An-Nur
      </p>
    </div>
  );
};