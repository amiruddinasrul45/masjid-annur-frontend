import React, { useState, useEffect } from 'react';

const API = 'https://masjid-annur-backend-production.up.railway.app';

export const LaporanProgres = () => {
  const [data, setData] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/progress`)
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const dataTampil = showAll ? data : data.slice(0, 2);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-gray-800">LAPORAN PROGRES TERBARU</h3>
        {!showAll && data.length > 2 && (
          <button onClick={() => setShowAll(true)} className="text-sm text-green-700 font-semibold">Selengkapnya →</button>
        )}
      </div>
      <div className="space-y-4">
        {dataTampil.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-4">Belum ada laporan progres.</p>
        ) : (
          dataTampil.map((item) => (
            <div key={item.id} className="flex gap-3 border-b pb-4 last:border-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                {item.photoUrl ? (
                  <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-[10px]">IMG</div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
                <p className="text-[11px] text-gray-500 mb-1">{item.category}</p>
                <p className="text-[11px] text-gray-400">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${item.percentageAfter}%` }}></div>
                  </div>
                  <span className="text-[11px] font-bold text-green-600">{item.percentageAfter}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};