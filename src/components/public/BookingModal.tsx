import React, { useState } from 'react';
import { Service, Barber, Appointment } from '../../types';
import { getAppointments, saveAppointments } from '../../utils/storage';
import { sendTelegramNotification } from '../../utils/telegram';
import { X, Calendar as CalendarIcon, Clock, User, Phone, Scissors, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  barbers: Barber[];
  onAppointmentCreated: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  barbers,
  onAppointmentCreated
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [selectedBarberId, setSelectedBarberId] = useState<string>(barbers[0]?.id || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('10:00');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedService = services.find(s => s.id === selectedServiceId);
  const selectedBarber = barbers.find(b => b.id === selectedBarberId);

  const availableTimes = ['09:00', '09:45', '10:30', '11:15', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:30', '18:15', '19:00'];

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedService || !selectedBarber) return;

    const newAppt: Appointment = {
      id: 'app-' + Date.now(),
      clientName,
      clientPhone,
      serviceId: selectedService.id,
      barberId: selectedBarber.id,
      date,
      time,
      status: 'confirmed',
      type: 'online',
      price: selectedService.price,
      createdAt: new Date().toISOString()
    };

    const existing = getAppointments();
    saveAppointments([newAppt, ...existing]);

    // Telegram notification
    await sendTelegramNotification(
      `🚨 <b>Novo Agendamento Online!</b>\n\n` +
      `👤 <b>Cliente:</b> ${clientName}\n` +
      `📞 <b>Telefone:</b> ${clientPhone}\n` +
      `✂️ <b>Serviço:</b> ${selectedService.name} (R$ ${selectedService.price})\n` +
      `💈 <b>Barbeiro:</b> ${selectedBarber.name}\n` +
      `📅 <b>Data:</b> ${date} às ${time}`
    );

    setSuccess(true);
    onAppointmentCreated();
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccess(false);
    setClientName('');
    setClientPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-[#18181b] border border-[#27272a] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
              SA
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Agendamento Rápido</h2>
              <p className="text-xs text-zinc-400">Passo {step} de 3</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg bg-[#09090b] text-zinc-400 hover:text-white border border-[#27272a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Agendamento Confirmado!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  Enviamos os detalhes para nosso sistema. Te aguardamos na data marcada, <strong className="text-white">{clientName}</strong>!
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all"
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    1. Escolha o Serviço
                  </label>
                  <div className="space-y-3">
                    {services.map(service => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedServiceId === service.id
                            ? 'bg-red-600/10 border-red-500 text-white'
                            : 'bg-[#09090b] border-[#27272a] text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Scissors className={`w-5 h-5 ${selectedServiceId === service.id ? 'text-red-500' : 'text-zinc-500'}`} />
                          <div>
                            <p className="font-bold text-sm">{service.name}</p>
                            <p className="text-xs text-zinc-400">{service.duration} min</p>
                          </div>
                        </div>
                        <span className="font-bold text-sm">R$ {service.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      2. Escolha o Barbeiro
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {barbers.map(barber => (
                        <div
                          key={barber.id}
                          onClick={() => setSelectedBarberId(barber.id)}
                          className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                            selectedBarberId === barber.id
                              ? 'bg-red-600/10 border-red-500 text-white'
                              : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <img src={barber.avatar} alt={barber.name} className="w-14 h-14 rounded-full mx-auto object-cover mb-2 border border-zinc-700" />
                          <p className="font-bold text-xs truncate">{barber.name.split(' ')[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Data
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090b] border border-[#27272a] text-white text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Horário
                      </label>
                      <select
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090b] border border-[#27272a] text-white text-sm focus:border-red-500 focus:outline-none"
                      >
                        {availableTimes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    3. Seus Dados de Contato
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: João Silva"
                          value={clientName}
                          onChange={e => setClientName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09090b] border border-[#27272a] text-white text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">WhatsApp / Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: (11) 99999-9999"
                          value={clientPhone}
                          onChange={e => setClientPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09090b] border border-[#27272a] text-white text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Serviço:</span>
                      <span className="font-bold text-white">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Barbeiro:</span>
                      <span className="font-bold text-white">{selectedBarber?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Data e Hora:</span>
                      <span className="font-bold text-white">{date} às {time}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#27272a] text-sm">
                      <span className="text-zinc-400 font-semibold">Total:</span>
                      <span className="font-bold text-red-500">R$ {selectedService?.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-[#27272a]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 rounded-xl bg-[#09090b] border border-[#27272a] text-zinc-300 text-xs font-semibold hover:text-white"
                  >
                    Voltar
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all"
                  >
                    Confirmar Agendamento
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};