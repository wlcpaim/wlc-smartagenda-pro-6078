import React, { useState } from 'react';
import { Scissors, Calendar, Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">SMART<span className="text-red-500">AGENDA</span></span>
            <span className="block text-[10px] text-zinc-400 uppercase tracking-widest">Barbearia & Gestão</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a href="#services" className="hover:text-red-500 transition-colors">Serviços</a>
          <a href="#team" className="hover:text-red-500 transition-colors">Barbeiros</a>
          <a href="#about" className="hover:text-red-500 transition-colors">A Barbearia</a>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[#27272a] text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-red-500" />
            Painel Admin
          </button>
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Agendar Agora
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold"
          >
            Agendar
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18181b] border-b border-[#27272a] px-4 py-6 space-y-4 animate-fadeIn">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 font-medium py-2 border-b border-[#27272a]/50"
          >
            Serviços
          </a>
          <a
            href="#team"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 font-medium py-2 border-b border-[#27272a]/50"
          >
            Barbeiros
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full py-2.5 rounded-xl bg-[#09090b] border border-[#27272a] text-sm font-semibold text-zinc-300 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-red-500" />
              Painel Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};