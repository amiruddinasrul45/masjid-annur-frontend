import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { DonationTab } from './components/DonationTab';
import { RiwayatDonasi } from './components/RiwayatDonasi';
import { HeaderMasjid } from './components/HeaderMasjid';
import { ProgresPembangunan } from './components/ProgresPembangunan';
import { TombolWakaf } from './components/TombolWakaf';
import { AuditFeed } from './components/AuditFeed';
import { LaporanProgres } from './components/LaporanProgres';
import { SliderKondisi } from './components/SliderKondisi';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ProgressTab } from './components/ProgressTab';
import { TransparencyTab } from './components/TransparencyTab';

const API = 'https://masjid-annur-backend-production.up.railway.app';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [daftarDonasi, setDaftarDonasi] = useState<any[]>([]);
  const [totalTerkumpul, setTotalTerkumpul] = useState(0);
  const [proposals, setProposals] = useState<any[]>([]);
  const [progressReports, setProgressReports] = useState<any[]>([]);
  const [disbursements, setDisbursements] = useState<any[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
const [allocations, setAllocations] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [admin, setAdmin] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    const token = localStorage.getItem('token');
    if (savedAdmin && token) setAdmin(JSON.parse(savedAdmin));
  }, []);

  const loadData = async () => {
    try {
      const [r1, r2, r3, r4, r5, r6, r7, r8, r9] = await Promise.all([
  fetch(`${API}/api/donasi`),
  fetch(`${API}/api/donasi/total`),
  fetch(`${API}/api/proposals`),
  fetch(`${API}/api/progress`),
  fetch(`${API}/api/gallery`),
  fetch(`${API}/api/notifications`),
  fetch(`${API}/api/disbursements`),
  fetch(`${API}/api/donors`),
  fetch(`${API}/api/allocations`),
]);
setDaftarDonasi(await r1.json());
setTotalTerkumpul((await r2.json()).total || 0);
setProposals(await r3.json());
setProgressReports(await r4.json());
setGallery(await r5.json());
setNotifications(await r6.json());
setDisbursements(await r7.json());
setDonors(await r8.json());
setAllocations(await r9.json());
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadData(); }, []);

  const handleAddDonation = async (nama: string, jumlah: number) => {
    try {
      await fetch(`${API}/api/donasi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, jumlah }),
      });
      loadData();
    } catch (e) { console.error(e); }
  };

  const handleAddProgressReport = async (newReport: any) => {
    try {
      const id = 'prog_' + Date.now();
      await fetch(`${API}/api/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...newReport, date: new Date().toISOString().split('T')[0] }),
      });
      loadData();
    } catch (e) { console.error(e); }
  };

  const handleLogin = (adminData: any, token: string) => {
    setAdmin(adminData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  if (showLogin) return <LoginPage onLogin={handleLogin} />;

  if (admin && window.location.pathname === '/admin') {
    return <AdminDashboard admin={admin} onLogout={handleLogout} />;
  }

  return (
    <MobileFrame
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      notifications={notifications}
      onMarkNotificationsAsRead={() => {}}
      onClearNotification={() => {}}
      onAccountClick={() => admin ? handleLogout() : setShowLogin(true)}
      isPanitiaLoggedIn={!!admin}
    >
      {admin && (
        <div className="bg-green-700 text-white text-xs px-4 py-2 flex justify-between items-center">
          <span>👤 Login sebagai <b>{admin.name}</b> ({admin.role})</span>
          <div className="flex gap-3">
            <a href="/admin" className="underline">Dashboard Admin</a>
            <button onClick={handleLogout} className="underline">Logout</button>
          </div>
        </div>
      )}

      {activeTab === 'beranda' && (
        <div className="p-4 bg-gray-50 min-h-screen space-y-4">
          <HeaderMasjid />
          <ProgresPembangunan persentase={Math.round((totalTerkumpul / 1500000000) * 100)} total={totalTerkumpul} target={1500000000} />
          <div className="space-y-2">
            <TombolWakaf onClick={() => setActiveTab('donasi')} />
            {daftarDonasi.length > 0 && <AuditFeed latestDonation={daftarDonasi[0]} />}
          </div>
          <LaporanProgres />
          <SliderKondisi />
          <RiwayatDonasi data={daftarDonasi} />
        </div>
      )}

      {activeTab === 'donasi' && (
        <DonationTab
          onAddDonation={(data: any, amt: number) => handleAddDonation(data.name, amt)}
          totalTarget={1500000000}
          totalCollected={totalTerkumpul}
          proposals={proposals}
        />
      )}
      {activeTab === 'progres' && (
        <ProgressTab
          progressReports={progressReports}
          onAddProgressReport={handleAddProgressReport}
        />
      )}

      {activeTab === 'profil' && (
  <TransparencyTab
    donors={donors}
    allocations={allocations}
          disbursements={disbursements}
          totalTarget={1500000000}
          totalCollected={totalTerkumpul}
          totalSpent={0}
          onAddDisbursement={() => {}}
          onAddDonorPayment={() => {}}
        />
      )}      
        
      {activeTab === 'progres' && (
        <ProgressTab
          progressReports={progressReports}
          onAddProgressReport={handleAddProgressReport}
        />
      )}
    </MobileFrame>
  );
}