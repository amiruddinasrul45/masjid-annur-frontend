import React from 'react';

interface StatsProps {
  total: number;
}

export const StatistikDonasi = ({ total }: StatsProps) => {
  return (
    <div className="bg-green-700 text-white p-6 rounded-2xl shadow-lg my-4">
      <h3 className="text-sm opacity-80 uppercase tracking-wider font-semibold">
        Total Terkumpul
      </h3>
      <p className="text-3xl font-bold mt-2">
        Rp {total.toLocaleString('id-ID')}
      </p>
      <div className="mt-4 bg-green-600 h-2 rounded-full overflow-hidden">
        <div className="bg-white h-full w-3/4 animate-pulse"></div>
      </div>
      <p className="text-xs mt-2 opacity-75">Target pembangunan masjid tercapai 75%</p>
    </div>
  );
};