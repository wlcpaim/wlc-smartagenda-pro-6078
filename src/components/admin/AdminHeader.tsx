import React from 'react';
import { Bell, Search, Shield, Plus } from 'lucide-react';

interface AdminHeaderProps {
  onOpenWalkInModal: () => void;
  pendingCount: number;
}

export default function AdminHeader({ onOpenWalkInModal, pendingCount }: AdminHeaderProps) {
  return (
    <header className="h-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-72 sm:w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar cliente, serviço ou telefone..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Walk-in quick button */}
        <button
          onClick={onOpenWalkInModal}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>+ NOVO ATENDIMENTO PRESENCIAL</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors relative">
            <Bell className="w-4 h-4" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-zinc-950">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* User profile avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-zinc-800">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center text-red-500 font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold text-white leading-tight">Admin Master</div>
            <div className="text-xs text-zinc-500">Gerente Geral</div>
          </div>
        </div>
      </div>
    </header>
  );
}