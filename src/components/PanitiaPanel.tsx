/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  X, 
  CheckCircle, 
  LogOut, 
  Plus, 
  HelpCircle, 
  HardHat, 
  FileText, 
  Image, 
  DollarSign, 
  UserCheck, 
  Lock, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  Check,
  AlertTriangle,
  Eye,
  Bell,
  Search,
  Sliders
} from 'lucide-react';
import { Donor, ProgressReport, Allocation, Disbursement, Proposal, ActivityGallery, DonationRecord } from '../types';

interface PanitiaPanelProps {
  donors: Donor[];
  progressReports: ProgressReport[];
  allocations: Allocation[];
  disbursements: Disbursement[];
  proposals: Proposal[];
  gallery: ActivityGallery[];
  totalTarget: number;
  basePhysicalProgress: number;
  mosqueSpecs: {
    luasTanah: number;
    luasBangunan: number;
    area: string;
    alamat: string;
    koordinat: string;
  };
  oldMosquePhotos: Array<{ id: string; url: string; label: string }>;
  onAddProgressReport: (report: Omit<ProgressReport, 'id' | 'date'>) => void;
  onAddDisbursement: (disb: Omit<Disbursement, 'id' | 'date' | 'status'>) => void;
  onAddGalleryItem: (item: Omit<ActivityGallery, 'id' | 'date'>) => void;
  onAddProposal: (proposal: Omit<Proposal, 'id' | 'currentCollected' | 'status'>) => void;
  onApproveDonation: (donorId: string, recordId: string) => void;
  onLogout: () => void;
  onUpdateDonor: (donorId: string, fields: Partial<Donor>) => void;
  onDeleteDonor: (donorId: string) => void;
  onAddDonorManual?: (donor: Donor) => void;
  onUpdateProgressReport: (id: string, fields: Partial<ProgressReport>) => void;
  onDeleteProgressReport: (id: string) => void;
  onUpdateAllocation: (id: string, fields: Partial<Allocation>) => void;
  onDeleteAllocation: (id: string) => void;
  
  // NEW PROPS FOR EVERYTHING IN THE BACKEND
  onAddAllocation: (alloc: Omit<Allocation, 'id' | 'actualSpent'>) => void;
  onUpdateDisbursement: (id: string, fields: Partial<Disbursement>) => void;
  onDeleteDisbursement: (id: string) => void;
  onUpdateGalleryItem: (id: string, fields: Partial<ActivityGallery>) => void;
  onDeleteGalleryItem: (id: string) => void;
  onUpdateProposal: (id: string, fields: Partial<Proposal>) => void;
  onDeleteProposal: (id: string) => void;
  onUpdateSettings: (settings: {
    totalTarget?: number;
    basePhysicalProgress?: number;
    mosqueSpecs?: {
      luasTanah: number;
      luasBangunan: number;
      area: string;
      alamat: string;
      koordinat: string;
    };
    oldMosquePhotos?: Array<{ id: string; url: string; label: string }>;
  }) => void;
  onAddDonorPayment: (donorId: string, paymentRecord: DonationRecord) => void;
  onUpdateDonorPayment: (donorId: string, paymentId: string, fields: Partial<DonationRecord>) => void;
  onDeleteDonorPayment: (donorId: string, paymentId: string) => void;
}

