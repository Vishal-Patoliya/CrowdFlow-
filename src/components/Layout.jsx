import React from 'react';
import { Map, Clock, Zap, Bell, Car, Shield } from 'lucide-react';

export default function Layout({ children, activeTab, setActiveTab, headCount }) {
  const navItems = [
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'queues', icon: Clock, label: 'Wait Times' },
    { id: 'parking', icon: Car, label: 'Parking' },
    { id: 'safety', icon: Shield, label: 'Safety' },
    { id: 'actions', icon: Zap, label: 'Actions' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 shadow-lg z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-900/50">
            <Map size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">CrowdFlow</h1>
            <div className="flex items-center gap-1.5 mt-1 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-300 tracking-wider">{headCount?.toLocaleString()} IN VENUE</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-950 text-blue-400 shadow-sm shadow-blue-900/20 font-semibold border border-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors border ${activeTab === 'alerts' ? 'bg-blue-900/40 text-blue-400 border-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'}`}
          >
            <Bell size={18} />
            Alerts
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full pb-20 md:pb-0 h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900/95 backdrop-blur-sm px-5 py-4 sticky top-0 z-20 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm shadow-blue-900/50">
              <Map size={20} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 leading-tight">CrowdFlow</h1>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">{headCount?.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`relative p-2 rounded-full transition-colors ${activeTab === 'alerts' ? 'bg-blue-900/50 text-blue-400' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          </button>
        </header>

        <div className="p-5 md:p-8 animate-in fade-in duration-300 flex-1 relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-3 flex justify-between items-center pb-safe shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)] z-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-colors ${
                isActive ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-950/80 text-blue-400 scale-110 border border-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
