import React, { useState } from 'react';
import { ShoppingBag, LogOut, Info, Navigation, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function QuickActions() {
  const [activeToast, setActiveToast] = useState(null);

  const triggerToast = (message) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const ActionCard = ({ icon: Icon, title, description, color, bgHover, onClick }) => (
    <button 
      onClick={() => {
        onClick();
        triggerToast(`Initiated: ${title}`);
      }}
      className={`bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-${color.split('-')[1]}-500/50 shadow-sm hover:shadow-[0_0_20px_rgba(var(--color-${color.split('-')[1]}-500),0.15)] transition-all duration-300 flex flex-col items-start gap-4 text-left w-full group ${bgHover}`}
    >
      <div className={`p-3 rounded-xl bg-slate-800 border border-slate-700 ${color} transition-transform group-hover:scale-110 group-hover:bg-opacity-20`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold text-slate-100 text-lg">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>
    </button>
  );

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Quick Actions</h2>
        <p className="text-sm text-slate-400 mt-1">Execute commands instantly</p>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-6 text-white shadow-[0_0_30px_rgba(59,130,246,0.15)] flex items-start gap-4 backdrop-blur-md">
        <Info className="shrink-0 mt-1 text-blue-400" size={24} />
        <div>
          <h3 className="font-bold text-lg text-blue-100">AI Routing Tip</h3>
          <p className="text-blue-200 mt-1 text-sm leading-relaxed">
            Avoid the Main Arena concourse right now. Use the East Concourse to reach the South Gate 5 minutes faster.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard 
          icon={ShoppingBag} 
          title="Order Food Ahead" 
          description="Skip the physical line entirely."
          color="text-amber-400 group-hover:text-amber-400 group-hover:bg-amber-500"
          bgHover="hover:bg-amber-950/20"
          onClick={() => {}}
        />
        <ActionCard 
          icon={LogOut} 
          title="Find Fastest Exit" 
          description="Calculate dynamic routing to the exterior."
          color="text-emerald-400 group-hover:text-emerald-400 group-hover:bg-emerald-500"
          bgHover="hover:bg-emerald-950/20"
          onClick={() => {}}
        />
        <ActionCard 
          icon={Navigation} 
          title="Locate My Friends" 
          description="Ping coordinates to your registered group."
          color="text-blue-400 group-hover:text-blue-400 group-hover:bg-blue-500"
          bgHover="hover:bg-blue-950/20"
          onClick={() => {}}
        />
        <ActionCard 
          icon={ShieldAlert} 
          title="Report an Issue" 
          description="Flag emergency or maintenance events."
          color="text-red-400 group-hover:text-red-400 group-hover:bg-red-500"
          bgHover="hover:bg-red-950/20"
          onClick={() => {}}
        />
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
