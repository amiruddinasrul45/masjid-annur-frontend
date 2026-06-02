import React from 'react';
export const RiwayatDonasi = ({ data }: { data: any[] }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-gray-700 mb-3 px-2">Riwayat Donasi</h2>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-center text-gray-400 py-4">Belum ada donasi masuk.</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-800">{item.donorName || item.nama || 'Donatur'}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.type === 'monthly' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {item.type === 'monthly' ? '📅 Iuran Bulanan' : '💵 Sekali Bayar'}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(item.date || item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-full">
                <p className="text-green-700 font-bold text-sm">
                  Rp {(item.amount || item.jumlah || 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};