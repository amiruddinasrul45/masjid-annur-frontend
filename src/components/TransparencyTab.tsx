import React, { useState } from 'react';

interface TransparencyTabProps {
  donors: any[];
  allocations: any[];
  disbursements: any[];
  totalTarget: number;
  totalCollected: number;
  totalSpent: number;
  onAddDisbursement: (newDisb: any) => void;
  onAddDonorPayment: (donorId: string, paymentRecord: any) => void;
}

export const TransparencyTab: React.FC<TransparencyTabProps> = ({
  donors,
  disbursements,
  totalTarget,
  totalCollected,
}) => {
  const [activeTab, setActiveTab] = useState<'keuangan' | 'donatur'>('keuangan');
  const [donorType, setDonorType] = useState<'monthly' | 'one-time'>('monthly');
  const [search, setSearch] = useState('');

  const formatRp = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  const totalDisbursed = disbursements.reduce((acc, d) => acc + Number(d.amount), 0);
  const sisaKas = totalCollected - totalDisbursed;

  const getInisial = (name: string) =>
    name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  const filteredDonors = donors
    .filter(d => d.type === donorType)
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-deep text-white p-4">
        <h2 className="font-bold text-sm text-center mb-3">💰 Transparansi Keuangan</h2>
        <div className="flex bg-slate-900/40 p-1 rounded-xl">
          <button onClick={() => setActiveTab('keuangan')}
            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${activeTab === 'keuangan' ? 'bg-white text-deep' : 'text-slate-300'}`}>
            📊 Laporan Keuangan
          </button>
          <button onClick={() => setActiveTab('donatur')}
            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${activeTab === 'donatur' ? 'bg-white text-deep' : 'text-slate-300'}`}>
            👥 Daftar Donatur
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">

        {/* TAB LAPORAN KEUANGAN */}
        {activeTab === 'keuangan' && (
          <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-500 text-white rounded-2xl p-3 text-center">
                <p className="text-[10px] opacity-80">Terkumpul</p>
                <p className="font-bold text-xs mt-1">{formatRp(totalCollected)}</p>
              </div>
              <div className="bg-orange-500 text-white rounded-2xl p-3 text-center">
                <p className="text-[10px] opacity-80">Disalurkan</p>
                <p className="font-bold text-xs mt-1">{formatRp(totalDisbursed)}</p>
              </div>
              <div className="bg-blue-500 text-white rounded-2xl p-3 text-center">
                <p className="text-[10px] opacity-80">Sisa Kas</p>
                <p className="font-bold text-xs mt-1">{formatRp(sisaKas)}</p>
              </div>
            </div>

            {/* Progress Bar Target */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-gray-700">Capaian Target Dana</span>
                <span className="font-bold text-green-600">
                  {totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0}%
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${totalTarget > 0 ? Math.min((totalCollected / totalTarget) * 100, 100) : 0}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{formatRp(totalCollected)}</span>
                <span>Target RAB: {formatRp(totalTarget)}</span>
              </div>
            </div>

            {/* Riwayat Penyaluran Dana */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-800 text-sm">💸 Riwayat Penyaluran Dana</h3>
              </div>
              {disbursements.length === 0 ? (
                <p className="text-center text-gray-400 text-xs py-6">Belum ada penyaluran dana.</p>
              ) : (
                disbursements.map(d => (
                  <div key={d.id} className="p-4 border-b last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{d.recipient}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{d.purpose?.substring(0, 60)}...</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{d.category}</span>
                          <span className="text-[10px] text-gray-400">{new Date(d.date).toLocaleDateString('id-ID')}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">No. {d.proofInvoice}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="font-bold text-orange-600 text-sm">{formatRp(Number(d.amount))}</p>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{d.status}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB DAFTAR DONATUR */}
        {activeTab === 'donatur' && (
          <div className="space-y-4">
            {/* Search */}
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="🔍 Cari donatur..." />

            {/* Toggle Tipe Donatur */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setDonorType('monthly')}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${donorType === 'monthly' ? 'bg-white text-deep shadow-sm' : 'text-gray-500'}`}>
                📅 Iuran Bulanan
              </button>
              <button onClick={() => setDonorType('one-time')}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${donorType === 'one-time' ? 'bg-white text-deep shadow-sm' : 'text-gray-500'}`}>
                💵 Donasi Sekali
              </button>
            </div>

            {/* Summary */}
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-green-700 font-medium">
                {filteredDonors.length} donatur {donorType === 'monthly' ? 'iuran bulanan' : 'sekali bayar'}
              </p>
            </div>

            {/* List Donatur */}
            {filteredDonors.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-6">Tidak ada donatur ditemukan.</p>
            ) : (
              filteredDonors.map(d => (
                <div key={d.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    {/* Inisial nama, tanpa foto */}
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800 flex-shrink-0 text-sm">
                      {getInisial(d.name)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-800">{d.name}</p>
                      {d.phone && <p className="text-xs text-gray-500">{d.phone}</p>}
                      {d.type === 'monthly' && d.monthlyCommitment && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {formatRp(d.monthlyCommitment)}/bln
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-sm">{formatRp(Number(d.totalContribution))}</p>
                      <p className="text-[10px] text-gray-400">Total donasi</p>
                      {d.type === 'monthly' && d.totalMonthsCommit && (
                        <p className="text-[10px] text-blue-600 font-medium">
                          {d.monthsPaid}/{d.totalMonthsCommit} bln
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};