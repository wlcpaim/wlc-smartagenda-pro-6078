import React from 'react';
import { Barber } from '../../types';
import { Star, Calendar } from 'lucide-react';

interface BarberTeamProps {
  barbers: Barber[];
  onOpenBooking: () => void;
}

export const BarberTeam: React.FC<BarberTeamProps> = ({ barbers, onOpenBooking }) => {
  return (
    <section id="team" className="py-20 bg-[#09090b] border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Nossa Equipe</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Profissionais Especializados
          </h2>
          <p className="text-zinc-400">
            Conheça nossos mestres da tesoura e da navalha, prontos para elevar o seu visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className="rounded-2xl bg-[#18181b] border border-[#27272a] overflow-hidden group hover:border-red-500/50 transition-all shadow-xl flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-[#09090b]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#27272a] flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{barber.name}</h3>
                  <p className="text-xs font-semibold text-red-500 mt-1 uppercase tracking-wider">{barber.specialty}</p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-[#09090b] hover:bg-red-600 text-zinc-300 hover:text-white border border-[#27272a] hover:border-red-600 text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Agendar com {barber.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};