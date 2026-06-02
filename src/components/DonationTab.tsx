import React, { useState } from 'react';

export const DonationTab = ({ onAddDonation }: any) => {
  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');
  const [jumlah, setJumlah] = useState(500000);
  const [metode, setMetode] = useState('Mandiri VA');

  const nominalList = [100000, 250000, 500000, 1000000, 2500000, 5000000];

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Switcher Tab */}
      <div className="flex bg-gray-200 p-1 rounded-xl mb-4">
        <button className="flex-1 py-2 bg-white rounded-lg font-bold shadow text-sm">Donasi Sekali Bayar</button>
        <button className="flex-1 py-2 text-gray-500 text-sm">Iuran Bulanan</button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <input type="text" placeholder="Nama Donatur Lengkap" className="w-full p-3 border rounded-xl" value={nama} onChange={(e) => setNama(e.target.value)} />
        <input type="text" placeholder="Nomor HP/WhatsApp" className="w-full p-3 border rounded-xl" value={wa} onChange={(e) => setWa(e.target.value)} />
        
        <select className="w-full p-3 border rounded-xl bg-white text-sm">
          <option>Finishing Dinding & Plester Ornamen (Mendesak)</option>
        </select>

        <input type="number" className="w-full p-3 border rounded-xl font-bold" value={jumlah} onChange={(e) => setJumlah(Number(e.target.value))} />
        
        <div className="grid grid-cols-3 gap-2">
          {nominalList.map(n => (
            <button key={n} onClick={() => setJumlah(n)} className={`p-2 border rounded-xl text-xs ${jumlah === n ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
              Rp {(n/1000).toLocaleString()}rb
            </button>
          ))}
        </div>

        {/* Metode Pembayaran */}
        <div className="flex gap-2 pt-2">
          {['Mandiri VA', 'BCA Virtual', 'QRIS Instan'].map(m => (
            <button key={m} onClick={() => setMetode(m)} className={`flex-1 p-3 border rounded-xl text-[10px] font-bold ${metode === m ? 'border-orange-500 bg-orange-50' : ''}`}>
              {m}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onAddDonation({ name: nama, wa }, jumlah)}
          className="w-full bg-orange-500 text-white p-4 rounded-2xl font-bold mt-4"
        >
          Ikat Niat, Siapkan Donasi →
        </button>
      </div>
    </div>
  );
};