/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Donor, ProgressReport, Allocation, Disbursement, ActivityGallery, Proposal, AppNotification } from './types';

// Total Target Dana: Rp 1.500.000.000
// Dana Terkumpul: Rp 942.500.000 (62.8%)
// Dana Disalurkan: Rp 710.000.000
// Kas Masjid Saat Ini: Rp 232.500.000

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    title: 'Struktur Beton Kubah Utama',
    description: 'Pembangunan bekisting, perakitan besi tulangan, pengecoran beton silinder kubah induk diameter 12 meter.',
    targetCost: 450000000,
    currentCollected: 450000000,
    urgency: 'Sangat Mendesak',
    category: 'Masjid Utama',
    icon: 'Hammer',
    status: 'Terpenuhi',
  },
  {
    id: 'p2',
    title: 'Finishing Dinding & Plester Ornamen',
    description: 'Pekerjaan plester dinding luar, pengerjaan kaligrafi ukiran semen (mushaf GRC) dan kubah kecil sudut.',
    targetCost: 350000000,
    currentCollected: 280000000,
    urgency: 'Mendesak',
    category: 'Masjid Utama',
    icon: 'Paintbrush',
    status: 'Aktif',
  },
  {
    id: 'p3',
    title: 'Pengadaan Marmer Lantai Utama',
    description: 'Pemasangan marmer putih impor ukuran 60x60 cm untuk ruang ibadah utama lantai satu seluas 400 m².',
    targetCost: 400000000,
    currentCollected: 162500000,
    urgency: 'Mendesak',
    category: 'Masjid Utama',
    icon: 'Grid',
    status: 'Aktif',
  },
  {
    id: 'p4',
    title: 'Sistem Tata Suara (Sound System) Akustik',
    description: 'Pemasangan amplifier, speaker kolom khusus akustik masjid (Toa/Bose), mikrofon imam, dan peredam gema.',
    targetCost: 150000000,
    currentCollected: 50000000,
    urgency: 'Sedang',
    category: 'Rumah Imam & Wudhu',
    icon: 'Volume2',
    status: 'Aktif',
  },
  {
    id: 'p5',
    title: 'Pembangunan Gudang Masjid An-Nur',
    description: 'Pekerjaan sipil struktur pondasi, pemasangan dinding batako luar, pintu besi lipat, serta instalasi kelistrikan gudang penyimpanan.',
    targetCost: 71134190,
    currentCollected: 30000000,
    urgency: 'Rencana Jangka Panjang',
    category: 'Gudang Masjid',
    icon: 'Compass',
    status: 'Aktif',
  }
];

export const INITIAL_ALLOCATIONS: Allocation[] = [
  {
    id: 'al1',
    item: 'Pengecoran Pondasi Bore Pile Masjid',
    estimatedCost: 200000000,
    actualSpent: 200000000,
    category: 'Struktur Akhir',
    status: 'Selesai'
  },
  {
    id: 'al2',
    item: 'Struktur Kolom & Ring Balk Lantai 1',
    estimatedCost: 250000000,
    actualSpent: 250000000,
    category: 'Struktur Akhir',
    status: 'Selesai'
  },
  {
    id: 'al3',
    item: 'Konstruksi Baja Ringan Kubah Induk',
    estimatedCost: 150000000,
    actualSpent: 145000000,
    category: 'Kubah & Ornamen',
    status: 'Selesai'
  },
  {
    id: 'al4',
    item: 'Plester Halus & Kaligrafi GRC Kubah',
    estimatedCost: 115000000,
    actualSpent: 115000000,
    category: 'Kubah & Ornamen',
    status: 'Selesai'
  },
  {
    id: 'al5',
    item: 'Pengadaan Marmer Ibadah Utama (DP)',
    estimatedCost: 250000000,
    actualSpent: 162500000,
    category: 'Lainnya',
    status: 'Pengerjaan'
  },
  {
    id: 'al6',
    item: 'Instalasi Jaringan Kabel & Lampu Gantung',
    estimatedCost: 80000000,
    actualSpent: 0,
    category: 'Sound System',
    status: 'Belum Dimulai'
  }
];

