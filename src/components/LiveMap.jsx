import React, { useState } from 'react';
import { Flame, Stethoscope, MapPin, ArrowRight, Navigation } from 'lucide-react';

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

const arrowColors = {
  low: 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]',
  medium: 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]',
  high: 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
};

const densityLabels = {
  low: 'Flowing',
  medium: 'Busy',
  high: 'Packed'
};

// Define the stadium layout positions (relative percentages)
const zonePositions = {
  z1: { top: '5%', left: '30%', width: '40%', height: '22%' }, // North Gate
  z4: { top: '30%', left: '5%', width: '22%', height: '40%' }, // West Concourse
  z5: { top: '30%', left: '30%', width: '40%', height: '40%', isCenter: true }, // Main Arena
  z2: { top: '30%', left: '73%', width: '22%', height: '40%' }, // East Concourse
  z3: { top: '73%', left: '30%', width: '28%', height: '22%' }, // South Gate
  z6: { top: '73%', left: '62%', width: '25%', height: '22%' }, // VIP Lounge
};

// Define logical neighbors to draw traffic arrows to
const routingMap = {
  z1: ['z4', 'z5', 'z2'], // North connects to West, Center, East
  z2: ['z1', 'z5', 'z3', 'z6'], // East connects to North, Center, South, VIP
  z3: ['z4', 'z5', 'z2', 'z6'], // South connects to West, Center, East, VIP
  z4: ['z1', 'z5', 'z3'], // West connects to North, Center, South
  z5: ['z1', 'z2', 'z3', 'z4'], // Center connects to all 4 sides
  z6: ['z2', 'z3'] // VIP connects to East and South
};

// Simplified arrow rotations from origin to target based on standard layout
const getArrowRotation = (fromId, toId) => {
  const angles = {
    'z1-z4': '-rotate-135', 'z1-z5': 'rotate-90', 'z1-z2': 'rotate-45',
    'z2-z1': '-rotate-45', 'z2-z5': '-rotate-180', 'z2-z3': 'rotate-135', 'z2-z6': 'rotate-90',
    'z3-z4': '-rotate-135', 'z3-z5': '-rotate-90', 'z3-z2': '-rotate-45', 'z3-z6': 'rotate-0',
    'z4-z1': '-rotate-45', 'z4-z5': 'rotate-0', 'z4-z3': 'rotate-45',
    'z5-z1': '-rotate-90', 'z5-z2': 'rotate-0', 'z5-z3': 'rotate-90', 'z5-z4': '-rotate-180',
    'z6-z2': '-rotate-90', 'z6-z3': '-rotate-180'
  };
  return angles[`${fromId}-${toId}`] || 'rotate-0';
};

