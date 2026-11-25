import React from 'react';
import { Calendar, Clock, Star, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-[#09090b] via-[#121216] to-[#09090b] border-b border-[#27272a]">
      {/* Glow background effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-xs font-medium text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>Agendamento online sem cadastro prévio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Estilo, Precisão e <span className="text-red-500">Atendimento</span> Exclusivo.
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0">
              Experimente o padrão máximo em cuidados masculinos. Escolha seu barbeiro favorito, o serviço ideal e garanta seu horário em segundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 group"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Agendar Meu Horário
              </button>
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-white font-semibold text-base transition-all flex items-center justify-center"
              >
                Ver Tabela de Preços
              </a>
            </div>

            {/* Highlights badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#27272a]/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400 font-bold text-lg">
                  <Star className="w-4 h-4 fill-amber-400" /> 4.9
                </div>
                <p className="text-xs text-zinc-400">+1.5k Avaliações</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-white font-bold text-lg">
                  <Clock className="w-4 h-4 text-red-500" /> 30min
                </div>
                <p className="text-xs text-zinc-400">Média por atendimento</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-white font-bold text-lg">
                  <MapPin className="w-4 h-4 text-red-500" /> Centro
                </div>
                <p className="text-xs text-zinc-400">Localização VIP</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Card Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 opacity-30 blur-xl" />
              <div className="relative rounded-2xl bg-[#18181b] border border-[#27272a] p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold">
                      SA
                    </div>
                    <div>
                      <h3 className="font-bold text-white">SmartAgenda Lounge</h3>
                      <p className="text-xs text-zinc-400">Aberto hoje até às 20:00</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                    Disponível
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#09090b] border border-[#27272a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-600/10 text-red-500">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">Próxima vaga livre</p>
                        <p className="text-sm font-bold text-white">Hoje às 16:30</p>
                      </div>
                    </div>
                    <button
                      onClick={onOpenBooking}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all"
                    >
                      Reservar
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="rounded-xl overflow-hidden h-48 border border-[#27272a] relative">
                    <img
                      src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
                      alt="Barbearia Interior"
                      className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-medium text-zinc-200 bg-[#09090b]/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                        Ambiente climatizado com cerveja artesanal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};