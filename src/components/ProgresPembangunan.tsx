import React from 'react';

export const ProgresPembangunan = ({ persentase, total, target }: { persentase: number, total: number, target: number }) => {
  const persenDana = ((total / target) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Kotak Progres Fisik */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-[10px] font-bold text-gray-400 mb-1">PROGRES FISIK</h3>
        <p className="text-xl font-bold text-gray-800">{persentase}% <span className="text-sm font-normal text-gray-500">Rampung</span></p>
        <div className="w-full bg-gray-100 h-2 mt-2 rounded-full overflow-hidden">
          <div className="bg-green-700 h-full" style={{ width: `${persentase}%` }}></div>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">Tahap ornamen kubah utama & pengecoran dak mezzanine.</p>
      </div>

      {/* Kotak Capaian Dana */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-[10px] font-bold text-gray-400 mb-1">CAPAIAN DANA</h3>
        <p className="text-xl font-bold text-gray-800">{persenDana}% <span className="text-sm font-normal text-gray-500">Terpenuhi</span></p>
        <div className="w-full bg-gray-100 h-2 mt-2 rounded-full overflow-hidden">
          <div className="bg-yellow-500 h-full" style={{ width: `${persenDana}%` }}></div>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">Terkumpul Rp {(total / 1000000).toFixed(1)}M dari target Rp 1.5M.</p>
      </div>
    </div>
  );
};