export const INITIAL_DISBURSEMENTS: Disbursement[] = [
  {
    id: 'disb1',
    date: '2026-05-10',
    amount: 200000000,
    recipient: 'PT Sinar Beton Mandiri',
    purpose: 'Pembayaran bore pile pondasi masjid termin 100%',
    category: 'Struktur Akhir',
    proofInvoice: 'INV/SBM/2026/0488',
    status: 'Disalurkan'
  },
  {
    id: 'disb2',
    date: '2026-05-18',
    amount: 250000000,
    recipient: 'CV Baja Presisi Nusantara',
    purpose: 'Pelunasan pekerjaan kolom struktur lantai 1 masjid',
    category: 'Struktur Akhir',
    proofInvoice: 'INV/BPN/V/6612',
    status: 'Disalurkan'
  },
  {
    id: 'disb3',
    date: '2026-05-24',
    amount: 145000000,
    recipient: 'Artistic Dome Specialist Yogyakarta',
    purpose: 'Pelunasan pembuatan & perakitan rangka besi kubah induk',
    category: 'Kubah & Ornamen',
    proofInvoice: 'INV/ADS-Y/2026/099',
    status: 'Disalurkan'
  },
  {
    id: 'disb4',
    date: '2026-05-27',
    amount: 115000000,
    recipient: 'Sanggar Seni Kaligrafi Al-Haramain',
    purpose: 'Pembayaran pengerjaan kaligrafi interior kubah utama masjid',
    category: 'Kubah & Ornamen',
    proofInvoice: 'INV/SKH/0214-MA',
    status: 'Disalurkan'
  },
];

export const INITIAL_PROGRESS_REPORTS: ProgressReport[] = [
  {
    id: 'prog1',
    date: '2026-05-28',
    category: 'Masjid Utama',
    title: 'Tahap Akhir Pengecatan Ornamen Kaligrafi Kubah',
    description: 'Alhamdulillah, pengerjaan kaligrafi menggunakan cat khusus anti-jamur emas prada emas 24 karat di sekeliling kubah utama dalam telah selesai 100%. Tinggal merapikan lapisan pelindung coating gloss agar tahan cuaca lembab.',
    photoUrl: 'https://images.unsplash.com/photo-1590076211181-4351cddc290c?auto=format&fit=crop&w=800&q=80',
    reporter: 'Soni Hermawan (Koordinator Lapangan)',
    percentageBefore: 90,
    percentageAfter: 100
  },
  {
    id: 'prog2',
    date: '2026-05-26',
    category: 'Masjid Utama',
    title: 'Pemasangan Tiang Scaffolding Penyangga Mezzanine',
    description: 'Pengerjaan penyangga besi silang scaffolding untuk persiapan pengecoran dak lantai dasar ruang tambahan atau lantai lunas samping masjid (ruang mezzanine imam bimbingan baca Al-Quran). Bekisting dasar telah dipasang kayu meranti berkualitas.',
    photoUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    reporter: 'Soni Hermawan (Koordinator Lapangan)',
    percentageBefore: 65,
    percentageAfter: 78
  },
  {
    id: 'prog3',
    date: '2026-05-24',
    category: 'Masjid Utama',
    title: 'Plesteran Dinding Depan Sisi Mihrab',
    description: 'Pekerjaan meratakan plester semen sisi depat tempat imam (mihrab) masjid. Pemasangan pola kubah mihrab melengkung menggunakan tumpukan bata merah presisi tinggi agar simetris.',
    photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    reporter: 'Haji Ahmad Mudzakir (Ketua Pembangunan)',
    percentageBefore: 45,
    percentageAfter: 55
  },
  {
    id: 'prog4',
    date: '2026-05-20',
    category: 'Rumah Imam & Tempat Wudhu',
    title: 'Pemasangan Pipa Saluran Air Tempat Wudhu Pria',
    description: 'Instalasi pipa PVC Rucika AW 1.5 inch untuk suplai air bersih kran wudhu utama pria sebanyak 16 titik kran. Tandon air atas kapasitas 2000 liter sudah diletakkan di menara sementara.',
    photoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    reporter: 'Pak Mulyono (Teknisi Air)',
    percentageBefore: 20,
    percentageAfter: 50
  }
];