export const PanitiaPanel: React.FC<PanitiaPanelProps> = ({
  donors,
  progressReports,
  allocations,
  disbursements,
  proposals,
  gallery,
  totalTarget,
  basePhysicalProgress,
  mosqueSpecs,
  oldMosquePhotos,
  onAddProgressReport,
  onAddDisbursement,
  onAddGalleryItem,
  onAddProposal,
  onApproveDonation,
  onLogout,
  onUpdateDonor,
  onDeleteDonor,
  onAddDonorManual,
  onUpdateProgressReport,
  onDeleteProgressReport,
  onUpdateAllocation,
  onDeleteAllocation,
  onAddAllocation,
  onUpdateDisbursement,
  onDeleteDisbursement,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onUpdateProposal,
  onDeleteProposal,
  onUpdateSettings,
  onAddDonorPayment,
  onUpdateDonorPayment,
  onDeleteDonorPayment
}) => {
  // Navigation tabs inside administrative dashboard
  const [activeAdminTab, setActiveAdminTab] = useState<'verifikasi' | 'progres' | 'anggaran' | 'dokumentasi' | 'proposal' | 'pengaturan'>('verifikasi');

  // Success indicator message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editing States
  // 1. Editing Donor
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [editDonorName, setEditDonorName] = useState('');
  const [editDonorPhone, setEditDonorPhone] = useState('');
  const [editDonorContribution, setEditDonorContribution] = useState(0);

  // 2. Editing Progress Report
  const [editingProgress, setEditingProgress] = useState<ProgressReport | null>(null);
  const [editProgTitle, setEditProgTitle] = useState('');
  const [editProgDesc, setEditProgDesc] = useState('');
  const [editProgCat, setEditProgCat] = useState<'Masjid Utama' | 'Rumah Imam & Tempat Wudhu' | 'Gudang'>('Masjid Utama');
  const [editProgBefore, setEditProgBefore] = useState(0);
  const [editProgAfter, setEditProgAfter] = useState(0);
  const [editProgPhoto, setEditProgPhoto] = useState('');

  // 3. Editing Allocation
  const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);
  const [editAllocItem, setEditAllocItem] = useState('');
  const [editAllocEstCost, setEditAllocEstCost] = useState(0);
  const [editAllocActSpent, setEditAllocActSpent] = useState(0);
  const [editAllocCat, setEditAllocCat] = useState<'Struktur Akhir' | 'Kubah & Ornamen' | 'Paving & Parkir' | 'Sound System' | 'Sajadah & Karpet' | 'Lainnya'>('Struktur Akhir');
  const [editAllocUrgency, setEditAllocUrgency] = useState<'Mendesak' | 'Sedang' | 'Bisa Ditunda'>('Mendesak');
  const [editAllocStatus, setEditAllocStatus] = useState<'Belum Dimulai' | 'Pengerjaan' | 'Selesai'>('Belum Dimulai');

  // NEW EDITING STATES
  // 4. Editing Disbursement
  const [editingDisb, setEditingDisb] = useState<Disbursement | null>(null);
  const [editDisbAmount, setEditDisbAmount] = useState<number>(0);
  const [editDisbRecipient, setEditDisbRecipient] = useState<string>('');
  const [editDisbPurpose, setEditDisbPurpose] = useState<string>('');
  const [editDisbCat, setEditDisbCat] = useState<'Struktur Akhir' | 'Kubah & Ornamen' | 'Paving & Parkir' | 'Sound System' | 'Sajadah & Karpet' | 'Lainnya'>('Struktur Akhir');
  const [editDisbProof, setEditDisbProof] = useState<string>('');

  // 5. Editing Gallery / Dokumentasi Kegiatan
  const [editingGallery, setEditingGallery] = useState<ActivityGallery | null>(null);
  const [editGalTitle, setEditGalTitle] = useState<string>('');
  const [editGalDesc, setEditGalDesc] = useState<string>('');
  const [editGalCat, setEditGalCat] = useState<'Kerja Bakti' | 'Rapat' | 'Pembangunan' | 'Pengajian'>('Pembangunan');
  const [editGalImage, setEditGalImage] = useState<string>('');

  // 6. Editing Proposal
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [editPropTitle, setEditPropTitle] = useState<string>('');
  const [editPropDesc, setEditPropDesc] = useState<string>('');
  const [editPropCost, setEditPropCost] = useState<number>(0);
  const [editPropUrgency, setEditPropUrgency] = useState<'Sangat Mendesak' | 'Mendesak' | 'Sedang' | 'Rencana Jangka Panjang'>('Mendesak');
  const [editPropCat, setEditPropCat] = useState<'Masjid Utama' | 'Rumah Imam & Wudhu' | 'Gudang Masjid'>('Masjid Utama');
  const [editPropIcon, setEditPropIcon] = useState<string>('Hammer');
  const [editPropStatus, setEditPropStatus] = useState<'Aktif' | 'Terpenuhi'>('Aktif');
  const [editPropCurrentCollected, setEditPropCurrentCollected] = useState<number>(0);

  // 7. System Setting states
  const [setTargetInput, setSetTargetInput] = useState<number>(totalTarget);
  const [setBasePhysInput, setSetBasePhysInput] = useState<number>(basePhysicalProgress);
  const [setLuasTanahInput, setSetLuasTanahInput] = useState<number>(mosqueSpecs.luasTanah);
  const [setLuasBangunanInput, setSetLuasBangunanInput] = useState<number>(mosqueSpecs.luasBangunan);
  const [setAreaInput, setSetAreaInput] = useState<string>(mosqueSpecs.area);
  const [setAlamatInput, setSetAlamatInput] = useState<string>(mosqueSpecs.alamat);
  const [setKoordinatInput, setSetKoordinatInput] = useState<string>(mosqueSpecs.koordinat);

  // Photo slide inputs
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [newPhotoLabel, setNewPhotoLabel] = useState<string>('');

  // 8. Add Payment to Existing Donor states
  const [addingPaymentDonorId, setAddingPaymentDonorId] = useState<string | null>(null);
  const [addPaymentAmount, setAddPaymentAmount] = useState<number>(100000);
  const [addPaymentDesc, setAddPaymentDesc] = useState<string>('');

  // 9. Edit Payment History Record Transaction states
  const [editingPaymentRecord, setEditingPaymentRecord] = useState<{ donorId: string; paymentId: string } | null>(null);
  const [editPaymentAmount, setEditPaymentAmount] = useState<number>(0);
  const [editPaymentDesc, setEditPaymentDesc] = useState<string>('');
  const [editPaymentStatus, setEditPaymentStatus] = useState<'sukses' | 'proses'>('sukses');
  const [editPaymentDate, setEditPaymentDate] = useState<string>('');

  // Form 1: Progress Report
  const [progTitle, setProgTitle] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progCat, setProgCat] = useState<'Masjid Utama' | 'Rumah Imam & Tempat Wudhu' | 'Gudang'>('Masjid Utama');
  const [progBefore, setProgBefore] = useState(74);
  const [progAfter, setProgAfter] = useState(78);
  const [progPhoto, setProgPhoto] = useState('https://images.unsplash.com/photo-1590076135891-9fdaef2beba0?auto=format&fit=crop&w=600&q=80');

  // Form 2: Budget Disbursement
  const [disbAmount, setDisbAmount] = useState(15000000);
  const [disbRecipient, setDisbRecipient] = useState('');
  const [disbPurpose, setDisbPurpose] = useState('');
  const [disbCat, setDisbCat] = useState<'Struktur Akhir' | 'Kubah & Ornamen' | 'Paving & Parkir' | 'Sound System' | 'Sajadah & Karpet' | 'Lainnya'>('Struktur Akhir');
  const [disbProof, setDisbProof] = useState('');

  // Form 3: Gallery Documentation
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galCat, setGalCat] = useState<'Kerja Bakti' | 'Rapat' | 'Pembangunan' | 'Pengajian'>('Pembangunan');
  const [galImage, setGalImage] = useState('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80');

  // Form 4: Proposal RAB
  const [propTitle, setPropTitle] = useState('');
  const [propDesc, setPropDesc] = useState('');
  const [propCost, setPropCost] = useState(150000000);
  const [propUrgency, setPropUrgency] = useState<'Sangat Mendesak' | 'Mendesak' | 'Sedang' | 'Rencana Jangka Panjang'>('Mendesak');
  const [propCat, setPropCat] = useState<'Masjid Utama' | 'Rumah Imam & Wudhu' | 'Gudang Masjid'>('Masjid Utama');
  const [propIcon, setPropIcon] = useState('Hammer');

  // Form 5: Allocation POS RAB (New)
  const [showAddAllocForm, setShowAddAllocForm] = useState<boolean>(false);
  const [newAllocItem, setNewAllocItem] = useState<string>('');
  const [newAllocEstCost, setNewAllocEstCost] = useState<number>(50000000);
  const [newAllocCat, setNewAllocCat] = useState<'Struktur Akhir' | 'Kubah & Ornamen' | 'Paving & Parkir' | 'Sound System' | 'Sajadah & Karpet' | 'Lainnya'>('Struktur Akhir');
  const [newAllocStatus, setNewAllocStatus] = useState<'Belum Dimulai' | 'Pengerjaan' | 'Selesai'>('Belum Dimulai');

  // Local storage quick notify trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Manual donor addition states
  const [showAddManualForm, setShowAddManualForm] = useState(false);
  const [manualType, setManualType] = useState<'monthly' | 'one-time'>('monthly');
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualAmount, setManualAmount] = useState<number>(100000);
  const [manualPeriod, setManualPeriod] = useState<number>(1); // default 1 Year commitment

  // Search input query for admin dashboard DB
  const [searchQueryDb, setSearchQueryDb] = useState('');

  // Selected donor detail structure for view info (Eye Icon)
  const [selectedDonorReview, setSelectedDonorReview] = useState<Donor | null>(null);

  // Helper: determine monthly donor's next due date and highlight if overdue
  const getNextDueDate = (donor: Donor) => {
    if (donor.type !== 'monthly') return null;
    const monthsPaid = donor.history.filter(h => h.status === 'sukses' && h.type === 'monthly').length;
    const totalCommit = donor.totalMonthsCommit || (donor.periodYears ? donor.periodYears * 12 : 12);
    
    if (monthsPaid >= totalCommit) {
      return { status: 'LUNAS', text: 'Selesai / Lunas Penuh' };
    }

    if (!donor.lastPaymentDate) {
      return { status: 'BELUM_BAYAR', text: 'Belum ada pembayaran' };
    }

    // Add 1 month to last payment date
    const lastPayDate = new Date(donor.lastPaymentDate);
    const nextDue = new Date(lastPayDate.setMonth(lastPayDate.getMonth() + 1));
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = nextDue.toLocaleDateString('id-ID', options);
    
    // Simulate real time as 2026-05-31
    const todaySim = new Date('2026-05-31');
    const isOverdue = nextDue < todaySim;

    return {
      status: isOverdue ? 'TERLAMBAT' : 'AKTIF',
      text: dateStr,
      dateObj: nextDue
    };
  };

  // Submit handler: Add Manual Donor submission
  const handleAddManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) {
      showToast('⚠️ Nama donatur harus diisi!');
      return;
    }
    
    const timestampId = Date.now().toString();
    const invoiceNumber = `INV/OBN/2026/05/${timestampId.slice(-4)}`;
    
    const newDonor: Donor = {
      id: `d_man_${timestampId}`,
      name: manualName.trim(),
      phone: manualPhone.trim() || '0812' + Math.floor(10000000 + Math.random() * 90000000),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      type: manualType,
      status: manualType === 'monthly' ? 'active' : 'inactive',
      totalContribution: Number(manualAmount),
      monthlyCommitment: manualType === 'monthly' ? Number(manualAmount) : undefined,
      periodYears: manualType === 'monthly' ? Number(manualPeriod) : undefined,
      monthsPaid: manualType === 'monthly' ? 1 : undefined,
      totalMonthsCommit: manualType === 'monthly' ? Number(manualPeriod) * 12 : undefined,
      lastPaymentDate: new Date().toISOString().split('T')[0],
      history: [
        {
          id: `rc_man_${timestampId}`,
          amount: Number(manualAmount),
          date: new Date().toISOString().split('T')[0],
          type: manualType,
          description: manualType === 'monthly' 
            ? `Iuran Bulanan Masjid An-Nur - Bulan Ke-1 (Manual)`
            : `Donasi Tunai Sekali Bayar Pembangunan Masjid (Manual)`,
          invoiceNumber,
          status: 'sukses'
        }
      ]
    };

    if (onAddDonorManual) {
      onAddDonorManual(newDonor);
      showToast(`📝 Berhasil menambahkan donatur "${manualName.trim()}" secara manual!`);
      // Reset form fields
      setManualName('');
      setManualPhone('');
      setManualAmount(100000);
      setManualPeriod(1);
      setShowAddManualForm(false);
    } else {
      showToast('⚠️ Gagal: Callback onAddDonorManual tidak terdefinisi.');
    }
  };

  // Find all pending verification donations
  const pendingDonations: { donor: Donor; record: any }[] = [];
  donors.forEach(donor => {
    donor.history.forEach(record => {
      if (record.status === 'proses') {
        pendingDonations.push({ donor, record });
      }
    });
  });

  const formattedRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const formatRupiahInput = (num: number | string) => {
    if (num === undefined || num === null || num === 0) return '';
    const str = String(num).replace(/\D/g, '');
    if (!str) return '';
    return new Intl.NumberFormat('id-ID').format(Number(str));
  };

  // Form submit handles
  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProgressReport({
      category: progCat,
      title: progTitle,
      description: progDesc,
      photoUrl: progPhoto,
      reporter: 'Panitia Pembangunan (Admin)',
      percentageBefore: progBefore,
      percentageAfter: progAfter
    });
    showToast(`📝 Progres pekerjaan "${progTitle}" berhasil diunggah!`);
    setProgTitle('');
    setProgDesc('');
  };

  const handleDisbursementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disbRecipient || !disbPurpose) {
      alert('Tolong isi data penerima dan keperluan belanja.');
      return;
    }
    const invNumber = disbProof || `OUT/AN-NUR/${Date.now().toString().slice(-5)}`;
    onAddDisbursement({
      amount: disbAmount,
      recipient: disbRecipient,
      purpose: disbPurpose,
      category: disbCat,
      proofInvoice: invNumber
    });
    showToast(`💸 Kuitansi belanja ${formattedRupiah(disbAmount)} berhasil diverifikasi!`);
    setDisbRecipient('');
    setDisbPurpose('');
    setDisbProof('');
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGalleryItem({
      title: galTitle,
      description: galDesc,
      category: galCat,
      imageUrl: galImage
    });
    showToast(`📸 Foto dokumentasi "${galTitle}" terbit di galeri publik!`);
    setGalTitle('');
    setGalDesc('');
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProposal({
      title: propTitle,
      description: propDesc,
      targetCost: propCost,
      urgency: propUrgency,
      category: propCat,
      icon: propIcon,
      status: 'Aktif'
    });
    showToast(`📋 Program RAB baru "${propTitle}" sukses diajukan.`);
    setPropTitle('');
    setPropDesc('');
  };

  const handleApproveClick = (donorId: string, recordId: string, name: string, amount: number) => {
    onApproveDonation(donorId, recordId);
    showToast(`✅ Donasi senilai ${formattedRupiah(amount)} oleh ${name} disetujui & masuk kas!`);
  };

  const handleEditDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDonor) return;
    onUpdateDonor(editingDonor.id, {
      name: editDonorName,
      phone: editDonorPhone,
      totalContribution: Number(editDonorContribution)
    });
    showToast(`✏️ Data Donatur "${editDonorName}" berhasil diperbarui!`);
    setEditingDonor(null);
  };

  const handleEditProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgress) return;
    onUpdateProgressReport(editingProgress.id, {
      title: editProgTitle,
      description: editProgDesc,
      category: editProgCat,
      percentageBefore: Number(editProgBefore),
      percentageAfter: Number(editProgAfter),
      photoUrl: editProgPhoto
    });
    showToast(`✏️ Progres "${editProgTitle}" berhasil diperbarui!`);
    setEditingProgress(null);
  };

  const handleEditAllocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAllocation) return;
    onUpdateAllocation(editingAllocation.id, {
      item: editAllocItem,
      estimatedCost: Number(editAllocEstCost),
      actualSpent: Number(editAllocActSpent),
      category: editAllocCat,
      status: editAllocStatus
    });
    showToast(`✏️ Alokasi "${editAllocItem}" berhasil diperbarui!`);
    setEditingAllocation(null);
  };

  const handleEditDisbursementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDisb) return;
    onUpdateDisbursement(editingDisb.id, {
      amount: Number(editDisbAmount),
      recipient: editDisbRecipient,
      purpose: editDisbPurpose,
      category: editDisbCat,
      proofInvoice: editDisbProof
    });
    showToast(`✏️ Belanja "${editDisbPurpose}" berhasil diperbarui!`);
    setEditingDisb(null);
  };

  const handleEditGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    onUpdateGalleryItem(editingGallery.id, {
      title: editGalTitle,
      description: editGalDesc,
      category: editGalCat,
      imageUrl: editGalImage
    });
    showToast(`✏️ Dokumentasi "${editGalTitle}" berhasil diperbarui!`);
    setEditingGallery(null);
  };

  const handleEditProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProposal) return;
    onUpdateProposal(editingProposal.id, {
      title: editPropTitle,
      description: editPropDesc,
      targetCost: Number(editPropCost),
      urgency: editPropUrgency,
      category: editPropCat,
      icon: editPropIcon,
      status: editPropStatus,
      currentCollected: Number(editPropCurrentCollected)
    });
    showToast(`✏️ Proposal "${editPropTitle}" berhasil diperbarui!`);
    setEditingProposal(null);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      totalTarget: Number(setTargetInput),
      basePhysicalProgress: Number(setBasePhysInput),
      mosqueSpecs: {
        luasTanah: Number(setLuasTanahInput),
        luasBangunan: Number(setLuasBangunanInput),
        area: setAreaInput,
        alamat: setAlamatInput,
        koordinat: setKoordinatInput
      }
    });
    showToast(`⚙️ Konfigurasi dasar sistem pembangunan berhasil disimpan!`);
  };

  const handleAddPhotoSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl || !newPhotoLabel) {
      alert('Tolong isi URL foto dan label keterangannya.');
      return;
    }
    const newPhotos = [...oldMosquePhotos, { id: `photo_slide_${Date.now()}`, url: newPhotoUrl, label: newPhotoLabel }];
    onUpdateSettings({ oldMosquePhotos: newPhotos });
    setNewPhotoUrl('');
    setNewPhotoLabel('');
    showToast(`🖼️ Slide foto kondisi masjid berhasil ditambahkan!`);
  };

  const handleDeletePhotoSlide = (id: string, label: string) => {
    if (oldMosquePhotos.length <= 1) {
      alert('Gagal: Minimal harus menyisakan 1 foto slider.');
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus foto "${label}" dari slide beranda depan?`)) {
      const nextPhotos = oldMosquePhotos.filter(p => p.id !== id);
      onUpdateSettings({ oldMosquePhotos: nextPhotos });
      showToast(`🗑️ Foto "${label}" berhasil dicopot.`);
    }
  };

  const handleAddPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingPaymentDonorId) return;
    
    const donor = donors.find(d => d.id === addingPaymentDonorId);
    if (!donor) return;

    const invoiceNumber = `INV/OBN/2026/05/${Date.now().toString().slice(-4)}`;
    const newRecord: DonationRecord = {
      id: `record_${Date.now()}`,
      amount: Number(addPaymentAmount),
      date: new Date().toISOString().split('T')[0],
      type: donor.type,
      description: addPaymentDesc || (donor.type === 'monthly' ? `Iuran Bulanan Masjid An-Nur` : `Donasi Sukarela Tambahan`),
      invoiceNumber,
      status: 'sukses'
    };

    onAddDonorPayment(addingPaymentDonorId, newRecord);
    setAddingPaymentDonorId(null);
    setAddPaymentDesc('');
    showToast(`💰 Setoran sebesar ${formattedRupiah(addPaymentAmount)} berhasil ditambahkan ke saldo ${donor.name}!`);
  };

  const handleEditPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaymentRecord) return;
    onUpdateDonorPayment(editingPaymentRecord.donorId, editingPaymentRecord.paymentId, {
      amount: Number(editPaymentAmount),
      description: editPaymentDesc,
      status: editPaymentStatus,
      date: editPaymentDate
    });
    setEditingPaymentRecord(null);
    showToast(`✏️ Nilai transaksi ${formattedRupiah(editPaymentAmount)} berhasil diupdate.`);
  };

  const handleNewAllocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllocItem.trim()) {
      alert('Tolong isi nama lingkup kerja anggaran.');
      return;
    }
    onAddAllocation({
      item: newAllocItem.trim(),
      estimatedCost: Number(newAllocEstCost),
      category: newAllocCat,
      status: newAllocStatus,
      urgency: 'Mendesak'
    });
    setNewAllocItem('');
    setShowAddAllocForm(false);
    showToast(`🏗️ Pos anggaran RAB "${newAllocItem}" berhasil dibuat & diterbitkan!`);
  };

  return (
    <div className="flex-1 bg-[#0F172A] text-slate-100 flex flex-col min-h-full animate-fade-in relative font-sans">
      
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="absolute top-4 left-4 right-4 bg-emerald-500 text-white p-3.5 rounded-2xl flex items-center gap-2.5 shadow-2xl z-50 animate-bounce text-xs font-bold font-sans">
          <CheckCircle size={16} className="shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Panel Header Area */}
      <div className="bg-[#1E293B] border-b border-slate-800 p-4 shrink-0 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5 text-left">
          <div className="h-9 w-9 bg-teal-500 text-slate-950 rounded-xl flex items-center justify-center font-bold font-mono text-sm shadow-[0_0_12px_rgba(20,184,166,0.4)]">
            ADM
          </div>
          <div>
            <h2 className="text-xs font-extrabold tracking-wider text-teal-400 uppercase">KONSOL KEUANGAN & PEMBANGUNAN</h2>
            <h1 className="serif font-bold text-sm text-white flex items-center gap-1.5 leading-none mt-1">
              Masjid An-Nur Panitia
            </h1>
          </div>
        </div>

        {/* Logout Control Button */}
        <button
          onClick={onLogout}
          id="admin-logout-btn"
          className="p-2.5 bg-slate-800 hover:bg-rose-955 text-rose-400 border border-slate-700 hover:border-rose-900 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span className="font-bold hidden sm:inline">Keluar</span>
        </button>
      </div>

      {/* Internal Management Horizontal Tabs Selector */}
      <div className="bg-[#111827] border-b border-slate-800 px-3 py-1 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0 select-none">
        {[
          { id: 'verifikasi', label: '1. Verifikasi Dana', icon: UserCheck, count: pendingDonations.length },
          { id: 'progres', label: '2. Progres Fisik', icon: HardHat },
          { id: 'anggaran', label: '3. Alokasi Belanja', icon: DollarSign },
          { id: 'dokumentasi', label: '4. Galeri Acara', icon: Image },
          { id: 'proposal', label: '5. Proposal RAB', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`py-2 px-3 rounded-xl text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-[0_0_10px_rgba(20,184,166,0.25)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={13} className={isActive ? 'stroke-[2.5]' : ''} />
              <span>{tab.label.split('. ')[1] || tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${isActive ? 'bg-[#0F172A] text-teal-400' : 'bg-red-500 text-white'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Container of Admin Action Forms */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        
        {/* ======================================================= */}
        {/* ACTION TAB 1: DONATION PAYMENTS VERIFICATION QUEUE     */}
        {/* ======================================================= */}
        {activeAdminTab === 'verifikasi' && (
          <div className="space-y-3.5">
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl select-none">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                <UserCheck size={14} />
                Verifikasi Aliran Dana Masuk (Aprove manual)
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Menampilkan sumbangan mandiri/digital jemaah berstatus <strong>"Proses"</strong>. Harap lakukan pencocokan mutasi bank (MANDIRI/BCA/QRIS) Anda sebelum menekan tombol verifikasi. ID telepon donatur ditampilkan sepenuhnya untuk kebutuhan audit panitia pembangunan.
              </p>
            </div>

            {pendingDonations.length === 0 ? (
              <div className="text-center py-12 bg-[#111827] border border-slate-800/80 rounded-3xl space-y-2 select-none">
                <div className="text-teal-400 text-3xl">🕌</div>
                <h4 className="text-sm font-extrabold text-slate-300">Semua Dana Sukses Terverifikasi</h4>
                <p className="text-[10px] text-slate-500 max-w-xs mx-auto px-4">
                  Belum ada pengajuan donasi baru dengan status "Pending/Proses" saat ini.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDonations.map(({ donor, record }) => (
                  <div 
                    key={record.id}
                    className="bg-[#1E293B] border border-slate-800 rounded-3xl p-4 flex flex-col gap-3 transition-colors hover:border-slate-750"
                  >
                    <div className="flex justify-between items-start gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Circle with first letter */}
                        <div className="h-9 w-9 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black select-none">
                          {donor.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 text-left">
                          <span className="text-[9px] text-[#E3A008] uppercase font-mono tracking-tight block font-bold">
                            {record.invoiceNumber}
                          </span>
                          <strong className="text-xs text-white block truncate font-bold">{donor.name}</strong>
                          {/* FULL PHONE NUMBER DISPLAY ONLY TO THE PANITIA */}
                          <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                            📞 PHONE: <strong className="text-teal-400 select-all font-bold">{donor.phone || '0812xxxxxxxx'}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[8px] bg-[#E3A008]/15 border border-[#E3A008]/30 px-2 py-0.5 rounded text-[#E3A008] font-bold select-none text-[8px]">
                          PROSES VERIFIKASI
                        </span>
                        <strong className="text-xs font-mono text-emerald-400 block font-bold mt-1.5">
                          {formattedRupiah(record.amount)}
                        </strong>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#111827] rounded-2xl border border-slate-800 text-[11px] text-left">
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Keterangan Transfer:</span>
                      <strong className="text-slate-300 font-medium block mt-0.5">{record.description}</strong>
                    </div>

                    <div className="h-px bg-slate-800" />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleApproveClick(donor.id, record.id, donor.name, record.amount)}
                        id={`approve-btn-${record.id}`}
                        className="flex-1 py-2 bg-emerald-505 hover:bg-emerald-600 bg-emerald-600 text-white font-extrabold rounded-xl text-xs cursor-pointer shadow active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <Check size={14} className="stroke-[3px]" />
                        Konfirmasi Terima Uang (Sahkan)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ==================================================== */}
            {/* DAFTAR SELURUH DONATUR & PENYUMBANG (MANUAL & SEPARATED lists) */}
            {/* ==================================================== */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest leading-tight">
                    Database Donatur & Penyumbang
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Kelola peserta donasi manual maupun digital jemaah Masjid An-Nur.
                  </p>
                </div>
                {/* TAMBAH DATA MANUAL BUTTON */}
                <button
                  type="button"
                  onClick={() => setShowAddManualForm(!showAddManualForm)}
                  className="py-2 px-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-[10.5px] cursor-pointer flex items-center justify-center gap-1 shrink-0 transition-colors shadow-sm"
                >
                  <Plus size={14} className="stroke-[3px]" />
                  <span>Tambah Data Manual</span>
                </button>
              </div>

              {/* COLLAPSIBLE ADD MANUAL FORM */}
              {showAddManualForm && (
                <form onSubmit={handleAddManualSubmit} className="bg-slate-900 border border-slate-800 p-4 rounded-2.5xl space-y-3.5 text-left animate-fade-in relative">
                  <button
                    type="button"
                    onClick={() => setShowAddManualForm(false)}
                    className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white"
                  >
                    <X size={15} />
                  </button>

                  <div className="flex items-center gap-1.5 text-teal-450 font-bold text-[11px] mb-1">
                    <span>📝</span>
                    <span className="uppercase tracking-wider font-extrabold text-teal-400 text-[10px]">FORM PENDAFTARAN MANUAL</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Jenis Donasi</label>
                      <select
                        value={manualType}
                        onChange={(e) => {
                          setManualType(e.target.value as any);
                          if (e.target.value === 'monthly') {
                            setManualAmount(100000); // Reset base
                          } else {
                            setManualAmount(500000); // Standard single donation
                          }
                        }}
                        className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none"
                      >
                        <option value="monthly">Iuran Bulanan (Berjangka)</option>
                        <option value="one-time">Sekali Bayar (Donasi Tunai)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nama Lengkap Donatur</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: H. Ahmad Yani..."
                          value={manualName}
                          onChange={(e) => setManualName(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-950 text-white focus:outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">No HP / WhatsApp (Opsional)</label>
                        <input
                          type="text"
                          placeholder="Contoh: 081234567890"
                          value={manualPhone}
                          onChange={(e) => setManualPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-950 text-white focus:outline-none text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className={`grid gap-2.5 ${manualType === 'monthly' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                          {manualType === 'monthly' ? 'Nominal per Bulan (Rp)' : 'Jumlah Nominal Donasi (Rp)'}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          placeholder="Jumlah dana..."
                          value={formatRupiahInput(manualAmount)}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '');
                            setManualAmount(raw === '' ? 0 : Number(raw));
                          }}
                          className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-950 text-white focus:outline-none text-xs font-mono"
                        />
                      </div>

                      {manualType === 'monthly' && (
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Jangka Waktu Komitmen</label>
                          <select
                            value={manualPeriod}
                            onChange={(e) => setManualPeriod(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none text-xs"
                          >
                            <option value={1}>1 Tahun (12 Bulan)</option>
                            <option value={2}>2 Tahun (24 Bulan)</option>
                            <option value={3}>3 Tahun (36 Bulan)</option>
                            <option value={5}>5 Tahun (60 Bulan)</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 font-bold text-[11px] pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddManualForm(false)}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-750 text-slate-350 rounded-xl text-center cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center cursor-pointer"
                    >
                      Simpan Donatur Manual
                    </button>
                  </div>
                </form>
              )}

              {/* SEARCH FILTER BOX ON ACTIVE TAB VERIFIKASI */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari donatur di database berdasarkan nama..."
                  value={searchQueryDb}
                  onChange={(e) => setSearchQueryDb(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 text-slate-100 rounded-xl text-xs focus:outline-none focus:border-teal-500 transition-all font-sans text-left"
                />
              </div>

              {/* LIST 1: PESERTA IURAN BULANAN (Separated list) */}
              <div className="space-y-2 pt-1 text-left">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-teal-400 flex items-center justify-between">
                  <span>Daftar Peserta Iuran Bulanan</span>
                  <span className="bg-indigo-900/40 text-indigo-400 border border-indigo-800/40 px-1.5 py-0.2 rounded text-[8px] font-black font-mono">
                    BULANAN
                  </span>
                </h4>

                {(() => {
                  const monthlyFiltered = donors.filter(
                    (d) => d.type === 'monthly' && d.name.toLowerCase().includes(searchQueryDb.toLowerCase())
                  );

                  if (monthlyFiltered.length === 0) {
                    return (
                      <p className="text-[10px] text-slate-500 py-4 text-center bg-slate-900/30 rounded-2xl border border-slate-850/40 select-none">
                        Tidak ada data donatur bulanan yang cocok dengan pencarian.
                      </p>
                    );
                  }

                  return (
                    <div className="space-y-2">
                      {monthlyFiltered.map((donor) => {
                        const dueState = getNextDueDate(donor);
                        const isOverdue = dueState?.status === 'TERLAMBAT';

                        return (
                          <div
                            key={donor.id}
                            className={`p-3 bg-slate-900 border rounded-2xl flex justify-between items-center gap-3 transition-colors ${
                              isOverdue ? 'border-amber-500/30 bg-amber-500/5' : 'border-slate-850'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <strong className="text-xs text-white font-bold block truncate">{donor.name}</strong>
                                
                                {/* pulsing red warn bell icon if overdue */}
                                {isOverdue && (
                                  <div className="flex items-center gap-1 text-[8.5px] bg-red-950 text-red-400 border border-red-800/20 px-1 py-0.2 rounded font-mono font-bold animate-pulse">
                                    <Bell size={10} className="text-red-500 animate-bounce shrink-0" />
                                    <span>JATUH TEMPO</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-[10px] text-teal-400 font-mono font-semibold mt-1 flex items-center gap-1">
                                <span>📞 {donor.phone || 'N/A'}</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-slate-300">
                                  {formattedRupiah(donor.monthlyCommitment || 0)} / bln
                                </span>
                              </div>
                              <div className="text-[9.5px] text-slate-400 font-medium block mt-0.5 leading-relaxed">
                                Paid: <span className="text-teal-400 font-bold font-mono">{donor.history.filter(h => h.status === 'sukses').length}x</span> • 
                                Next Due: <span className={isOverdue ? 'text-red-400 font-semibold' : 'text-[#E3A008] font-semibold'}>{dueState?.text}</span>
                              </div>
                            </div>

                            <div className="flex gap-1.5 shrink-0 select-none">
                              {/* VIEW ICON "Mata" BUTTON */}
                              <button
                                type="button"
                                onClick={() => setSelectedDonorReview(donor)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 rounded-xl transition-all cursor-pointer border border-[#1E293B]"
                                title="Lihat detail pembayaran & tagihan"
                              >
                                <Eye size={13} />
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingDonor(donor);
                                  setEditDonorName(donor.name);
                                  setEditDonorPhone(donor.phone || '');
                                  setEditDonorContribution(donor.totalContribution);
                                }}
                                className="py-1.5 px-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-[10px] transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Apakah Anda yakin ingin menghapus "${donor.name}"?`)) {
                                    onDeleteDonor(donor.id);
                                    showToast(`🗑️ Donatur "${donor.name}" berhasil dihapus.`);
                                  }
                                }}
                                className="py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-[10px] transition-colors cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* LIST 2: PESERTA SEKALI BAYAR (Separated list) */}
              <div className="space-y-2 pt-2 text-left border-t border-slate-800/50">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-teal-450 flex items-center justify-between">
                  <span>Daftar Donatur Sekali Bayar</span>
                  <span className="bg-emerald-900/40 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.2 rounded text-[8px] font-black font-mono">
                    SEKALI BAYAR
                  </span>
                </h4>

                {(() => {
                  const oneTimeFiltered = donors.filter(
                    (d) => d.type === 'one-time' && d.name.toLowerCase().includes(searchQueryDb.toLowerCase())
                  );

                  if (oneTimeFiltered.length === 0) {
                    return (
                      <p className="text-[10px] text-slate-500 py-4 text-center bg-slate-900/30 rounded-2xl border border-slate-850/40 select-none">
                        Tidak ada data donatur sekali bayar yang cocok dengan pencarian.
                      </p>
                    );
                  }

                  return (
                    <div className="space-y-2">
                      {oneTimeFiltered.map((donor) => (
                        <div
                          key={donor.id}
                          className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex justify-between items-center gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <strong className="text-xs text-white font-bold block truncate">{donor.name}</strong>
                            <div className="text-[10px] text-teal-400 font-mono mt-0.5">📞 {donor.phone || 'N/A'}/WA</div>
                            <span className="text-[9.5px] text-slate-500 font-medium block mt-1">
                              Sumbangan: <span className="font-mono text-emerald-400 font-bold">{formattedRupiah(donor.totalContribution)}</span>
                            </span>
                          </div>

                          <div className="flex gap-1.5 shrink-0 select-none">
                            {/* VIEW ICON "Mata" BUTTON */}
                            <button
                              type="button"
                              onClick={() => setSelectedDonorReview(donor)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 rounded-xl transition-all cursor-pointer border border-[#1E293B]"
                              title="Lihat riwayat lengkap transaksi"
                            >
                              <Eye size={13} />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingDonor(donor);
                                setEditDonorName(donor.name);
                                setEditDonorPhone(donor.phone || '');
                                setEditDonorContribution(donor.totalContribution);
                              }}
                              className="py-1.5 px-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-[10px] transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Apakah Anda yakin ingin menghapus donatur "${donor.name}"?`)) {
                                  onDeleteDonor(donor.id);
                                  showToast(`🗑️ Donatur "${donor.name}" berhasil dihapus.`);
                                }
                              }}
                              className="py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-[10px] transition-colors cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* ACTION TAB 2: UPDATE PROGRESS REPORTS                  */}
        {/* ======================================================= */}
        {activeAdminTab === 'progres' && (
          <div className="space-y-4 text-left animate-fade-in">
            <form onSubmit={handleProgressSubmit} className="bg-[#1E293B] border border-slate-800 rounded-3xl p-4 space-y-4">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                <HardHat size={14} />
                Kirim Laporan Progres Fisik Baru
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Kategori Pekerjaan Struktural</label>
                  <select
                    value={progCat}
                    onChange={(e: any) => setProgCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-semibold focus:outline-none"
                  >
                    <option value="Masjid Utama">Masjid Utama (Renovasi)</option>
                    <option value="Rumah Imam & Tempat Wudhu">Rumah Imam & Tempat Wudhu</option>
                    <option value="Gudang">Gudang Masjid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Judul Laporan Kerja</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pengecoran tiang baja kubah timur..."
                    value={progTitle}
                    onChange={(e) => setProgTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deskripsi Rincian Laporan Lapangan</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Pekerjaan selesai dilakukan dengan melibatkan 12 tukang swadaya lokal Makassar..."
                    value={progDesc}
                    onChange={(e) => setProgDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Progres Sebelum (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={progBefore}
                      onChange={(e) => setProgBefore(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Progres Sesudah (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={progAfter}
                      onChange={(e) => setProgAfter(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">URL Foto Progres Kegiatan</label>
                  <input
                    type="url"
                    required
                    value={progPhoto}
                    onChange={(e) => setProgPhoto(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono text-[10px]"
                  />
                  <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none mt-1 select-none">
                    {[
                      { label: 'Kubah Konstruksi', url: 'https://images.unsplash.com/photo-1590076135891-9fdaef2beba0?auto=format&fit=crop&w=600&q=80' },
                      { label: 'Paving Pekerja', url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80' },
                      { label: 'Sanding Tembok', url: 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&w=600&q=80' }
                    ].map((x) => (
                      <button
                        key={x.label}
                        type="button"
                        onClick={() => setProgPhoto(x.url)}
                        className="px-2 py-1 border border-slate-800 hover:border-slate-700 bg-slate-900 text-[9px] rounded font-bold shrink-0 text-slate-350"
                      >
                        {x.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="admin-progress-submit-btn"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all text-center font-black"
              >
                Kirim Publikasikan Progres Terbaru
                <ArrowRight size={13} />
              </button>
            </form>

            {/* ==================================================== */}
            {/* LIST LAPORAN PROGRES FISIK UNTUK EDIT & HAPUS        */}
            {/* ==================================================== */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-3">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                Daftar Progres Fisik Terdaftar
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                Berikut adalah seluruh update pembangunan masjid terpublikasi. Klik edit untuk mengubah parameter rincian, atau hapus untuk mencabut publikasi dari beranda depan.
              </p>

              <div className="space-y-3">
                {progressReports.map((report) => (
                  <div key={report.id} className="p-3 bg-slate-900 border border-slate-800 rounded-2.5xl flex gap-3 text-left">
                    <img src={report.photoUrl} alt={report.title} className="h-14 w-16 object-cover rounded-xl border border-slate-800 bg-slate-950 shrink-0 select-none pointer-events-none" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[8px] bg-teal-500/10 text-teal-400 border border-teal-500/25 px-1.5 py-0.2 rounded uppercase font-bold tracking-wider select-none">{report.category}</span>
                      <h4 className="font-bold text-xs text-white truncate mt-1 leading-snug">{report.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{report.description}</p>
                      <div className="flex justify-between items-center text-[9px] mt-1.5 select-none text-slate-400">
                        <span>Pencapaian: <strong className="text-teal-400 font-mono">{report.percentageAfter}%</strong></span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProgress(report);
                              setEditProgTitle(report.title);
                              setEditProgDesc(report.description);
                              setEditProgCat(report.category);
                              setEditProgBefore(report.percentageBefore);
                              setEditProgAfter(report.percentageAfter);
                              setEditProgPhoto(report.photoUrl);
                            }}
                            className="text-teal-400 hover:underline font-bold text-[10px] cursor-pointer"
                          >
                            Edit
                          </button>
                          <span className="text-slate-800">|</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus progres harian "${report.title}"?`)) {
                                onDeleteProgressReport(report.id);
                                showToast(`🗑️ Laporan progres "${report.title}" berhasil dihapus.`);
                              }
                            }}
                            className="text-rose-400 hover:underline font-bold text-[10px] cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* ACTION TAB 3: BUDGET USAGE DISBURSEMENT RECODS         */}
        {/* ======================================================= */}
        {activeAdminTab === 'anggaran' && (
          <div className="space-y-4 text-left animate-fade-in">
            <form onSubmit={handleDisbursementSubmit} className="bg-[#1E293B] border border-slate-800 rounded-3xl p-4 space-y-4">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                <DollarSign size={14} />
                Catat Realisasi Penggunaan Anggaran (Disburse)
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Pos Sektor Biaya RAB</label>
                  <select
                    value={disbCat}
                    onChange={(e: any) => setDisbCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-semibold focus:outline-none"
                  >
                    <option value="Struktur Akhir">Struktur Akhir (Kolom/Pondasi)</option>
                    <option value="Kubah & Ornamen">Kubah & Ornamen Utama</option>
                    <option value="Paving & Parkir">Paving & Parkir Halaman</option>
                    <option value="Sound System">Sound System & Akustik Ruang</option>
                    <option value="Sajadah & Karpet">Sajadah & Karpet Turki Shalat</option>
                    <option value="Lainnya">Lainnya (Umum & Sampingan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nama Toko / Mitra Penerima Dana</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: PT Sinar Beton Makassar, CV Akustik Masjid..."
                    value={disbRecipient}
                    onChange={(e) => setDisbRecipient(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Detail Keperluan Belanja Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Keperluan: Pembelian bahan waterproofing dak karpet..."
                    value={disbPurpose}
                    onChange={(e) => setDisbPurpose(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Jumlah Tarik Belanja (IDR)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={formatRupiahInput(disbAmount)}
                      onChange={(e) => {
                        const rawNum = e.target.value.replace(/\D/g, '');
                        setDisbAmount(rawNum === '' ? 0 : Number(rawNum));
                      }}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">No. Nota / Faktur Kuitansi</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: NOTA-2026-99"
                      value={disbProof}
                      onChange={(e) => setDisbProof(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="admin-disburse-submit-btn"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all text-center font-black"
              >
                Keluarkan Anggaran & Terbitkan Transaksi
                <ArrowRight size={13} />
              </button>
            </form>

            {/* ==================================================== */}
            {/* LIST POS ALOKASI ANGGARAN UNTUK EDIT & HAPUS         */}
            {/* ==================================================== */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-3">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                Daftar Pos Alokasi Anggaran (RAB)
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                Berikut adalah seluruh pos alokasi estimasi anggaran dan realisasi belanja nyata. Anda dapat mengedit status pengerjaan atau nominal yang diserap, serta menghapus pos alokasi ini.
              </p>

              <div className="space-y-2.5">
                {allocations.map((alloc) => (
                  <div key={alloc.id} className="p-3 bg-slate-900 border border-slate-800 rounded-2.5xl flex justify-between items-center gap-3 text-left">
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong className="text-xs text-white font-bold block truncate">{alloc.item}</strong>
                        <span className="px-1.5 py-0.2 rounded text-[7.5px] bg-[#FAF9F5] text-slate-900 font-bold font-mono">
                          {alloc.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3 text-[10px] text-slate-400 mt-1">
                        <span>RAB: <strong className="text-white font-mono">{formattedRupiah(alloc.estimatedCost)}</strong></span>
                        <span>Realisasi: <strong className="text-teal-400 font-mono">{formattedRupiah(alloc.actualSpent)}</strong></span>
                      </div>
                      <span className="text-[9px] text-slate-500 block mt-0.5 animate-pulse">Status: {alloc.status}</span>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAllocation(alloc);
                          setEditAllocItem(alloc.item);
                          setEditAllocEstCost(alloc.estimatedCost);
                          setEditAllocActSpent(alloc.actualSpent);
                          setEditAllocCat(alloc.category);
                          setEditAllocStatus(alloc.status);
                        }}
                        className="py-1.5 px-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-[10px] transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Apakah Anda yakin ingin menghapus alokasi anggaran "${alloc.item}"?`)) {
                            onDeleteAllocation(alloc.id);
                            showToast(`🗑️ Alokasi "${alloc.item}" berhasil dihapus.`);
                          }
                        }}
                        className="py-1.5 px-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-[10px] transition-colors cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* COLLAPSIBLE FORM TO ADD NEW RAB POSITION */}
              <div className="pt-2 border-t border-slate-800/60">
                {showAddAllocForm ? (
                  <form onSubmit={handleNewAllocSubmit} className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center pb-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-teal-400">Tambah Pos Anggaran RAB Baru</span>
                      <button type="button" onClick={() => setShowAddAllocForm(false)} className="text-slate-500 hover:text-white text-[10px] font-bold">Batal ×</button>
                    </div>

                    <div className="space-y-2.5 text-xs text-left">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Nama Lingkup Kerja</label>
                        <input
                          type="text"
                          required
                          placeholder="Misal: Cat Eksterior Dinding Barat..."
                          value={newAllocItem}
                          onChange={(e) => setNewAllocItem(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-800 focus:border-teal-500 rounded-lg bg-slate-950 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Estimasi Target Biaya</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            required
                            value={formatRupiahInput(newAllocEstCost)}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, '');
                              setNewAllocEstCost(raw === '' ? 0 : Number(raw));
                            }}
                            className="w-full px-2.5 py-1.5 border border-slate-800 focus:border-teal-500 rounded-lg bg-slate-950 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Kategori Sektor</label>
                          <select
                            value={newAllocCat}
                            onChange={(e: any) => setNewAllocCat(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-850 rounded-lg bg-slate-950 text-white focus:outline-none"
                          >
                            <option value="Struktur Akhir">Struktur Akhir (Kolom/Pondasi)</option>
                            <option value="Kubah & Ornamen">Kubah & Ornamen Utama</option>
                            <option value="Paving & Parkir">Paving & Parkir Halaman</option>
                            <option value="Sound System">Sound System & Akustik Ruang</option>
                            <option value="Sajadah & Karpet">Sajadah & Karpet Turki Shalat</option>
                            <option value="Lainnya">Lainnya (Umum & Sambil)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-[10px] text-center"
                    >
                      Terbitkan Pos Anggaran Baru
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddAllocForm(true)}
                    className="w-full py-2 border border-dashed border-teal-500/30 text-teal-450 hover:bg-teal-950/20 text-[10px] font-bold rounded-xl text-center cursor-pointer"
                  >
                    + Buat Pos Anggaran RAB Baru
                  </button>
                )}
              </div>
            </div>

            {/* LIST 2: DAFTAR REALISASI BELANJA DINAMIS (DISBURSEMENTS) */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-3">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                Katalog Nota & Kuitansi Pengeluaran
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                Daftar kuitansi transaksi pengeluaran rill di lapangan untuk transparansi kas. Click Ubah untuk edit rincian transaksi belanja.
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {disbursements.length === 0 ? (
                  <p className="text-[10px] text-slate-505 py-6 text-center select-none bg-slate-900 border border-slate-850 rounded-2xl">
                    Belum ada kuitansi pengeluaran terdaftar.
                  </p>
                ) : (
                  disbursements.map((disb) => (
                    <div key={disb.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex justify-between items-center gap-3 text-left">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[7.5px] font-mono bg-red-950 text-red-400 border border-red-900/40 px-1.5 py-0.2 rounded font-bold uppercase">{disb.proofInvoice}</span>
                          <span className="text-[7.5px] font-sans bg-[#FAF9F5] text-slate-900 px-1.5 py-0.2 rounded font-bold uppercase">{disb.category}</span>
                        </div>
                        <strong className="text-xs text-white block truncate font-bold mt-1.5">{disb.purpose}</strong>
                        <div className="text-[9.5px] text-slate-400 mt-0.5">
                          Toko: <strong className="text-slate-300">{disb.recipient}</strong> • Tanggal: <strong className="text-slate-300">{disb.date || '31 Mei 2026'}</strong>
                        </div>
                        <strong className="text-xs font-mono text-rose-400 block mt-1">{formattedRupiah(disb.amount)}</strong>
                      </div>

                      <div className="flex gap-1.5 shrink-0 select-none">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDisb(disb);
                            setEditDisbAmount(disb.amount);
                            setEditDisbRecipient(disb.recipient);
                            setEditDisbPurpose(disb.purpose);
                            setEditDisbCat(disb.category);
                            setEditDisbProof(disb.proofInvoice);
                          }}
                          className="py-1.5 px-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-lg text-[9.5px] transition-colors cursor-pointer"
                        >
                          Ubah
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus kuitansi pengeluaran "${disb.purpose}" senilai ${formattedRupiah(disb.amount)}?`)) {
                              onDeleteDisbursement(disb.id);
                              showToast(`🗑️ Kuitansi "${disb.purpose}" berhasil dihapus.`);
                            }
                          }}
                          className="py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[9.5px] transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* ACTION TAB 4: GALLERY ACTIVITIES DOCUMENTATION         */}
        {/* ======================================================= */}
        {activeAdminTab === 'dokumentasi' && (
          <div className="space-y-4">
            <form onSubmit={handleGallerySubmit} className="bg-[#1E293B] border border-slate-800 rounded-3xl p-4 space-y-4 text-left">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                <Image size={14} />
                Kirim Dokumentasi Kegiatan Masjid Baru
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Kategori Acara</label>
                  <select
                    value={galCat}
                    onChange={(e: any) => setGalCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-semibold focus:outline-none"
                  >
                    <option value="Kerja Bakti">Kerja Bakti Gotong Royong</option>
                    <option value="Rapat">Rapat Musyawarah Panitia</option>
                    <option value="Pembangunan">Prosedur Fisik Pembangunan</option>
                    <option value="Pengajian">Pengajian & Majelis Ta'lim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Judul Kegiatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Rapat evaluasi pengecoran tiang utama..."
                    value={galTitle}
                    onChange={(e) => setGalTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deskripsi Singkat Acara</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Dihadiri oleh imam mesjid, penasihat RW, serta perwakilan warga Bumi Daya Indah Makassar..."
                    value={galDesc}
                    onChange={(e) => setGalDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">URL Link Gambar Kegiatan</label>
                  <input
                    type="url"
                    required
                    value={galImage}
                    onChange={(e) => setGalImage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono text-[10px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="admin-gallery-submit-btn"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all text-center font-black"
              >
                Terbitkan Foto Kegiatan Terbaru
                <ArrowRight size={13} />
              </button>
            </form>

            {/* GALLERY LIST DATABASE */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-3">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                Katalog Dokumentasi Kegiatan Aktif
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                Daftar file foto rilis kegiatan publikasi Masjid. Anda dapat mengubah teks keterangan, kategori acara, gambar dokumentasi atau menghapus item.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {gallery.length === 0 ? (
                  <p className="text-[10px] text-slate-500 py-6 text-center select-none bg-slate-900 border border-slate-850 rounded-2xl col-span-2">
                    Belum ada foto kegiatan di database.
                  </p>
                ) : (
                  gallery.map((gal) => (
                    <div key={gal.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex gap-3 text-left">
                      <img
                        src={gal.imageUrl}
                        alt={gal.title}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-950"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[7.5px] font-mono bg-blue-950 text-blue-400 border border-blue-900/40 px-1.5 py-0.2 rounded font-bold uppercase">{gal.category}</span>
                        <strong className="text-[11px] text-white block truncate font-bold mt-1">{gal.title}</strong>
                        <p className="text-[9.5px] text-slate-400 font-medium truncate mt-0.5">{gal.description}</p>
                        <div className="flex gap-2 mt-2 select-none">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingGallery(gal);
                              setEditGalTitle(gal.title);
                              setEditGalDesc(gal.description);
                              setEditGalCat(gal.category);
                              setEditGalImage(gal.imageUrl);
                            }}
                            className="py-1 px-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-lg text-[9.5px] cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus dokumentasi "${gal.title}"?`)) {
                                onDeleteGalleryItem(gal.id);
                                showToast(`🗑️ Dokumentasi "${gal.title}" berhasil dihapus.`);
                              }
                            }}
                            className="py-1 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[9.5px] cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* ACTION TAB 5: NEW PROPOSALS INITIATIVE                 */}
        {/* ======================================================= */}
        {activeAdminTab === 'proposal' && (
          <div className="space-y-4">
            <form onSubmit={handleProposalSubmit} className="bg-[#1E293B] border border-slate-800 rounded-3xl p-4 space-y-4 text-left">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                <FileText size={14} />
                Buka Program Proposal Urgensi RAB Baru
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Lingkup Pembangunan DED</label>
                  <select
                    value={propCat}
                    onChange={(e: any) => setPropCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-semibold focus:outline-none"
                  >
                    <option value="Masjid Utama">Masjid Utama (Struktur & Kubah)</option>
                    <option value="Rumah Imam & Wudhu">Rumah Imam & Sarana Wudhu</option>
                    <option value="Gudang Masjid">Pembangunan Gudang Sarpras An-Nur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nama Usulan Anggaran (RAB)</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Pengadaan kubat kecil selasar timur..."
                    value={propTitle}
                    onChange={(e) => setPropTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Urgensi & Kepentingan</label>
                  <select
                    value={propUrgency}
                    onChange={(e: any) => setPropUrgency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-semibold focus:outline-none"
                  >
                    <option value="Sangat Mendesak">🚨 Sangat Mendesak</option>
                    <option value="Mendesak">⚠️ Mendesak</option>
                    <option value="Sedang">⏳ Sedang (Sedang)</option>
                    <option value="Rencana Jangka Panjang">📋 Jangka Panjang / Estetika</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Target Anggaran (IDR)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={formatRupiahInput(propCost)}
                      onChange={(e) => {
                        const rawNum = e.target.value.replace(/\D/g, '');
                        setPropCost(rawNum === '' ? 0 : Number(rawNum));
                      }}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Visual Icon Representatif</label>
                    <select
                      value={propIcon}
                      onChange={(e) => setPropIcon(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-semibold focus:outline-none"
                    >
                      <option value="Hammer">Hammer (Konstruksi Beton)</option>
                      <option value="Paintbrush">Paintbrush (Ornamen Finishing)</option>
                      <option value="Grid">Grid (Keramik / Paving)</option>
                      <option value="Volume2">Volume2 (Acoustic / Speaker)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deskripsi Justifikasi Proposal</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Meminimalkan cipratan air hujan ke area wudhu..."
                    value={propDesc}
                    onChange={(e) => setPropDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="admin-proposal-submit-btn"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all text-center font-black"
              >
                Masukkan Usulan Program RAB Baru
                <ArrowRight size={13} />
              </button>
            </form>

            {/* USULAN PROPOSAL LIST */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-3">
              <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                Katalog Program Proposal RAB Aktif
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                Daftar inisiatif penggalangan dana khusus (RAB). Selesaikan target dana atau ubah detail status proposal di bawah.
              </p>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {proposals.length === 0 ? (
                  <p className="text-[10px] text-slate-505 py-6 text-center select-none bg-slate-900 border border-slate-850 rounded-2xl">
                    Belum ada program proposal terbit.
                  </p>
                ) : (
                  proposals.map((prop) => (
                    <div key={prop.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex justify-between items-center gap-3 text-left">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[7.5px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${prop.urgency === 'Sangat Mendesak' ? 'bg-red-950 text-red-400 border border-red-900/30' : 'bg-slate-850 text-slate-300'}`}>{prop.urgency}</span>
                          <span className={`text-[7.5px] font-sans px-1.5 py-0.2 rounded font-bold uppercase ${prop.status === 'Selesai' ? 'bg-emerald-950 text-emerald-400' : 'bg-blue-950 text-blue-400'}`}>{prop.status}</span>
                        </div>
                        <strong className="text-xs text-white block truncate font-bold mt-1.5">{prop.title}</strong>
                        <div className="grid grid-cols-2 gap-x-2 text-[10px] text-slate-400 mt-1">
                          <span>Target: <strong className="text-slate-350">{formattedRupiah(prop.targetCost)}</strong></span>
                          <span>Terkumpul: <strong className="text-teal-400 font-mono">{formattedRupiah(prop.currentCollected || 0)}</strong></span>
                        </div>
                      </div>

                      <div className="flex gap-1.5 shrink-0 select-none">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProposal(prop);
                            setEditPropTitle(prop.title);
                            setEditPropDesc(prop.description);
                            setEditPropCost(prop.targetCost);
                            setEditPropUrgency(prop.urgency);
                            setEditPropCat(prop.category);
                            setEditPropIcon(prop.icon);
                            setEditPropStatus(prop.status);
                            setEditPropCurrentCollected(prop.currentCollected || 0);
                          }}
                          className="py-1.5 px-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-lg text-[9.5px] transition-colors cursor-pointer"
                        >
                          Ubah
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Apakah Anda yakin ingin menghapus proposal "${prop.title}"?`)) {
                              onDeleteProposal(prop.id);
                              showToast(`🗑️ Proposal "${prop.title}" berhasil dihapus.`);
                            }
                          }}
                          className="py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[9.5px] transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* ACTION TAB 6: SYSTEM SETTINGS CONFIGURATION            */}
        {/* ======================================================= */}
        {activeAdminTab === 'pengaturan' && (
          <div className="space-y-4">
            <form onSubmit={handleSettingsSave} className="bg-[#1E293B] border border-slate-800 rounded-3xl p-4 space-y-4 text-left">
              <div className="border-b border-slate-850 pb-2.5">
                <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                  <Sliders size={14} />
                  Kustomisasi Parameter Utama & Spesifikasi
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Semua form ini mengontrol target rill yang ditampilkan pada beranda depan dan laporan transparansi publik secara serentak.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Target Anggaran Pembangunan (Rp)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={formatRupiahInput(setTargetInput)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        setSetTargetInput(raw === '' ? 0 : Number(raw));
                      }}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Progres Fisik Awal Sebelum Renovasi (%)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={100}
                      value={setBasePhysInput}
                      onChange={(e) => setSetBasePhysInput(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Luas Tanah (m²)</label>
                    <input
                      type="number"
                      required
                      value={setLuasTanahInput}
                      onChange={(e) => setSetLuasTanahInput(Number(e.target.value))}
                      className="w-full px-2.5 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Luas Bangunan (m²)</label>
                    <input
                      type="number"
                      required
                      value={setLuasBangunanInput}
                      onChange={(e) => setSetLuasBangunanInput(Number(e.target.value))}
                      className="w-full px-2.5 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sektor Wilayah Utama</label>
                    <input
                      type="text"
                      required
                      value={setAreaInput}
                      onChange={(e) => setSetAreaInput(e.target.value)}
                      className="w-full px-2.5 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Alamat Fisik Masjid</label>
                    <input
                      type="text"
                      required
                      value={setAlamatInput}
                      onChange={(e) => setSetAlamatInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Koordinat Pintas LatLong Google Maps</label>
                    <input
                      type="text"
                      required
                      value={setKoordinatInput}
                      onChange={(e) => setSetKoordinatInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-800 focus:border-teal-500 rounded-xl bg-slate-900 text-slate-100 font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all text-center font-black"
              >
                Simpan Konfigurasi & Sinkronisasikan Web Publik
                <ArrowRight size={13} />
              </button>
            </form>

            {/* DYNAMIC CAROUSEL IMAGES SLIDES DI BERANDA DEPAN */}
            <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-3xl space-y-4 text-left">
              <div>
                <h3 className="serif text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Image size={14} />
                  Katalog Foto Slider Kondisi Lama Masjid
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Menampilkan kondisi dokumentasi pra-pembangunan Masjid An-Nur pada grid beranda utama depan. Anda dapat mendaftarkan foto eksternal atau mencopotnya.
                </p>
              </div>

              {/* LIST ITEMS SLIDES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {oldMosquePhotos.map((photo) => (
                  <div key={photo.id} className="p-2.5 bg-slate-900 border border-slate-850 rounded-2xl flex gap-3 items-center">
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="h-14 w-14 rounded-xl object-cover shrink-0 bg-slate-950 border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <strong className="text-[11px] text-white block truncate">{photo.label}</strong>
                      <span className="text-[8px] text-slate-500 truncate block font-mono">{photo.url}</span>
                      <button
                        type="button"
                        onClick={() => handleDeletePhotoSlide(photo.id, photo.label)}
                        className="text-[9.5px] text-rose-400 hover:text-rose-300 font-bold mt-1 block cursor-pointer"
                      >
                        Hapus Foto Slide
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ADD NEW PHOTO ITEM FORM */}
              <form onSubmit={handleAddPhotoSlide} className="p-3 bg-slate-900 border border-slate-850 rounded-2.5xl space-y-2.5">
                <span className="text-[10px] uppercase font-bold text-teal-400 block tracking-wider">Tambah Foto Slide Baru</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <input
                      type="url"
                      required
                      placeholder="Masukkan URL Gambar..."
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-800 focus:border-teal-500 rounded-lg bg-slate-950 text-white font-mono text-[10px]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Label Foto (Contoh: Sisi Dak Karpet Bocor...)"
                      value={newPhotoLabel}
                      onChange={(e) => setNewPhotoLabel(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-800 focus:border-teal-500 rounded-lg bg-slate-950 text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-750 text-teal-400 hover:text-teal-300 rounded-lg text-[10px] font-bold text-center"
                >
                  + Tambahkan ke Carousel Beranda
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* ======================================================= */}
      {/* MODAL EDITING OVERLAYS                                  */}
      {/* ======================================================= */}
      
      {/* 1. Modal Edit Donor */}
      {editingDonor && (
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditDonorSubmit} className="w-full max-w-[340px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Data Donatur</h4>
              <button type="button" onClick={() => setEditingDonor(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nama Lengkap Donatur</label>
                <input
                  type="text"
                  required
                  value={editDonorName}
                  onChange={(e) => setEditDonorName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 font-semibold focus:outline-none focus:border-teal-500 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nomor Telepon HP</label>
                <input
                  type="text"
                  required
                  value={editDonorPhone}
                  onChange={(e) => setEditDonorPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 font-mono focus:outline-none focus:border-teal-500 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nominal Sumbangan (IDR)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formatRupiahInput(editDonorContribution)}
                  onChange={(e) => {
                    const rawNum = e.target.value.replace(/\D/g, '');
                    setEditDonorContribution(rawNum === '' ? 0 : Number(rawNum));
                  }}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 font-mono focus:outline-none focus:border-teal-500 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingDonor(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Simpan Data</button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Modal Edit Progress Report */}
      {editingProgress && (
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditProgressSubmit} className="w-full max-w-[340px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left overflow-y-auto max-h-[90%]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Progres Kerja</h4>
              <button type="button" onClick={() => setEditingProgress(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Kategori Pekerjaan</label>
                <select
                  value={editProgCat}
                  onChange={(e: any) => setEditProgCat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none"
                >
                  <option value="Masjid Utama">Masjid Utama (Renovasi)</option>
                  <option value="Rumah Imam & Tempat Wudhu">Rumah Imam & Tempat Wudhu</option>
                  <option value="Gudang">Gudang Masjid</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Judul Laporan</label>
                <input
                  type="text"
                  required
                  value={editProgTitle}
                  onChange={(e) => setEditProgTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deskripsi Kegiatan</label>
                <textarea
                  required
                  rows={2}
                  value={editProgDesc}
                  onChange={(e) => setEditProgDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sebelum (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={editProgBefore}
                    onChange={(e) => setEditProgBefore(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sesudah (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={editProgAfter}
                    onChange={(e) => setEditProgAfter(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">URL Foto Progres</label>
                <input
                  type="url"
                  required
                  value={editProgPhoto}
                  onChange={(e) => setEditProgPhoto(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono text-[10.5px]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingProgress(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Modal Edit Allocation */}
      {editingAllocation && (
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditAllocationSubmit} className="w-full max-w-[340px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left overflow-y-auto max-h-[90%] font-sans">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Alokasi Anggaran</h4>
              <button type="button" onClick={() => setEditingAllocation(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Lingkup Kerja (Item)</label>
                <input
                  type="text"
                  required
                  value={editAllocItem}
                  onChange={(e) => setEditAllocItem(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Estimasi Anggaran RAB (IDR)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formatRupiahInput(editAllocEstCost)}
                  onChange={(e) => {
                    const rawNum = e.target.value.replace(/\D/g, '');
                    setEditAllocEstCost(rawNum === '' ? 0 : Number(rawNum));
                  }}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Realisasi Pengeluaran (IDR)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formatRupiahInput(editAllocActSpent)}
                  onChange={(e) => {
                    const rawNum = e.target.value.replace(/\D/g, '');
                    setEditAllocActSpent(rawNum === '' ? 0 : Number(rawNum));
                  }}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sektor / Pos Kategori</label>
                <select
                  value={editAllocCat}
                  onChange={(e: any) => setEditAllocCat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none"
                >
                  <option value="Struktur Akhir">Struktur Akhir (Kolom/Pondasi)</option>
                  <option value="Kubah & Ornamen">Kubah & Ornamen utama</option>
                  <option value="Paving & Parkir">Paving & Parkir Halaman</option>
                  <option value="Sound System">Sound System & Akustik Ruang</option>
                  <option value="Sajadah & Karpet">Sajadah & Karpet Turki Shalat</option>
                  <option value="Lainnya">Lainnya (Umum & Sampingan)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status Pengerjaan</label>
                <select
                  value={editAllocStatus}
                  onChange={(e: any) => setEditAllocStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none text-[11px]"
                >
                  <option value="Belum Dimulai">Belum Dimulai</option>
                  <option value="Pengerjaan">Pengerjaan</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingAllocation(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Modal Detail Donatur (Review Eye Icon Click) */}
      {selectedDonorReview && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-slate-100 select-none">
          <div className="w-full max-w-sm bg-[#1E293B] border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDonorReview(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-full text-slate-450 hover:text-white transition-colors animate-pulse"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-2 text-teal-400 font-extrabold text-xs tracking-wider border-b border-slate-800 pb-2">
              <Eye size={15} />
              <h3 className="serif uppercase">Review Kartu Donatur</h3>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black text-sm shrink-0">
                {selectedDonorReview.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 text-left">
                <h4 className="text-xs font-bold text-white truncate leading-none">{selectedDonorReview.name}</h4>
                <p className="text-[9.5px] text-teal-400 font-mono mt-1">📞 {selectedDonorReview.phone || 'N/A'}</p>
                <span className={`inline-block px-1.5 py-0.2 rounded text-[6.5px] font-black uppercase mt-1 ${selectedDonorReview.type === 'monthly' ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-850/40' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-850/40'}`}>
                  {selectedDonorReview.type === 'monthly' ? 'Iuran Bulanan' : 'Sekali Bayar'}
                </span>
              </div>
            </div>

            {/* INJECT LIVE-LOOKUP SYSTEM SO TRANSACTION MUTATIONS UPDATE IN REAL-TIME */}
            {(() => {
              const liveDonor = donors.find(d => d.id === selectedDonorReview.id) || selectedDonorReview;
              const dueInfo = liveDonor.type === 'monthly' ? getNextDueDate(liveDonor) : null;
              const monthsPaid = liveDonor.history.filter(h => h.status === 'sukses').length;
              const totalMonths = liveDonor.totalMonthsCommit || (liveDonor.periodYears ? liveDonor.periodYears * 12 : 12);

              return (
                <div className="space-y-4">
                  {liveDonor.type === 'monthly' && (
                    <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-3 text-left space-y-2">
                      <div>
                        <span className="text-[8px] uppercase font-bold text-slate-400 block">Progres Komitmen</span>
                        <strong className="text-[10.5px] text-slate-200 block mt-0.5">
                          Telah melunasi <span className="text-teal-400 font-extrabold">{monthsPaid} kali</span> dari <span className="font-bold">{totalMonths} bulan</span>.
                        </strong>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden flex">
                          <div 
                            className="bg-teal-500 h-full rounded-full transition-all" 
                            style={{ width: `${Math.min((monthsPaid / totalMonths) * 100, 100)}%` }} 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/40">
                        <div>
                          <span className="text-[8px] uppercase font-semibold text-slate-400 block">Jatuh Tempo Ke-{(monthsPaid + 1)}</span>
                          <strong className={`text-[10.5px] block mt-0.5 ${dueInfo?.status === 'TERLAMBAT' ? 'text-red-400 animate-pulse' : 'text-[#E3A008]'}`}>
                            {dueInfo?.text}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[8px] uppercase font-semibold text-slate-400 block">Nominal Iuran</span>
                          <strong className="text-[10.5px] text-white block mt-0.5">{formattedRupiah(liveDonor.monthlyCommitment || 0)}/bln</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TRANSACTION LIST */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <h5 className="font-serif font-bold text-[9px] text-teal-400 uppercase tracking-widest">Riwayat Setoran Dana</h5>
                      <button
                        type="button"
                        onClick={() => {
                          if (addingPaymentDonorId === liveDonor.id) {
                            setAddingPaymentDonorId(null);
                          } else {
                            setAddingPaymentDonorId(liveDonor.id);
                            setAddPaymentAmount(liveDonor.type === 'monthly' ? (liveDonor.monthlyCommitment || 100000) : 250000);
                            setAddPaymentDesc(liveDonor.type === 'monthly' ? `Pembayaran Iuran Bulan Ke-${monthsPaid + 1}` : 'Sedekah Pembangunan Masjid');
                          }
                        }}
                        className="text-[9px] text-teal-400 hover:text-teal-300 font-bold bg-teal-500/10 px-2 py-0.5 rounded cursor-pointer select-none"
                      >
                        {addingPaymentDonorId === liveDonor.id ? 'Tutup Form' : '+ Tambah Setoran'}
                      </button>
                    </div>

                    {/* FORM ADD NEW TRANSACTION SETORAN */}
                    {addingPaymentDonorId === liveDonor.id && (
                      <div className="p-3 bg-slate-900 border border-teal-500/30 rounded-2xl space-y-2.5 my-2">
                        <span className="text-[8.5px] font-black uppercase tracking-wider block text-teal-400">Catat Transaksi Bayar Baru</span>
                        
                        <div className="space-y-2 text-[10px]">
                          <div>
                            <label className="block text-[8px] font-bold uppercase text-slate-400 mb-1">Nominal Setoran (Rp)</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              required
                              value={formatRupiahInput(addPaymentAmount)}
                              onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, '');
                                setAddPaymentAmount(raw === '' ? 0 : Number(raw));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[8px] font-bold uppercase text-slate-400 mb-1">Keterangan Transaksi</label>
                            <input
                              type="text"
                              required
                              value={addPaymentDesc}
                              onChange={(e) => setAddPaymentDesc(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-white"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (addPaymentAmount <= 0) {
                              alert('Harap masukkan nominal yang valid.');
                              return;
                            }
                            const today = new Date();
                            const formattedToday = today.toISOString().split('T')[0];
                            const invNum = `INV-MAN-${Math.floor(100000 + Math.random() * 900000)}`;
                            const newRec: DonationRecord = {
                              id: `rec_${Date.now()}`,
                              invoiceNumber: invNum,
                              amount: addPaymentAmount,
                              date: formattedToday,
                              status: 'sukses',
                              type: liveDonor.type,
                              description: addPaymentDesc,
                            };
                            onAddDonorPayment(liveDonor.id, newRec);
                            setAddingPaymentDonorId(null);
                            showToast(`💚 Setoran Rp ${addPaymentAmount.toLocaleString('id-ID')} berhasil diverifikasi.`);
                          }}
                          className="w-full py-1.5 bg-teal-500 hover:bg-teal-600 text-slate-950 text-[10px] rounded-lg font-black uppercase text-center"
                        >
                          Catat & Verifikasi Langsung
                        </button>
                      </div>
                    )}

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {liveDonor.history.length === 0 ? (
                        <p className="text-[9.5px] text-slate-500 text-center py-4 bg-slate-900 rounded-xl">Belum ada riwayat transaksi.</p>
                      ) : (
                        liveDonor.history.map((h) => (
                          <div key={h.id} className="p-2 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center text-[10px]">
                            <div className="min-w-0 flex-1">
                              <span className="text-[7.5px] text-slate-400 font-mono block">{h.date} • {h.invoiceNumber}</span>
                              <span className="text-slate-200 block truncate font-medium">{h.description}</span>
                              
                              <div className="flex gap-2 mt-1 font-bold text-[8.5px] select-none text-slate-400">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingPaymentRecord({ donorId: liveDonor.id, paymentId: h.id });
                                    setEditPaymentAmount(h.amount);
                                    setEditPaymentDesc(h.description);
                                    setEditPaymentStatus(h.status);
                                    setEditPaymentDate(h.date);
                                  }}
                                  className="hover:text-teal-400 pointer-events-auto"
                                >
                                  Edit
                                </button>
                                <span className="text-slate-700">|</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Apakah Anda yakin ingin menghapus transaksi "${h.invoiceNumber}" senilai Rp ${h.amount.toLocaleString()}?`)) {
                                      onDeleteDonorPayment(liveDonor.id, h.id);
                                      showToast(`🗑️ Transaksi ${h.invoiceNumber} berhasil dihapus.`);
                                    }
                                  }}
                                  className="hover:text-red-400 pointer-events-auto"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <strong className="font-mono text-emerald-400 block">{formattedRupiah(h.amount)}</strong>
                              <span className={`text-[7px] font-bold uppercase block mt-0.5 ${h.status === 'sukses' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                                {h.status === 'sukses' ? 'SUKSES' : 'PROSES'}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={() => setSelectedDonorReview(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer text-center mt-2 font-black uppercase tracking-wider"
            >
              Selesai Review
            </button>
          </div>
        </div>
      )}

      {/* 5. Modal Edit Disbursement (Belanja) */}
      {editingDisb && (
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditDisbursementSubmit} className="w-full max-w-[350px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left overflow-y-auto max-h-[90%]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Bukti Belanja</h4>
              <button type="button" onClick={() => setEditingDisb(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Maksud / Keperluan Belanja</label>
                <input
                  type="text"
                  required
                  value={editDisbPurpose}
                  onChange={(e) => setEditDisbPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Penerima Dana (Toko / Mandor)</label>
                <input
                  type="text"
                  required
                  value={editDisbRecipient}
                  onChange={(e) => setEditDisbRecipient(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nominal Belanja Terbayar (IDR)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formatRupiahInput(editDisbAmount)}
                  onChange={(e) => {
                    const rawNum = e.target.value.replace(/\D/g, '');
                    setEditDisbAmount(rawNum === '' ? 0 : Number(rawNum));
                  }}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Pos Kategori Terkait</label>
                <select
                  value={editDisbCat}
                  onChange={(e: any) => setEditDisbCat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none"
                >
                  <option value="Struktur Akhir">Struktur Akhir (Kolom/Pondasi)</option>
                  <option value="Kubah & Ornamen">Kubah & Ornamen utama</option>
                  <option value="Paving & Parkir">Paving & Parkir Halaman</option>
                  <option value="Sound System">Sound System & Akustik Ruang</option>
                  <option value="Sajadah & Karpet">Sajadah & Karpet Turki Shalat</option>
                  <option value="Lainnya">Lainnya (Umum & Sampingan)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">URL Bukti Pembayaran / Nota Kuitansi</label>
                <input
                  type="url"
                  required
                  value={editDisbProof}
                  onChange={(e) => setEditDisbProof(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingDisb(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Simpan Belanja</button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Modal Edit Gallery (Dokumentasi) */}
      {editingGallery && (
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditGallerySubmit} className="w-full max-w-[340px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Kegiatan Galeri</h4>
              <button type="button" onClick={() => setEditingGallery(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Judul Dokumentasi</label>
                <input
                  type="text"
                  required
                  value={editGalTitle}
                  onChange={(e) => setEditGalTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Kategori Acara</label>
                <select
                  value={editGalCat}
                  onChange={(e: any) => setEditGalCat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white focus:outline-none"
                >
                  <option value="Kerja Bakti">Kerja Bakti Gotong Royong</option>
                  <option value="Rapat">Rapat Musyawarah Panitia</option>
                  <option value="Pembangunan">Prosedur Fisik Pembangunan</option>
                  <option value="Pengajian">Pengajian & Majelis Ta'lim</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deskripsi Ringkasan</label>
                <textarea
                  required
                  rows={3}
                  value={editGalDesc}
                  onChange={(e) => setEditGalDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">URL Link Foto Berkas</label>
                <input
                  type="url"
                  required
                  value={editGalImage}
                  onChange={(e) => setEditGalImage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingGallery(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Simpan Perubahan</button>
            </div>
          </form>
        </div>
      )}

      {/* 7. Modal Edit Proposal */}
      {editingProposal && (
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditProposalSubmit} className="w-full max-w-[350px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left overflow-y-auto max-h-[90%]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Target Usulan RAB</h4>
              <button type="button" onClick={() => setEditingProposal(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Program Usulan Pembangunan</label>
                <input
                  type="text"
                  required
                  value={editPropTitle}
                  onChange={(e) => setEditPropTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Tingkat Urgensi</label>
                <select
                  value={editPropUrgency}
                  onChange={(e: any) => setEditPropUrgency(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                >
                  <option value="Sangat Mendesak">🚨 Sangat Mendesak</option>
                  <option value="Mendesak">⚠️ Mendesak</option>
                  <option value="Sedang">⏳ Sedang (Sedang)</option>
                  <option value="Rencana Jangka Panjang">📋 Jangka Panjang / Estetika</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Dana Target (IDR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={formatRupiahInput(editPropCost)}
                    onChange={(e) => {
                      const rawNum = e.target.value.replace(/\D/g, '');
                      setEditPropCost(rawNum === '' ? 0 : Number(rawNum));
                    }}
                    className="w-full px-2.5 py-2 border border-slate-800 rounded-xl bg-slate-950 font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Dana Terkumpul (IDR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={formatRupiahInput(editPropCurrentCollected)}
                    onChange={(e) => {
                      const rawNum = e.target.value.replace(/\D/g, '');
                      setEditPropCurrentCollected(rawNum === '' ? 0 : Number(rawNum));
                    }}
                    className="w-full px-2.5 py-2 border border-slate-800 rounded-xl bg-slate-950 font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Kategori Proposal</label>
                <select
                  value={editPropCat}
                  onChange={(e: any) => setEditPropCat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                >
                  <option value="Masjid Utama">Masjid Utama (Struktur & Kubah)</option>
                  <option value="Rumah Imam & Wudhu">Rumah Imam & Sarana Wudhu</option>
                  <option value="Gudang Masjid">Pembangunan Gudang Sarpras An-Nur</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status Kampanye</label>
                <select
                  value={editPropStatus}
                  onChange={(e: any) => setEditPropStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                >
                  <option value="Aktif">Aktif Menggalang</option>
                  <option value="Terpenuhi">Selesai / Terpenuhi</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deskripsi Justifikasi Singkat</label>
                <textarea
                  required
                  rows={2}
                  value={editPropDesc}
                  onChange={(e) => setEditPropDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingProposal(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Simpan Perubahan</button>
            </div>
          </form>
        </div>
      )}

      {/* 8. Modal Edit Individual Payment History Record */}
      {editingPaymentRecord && (
        <div className="absolute inset-0 bg-[#020617]/85 backdrop-blur-xs flex items-center justify-center p-4 z-[60]">
          <form onSubmit={handleEditPaymentSubmit} className="w-full max-w-[325px] bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-left shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="serif text-xs font-black text-teal-400 uppercase tracking-widest leading-none">Ubah Setoran Transaksi</h4>
              <button type="button" onClick={() => setEditingPaymentRecord(null)} className="text-slate-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nominal Transaksi (Rp)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formatRupiahInput(editPaymentAmount)}
                  onChange={(e) => {
                    const rawNum = e.target.value.replace(/\D/g, '');
                    setEditPaymentAmount(rawNum === '' ? 0 : Number(rawNum));
                  }}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Memo / Keterangan Pembayaran</label>
                <input
                  type="text"
                  required
                  value={editPaymentDesc}
                  onChange={(e) => setEditPaymentDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Tanggal Bayar</label>
                  <input
                    type="date"
                    required
                    value={editPaymentDate}
                    onChange={(e) => setEditPaymentDate(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-800 rounded-xl bg-slate-955 text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status Verifikasi</label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e: any) => setEditPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950 text-white"
                  >
                    <option value="sukses">Sukses</option>
                    <option value="proses">Menunggu Proses</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 text-[11px] font-bold">
              <button type="button" onClick={() => setEditingPaymentRecord(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-center">Batal</button>
              <button type="submit" className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl text-center">Ubah Data Transaksi</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
