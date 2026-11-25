import React, { useState, useEffect } from 'react';
import { Service, Barber, Appointment, TelegramConfig, AppointmentStatus } from '../types';
import { getInitialServices, getInitialBarbers } from '../data/initialData';
import { getAppointments, saveAppointment, updateAppointmentStatus, getTelegramConfig, saveTelegramConfig } from '../utils/storage';
import { TelegramSettings } from '../components/admin/TelegramSettings';
import { sendTelegramMessage } from '../utils/telegram';
import {
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  CheckCircle,
  Play,
  XCircle,
  Settings,
  LogOut,
  Scissors,
  Phone,
  User,
  Shield,
  Filter,
  Trash2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'walkin' | 'metrics' | 'settings'>('agenda');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>({
    token: '',
    chatId: '',
    enabled: false,
  });

  // Walk-in form state
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinServiceId, setWalkinServiceId] = useState('');
  const [walkinBarberId, setWalkinBarberId] = useState('');
  const [walkinDate, setWalkinDate] = useState(new Date().toISOString().split('T')[0]);
  const [walkinTime, setWalkinTime] = useState('10:00');

  // Filter state for agenda
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    setAppointments(getAppointments());
    setServices(getInitialServices());
    setBarbers(getInitialBarbers());
    setTelegramConfig(getTelegramConfig());

    if (getInitialServices().length > 0) {
      setWalkinServiceId(getInitialServices()[0].id);
    }
    if (getInitialBarbers().length > 0) {
      setWalkinBarberId(getInitialBarbers()[0].id);
    }
  }, []);

  const refreshAppointments = () => {
    setAppointments(getAppointments());
  };

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    updateAppointmentStatus(id, status);
    refreshAppointments();

    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      const service = services.find((s) => s.id === apt.serviceId);
      const statusText = status === 'in_progress' ? 'Em Andamento ✂️' : status === 'completed' ? 'Finalizado ✅' : status === 'cancelled' ? 'Cancelado ❌' : status;
      sendTelegramMessage(
        telegramConfig,
        `📌 *Atualização de Atendimento*\n\n👤 Cliente: ${apt.clientName}\n✂️ Serviço: ${service?.name || 'Corte'}\n🔄 Status: *${statusText}*`
      );
    }
  };

  const handleCreateWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName || !walkinPhone || !walkinServiceId || !walkinBarberId) {
      alert('Por favor, preencha todos os campos do atendimento presencial.');
      return;
    }

    const service = services.find((s) => s.id === walkinServiceId);
    const barber = barbers.find((b) => b.id === walkinBarberId);

    const newAppt: Appointment = {
      id: 'walk_' + Date.now(),
      clientName: walkinName,
      clientPhone: walkinPhone,
      serviceId: walkinServiceId,
      barberId: walkinBarberId,
      date: walkinDate,
      time: walkinTime,
      status: 'in_progress',
      type: 'walk_in',
      price: service ? service.price : 50,
      createdAt: new Date().toISOString(),
    };

    saveAppointment(newAppt);
    refreshAppointments();

    sendTelegramMessage(
      telegramConfig,
      `🚶‍♂️ *Novo Atendimento Presencial (Walk-in)*\n\n👤 Cliente: ${walkinName}\n✂️ Serviço: ${service?.name}\n💈 Barbeiro: ${barber?.name}\n⏰ Horário: ${walkinTime}`
    );

    setWalkinName('');
    setWalkinPhone('');
    setActiveTab('agenda');
  };

  // Metrics calculation
  const totalRevenue = appointments
    .filter((a) => a.status === 'completed')
    .reduce((acc, curr) => acc + curr.price, 0);

  const totalAppointmentsCount = appointments.length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const walkInCount = appointments.filter((a) => a.type === 'walk_in').length;

  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter === 'all') return true;
    return apt.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 bg-[#121215] border-r border-[#27272a] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-500/20">
              SA
            </div>
            <div>
              <h1 className="font-bold text-white text-base tracking-wider">SMARTAGENDA</h1>
              <span className="text-xs text-red-500 font-semibold uppercase tracking-widest">Admin Dark</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('agenda')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'agenda'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              Agenda & Atendimentos
            </button>

            <button
              onClick={() => setActiveTab('walkin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'walkin'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
              }`}
            >
              <Plus className="w-5 h-5" />
              + Novo Atendimento
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'metrics'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Faturamento & Métricas
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              Integração Telegram
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#27272a]">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#a1a1aa] hover:bg-[#18181b] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Voltar ao Site Público
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Faturamento Concluído</span>
              <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">
              R$ {totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-[#a1a1aa] mt-1">Baseado em serviços finalizados</p>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Total de Agendamentos</span>
              <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                <CalendarIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{totalAppointmentsCount}</div>
            <p className="text-xs text-[#a1a1aa] mt-1">Online + Presencial</p>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Atendimentos Realizados</span>
              <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{completedCount}</div>
            <p className="text-xs text-[#a1a1aa] mt-1">Clientes atendidos</p>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Walk-ins Presenciais</span>
              <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl">
                <Scissors className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{walkInCount}</div>
            <p className="text-xs text-[#a1a1aa] mt-1">Encaixes balcão</p>
          </div>
        </div>

        {/* TAB 1: AGENDA & ATENDIMENTOS */}
        {activeTab === 'agenda' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18181b] border border-[#27272a] rounded-2xl p-5">
              <div>
                <h2 className="text-xl font-bold text-white">Gerenciamento de Agenda</h2>
                <p className="text-sm text-[#a1a1aa]">Monitore e atualize o status dos cortes em tempo real.</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#a1a1aa]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#09090b] border border-[#27272a] text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-red-500"
                >
                  <option value="all">Todos os Status</option>
                  <option value="confirmed">Confirmados</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="completed">Concluídos</option>
                  <option value="cancelled">Cancelados</option>
                </select>
              </div>
            </div>

            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#27272a] bg-[#121215] text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Serviço & Barbeiro</th>
                      <th className="p-4">Data / Hora</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações Rápidas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-sm">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-[#a1a1aa]">
                          Nenhum agendamento encontrado para este filtro.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => {
                        const service = services.find((s) => s.id === apt.serviceId);
                        const barber = barbers.find((b) => b.id === apt.barberId);
                        return (
                          <tr key={apt.id} className="hover:bg-[#202024] transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-white">{apt.clientName}</div>
                              <div className="text-xs text-[#a1a1aa] flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3" /> {apt.clientPhone}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-white">{service?.name || 'Corte'}</div>
                              <div className="text-xs text-[#a1a1aa]">Barbeiro: {barber?.name || 'Geral'}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-white">{apt.date}</div>
                              <div className="text-xs text-red-400 font-semibold">{apt.time}</div>
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  apt.type === 'walk_in'
                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}
                              >
                                {apt.type === 'walk_in' ? 'Walk-in (Presencial)' : 'Online'}
                              </span>
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  apt.status === 'confirmed'
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : apt.status === 'in_progress'
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse'
                                    : apt.status === 'completed'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                }`}
                              >
                                {apt.status === 'confirmed' && 'Confirmado'}
                                {apt.status === 'in_progress' && 'Em Andamento'}
                                {apt.status === 'completed' && 'Concluído'}
                                {apt.status === 'cancelled' && 'Cancelado'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {apt.status !== 'in_progress' && apt.status !== 'completed' && (
                                  <button
                                    onClick={() => handleStatusChange(apt.id, 'in_progress')}
                                    title="Iniciar Atendimento"
                                    className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors"
                                  >
                                    <Play className="w-4 h-4" />
                                  </button>
                                )}

                                {apt.status === 'in_progress' && (
                                  <button
                                    onClick={() => handleStatusChange(apt.id, 'completed')}
                                    title="Finalizar Atendimento"
                                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-colors"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                )}

                                {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                                  <button
                                    onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                    title="Cancelar"
                                    className="p-2 bg-[#27272a] hover:bg-red-500 text-[#a1a1aa] hover:text-white rounded-lg transition-colors"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NOVO ATENDIMENTO PRESENCIAL (WALK-IN) */}
        {activeTab === 'walkin' && (
          <div className="max-w-2xl mx-auto bg-[#18181b] border border-[#27272a] rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Atendimento Presencial Rápido</h2>
                <p className="text-sm text-[#a1a1aa]">Adicione encaixes de balcão e inicie o atendimento imediatamente.</p>
              </div>
            </div>

            <form onSubmit={handleCreateWalkin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  required
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  placeholder="ex: Carlos Silva"
                  className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={walkinPhone}
                  onChange={(e) => setWalkinPhone(e.target.value)}
                  placeholder="ex: (11) 98888-7777"
                  className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
                    Serviço
                  </label>
                  <select
                    value={walkinServiceId}
                    onChange={(e) => setWalkinServiceId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - R$ {s.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
                    Barbeiro
                  </label>
                  <select
                    value={walkinBarberId}
                    onChange={(e) => setWalkinBarberId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
                  >
                    {barbers.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={walkinDate}
                    onChange={(e) => setWalkinDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={walkinTime}
                    onChange={(e) => setWalkinTime(e.target.value)}
                    className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20 text-sm flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                INICIAR ATENDIMENTO PRESENCIAL
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: METRICAS */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Relatório de Faturamento & Desempenho</h2>
              <p className="text-sm text-[#a1a1aa] mb-6">Visão consolidada do caixa e dos serviços mais populares.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-[#121215] border border-[#27272a] rounded-xl">
                  <span className="text-xs text-[#a1a1aa] font-semibold uppercase">Ticket Médio</span>
                  <div className="text-3xl font-black text-white mt-2">
                    R$ {completedCount > 0 ? (totalRevenue / completedCount).toFixed(2) : '0.00'}
                  </div>
                  <span className="text-xs text-emerald-400 mt-2 block">Por atendimento concluído</span>
                </div>

                <div className="p-6 bg-[#121215] border border-[#27272a] rounded-xl">
                  <span className="text-xs text-[#a1a1aa] font-semibold uppercase">Taxa de Conclusão</span>
                  <div className="text-3xl font-black text-white mt-2">
                    {totalAppointmentsCount > 0
                      ? ((completedCount / totalAppointmentsCount) * 100).toFixed(1)
                      : '0'}%
                  </div>
                  <span className="text-xs text-blue-400 mt-2 block">Agendamentos finalizados com sucesso</span>
                </div>

                <div className="p-6 bg-[#121215] border border-[#27272a] rounded-xl">
                  <span className="text-xs text-[#a1a1aa] font-semibold uppercase">Presencial vs Online</span>
                  <div className="text-3xl font-black text-white mt-2">
                    {walkInCount} / {totalAppointmentsCount - walkInCount}
                  </div>
                  <span className="text-xs text-purple-400 mt-2 block">Walk-ins vs Agendados web</span>
                </div>
              </div>

              <div className="p-6 bg-[#121215] border border-[#27272a] rounded-xl">
                <h3 className="font-bold text-white mb-4">Histórico Recente de Caixa</h3>
                <div className="space-y-3">
                  {appointments
                    .filter((a) => a.status === 'completed')
                    .slice(0, 5)
                    .map((apt) => {
                      const service = services.find((s) => s.id === apt.serviceId);
                      return (
                        <div
                          key={apt.id}
                          className="flex items-center justify-between p-3 bg-[#18181b] rounded-lg border border-[#27272a] text-sm"
                        >
                          <div>
                            <span className="font-bold text-white">{apt.clientName}</span>
                            <span className="text-xs text-[#a1a1aa] block">{service?.name} • {apt.date}</span>
                          </div>
                          <span className="font-bold text-emerald-400">+ R$ {apt.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  {appointments.filter((a) => a.status === 'completed').length === 0 && (
                    <p className="text-sm text-[#a1a1aa]">Nenhum atendimento concluído ainda.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS (TELEGRAM) */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <TelegramSettings
              config={telegramConfig}
              onSave={(cfg) => {
                saveTelegramConfig(cfg);
                setTelegramConfig(cfg);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

// --- Reconciliação Automática WLC 1.9.9 ---

export default AdminDashboard;
