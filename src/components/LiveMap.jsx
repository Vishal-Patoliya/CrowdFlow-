import React from 'react';
import { Flame, Stethoscope } from 'lucide-react';

const densityColors = {
  low: 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  medium: 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]',
  high: 'bg-red-500/30 border-red-500/80 shadow-[0_0_40px_rgba(239,68,68,0.5)]'
};

const densityGlows = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-red-500'
};

const densityText = {
  low: 'text-emerald-400 bg-emerald-950/50 border-emerald-900/50',
  medium: 'text-amber-400 bg-amber-950/50 border-amber-900/50',
  high: 'text-red-400 bg-red-950/50 border-red-900/50'
};

const densityLabels = {
  low: 'Flowing',
  medium: 'Busy',
  high: 'Packed'
};

export default function LiveMap({ zones }) {
  const getZone = (id) => zones.find(z => z.id === id);

  const ZoneCard = ({ id, className, isCenter }) => {
    const zone = getZone(id);
    if (!zone) return null;
    
    // Add vertical depth to high density or center zones in 3D space
    const depthStyle = zone.density === 'high' ? { transform: 'translateZ(30px)' } : isCenter ? { transform: 'translateZ(15px)' } : {};
    
    return (
      <div 
        className={`relative rounded-xl overflow-hidden border backdrop-blur-md transition-all duration-700 group isometric-layer ${densityColors[zone.density]} ${className}`}
        style={depthStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0"></div>
        
        {/* Animated scanning line effect for virtual feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-0"></div>

        <div className="relative h-full p-4 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{zone.label}</span>
              <h3 className="text-slate-100 font-bold text-lg leading-tight drop-shadow-md">{zone.name}</h3>
            </div>
            
            {/* Safety Overlays */}
            <div className="flex flex-col gap-1 opacity-70">
              {zone.hasFireExit && <div className="bg-red-900/50 border border-red-500/50 p-1 rounded"><Flame size={12} className="text-red-400" /></div>}
              {zone.hasFirstAid && <div className="bg-blue-900/50 border border-blue-500/50 p-1 rounded"><Stethoscope size={12} className="text-blue-400" /></div>}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="relative flex h-3 w-3">
              {zone.density === 'high' && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${densityGlows[zone.density]}`}></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 shadow-[0_0_10px_currentColor] ${densityGlows[zone.density]}`}></span>
            </span>
            <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">{densityLabels[zone.density]}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            </span>
            Virtual Simulation
          </h2>
          <p className="text-sm text-slate-400 mt-1">Live holographic crowd telemetry</p>
        </div>
        <div className="flex gap-2">
          {['low', 'medium', 'high'].map(level => (
            <div key={level} className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${densityText[level]}`}>
              {level}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[500px] flex items-center justify-center bg-slate-900/50 rounded-3xl border border-slate-800 shadow-inner overflow-hidden relative">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)] opacity-30 origin-bottom"></div>
        
        {/* 3D Container */}
        <div className="isometric-container w-[80%] max-w-lg aspect-square">
          <div className="grid grid-cols-3 grid-rows-3 gap-6 h-full w-full">
            {/* North */}
            <ZoneCard id="z1" className="col-span-3 row-span-1" />
            
            {/* Middle Section */}
            <ZoneCard id="z4" className="col-span-1 row-span-1" />
            <ZoneCard id="z5" className="col-span-1 row-span-1" isCenter={true} />
            <ZoneCard id="z2" className="col-span-1 row-span-1" />
            
            {/* South Section */}
            <ZoneCard id="z6" className="col-span-1 row-span-1" />
            <ZoneCard id="z3" className="col-span-2 row-span-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
