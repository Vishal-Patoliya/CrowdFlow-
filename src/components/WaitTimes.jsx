import React from 'react';
import { Coffee, Pizza, Droplets, MapPin, ArrowRight, UserPlus } from 'lucide-react';

export default function WaitTimes({ queues }) {
  // Sort queues by wait time
  const sortedQueues = [...queues].sort((a, b) => a.waitTime - b.waitTime);
  
  const getIcon = (type) => {
    switch(type) {
      case 'food': return <Pizza size={20} />;
      case 'drink': return <Coffee size={20} />;
      case 'restroom': return <Droplets size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  const getStatusColor = (time) => {
    if (time <= 5) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
    if (time <= 15) return 'text-amber-400 border-amber-500/30 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
    return 'text-red-400 border-red-500/30 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]';
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          Wait Times & Virtual Queues
        </h2>
        <p className="text-sm text-slate-400 mt-1">Live updates for stalls and amenities</p>
      </div>

      <div className="space-y-4">
        {sortedQueues.map((queue, index) => {
          const isFastest = index === 0;
          return (
            <div 
              key={queue.id} 
              className={`bg-slate-900 rounded-2xl p-5 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-800/80 cursor-pointer
                ${isFastest ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-slate-800'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isFastest ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-900/20 transition-colors'}`}>
                  {getIcon(queue.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-100 text-lg">{queue.name}</h3>
                    {isFastest && (
                      <span className="bg-blue-900/50 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-blue-500/30">
                        Fastest
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 capitalize">{queue.type}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4">
                {/* Virtual Queue Action */}
                {['food', 'drink'].includes(queue.type) && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); alert(`Joined virtual queue for ${queue.name}`); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-sm hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors"
                  >
                    <UserPlus size={16} />
                    <span>Join Line</span>
                  </button>
                )}

                <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border min-w-[80px] transition-colors duration-500 ${getStatusColor(queue.waitTime)}`}>
                  <span className="text-2xl font-black leading-none">{queue.waitTime}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-80">Min</span>
                </div>
                <ArrowRight size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors hidden md:block" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
