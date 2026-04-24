import React, { useState } from 'react';
import { ShieldAlert, Flame, Stethoscope, PhoneCall, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Safety() {
  const [activeToast, setActiveToast] = useState(null);

  const triggerToast = (message) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 4000);
  };

  const EmergencyCard = ({ icon: Icon, title, description, color, bgHover, onClick }) => (
    <button 
      onClick={() => {
        onClick();
        triggerToast(`Dispatched: ${title} Team to your location.`);
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
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          Safety & Security
        </h2>
        <p className="text-sm text-slate-400 mt-1">Emergency dispatch and evacuation info</p>
      </div>

      {/* Evacuation Alert Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 border border-emerald-500/30 rounded-2xl p-6 text-white shadow-[0_0_30px_rgba(16,185,129,0.1)] flex items-start gap-4 backdrop-blur-md">
        <AlertTriangle className="shrink-0 mt-1 text-emerald-400" size={24} />
        <div>
          <h3 className="font-bold text-lg text-emerald-100">Evacuation Status: Clear</h3>
          <p className="text-emerald-200 mt-1 text-sm leading-relaxed">
            There are no active emergencies. Your nearest Fire Exit is located at the <strong>South Gate</strong>.
          </p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4">Emergency Dispatch</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EmergencyCard 
          icon={Flame} 
          title="Report Fire" 
          description="Alert the venue fire safety team immediately."
          color="text-red-500 group-hover:text-red-400 group-hover:bg-red-500"
          bgHover="hover:bg-red-950/20"
          onClick={() => {}}
        />
        <EmergencyCard 
          icon={Stethoscope} 
          title="Medical Emergency" 
          description="Dispatch First Aid responders to your pin."
          color="text-blue-400 group-hover:text-blue-400 group-hover:bg-blue-500"
          bgHover="hover:bg-blue-950/20"
          onClick={() => {}}
        />
        <EmergencyCard 
          icon={ShieldAlert} 
          title="Call Security" 
          description="Report suspicious activity or a lost child."
          color="text-amber-400 group-hover:text-amber-400 group-hover:bg-amber-500"
          bgHover="hover:bg-amber-950/20"
          onClick={() => {}}
        />
        <EmergencyCard 
          icon={PhoneCall} 
          title="Venue Hotline" 
          description="Call the general assistance desk."
          color="text-emerald-400 group-hover:text-emerald-400 group-hover:bg-emerald-500"
          bgHover="hover:bg-emerald-950/20"
          onClick={() => {}}
        />
      </div>

      {/* Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-24 md:bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 bg-slate-800 border border-red-500/50 text-white px-6 py-3 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 whitespace-nowrap backdrop-blur-md">
          <ShieldAlert size={18} className="text-red-400" />
          <span className="font-medium text-sm">{activeToast}</span>
        </div>
      )}
    </div>
  );
}
