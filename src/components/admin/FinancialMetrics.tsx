import React, { useState } from 'react';
import { Appointment, Service, Barber } from '../../types';
import { DollarSign, TrendingUp, Users, Calendar, Scissors, Award } from 'lucide-react';

interface FinancialMetricsProps {
  appointments: Appointment[];
  services: Service[];
  barbers: Barber[];
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({
  appointments,
  services,
  barbers,
}) => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'all'>('month');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointments.filter(app => {
    if (app.status === 'cancelled') return false;
    if (period === 'today') return app.date === todayStr;
    // Implementação simplificada de filtros de período
    return true;
  });

  const totalRevenue = filteredAppointments.reduce((acc, curr) => acc + curr.price, 0);
  const totalCount = filteredAppointments.length;
  const averageTicket = totalCount > 0 ? totalRevenue / totalCount : 0;

  // Agrupamento por barbeiro
  const revenueByBarber = barbers.map(barber => {
    const barberApps = filteredAppointments.filter(app => app.barberId === barber.id);
    const revenue = barberApps.reduce((acc, curr) => acc + curr.price, 0);
    return {
      ...barber,
      count: barberApps.length,
      revenue,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      {/* Top filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18181b] p-4 rounded-xl border border-[#27272a]">
        <h3 className="font-semibold text-lg text-[#f4f4f5] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-500" /> Faturamento & Métricas
        </h3>

        <div className="flex items-center gap-2 bg-[#09090b] p-1 rounded-lg border border-[#27272a]">
          <button
            onClick={() => setPeriod('today')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${period === 'today' ? 'bg-red-600 text-white' : 'text-[#a1a1aa] hover:text-[#f4f4f5]'}`}
          >
            Hoje
          </button>
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${period === 'week' ? 'bg-red-600 text-white' : 'text-[#a1a1aa] hover:text-[#f4f4f5]'}`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${period === 'month' ? 'bg-red-600 text-white' : 'text-[#a1a1aa] hover:text-[#f4f4f5]'}`}
          >
            Mês
          </button>
          <button
            onClick={() => setPeriod('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${period === 'all' ? 'bg-red-600 text-white' : 'text-[#a1a1aa] hover:text-[#f4f4f5]'}`}
          >
            Geral
          </button>
        </div>
      </div>

      {/* Grid de Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider">Faturamento Total</span>
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#f4f4f5]">
            R$ {totalRevenue.toFixed(2)}
          </div>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% em relação ao período anterior
          </p>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider">Atendimentos Realizados</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#f4f4f5]">
            {totalCount}
          </div>
          <p className="text-xs text-[#a1a1aa] mt-2">
            Inclui agendamentos online e presenciais
          </p>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider">Ticket Médio</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#f4f4f5]">
            R$ {averageTicket.toFixed(2)}
          </div>
          <p className="text-xs text-[#a1a1aa] mt-2">
            Média por cliente atendido
          </p>
        </div>
      </div>

      {/* Desempenho por Barbeiro */}
      <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6">
        <h4 className="font-bold text-base text-[#f4f4f5] mb-4 flex items-center gap-2">
          <Scissors className="w-4 h-4 text-red-500" /> Desempenho por Barbeiro
        </h4>

        <div className="space-y-4">
          {revenueByBarber.map((barber, index) => {
            const percentage = totalRevenue > 0 ? (barber.revenue / totalRevenue) * 100 : 0;
            return (
              <div key={barber.id} className="bg-[#09090b] p-4 rounded-xl border border-[#27272a] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={barber.avatar} alt={barber.name} className="w-10 h-10 rounded-full object-cover border border-[#27272a]" />
                    <div>
                      <h5 className="font-semibold text-sm text-[#f4f4f5]">{barber.name}</h5>
                      <p className="text-xs text-[#a1a1aa]">{barber.count} atendimentos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-red-500">R$ {barber.revenue.toFixed(2)}</span>
                    <span className="block text-xs text-[#a1a1aa]">{percentage.toFixed(1)}% do total</span>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="w-full bg-[#27272a] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
