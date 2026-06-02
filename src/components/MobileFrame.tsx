/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, ClipboardList, Gift, Bell, X, User, UserCheck, TrendingUp, Coins } from 'lucide-react';
import { AppNotification } from '../types';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: AppNotification[];
  onMarkNotificationsAsRead: () => void;
  onClearNotification: (id: string) => void;
  onAccountClick: () => void;
  isPanitiaLoggedIn: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTab,
  setActiveTab,
  notifications,
  onMarkNotificationsAsRead,
  onClearNotification,
  onAccountClick,
  isPanitiaLoggedIn
}) => {
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  useEffect(() => {
    (window as any).openNotificationsModal = () => {
      setShowNotificationsModal(true);
      onMarkNotificationsAsRead();
    };
    return () => {
      delete (window as any).openNotificationsModal;
    };
  }, [onMarkNotificationsAsRead]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleOpenNotifications = () => {
    setShowNotificationsModal(true);
    onMarkNotificationsAsRead();
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'proposal', label: 'Proposal', icon: ClipboardList },
    { id: 'donasi', label: 'Donasi', icon: Gift },
    { id: 'progres', label: 'Progres', icon: TrendingUp },
    { id: 'profil', label: 'Keuangan', icon: Coins },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-olive selection:text-white">
      {/* Absolute elegant background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(90,90,64,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(52,78,65,0.04),transparent_60%)] pointer-events-none" />

      {/* 1. RESPONSIVE MAIN HEADER */}
      <header className="bg-deep text-white shadow-md sticky top-0 z-40 select-none pb-0.5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center w-full">
          {/* Logo & Brand text */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-full p-0.5 flex items-center justify-center shadow-lg transform transition-transform hover:rotate-3">
              <svg viewBox="0 0 160 160" className="h-full w-full" fill="none">
                <path d="M 80,31.5 C 80,31.5 90,44 105,53 C 120,62 129,76 131,92 C 131,102 126,104 116,105 C 107,106 103,111 103,115 L 57,115 C 57,111 53,106 44,105 C 34,104 29,102 29,92 C 31,76 40,62 55,53 C 70,44 80,31.5 80,31.5 Z" fill="#344E41" />
                <path d="M 80,72 C 80,72 85,82 95,87 C 105,92 109,98 109,104 L 51,104 C 51,98 55,92 65,87 C 75,82 80,72 80,72 Z" fill="#FFFFFF" />
                <path d="M 80,160 L 60,115 L 45,125 L 48,103 L 21,114 L 3,115 L 50,91 C 50,91 60,105 80,105 C 100,105 110,91 110,91 L 157,115 L 139,114 L 112,103 L 115,125 L 100,115 Z" fill="#A3B18A" />
                <path d="M 80, 23 C 86,23 91,20 93.5,15 C 84,14 74,21 74,31.5 C 74,40 81.5,46.5 89,45 C 82.5,44 79.5,39 79.5,35.5 C 79.5,31 82.5,27.5 86.5,27 C 88,26.5 89.5,27 90,27.5 C 88,28.5 87.5,30 87.5,31.5 C 87.5,36.5 91.5,40.5 96.5,40.5 C 97.5,40.5 98,40 98.5,39.5 C 95,44.5 88.5,48.5 80,48.5 C 69.5,48.5 61,40 61,29.5 C 61,19 69.5,10.5 80,10.5 C 82,10.5 84,11 86,12 C 78,13.5 73,19.5 73,26 C 73,32.5 78,37.5 84.5,37.5 C 89,37.5 92.5,34.5 93,30.5 C 85,33.5 80,29 80,23 Z" fill="#5A5A40" />
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-xs md:text-sm tracking-wider uppercase">MASJID AN-NUR</h1>
              <p className="text-[9px] md:text-[10px] text-sage font-bold tracking-tight">Bumi Daya Indah • Makassar</p>
            </div>
          </div>

          {/* Desktop Navigation Links — Only visible on md: and up when not in panitia mode */}
          {!isPanitiaLoggedIn && (
            <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 select-none">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`desktop-tab-btn-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                      isActive ? 'bg-cream text-deep shadow-md scale-102' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* User Controls and Info Button */}
          <div className="flex items-center gap-1">
            {/* Notification triggers */}
            <button
              onClick={handleOpenNotifications}
              className="relative h-9 w-9 flex items-center justify-center hover:bg-white/10 rounded-full active:scale-95 transition-all text-white cursor-pointer"
              title="Notifikasi & Update Real-Time"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] font-black flex items-center justify-center text-white border border-deep animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Admin toggle icon */}
            <button
              onClick={onAccountClick}
              id="account-login-btn"
              className="relative h-9 w-9 flex items-center justify-center hover:bg-white/10 rounded-full active:scale-95 transition-all text-white cursor-pointer"
              title="Akses Panitia Pembangunan"
            >
              {isPanitiaLoggedIn ? (
                <UserCheck size={18} className="text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
              ) : (
                <User size={18} className="text-white hover:text-teal-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. CHANNELS / PAGES INNER VIEW AREA */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col relative z-10">
        {children}
      </main>

      {/* 3. PERSISTENT MOBILE BOTTOM NAVIGATION BAR — Hidden on desktop screens */}
      {!isPanitiaLoggedIn && (
        <nav className="md:hidden sticky bottom-0 bg-white border-t border-sage/10 py-3 px-2 flex justify-between items-center z-40 select-none shadow-[0_-5px_20px_rgba(52,78,65,0.05)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center flex-1 cursor-pointer transition-colors ${
                  isActive ? 'text-deep' : 'text-slate-400 hover:text-slate-650'
                }`}
              >
                <div className={`p-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-olive/10 text-deep scale-110' : ''
                }`}>
                  <Icon size={20} className={isActive ? 'stroke-[2.2px]' : 'stroke-[1.8px]'} />
                </div>
                <span className={`text-[9px] font-bold tracking-tight mt-1 transition-all uppercase ${
                  isActive ? 'text-deep font-black' : ''
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}

      {/* 4. NOTIFICATION OVERLAY PANEL (MODAL) */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-[380px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[580px] animate-fade-in">
            <div className="bg-deep text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell size={18} />
                <h3 className="font-extrabold text-xs tracking-wider uppercase">Update Real-Time</h3>
              </div>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-3.5 space-y-2.5">
              {notifications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Tidak ada notifikasi saat ini
                </div>
              ) : (
                notifications.map((notif) => {
                  let badgeBg = 'bg-slate-100 text-slate-700 border-slate-200';

                  if (notif.type === 'progress') {
                    badgeBg = 'bg-slate-100 text-deep border-sage/40';
                  } else if (notif.type === 'disbursement') {
                    badgeBg = 'bg-amber-50 text-amber-700 border-amber-100';
                  } else if (notif.type === 'donation') {
                    badgeBg = 'bg-olive/10 text-olive border-olive/20';
                  }

                  return (
                    <div
                      key={notif.id}
                      className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 transition-colors relative"
                    >
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center border font-semibold text-[10px] ${badgeBg} shrink-0`}>
                        {notif.type === 'progress' && '🔨'}
                        {notif.type === 'disbursement' && '💸'}
                        {notif.type === 'donation' && '🕌'}
                        {notif.type === 'info' && '📢'}
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-xs text-slate-800 truncate">{notif.title}</h4>
                          <span className="text-[9px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed text-left">
                          {notif.message}
                          {notif.type === 'disbursement' && notif.metadata?.recipient && (
                            <span className="block mt-1 p-1 bg-amber-500/5 text-[10px] font-mono text-amber-800 rounded border border-amber-500/10">
                              Penerima: {notif.metadata.recipient}
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => onClearNotification(notif.id)}
                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-slate-500 rounded-full"
                        title="Hapus"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-3 bg-cream border-t border-sage/10 flex justify-end">
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="px-4 py-2 bg-olive text-white font-extrabold rounded-xl text-xs hover:bg-deep active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
