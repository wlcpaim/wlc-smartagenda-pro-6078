import React from 'react';
import { Calendar, Users, Scissors, DollarSign, Send, Globe, LogOut, LayoutDashboard } from 'lucide-react';

export type AdminTab = 'appointments' | 'walkin' | 'barbers' | 'services' | 'financial' | 'telegram';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onNavigatePublic: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, onNavigatePublic }: AdminSidebarProps) {
  const menuItems = [
    { id: 'appointments' as AdminTab, label: 'Agenda & Visão', icon: Calendar },
    { id: 'walkin' as AdminTab, label: 'Atendimento Rápido', icon: Users, badge: 'LIVE' },
    { id: 'barbers' as AdminTab, label: 'Barbeiros', icon: Scissors },
    { id: 'services' as AdminTab, label: 'Serviços & Preços', icon: LayoutDashboard },
    { id: 'financial' as AdminTab, label: 'Financeiro & Métricas', icon: DollarSign },
    { id: 'telegram' as AdminTab, label: 'Telegram Bot', icon: Send },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col shrink-0 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-900 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-lg shadow-red-950/50">
          <Scissors className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide text-base">SMART<span className="text-red-500">AGENDA</span></h1>
          <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">Admin Dark 1.9</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        <div className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase px-3 pb-2">
          Menu Principal
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isActive ? 'bg-white text-red-600' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Back to public */}
      <div className="p-4 border-t border-zinc-900 space-y-2">
        <button
          onClick={onNavigatePublic}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
        >
          <Globe className="w-4 h-4 text-zinc-500" />
          <span>Ver Landing Page</span>
        </button>
      </div>
    </aside>
  );
}