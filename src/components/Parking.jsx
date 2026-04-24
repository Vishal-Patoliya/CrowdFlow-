import React, { useState } from 'react';
import { Car, MapPin, CheckCircle2, Ticket } from 'lucide-react';

export default function Parking({ parking }) {
  const [activeToast, setActiveToast] = useState(null);

  const triggerToast = (message) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const getCapacityColor = (current, capacity) => {
    const ratio = current / capacity;
    if (ratio < 0.6) return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
    if (ratio < 0.9) return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
    return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
  };

  const getStatusText = (current, capacity) => {
    const ratio = current / capacity;
    if (ratio >= 1) return <span className="text-red-400 font-bold">FULL</span>;
    if (ratio >= 0.9) return <span className="text-red-400 font-bold">Almost Full</span>;
    if (ratio >= 0.6) return <span className="text-amber-400 font-bold">Filling Fast</span>;
    return <span className="text-emerald-400 font-bold">Available</span>;
  };

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          Parking & Transport
        </h2>
        <p className="text-sm text-slate-400 mt-1">Live lot capacities and vehicle locator</p>
      </div>

      {/* Find My Car Action */}
      <button 
        onClick={() => triggerToast("Location Pinned: South Garage, Level 3")}
        className="w-full bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-5 rounded-2xl flex items-center justify-between hover:bg-blue-900/60 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.1)] group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-900/50 rounded-xl text-blue-400 border border-blue-500/50 group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-100 text-lg">Pin My Car</h3>
            <p className="text-sm text-slate-400">Save your spot before heading in</p>
          </div>
        </div>
        <div className="hidden sm:block text-blue-400">
          Tap to Pin
        </div>
      </button>

      <div className="space-y-4">
        {parking.map((lot) => {
          const ratio = lot.current / lot.capacity;
          return (
            <div key={lot.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Car className="text-slate-500" size={20} />
                  <div>
                    <h3 className="font-bold text-slate-100">{lot.name}</h3>
                    <span className="text-xs text-slate-500">{lot.type} Parking</span>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusText(lot.current, lot.capacity)}
                  <p className="text-xs text-slate-500 mt-0.5">{lot.capacity - lot.current} spots left</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full transition-all duration-1000 ${getCapacityColor(lot.current, lot.capacity)}`} 
                  style={{ width: `${ratio * 100}%` }}
                ></div>
              </div>

              {ratio < 1 && lot.type === 'VIP' && (
                <button 
                  onClick={() => triggerToast(`Booked VIP Spot in ${lot.name}`)}
                  className="mt-2 w-full py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white hover:border-amber-400 transition-colors"
                >
                  <Ticket size={16} />
                  Book VIP Spot ($25)
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-24 md:bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 bg-slate-800 border border-emerald-500/30 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 whitespace-nowrap backdrop-blur-md">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="font-medium text-sm">{activeToast}</span>
        </div>
      )}
    </div>
  );
}
