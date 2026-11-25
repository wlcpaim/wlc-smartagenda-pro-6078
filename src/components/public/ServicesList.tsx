import React from 'react';
import { Service } from '../../types';
import { Clock, Scissors, Calendar } from 'lucide-react';

interface ServicesListProps {
  services: Service[];
  onOpenBooking: () => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ services, onOpenBooking }) => {
  return (
    <section id="services" className="py-20 bg-[#09090b] border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Nossos Serviços</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Precisão e Estilo em Cada Detalhe
          </h2>
          <p className="text-zinc-400">
            Trabalhamos com produtos de primeira linha e técnicas modernas para garantir o visual perfeito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl bg-[#18181b] border border-[#27272a] p-6 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{service.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" /> {service.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">R$ {service.price.toFixed(2)}</span>
                  </div>
                </div>

                {service.description && (
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[#27272a] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Serviço Profissional</span>
                <button
                  onClick={onOpenBooking}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#09090b] hover:bg-red-600 text-zinc-300 hover:text-white border border-[#27272a] hover:border-red-600 font-semibold text-xs transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};