export const INITIAL_GALLERY: ActivityGallery[] = [
  {
    id: 'g1',
    date: '2026-05-25',
    title: 'Kerja Bakti Bersama Pengecoran Ring Balk Samping',
    description: 'Gotong royong warga Perumahan Bumi Daya Indah bergotong royong bersama tukang memindahkan material cor ke area dinding timur masjid.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    category: 'Kerja Bakti'
  },
  {
    id: 'g2',
    date: '2026-05-18',
    title: 'Rapat Evaluasi Pembangunan Masjid Termin 2',
    description: 'Dihadiri oleh RT, RW, tokoh masyarakat, dan panitia pembangunan masjid untuk membahas pemilihan jenis marmer sela dan rincian cash flow.',
    imageUrl: 'https://images.unsplash.com/photo-1590076135891-9fdaef2beba0?auto=format&fit=crop&w=800&q=80',
    category: 'Rapat'
  },
  {
    id: 'g3',
    date: '2026-05-10',
    title: 'Pengerjaan Pembesian Beton Bored Pile',
    description: 'Awal mula penggalian bor tanah sedalam 8 meter untuk pondasi masjid utama. Pekerja memotong besi ulir ukuran 16mm untuk spiral.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Pembangunan'
  },
  {
    id: 'g4',
    date: '2026-05-01',
    title: 'Pengajian Akbar Silaturahmi & Doa Restu',
    description: 'Pengajian bersama KH. Anwar Zahid di lapangan perumahan sebagai penanda kelancaran peletakkan batu pertama pembangunan kembali Masjid An-Nur.',
    imageUrl: 'https://images.unsplash.com/photo-1590076211181-4351cddc290c?auto=format&fit=crop&w=800&q=80',
    category: 'Pengajian'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Dana Masuk Selesai',
    message: 'Donasi sebesar Rp 1.500.000,00 diterima dari Donatur Hamba Allah melalui transfer Mandiri Instan.',
    time: '2 jam yang lalu',
    isRead: false,
    type: 'donation'
  },
  {
    id: 'n2',
    title: 'Penyaluran Dana Berhasil',
    message: 'Alhamdulillah, Rp 115.000.000,00 telah disalurkan kepada Sanggar Seni Kaligrafi Al-Haramain untuk pelunasan ornamen kubah masjid.',
    time: '2 hari yang lalu',
    isRead: false,
    type: 'disbursement',
    metadata: {
      itemId: 'disb4',
      amount: 115000000,
      recipient: 'Sanggar Seni Kaligrafi Al-Haramain'
    }
  },
  {
    id: 'n3',
    title: 'Laporan Progres Harian Baru',
    message: 'Update progres: Tahap Akhir Pengecatan Ornamen Kaligrafi Kubah dilaporkan berprogres ke 100%.',
    time: '1 hari yang lalu',
    isRead: true,
    type: 'progress'
  },
  {
    id: 'n4',
    title: 'Penyaluran Dana Berhasil',
    message: 'Rp 145.000.000,00 disalurkan ke Artistic Dome Specialist Yogyakarta untuk pekerjaan perakitan besi kubah induk.',
    time: '5 hari yang lalu',
    isRead: true,
    type: 'disbursement',
    metadata: {
      itemId: 'disb3',
      amount: 145000000,
      recipient: 'Artistic Dome Specialist Yogyakarta'
    }
  }
];

