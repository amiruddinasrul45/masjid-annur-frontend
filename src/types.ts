/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DonationRecord {
  id: string;
  amount: number;
  date: string;
  type: 'monthly' | 'one-time';
  description: string;
  invoiceNumber: string;
  status: 'proses' | 'sukses' | 'gagal';
}

export interface Donor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar: string;
  type: 'monthly' | 'one-time';
  status: 'active' | 'inactive';
  totalContribution: number;
  monthlyCommitment?: number; // For monthly donor
  periodYears?: number; // In years
  monthsPaid?: number;
  totalMonthsCommit?: number;
  lastPaymentDate?: string;
  history: DonationRecord[];
}

export interface ProgressReport {
  id: string;
  date: string;
  category: 'Masjid Utama' | 'Rumah Imam & Tempat Wudhu' | 'Gudang';
  title: string;
  description: string;
  photoUrl: string;
  reporter: string;
  percentageBefore: number;
  percentageAfter: number;
}

export interface Allocation {
  id: string;
  item: string;
  estimatedCost: number;
  actualSpent: number;
  category: 'Struktur Akhir' | 'Kubah & Ornamen' | 'Paving & Parkir' | 'Sound System' | 'Sajadah & Karpet' | 'Lainnya';
  status: 'Belum Dimulai' | 'Pengerjaan' | 'Selesai';
}

export interface Disbursement {
  id: string;
  date: string;
  amount: number;
  recipient: string; // Penerima manfaat
  purpose: string; // Kebutuhan atau tujuan penyaluran
  category: string;
  proofInvoice: string; // No. kuitansi atau invoice
  status: 'Disalurkan';
}

export interface ActivityGallery {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Kerja Bakti' | 'Rapat' | 'Pembangunan' | 'Pengajian';
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  targetCost: number;
  currentCollected: number;
  urgency: 'Sangat Mendesak' | 'Mendesak' | 'Sedang' | 'Rencana Jangka Panjang';
  category: 'Masjid Utama' | 'Rumah Imam & Wudhu' | 'Gudang Masjid';
  icon: string;
  status: 'Aktif' | 'Terpenuhi';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'progress' | 'disbursement' | 'donation' | 'info';
  metadata?: {
    itemId?: string;
    amount?: number;
    recipient?: string;
  };
}