export default function LiveMap({ zones }) {
  const [pinnedLocation, setPinnedLocation] = useState(null);

  const getZone = (id) => zones.find(z => z.id === id);

  const handleZoneClick = (id) => {
    setPinnedLocation(id === pinnedLocation ? null : id);
  };

  const renderZoneCard = (id) => {
    const zone = getZone(id);
    const pos = zonePositions[id];
    if (!zone || !pos) return null;
    
    const isPinned = pinnedLocation === id;
    const isTarget = pinnedLocation && routingMap[pinnedLocation]?.includes(id);
    
    // Add depth for visual pop
    const depth = zone.density === 'high' ? 'translateZ(30px)' : pos.isCenter ? 'translateZ(15px)' : 'translateZ(0px)';
    const transformStyle = { transform: `${depth} ${isPinned ? 'scale(1.05)' : ''}` };
    const { isCenter, ...stylePos } = pos;

    return (
      <div 
        key={id}
        onClick={() => handleZoneClick(id)}
        style={{ ...stylePos, ...transformStyle }}
        className={`absolute rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-700 cursor-pointer isometric-layer ${densityColors[zone.density]} ${isPinned ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900 z-20' : 'z-10 hover:scale-105'} ${isTarget ? 'opacity-100' : pinnedLocation ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0 pointer-events-none"></div>
        
        {/* Animated scanning line effect */}
        {!isPinned && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full hover:animate-[scan_2s_ease-in-out_infinite] z-0 pointer-events-none"></div>}

        <div className="relative h-full p-2 sm:p-3 md:p-4 flex flex-col justify-between z-10 pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="text-slate-300 text-[8px] sm:text-[10px] uppercase font-bold tracking-widest block truncate">{zone.label}</span>
              <h3 className="text-white font-bold text-xs sm:text-sm md:text-lg leading-tight drop-shadow-md truncate">{zone.name}</h3>
            </div>
            
            {/* Safety Overlays */}
            <div className="flex flex-col gap-1 opacity-80 shrink-0 ml-1">
              {zone.hasFireExit && <div className="bg-red-950/80 border border-red-500/50 p-0.5 rounded"><Flame size={10} className="text-red-400" /></div>}
              {zone.hasFirstAid && <div className="bg-blue-950/80 border border-blue-500/50 p-0.5 rounded"><Stethoscope size={10} className="text-blue-400" /></div>}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                {zone.density === 'high' && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${densityGlows[zone.density]}`}></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 shadow-[0_0_10px_currentColor] ${densityGlows[zone.density]}`}></span>
              </span>
              <span className="text-slate-200 text-[8px] sm:text-xs font-semibold uppercase tracking-wider hidden sm:inline-block">{densityLabels[zone.density]}</span>
            </div>
            
            {isPinned && (
              <div className="bg-blue-500 text-white rounded-full p-1 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-bounce">
                <MapPin size={14} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTrafficArrows = () => {
    if (!pinnedLocation) return null;
    const originPos = zonePositions[pinnedLocation];
    if (!originPos) return null;

    const neighbors = routingMap[pinnedLocation] || [];
    
    return neighbors.map(targetId => {
      const targetZone = getZone(targetId);
      const targetPos = zonePositions[targetId];
      if (!targetZone || !targetPos) return null;

      // Calculate center points roughly
      const oY = parseFloat(originPos.top) + parseFloat(originPos.height)/2;
      const oX = parseFloat(originPos.left) + parseFloat(originPos.width)/2;
      const tY = parseFloat(targetPos.top) + parseFloat(targetPos.height)/2;
      const tX = parseFloat(targetPos.left) + parseFloat(targetPos.width)/2;

      // Draw a line/arrow container from origin center to target center
      const length = Math.sqrt(Math.pow(tX - oX, 2) + Math.pow(tY - oY, 2));
      const angle = Math.atan2(tY - oY, tX - oX) * 180 / Math.PI;

      return (
        <div 
          key={`route-${pinnedLocation}-${targetId}`}
          className="absolute z-30 pointer-events-none flex items-center justify-center"
          style={{
            top: `${oY}%`,
            left: `${oX}%`,
            width: `${length}%`,
            height: '2px',
            transformOrigin: '0 50%',
            transform: `rotate(${angle}deg) translateZ(40px)`,
          }}
        >
          {/* Animated dashes line */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`w-[200%] h-full border-t-2 border-dashed border-white/20 animate-[scan_1s_linear_infinite]`}></div>
          </div>
          
          {/* The Arrow Head */}
          <div className={`absolute right-0 translate-x-1/2 bg-slate-900 rounded-full p-1 border border-slate-700 shadow-xl ${arrowColors[targetZone.density]}`}>
            <ArrowRight size={16} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            </span>
            Stadium Simulation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {pinnedLocation 
              ? "Showing live routing traffic from your pinned location." 
              : "Tap any zone to pin your location and see live routing traffic."}
          </p>
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
        
        {/* 3D Container - Stadium Oval Base */}
        <div className="isometric-container w-full max-w-3xl aspect-[4/3] relative">
          
          {/* Base glow ring to emphasize stadium shape */}
          <div className="absolute inset-[10%] rounded-[40%] border-4 border-blue-900/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] pointer-events-none -translate-z-10"></div>
          
          {/* Render Zones */}
          {['z1', 'z4', 'z5', 'z2', 'z3', 'z6'].map(id => renderZoneCard(id))}

          {/* Render Traffic Routes */}
          {renderTrafficArrows()}

        </div>
      </div>
    </div>
  );
}
