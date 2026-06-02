import React from 'react';

export const TombolWakaf = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="bg-emerald-900 p-6 rounded-2xl shadow-lg my-4 text-white">
      <h3 className="text-lg font-bold">Mari Donasi Beramal Jariyah Sekarang</h3>
      <p className="text-sm opacity-80 mt-1 mb-4">
        Tersedia pilihan Iuran Bulanan atau Donasi Sekali Bayar kebutuhan pembangunan.
      </p>
      <button 
        onClick={onClick}
        className="bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-3 px-6 rounded-xl w-full transition-all flex justify-between items-center"
      >
        <span>Wakaf</span>
        <span>→</span>
      </button>
    </div>
  );
};