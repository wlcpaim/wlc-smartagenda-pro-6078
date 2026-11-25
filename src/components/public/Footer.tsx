import React from 'react';
import { Scissors, MapPin, Phone, Clock, Instagram, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateAdmin: () => void;
}

export default function Footer({ onNavigateAdmin }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SMART<span className="text-red-500">AGENDA</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A experiência definitiva em barbearia clássica e moderna. Agende seu horário online em segundos ou venha direto para o atendimento presencial.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Horários */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-zinc-200 block">Segunda a Sexta</strong>
                  <span>09:00 - 20:00</span>
                </div>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-zinc-200 block">Sábados</strong>
                  <span>09:00 - 18:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Contato */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Localização & Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>(11) 99999-8888</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Acesso Rápido Admin */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Área Restrita</h3>
            <p className="text-sm text-zinc-400">
              Painel administrativo exclusivo para barbeiros e gestão do estabelecimento.
            </p>
            <button
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              Acessar Painel Admin
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} SmartAgenda Barbearia. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com <span className="text-red-500">♥</span> para barbearias de alto padrão.
          </p>
        </div>
      </div>
    </footer>
  );
}