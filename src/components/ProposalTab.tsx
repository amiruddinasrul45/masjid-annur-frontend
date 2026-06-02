/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardList, Hammer, Paintbrush, Grid, Volume2, Compass, AlertCircle, CheckCircle2, TrendingUp, HandHelping } from 'lucide-react';
import { Proposal } from '../types';

interface ProposalTabProps {
  proposals: Proposal[];
  onSelectProposal: (id: string) => void;
}

export const ProposalTab: React.FC<ProposalTabProps> = ({
  proposals,
  onSelectProposal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Masjid Utama' | 'Rumah Imam & Wudhu' | 'Gudang Masjid'>('Semua');

  const formattedRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getProposalIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer size={20} className="text-deep" />;
      case 'Paintbrush': return <Paintbrush size={20} className="text-amber-600" />;
      case 'Grid': return <Grid size={20} className="text-blue-600" />;
      case 'Volume2': return <Volume2 size={20} className="text-slate-600" />;
      default: return <Compass size={20} className="text-deep" />;
    }
  };

  const filteredProposals = proposals.filter((p) =>
    selectedCategory === 'Semua' ? true : p.category === selectedCategory
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Splash banner */}
      <div className="relative h-44 shrink-0 bg-deep overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1590076135891-9fdaef2beba0?auto=format&fit=crop&w=800&q=80"
          alt="Proposal Rencana"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Proposal Finansial
          </span>
          <h2 className="serif text-xl font-bold text-deep tracking-tight mt-2">Rencana Anggaran Biaya (RAB)</h2>
          <p className="text-xs text-slate-750 leading-tight">Sasaran pendanaan pembangunan yang transparan dan terukur</p>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Quick statistics */}
        <div className="grid grid-cols-2 gap-3 select-none">
          <div className="bg-white p-3 rounded-2xl border border-sage/10 card-shadow text-center">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Total Rencana Anggaran</span>
            <span className="text-sm font-bold font-mono text-slate-950 block mt-1">Rp 1.470.000.000</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-sage/10 card-shadow text-center">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Tingkat Terpenuhi</span>
            <span className="text-sm font-bold font-mono text-deep block mt-1">64.12% (RAB Induk)</span>
          </div>
        </div>

        {/* Dynamic urgency filters */}
        <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none select-none">
          {(['Semua', 'Masjid Utama', 'Rumah Imam & Wudhu', 'Gudang Masjid'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-deep text-white border-deep shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((prop) => {
            const isCompleted = prop.status === 'Terpenuhi';
            const progress = (prop.currentCollected / prop.targetCost) * 100;

            let urgencyBadge = 'bg-slate-100 text-slate-600 border-slate-200';
            if (prop.urgency === 'Sangat Mendesak') {
              urgencyBadge = 'bg-red-50 text-red-700 border-red-100';
            } else if (prop.urgency === 'Mendesak') {
              urgencyBadge = 'bg-amber-50 text-amber-700 border-amber-100';
            } else if (prop.urgency === 'Rencana Jangka Panjang') {
              urgencyBadge = 'bg-blue-50 text-blue-700 border-blue-100';
            }

            return (
              <div
                key={prop.id}
                className={`bg-white rounded-3xl p-4 border transition-all ${
                  isCompleted ? 'border-sage/30 bg-sage/5 card-shadow' : 'border-sage/10 card-shadow hover:shadow'
                }`}
              >
                <div className="flex justify-between items-start gap-2.5">
                  <div className="h-10 w-10 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-center shrink-0">
                    {getProposalIcon(prop.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                       <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 ${urgencyBadge}`}>
                        {prop.urgency}
                      </span>
                      <span className="text-[8.5px] font-extrabold px-1.5 py-0.5 rounded border border-slate-205 bg-slate-50 text-slate-500 uppercase tracking-wider shrink-0">
                        {prop.category}
                      </span>
                      {isCompleted && (
                        <span className="bg-sage/10 text-deep text-[8.5px] font-bold px-1.5 py-0.5 rounded border border-sage/20 uppercase flex items-center gap-0.5 tracking-wider shrink-0">
                          <CheckCircle2 size={9} />
                          Lunas
                        </span>
                      )}
                    </div>
                    <h3 className="serif font-bold text-xs text-deep mt-1.5 leading-snug">
                      {prop.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mt-2 p-1 bg-slate-50/50 rounded-xl">
                  {prop.description}
                </p>

                {/* Progress bar metrics */}
                <div className="mt-3.5 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold select-none">
                    <span>Dana Terkumpul: <strong className="text-slate-700 font-mono">{formattedRupiah(prop.currentCollected)}</strong></span>
                    <span className="font-mono text-slate-800">{progress.toFixed(0)}% Terpenuhi</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-205">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isCompleted ? 'bg-deep' : 'bg-olive'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 select-none">
                    <span>Kebutuhan Porsi RAB: <strong className="text-slate-700 font-mono">{formattedRupiah(prop.targetCost)}</strong></span>
                  </div>
                </div>

                {/* Call to donate to this specific proposal */}
                {!isCompleted && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => onSelectProposal(prop.id)}
                      className="px-3.5 py-1.5 bg-deep hover:bg-olive text-white font-bold rounded-xl text-[10px] flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                    >
                      <HandHelping size={12} />
                      Wakafkan Sekarang
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
