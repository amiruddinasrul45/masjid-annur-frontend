import React, { useState, useEffect } from 'react';

const API = 'https://masjid-annur-backend-production.up.railway.app';

export const AdminDashboard = ({ admin, onLogout }: { admin: any, onLogout: () => void }) => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [donasi, setDonasi] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [disbursements, setDisbursements] = useState<any[]>([]);
  const [progressReports, setProgressReports] = useState<any[]>([]);
  const [totalTerkumpul, setTotalTerkumpul] = useState(0);

  // Form states
  const [formDonasi, setFormDonasi] = useState({ nama: '', jumlah: '' });
  const [formProgress, setFormProgress] = useState({ date: '', category: 'Masjid Utama', title: '', description: '', photoUrl: '', reporter: '', percentageBefore: '', percentageAfter: '' });
  const [formDisbursement, setFormDisbursement] = useState({ date: '', amount: '', recipient: '', purpose: '', category: '', proofInvoice: '' });
  const [msg, setMsg] = useState('');

  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const loadData = async () => {
    const [r1, r2, r3, r4, r5] = await Promise.all([
      fetch(`${API}/api/donasi`),
      fetch(`${API}/api/donasi/total`),
      fetch(`${API}/api/proposals`),
      fetch(`${API}/api/disbursements`),
      fetch(`${API}/api/progress`),
    ]);
    setDonasi(await r1.json());
    setTotalTerkumpul((await r2.json()).total || 0);
    setProposals(await r3.json());
    setDisbursements(await r4.json());
    setProgressReports(await r5.json());
  };

  useEffect(() => { loadData(); }, []);

  const showMsg = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 3000);
  };

  const submitDonasi = async () => {
    if (!formDonasi.nama || !formDonasi.jumlah) return showMsg('❌ Isi semua field!');
    await fetch(`${API}/api/donasi`, { method: 'POST', headers, body: JSON.stringify({ nama: formDonasi.nama, jumlah: Number(formDonasi.jumlah) }) });
    setFormDonasi({ nama: '', jumlah: '' });
    loadData();
    showMsg('✅ Donasi berhasil dicatat!');
  };

  const submitProgress = async () => {
    if (!formProgress.title || !formProgress.date) return showMsg('❌ Isi semua field!');
    const id = 'prog_' + Date.now();
    await fetch(`${API}/api/progress`, { method: 'POST', headers, body: JSON.stringify({ id, ...formProgress, percentageBefore: Number(formProgress.percentageBefore), percentageAfter: Number(formProgress.percentageAfter) }) });
    setFormProgress({ date: '', category: 'Masjid Utama', title: '', description: '', photoUrl: '', reporter: '', percentageBefore: '', percentageAfter: '' });
    loadData();
    showMsg('✅ Laporan progres berhasil ditambahkan!');
  };

  const submitDisbursement = async () => {
    if (!formDisbursement.recipient || !formDisbursement.amount) return showMsg('❌ Isi semua field!');
    const id = 'disb_' + Date.now();
    await fetch(`${API}/api/disbursements`, { method: 'POST', headers, body: JSON.stringify({ id, ...formDisbursement, amount: Number(formDisbursement.amount) }) });
    setFormDisbursement({ date: '', amount: '', recipient: '', purpose: '', category: '', proofInvoice: '' });
    loadData();
    showMsg('✅ Penyaluran dana berhasil dicatat!');
  };

  const menuItems = [
    { id: 'overview', label: '📊 Overview', roles: ['superadmin', 'panitia', 'bendahara'] },
    { id: 'donasi', label: '💰 Input Donasi', roles: ['superadmin', 'bendahara'] },
    { id: 'progress', label: '🏗️ Input Progres', roles: ['superadmin', 'panitia'] },
    { id: 'disbursement', label: '💸 Input Penyaluran', roles: ['superadmin', 'bendahara'] },
    { id: 'riwayat', label: '📋 Riwayat Data', roles: ['superadmin', 'panitia', 'bendahara'] },
  ].filter(m => m.roles.includes(admin?.role));

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 border-b border-green-700">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center text-lg">🕌</div>
            <div>
              <p className="font-bold text-sm">Masjid An-Nur</p>
              <p className="text-green-300 text-xs">Panel Admin</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-green-700">
          <p className="text-green-300 text-xs">Login sebagai:</p>
          <p className="font-semibold text-sm">{admin?.name}</p>
          <span className="bg-green-600 text-xs px-2 py-0.5 rounded-full">{admin?.role}</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => setActiveMenu(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${activeMenu === item.id ? 'bg-green-600 font-semibold' : 'hover:bg-green-700'}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-green-700 space-y-2">
          <a href="/" className="block w-full text-center bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-sm">
            🏠 Ke Aplikasi
          </a>
          <button onClick={onLogout} className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {msg && <div className="fixed top-4 right-4 bg-white shadow-lg border rounded-lg px-6 py-3 z-50 text-sm font-medium">{msg}</div>}

        {/* OVERVIEW */}
        {activeMenu === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Overview Dashboard</h1>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Terkumpul', value: `Rp ${totalTerkumpul.toLocaleString('id-ID')}`, color: 'bg-green-500' },
                { label: 'Total Donatur', value: donasi.length, color: 'bg-blue-500' },
                { label: 'Penyaluran Dana', value: disbursements.length + ' transaksi', color: 'bg-orange-500' },
                { label: 'Laporan Progres', value: progressReports.length + ' laporan', color: 'bg-purple-500' },
              ].map((card, i) => (
                <div key={i} className={`${card.color} text-white rounded-xl p-6`}>
                  <p className="text-sm opacity-80">{card.label}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-700 mb-4">Proposal Pembangunan</h2>
              <div className="space-y-3">
                {proposals.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.urgency} — {p.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">Rp {Number(p.currentCollected).toLocaleString('id-ID')}</p>
                      <p className="text-xs text-gray-400">dari Rp {Number(p.targetCost).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INPUT DONASI */}
        {activeMenu === 'donasi' && (
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">💰 Input Donasi Manual</h1>
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Donatur</label>
                <input type="text" value={formDonasi.nama} onChange={e => setFormDonasi({...formDonasi, nama: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nama donatur" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
                <input type="number" value={formDonasi.jumlah} onChange={e => setFormDonasi({...formDonasi, jumlah: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Contoh: 500000" />
              </div>
              <button onClick={submitDonasi} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
                💾 Simpan Donasi
              </button>
            </div>
          </div>
        )}

        {/* INPUT PROGRESS */}
        {activeMenu === 'progress' && (
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">🏗️ Input Laporan Progres</h1>
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input type="date" value={formProgress.date} onChange={e => setFormProgress({...formProgress, date: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select value={formProgress.category} onChange={e => setFormProgress({...formProgress, category: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Masjid Utama</option>
                    <option>Rumah Imam & Tempat Wudhu</option>
                    <option>Gudang</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Laporan</label>
                <input type="text" value={formProgress.title} onChange={e => setFormProgress({...formProgress, title: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Judul laporan progres" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea value={formProgress.description} onChange={e => setFormProgress({...formProgress, description: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3} placeholder="Deskripsi pekerjaan..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Reporter</label>
                <input type="text" value={formProgress.reporter} onChange={e => setFormProgress({...formProgress, reporter: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nama pelapor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto</label>
                <input type="text" value={formProgress.photoUrl} onChange={e => setFormProgress({...formProgress, photoUrl: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">% Sebelum</label>
                  <input type="number" value={formProgress.percentageBefore} onChange={e => setFormProgress({...formProgress, percentageBefore: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0-100" min="0" max="100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">% Sesudah</label>
                  <input type="number" value={formProgress.percentageAfter} onChange={e => setFormProgress({...formProgress, percentageAfter: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0-100" min="0" max="100" />
                </div>
              </div>
              <button onClick={submitProgress} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
                💾 Simpan Laporan
              </button>
            </div>
          </div>
        )}

        {/* INPUT DISBURSEMENT */}
        {activeMenu === 'disbursement' && (
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">💸 Input Penyaluran Dana</h1>
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input type="date" value={formDisbursement.date} onChange={e => setFormDisbursement({...formDisbursement, date: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
                  <input type="number" value={formDisbursement.amount} onChange={e => setFormDisbursement({...formDisbursement, amount: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Contoh: 5000000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Penerima</label>
                <input type="text" value={formDisbursement.recipient} onChange={e => setFormDisbursement({...formDisbursement, recipient: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nama penerima dana" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Penyaluran</label>
                <textarea value={formDisbursement.purpose} onChange={e => setFormDisbursement({...formDisbursement, purpose: e.target.value})}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3} placeholder="Untuk keperluan apa..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <input type="text" value={formDisbursement.category} onChange={e => setFormDisbursement({...formDisbursement, category: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Struktur Akhir, dll" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Invoice</label>
                  <input type="text" value={formDisbursement.proofInvoice} onChange={e => setFormDisbursement({...formDisbursement, proofInvoice: e.target.value})}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="INV/XXX/2026/001" />
                </div>
              </div>
              <button onClick={submitDisbursement} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
                💾 Simpan Penyaluran
              </button>
            </div>
          </div>
        )}

        {/* RIWAYAT */}
        {activeMenu === 'riwayat' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 Riwayat Data</h1>
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="font-bold text-gray-700 mb-4">Donasi Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 rounded-l-lg">Nama</th>
                      <th className="text-left px-4 py-3">Tanggal</th>
                      <th className="text-right px-4 py-3 rounded-r-lg">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donasi.slice(0, 10).map(d => (
                      <tr key={d.id} className="border-t">
                        <td className="px-4 py-3">{d.donorName || d.nama}</td>
                        <td className="px-4 py-3">{new Date(d.date).toLocaleDateString('id-ID')}</td>
                        <td className="px-4 py-3 text-right text-green-600 font-medium">Rp {Number(d.amount).toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-700 mb-4">Penyaluran Dana</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 rounded-l-lg">Penerima</th>
                      <th className="text-left px-4 py-3">Tanggal</th>
                      <th className="text-left px-4 py-3">Tujuan</th>
                      <th className="text-right px-4 py-3 rounded-r-lg">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disbursements.map(d => (
                      <tr key={d.id} className="border-t">
                        <td className="px-4 py-3">{d.recipient}</td>
                        <td className="px-4 py-3">{new Date(d.date).toLocaleDateString('id-ID')}</td>
                        <td className="px-4 py-3 text-gray-500">{d.purpose?.substring(0, 40)}...</td>
                        <td className="px-4 py-3 text-right text-orange-600 font-medium">Rp {Number(d.amount).toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};