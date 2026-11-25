import React, { useState } from 'react';
import { Appointment, Barber, Service } from '../../types';
import { Calendar, Clock, User, Phone, CheckCircle2, Play, XCircle, Plus, Scissors, AlertCircle } from 'lucide-react';

interface DailyScheduleProps {
  appointments: Appointment[];
  barbers: Barber[];
  services: Service[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
  onOpenNewModal: () => void;
}

export const DailySchedule: React.FC<DailyScheduleProps> = ({
  appointments,
  barbers,
  services,
  selectedDate,
  onDateChange,
  onUpdateStatus,
  onOpenNewModal,
}) => {
  const [selectedBarber, setSelectedBarber] = useState<string>('all');

  const filteredAppointments = appointments.filter(app => {
    const matchesDate = app.date === selectedDate;
    const matchesBarber = selectedBarber === 'all' || app.barberId === selectedBarber;
    return matchesDate && matchesBarber;
  }).sort((a, b) => a.time.localeCompare(b.time));

  const getService = (serviceId: string) => services.find(s => s.id === serviceId);
  const getBarber = (barberId: string) => barbers.find(b => b.id === barberId);

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">Confirmado</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium animate-pulse">Em Atendimento</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Concluído</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-medium">Cancelado</span>;
      default:
        return <span className="px-2.5 py-1 text-xs rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 font-medium">Pendente</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar / Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18181b] p-4 rounded-xl border border-[#27272a]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#09090b] px-3 py-2 rounded-lg border border-[#27272a]">
            <Calendar className="w-4 h-4 text-red-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-transparent text-sm text-[#f4f4f5] focus:outline-none cursor-pointer"
            />
          </div>

          <select
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
            className="bg-[#09090b] text-[#f4f4f5] text-sm px-3 py-2 rounded-lg border border-[#27272a] focus:outline-none focus:border-red-500"
          >
            <option value="all">Todos os Barbeiros</option>
            {barbers.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={onOpenNewModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-red-600/20"
        >
          <Plus className="w-4 h-4" />
          + NOVO ATENDIMENTO PRESENCIAL
        </button>
      </div>

      {/* Lista de Agendamentos */}
      <div className="bg-[#18181b] rounded-xl border border-[#27272a] overflow-hidden">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <h3 className="font-semibold text-lg text-[#f4f4f5] flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            Agenda do Dia ({filteredAppointments.length})
          </h3>
          <span className="text-xs text-[#a1a1aa]">
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-[#09090b] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#27272a]">
              <AlertCircle className="w-8 h-8 text-[#a1a1aa]" />
            </div>
            <h4 className="text-base font-medium text-[#f4f4f5] mb-1">Nenhum agendamento para esta data</h4>
            <p className="text-sm text-[#a1a1aa] max-w-sm mx-auto mb-6">
              Não há horários agendados ou encaixes presenciais para o filtro selecionado.
            </p>
            <button
              onClick={onOpenNewModal}
              className="inline-flex items-center gap-2 text-sm bg-[#27272a] hover:bg-[#3f3f46] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 text-red-500" /> Adicionar Encaixe Presencial
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#27272a]">
            {filteredAppointments.map(app => {
              const service = getService(app.serviceId);
              const barber = getBarber(app.barberId);

              return (
                <div key={app.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#27272a]/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2.5 text-center min-w-[76px]">
                      <span className="text-xs text-[#a1a1aa] block uppercase">Horário</span>
                      <span className="text-lg font-bold text-red-500">{app.time}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-base text-[#f4f4f5]">{app.clientName}</h4>
                        {getStatusBadge(app.status)}
                        {app.type === 'walk_in' && (
                          <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded">
                            Presencial
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#a1a1aa]">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-red-500" /> {app.clientPhone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Scissors className="w-3.5 h-3.5 text-red-500" /> {service?.name || 'Serviço'} (R$ {app.price.toFixed(2)})
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-red-500" /> Barbeiro: <strong className="text-[#f4f4f5]">{barber?.name || 'N/A'}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ações de Atendimento Presencial */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {app.status !== 'in_progress' && app.status !== 'completed' && app.status !== 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(app.id, 'in_progress')}
                        className="flex items-center gap-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        title="Iniciar Atendimento"
                      >
                        <Play className="w-3.5 h-3.5" /> INICIAR
                      </button>
                    )}

                    {app.status === 'in_progress' && (
                      <button
                        onClick={() => onUpdateStatus(app.id, 'completed')}
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-lg shadow-emerald-600/20"
                        title="Finalizar Atendimento"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> FINALIZAR
                      </button>
                    )}

                    {app.status !== 'completed' && app.status !== 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(app.id, 'cancelled')}
                        className="flex items-center gap-1.5 bg-zinc-800 hover:bg-red-950/40 text-[#a1a1aa] hover:text-red-400 border border-[#27272a] hover:border-red-900/50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        title="Cancelar"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
