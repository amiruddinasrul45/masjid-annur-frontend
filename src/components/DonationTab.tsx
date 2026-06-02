import React, { useState } from 'react';

export const DonationTab = ({ onAddDonation, totalTarget, totalCollected, proposals }: any) => {
  const [tabType, setTabType] = useState<'one-time' | 'monthly'>('one-time');
  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');
  const [jumlah, setJumlah] = useState(500000);
  const [jumlahText, setJumlahText] = useState('500.000');
  const [metode, setMetode] = useState('Mandiri VA');
  const [selectedProposal, setSelectedProposal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nominalList = [100000, 250000, 500000, 1000000, 2500000, 5000000];

  const formatAngka = (val: string) => {
    const raw = val.replace(/\./g, '').replace(/[^0-9]/g, '');
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const kapitalAwal = (val: string) => val.replace(/\b\w/g, c => c.toUpperCase());

  const handleSubmit = () => {
    if (!nama || !jumlah) return;
    onAddDonation({ name: nama, wa, type: tabType }, jumlah);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNama('');
      setWa('');
      setJumlah(500000);
      setJumlahText('500.000');
    }, 3000);
  };

  const capaian = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">

      {/* Progress Dana */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between text-xs mb-2">
          <span className="font-bold text-gray-700">Dana Terkumpul</span>
          <span className="font-bold text-green-600">{capaian}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(capaian, 100)}%` }} />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>Rp {totalCollected?.toLocaleString('id-ID')}</span>
          <span>Target: Rp {totalTarget?.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Switcher Tab */}
      <div className="flex bg-gray-200 p-1 rounded-xl">
        <button
          onClick={() => setTabType('one-time')}
          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tabType === 'one-time' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>
          💵 Donasi Sekali Bayar
        </button>
        <button
          onClick={() => setTabType('monthly')}
          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tabType === 'monthly' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>
          📅 Iuran Bulanan
        </button>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-3">✅</p>
          <p className="font-bold text-green-700 text-lg">Donasi Berhasil Dicatat!</p>
          <p className="text-sm text-green-600 mt-1">Jazakallahu Khairan atas kebaikan Anda</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">

          {/* Nama */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Nama Donatur</label>
            <input type="text" placeholder="Nama lengkap donatur"
              className={`w-full p-3 border rounded-xl text-sm transition-all ${nama ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
              value={nama}
              onChange={(e) => setNama(kapitalAwal(e.target.value))} />
          </div>

          {/* No HP */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Nomor HP/WhatsApp</label>
            <input type="text" placeholder="Nomor HP/WhatsApp"
              className={`w-full p-3 border rounded-xl text-sm transition-all ${wa ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
              value={wa}
              onChange={(e) => setWa(e.target.value)} />
          </div>

          {/* Proposal */}
          {proposals && proposals.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Peruntukan Dana</label>
              <select
                className={`w-full p-3 border rounded-xl bg-white text-sm transition-all ${selectedProposal ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
                value={selectedProposal}
                onChange={(e) => setSelectedProposal(e.target.value)}>
                <option value="">-- Pilih Peruntukan --</option>
                {proposals.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.title} ({p.urgency})</option>
                ))}
              </select>
            </div>
          )}

          {/* Nominal */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              {tabType === 'monthly' ? 'Nominal Iuran per Bulan' : 'Jumlah Donasi'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500 text-sm font-medium">Rp</span>
              <input type="text"
                className={`w-full pl-9 p-3 border rounded-xl text-sm font-bold transition-all ${jumlah > 0 ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
                value={jumlahText}
                onChange={(e) => {
                  const formatted = formatAngka(e.target.value);
                  setJumlahText(formatted);
                  setJumlah(Number(formatted.replace(/\./g, '')));
                }} />
            </div>
          </div>

          {/* Nominal Cepat */}
          <div className="grid grid-cols-3 gap-2">
            {nominalList.map(n => (
              <button key={n}
                onClick={() => {
                  setJumlah(n);
                  setJumlahText(n.toLocaleString('id-ID'));
                }}
                className={`p-2 border rounded-xl text-xs font-bold transition-all ${jumlah === n ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-50 hover:bg-gray-100'}`}>
                Rp {(n / 1000).toLocaleString()}rb
              </button>
            ))}
          </div>

          {/* Metode Pembayaran */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Metode Pembayaran</label>
            <div className="flex gap-2">
              {['Mandiri VA', 'BCA Virtual', 'QRIS Instan'].map(m => (
                <button key={m} onClick={() => setMetode(m)}
                  className={`flex-1 p-3 border rounded-xl text-[10px] font-bold transition-all ${metode === m ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            onClick={handleSubmit}
            disabled={!nama || !jumlah}
            className={`w-full p-4 rounded-2xl font-bold text-sm mt-2 transition-all ${nama && jumlah ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {tabType === 'monthly' ? '📅 Daftarkan Iuran Bulanan →' : '🕌 Ikat Niat, Siapkan Donasi →'}
          </button>

          <p className="text-center text-[10px] text-gray-400">
            Data donasi akan dicatat dan dapat dilihat di halaman transparansi
          </p>
        </div>
      )}
    </div>
  );
};