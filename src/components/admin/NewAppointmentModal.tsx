import React, { useState } from 'react';
import { Barber, Service, Appointment } from '../../types';
import { X, User, Phone, Scissors, Calendar, Clock, DollarSign } from 'lucide-react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  barbers: Barber[];
  services: Service[];
  onSave: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  initialDate: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  barbers,
  services,
  onSave,
  initialDate,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id || '');
  const [barberId, setBarberId] = useState(barbers[0]?.id || '');
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState('09:00');

  if (!isOpen) return null;

  const selectedService = services.find(s => s.id === serviceId);
  const price = selectedService ? selectedService.price : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !serviceId || !barberId || !date || !time) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    onSave({
      clientName,
      clientPhone,
      serviceId,
      barberId,
      date,
      time,
      status: 'confirmed',
      type: 'walk_in',
      price,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#27272a]">
          <h3 className="text-lg font-bold text-[#f4f4f5] flex items-center gap-2">
            <Scissors className="w-5 h-5 text-red-500" />
            Novo Atendimento Presencial
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a1a1aa] hover:text-[#f4f4f5] rounded-lg hover:bg-[#27272a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Nome do Cliente</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Carlos Silva"
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Telefone / WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="Ex: (11) 98888-7777"
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Serviço</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (R$ {s.price.toFixed(2)})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Barbeiro</label>
              <select
                value={barberId}
                onChange={(e) => setBarberId(e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
              >
                {barbers.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Data</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Horário</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#09090b] p-3.5 rounded-xl border border-[#27272a] flex items-center justify-between">
            <span className="text-sm text-[#a1a1aa] flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-red-500" /> Valor do Serviço:
            </span>
            <span className="text-lg font-bold text-red-500">R$ {price.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272a]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#27272a] text-[#f4f4f5] hover:bg-[#3f3f46] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 transition-all"
            >
              Confirmar Encaixe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