export const INITIAL_DONORS: Donor[] = [
  // Community primary baseline self-funded cash source
  {
    id: 'swadaya_base',
    name: 'Dana Swadaya Awal Masjid An-Nur',
    email: 'panitia.annur@gmail.com',
    phone: '081100000000',
    avatar: 'https://images.unsplash.com/photo-1590076211181-4351cddc290c?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'one-time',
    status: 'inactive',
    totalContribution: 250000000,
    history: [
      { id: 'dh_base_1', amount: 250000000, date: '2026-04-01', type: 'one-time', description: 'Dana Kas Awal Swadaya Pengurus & Jamaah Bumi Daya Indah', invoiceNumber: 'INV/SWD/2026/04/001', status: 'sukses' }
    ]
  },
  // Monthly commitment donors
  {
    id: 'd1',
    name: 'Ir. H. Budi Hartono',
    email: 'budi.hartono@gmail.com',
    phone: '081123456789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'monthly',
    status: 'active',
    totalContribution: 60000000,
    monthlyCommitment: 2500000,
    periodYears: 3,
    monthsPaid: 24, // 2 years out of 3
    totalMonthsCommit: 36,
    lastPaymentDate: '2026-05-10',
    history: [
      { id: 'dh1_1', amount: 2500000, date: '2026-05-10', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-24', invoiceNumber: 'INV/MHD/2026/05/012', status: 'sukses' },
      { id: 'dh1_2', amount: 2500000, date: '2026-04-10', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-23', invoiceNumber: 'INV/MHD/2026/04/008', status: 'sukses' },
      { id: 'dh1_3', amount: 2500000, date: '2026-03-10', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-22', invoiceNumber: 'INV/MHD/2026/03/015', status: 'sukses' },
      { id: 'dh1_4', amount: 52500000, date: '2026-02-15', type: 'monthly', description: 'Akumulasi iuran bulan 1 s/d 21 (Prabayar & Konsolidasi)', invoiceNumber: 'INV/MHD/2026/02/099', status: 'sukses' }
    ]
  },
  {
    id: 'd2',
    name: 'Siti Rahmawati, S.E.',
    email: 'siti.rahma@outlook.com',
    phone: '081298765432',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'monthly',
    status: 'active',
    totalContribution: 24000000,
    monthlyCommitment: 1000000,
    periodYears: 2,
    monthsPaid: 24, // Complete!
    totalMonthsCommit: 24,
    lastPaymentDate: '2026-05-05',
    history: [
      { id: 'dh2_1', amount: 1000000, date: '2026-05-05', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-24 (LUNAS)', invoiceNumber: 'INV/MHD/2026/05/002', status: 'sukses' },
      { id: 'dh2_2', amount: 1000000, date: '2026-04-05', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-23', invoiceNumber: 'INV/MHD/2026/04/002', status: 'sukses' },
      { id: 'dh2_3', amount: 22000000, date: '2026-03-01', type: 'monthly', description: 'Konsolidasi Pembayaran Bulan Ke-1 sampai Ke-22', invoiceNumber: 'INV/MHD/2026/03/001', status: 'sukses' }
    ]
  },
  {
    id: 'd3',
    name: 'Ahmad Fauzan',
    email: 'fauzan_tambang@gmail.com',
    phone: '085712345678',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'monthly',
    status: 'active',
    totalContribution: 45000000,
    monthlyCommitment: 3000000,
    periodYears: 2,
    monthsPaid: 15,
    totalMonthsCommit: 24,
    lastPaymentDate: '2026-05-12',
    history: [
      { id: 'dh3_1', amount: 3000000, date: '2026-05-12', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-15', invoiceNumber: 'INV/MHD/2026/05/019', status: 'sukses' },
      { id: 'dh3_2', amount: 3000000, date: '2026-04-12', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-14', invoiceNumber: 'INV/MHD/2026/04/011', status: 'sukses' },
      { id: 'dh3_3', amount: 39000000, date: '2026-03-12', type: 'monthly', description: 'Konsolidasi Pembayaran Iuran Bulan ke-1 s/d 13', invoiceNumber: 'INV/MHD/2026/03/020', status: 'sukses' }
    ]
  },
  {
    id: 'd4',
    name: 'dr. Hendra Wijaya Sp.PD',
    email: 'hendra.wijaya@klinikpratama.com',
    phone: '081112223334',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'monthly',
    status: 'active',
    totalContribution: 96000000,
    monthlyCommitment: 4000000,
    periodYears: 3,
    monthsPaid: 24,
    totalMonthsCommit: 36,
    lastPaymentDate: '2026-05-20',
    history: [
      { id: 'dh4_1', amount: 4000000, date: '2026-05-20', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-24', invoiceNumber: 'INV/MHD/2026/05/042', status: 'sukses' },
      { id: 'dh4_2', amount: 4000000, date: '2026-04-20', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-23', invoiceNumber: 'INV/MHD/2026/04/035', status: 'sukses' },
      { id: 'dh4_3', amount: 88000000, date: '2026-03-15', type: 'monthly', description: 'Konsolidasi Iuran Bulan ke-1 s/d 22', invoiceNumber: 'INV/MHD/2026/03/050', status: 'sukses' }
    ]
  },
  {
    id: 'd5',
    name: 'Prof. Dr. Hj. Eliyana',
    email: 'eliyana.unair@yahoo.com',
    phone: '081388889999',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'monthly',
    status: 'active',
    totalContribution: 30000000,
    monthlyCommitment: 1500000,
    periodYears: 2,
    monthsPaid: 20,
    totalMonthsCommit: 24,
    lastPaymentDate: '2026-05-15',
    history: [
      { id: 'dh5_1', amount: 1500000, date: '2026-05-15', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-20', invoiceNumber: 'INV/MHD/2026/05/028', status: 'sukses' },
      { id: 'dh5_2', amount: 1500000, date: '2026-04-15', type: 'monthly', description: 'Iuran Bulanan Masjid An-Nur - Bulan Ke-19', invoiceNumber: 'INV/MHD/2026/04/027', status: 'sukses' },
      { id: 'dh5_3', amount: 27000000, date: '2026-03-20', type: 'monthly', description: 'Konsolidasi Iuran Bulan ke-1 sampai 18', invoiceNumber: 'INV/MHD/2026/03/062', status: 'sukses' }
    ]
  },

  // One-time donation (Sekali bayar)
  {
    id: 'd6',
    name: 'H. Rahmat Sujatmiko (Donasi GRC)',
    email: 'rahmat.sujatmiko@sujatmiko-corp.id',
    phone: '081255556666',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'one-time',
    status: 'inactive', // Active only refers to monthly commitments in normal tab context but status tracks involvement
    totalContribution: 250000000,
    history: [
      { id: 'dh6_1', amount: 250000000, date: '2026-04-20', type: 'one-time', description: 'Donasi Pembelian Bahan GRC Ornamen Kubah Masjid', invoiceNumber: 'INV/OBN/2026/04/100', status: 'sukses' }
    ]
  },
  {
    id: 'd7',
    name: 'Hamba Allah (Jakarta)',
    email: 'hamba.allah.jkt@gmail.com',
    phone: '081199990000',
    avatar: 'https://images.unsplash.com/photo-1550521820-29168df2c1d6?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'one-time',
    status: 'inactive',
    totalContribution: 150000000,
    history: [
      { id: 'dh7_1', amount: 150000000, date: '2026-05-12', type: 'one-time', description: 'Donasi Khusus Bor Pile Utama & Cor Cakar Ayam', invoiceNumber: 'INV/OBN/2026/05/088', status: 'sukses' }
    ]
  },
  {
    id: 'd8',
    name: 'Warga Blok B (Bumi Daya Indah)',
    email: 'kolektif.blokb@gmail.com',
    phone: '081511112222',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    type: 'one-time',
    status: 'inactive',
    totalContribution: 37500000,
    history: [
      { id: 'dh8_1', amount: 37500000, date: '2026-05-25', type: 'one-time', description: 'Donasi Kolektif Paving Parkir Blok B Perumahan', invoiceNumber: 'INV/OBN/2026/05/104', status: 'sukses' }
    ]
  }
];
