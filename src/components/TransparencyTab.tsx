import React, { useState } from 'react';
import { Users, Search, User, CreditCard, Award, ShieldCheck, ChevronRight, ChevronLeft, X, Receipt } from 'lucide-react';
import { Donor, Allocation, Disbursement, DonationRecord } from '../types';
// Pastikan RiwayatDonasi diimpor jika kamu menggunakannya di sini
// import { RiwayatDonasi } from './RiwayatDonasi'; 

interface TransparencyTabProps {
  donors: Donor[];
  allocations: Allocation[];
  disbursements: Disbursement[];
  totalTarget: number;
  totalCollected: number;
  totalSpent: number;
  onAddDisbursement: (newDisb: Omit<Disbursement, 'id' | 'date' | 'status'>) => void;
  onAddDonorPayment: (donorId: string, paymentRecord: DonationRecord) => void;
}

export const TransparencyTab: React.FC<TransparencyTabProps> = ({
  donors,
  allocations,
  disbursements,
  totalTarget,
  totalCollected,
  totalSpent,
  onAddDisbursement,
  onAddDonorPayment
}) => {
  const [currentSection, setCurrentSection] = useState<'transparansi' | 'donatur-list' | 'dashboard-khusus'>('donatur-list');
  const [donorSubTab, setDonorSubTab] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedDonorProfile, setSelectedDonorProfile] = useState<Donor | null>(null);
  const [personalDashboardDonorId, setPersonalDashboardDonorId] = useState<string | null>(null);
  const [selectedAllocation, setSelectedAllocation] = useState<Allocation | null>(null);
  const [selectedDisbursement, setSelectedDisbursement] = useState<Disbursement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCashFlowDetail, setActiveCashFlowDetail] = useState<'masuk' | 'keluar' | 'sisa' | null>(null);
  const [cashFlowSearchQuery, setCashFlowSearchQuery] = useState('');

  // Utility functions
  const formattedRupiah = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  
  const formatIndonesianDateTime = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getInitials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  const renderInitialsCircle = (name: string, sizeClass: string = "h-9 w-9 text-xs") => (
    <div className={`${sizeClass} rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold`}>
      {getInitials(name)}
    </div>
  );

  // Filter Logic
  const activeMonthlyDonors = donors.filter(d => d.type === 'monthly' && d.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const oneTimeDonorsList = donors.filter(d => d.type === 'one-time' && d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-deep text-white p-4 flex justify-center">
        <div className="flex bg-slate-900/40 p-1 rounded-xl w-full max-w-[280px]">
          <button onClick={() => setCurrentSection('donatur-list')} className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] ${currentSection === 'donatur-list' ? 'bg-cream text-deep' : 'text-slate-300'}`}>Penyumbang</button>
          <button onClick={() => setCurrentSection('transparansi')} className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] ${currentSection === 'transparansi' ? 'bg-cream text-deep' : 'text-slate-300'}`}>Laporan Keuangan</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentSection === 'donatur-list' && !selectedDonorProfile && (
           <div className="space-y-4">
              {/* Tempatkan list donatur kamu di sini */}
              <input 
                className="w-full p-3 border rounded-2xl" 
                placeholder="Cari Penyumbang..." 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              {/* Tambahkan map list kamu disini */}
           </div>
        )}
        
        {/* Tambahkan bagian Transparansi/Laporan keuangan lainnya sesuai struktur sebelumnya */}
      </div>

      {/* Modal Detail Transaksi (Pastikan ditutup dengan benar) */}
      {selectedDisbursement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white p-6 rounded-3xl w-full max-w-sm">
             <button onClick={() => setSelectedDisbursement(null)} className="mb-4">Tutup</button>
             {/* Detail Isi Kuitansi */}
           </div>
        </div>
      )}
    </div>
  );
};