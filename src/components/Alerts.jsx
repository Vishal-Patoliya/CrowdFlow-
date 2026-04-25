import React from 'react';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Congestion: East Concourse',
      message: 'Crowd density is nearing maximum capacity. Please use alternate routes.',
      time: 'Just now',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 2,
      type: 'info',
      title: 'Restroom Cleaning',
      message: 'South Gate restrooms will be closed for maintenance in 10 minutes.',
      time: '5m ago',
      icon: Info,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10 border-blue-400/20'
    },
    {
      id: 3,
      type: 'success',
      title: 'North Lot Available',
      message: 'New parking spots have opened up in the North Lot.',
      time: '15m ago',
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20'
    }
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Bell className="text-blue-400" />
            Live Alerts
          </h2>
          <p className="text-sm text-slate-400 mt-1">Real-time notifications and updates</p>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`p-4 rounded-xl border backdrop-blur-sm transition-transform hover:-translate-y-1 cursor-pointer ${alert.bg}`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-slate-900/50 ${alert.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-200">{alert.title}</h3>
                    <span className="text-xs font-medium text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
