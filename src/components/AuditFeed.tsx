import React from 'react';

export const AuditFeed = ({ latestDonation }: { latestDonation: any }) => {
  if (!latestDonation) return null;

  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3 my-4 overflow-hidden">
      <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
        <span className="text-green-700 text-lg">📢</span>
      </div>
      
      {/* Container untuk Running Text */}
      <div className="relative w-full overflow-hidden">
        <p className="whitespace-nowrap animate-marquee text-xs text-gray-700 font-medium">
          Donasi sebesar Rp {(latestDonation.amount || latestDonation.jumlah || 0).toLocaleString('id-ID')} diterima dari {latestDonation.donorName || latestDonation.nama || 'Donatur'}
        </p>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};