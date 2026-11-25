import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/public/Navbar';
import { Hero } from '../components/public/Hero';
import { ServicesList } from '../components/public/ServicesList';
import { BarberTeam } from '../components/public/BarberTeam';
import { BookingModal } from '../components/public/BookingModal';
import { Service, Barber, Appointment, TelegramConfig } from '../types';
import { getInitialServices, getInitialBarbers } from '../data/initialData';
import { getAppointments, saveAppointment, getTelegramConfig } from '../utils/storage';
import { sendTelegramMessage } from '../utils/telegram';
import { Scissors, Clock, MapPin, Phone, Instagram, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

export const PublicHome: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>({
    token: '',
    chatId: '',
    enabled: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedBarberId, setSelectedBarberId] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setServices(getInitialServices());
    setBarbers(getInitialBarbers());
    setAppointments(getAppointments());
    setTelegramConfig(getTelegramConfig());
  }, []);

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedBarberId(barberId);
    setIsModalOpen(true);
  };

  const handleCreateAppointment = (data: {
    clientName: string;
    clientPhone: string;
    serviceId: string;
    barberId: string;
    date: string;
    time: string;
  }) => {
    const service = services.find((s) => s.id === data.serviceId);
    const barber = barbers.find((b) => b.id === data.barberId);

    const newAppt: Appointment = {
      id: 'apt_' + Date.now(),
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      serviceId: data.serviceId,
      barberId: data.barberId,
      date: data.date,
      time: data.time,
      status: 'confirmed',
      type: 'online',
      price: service ? service.price : 50,
      createdAt: new Date().toISOString(),
    };

    saveAppointment(newAppt);
    setAppointments(getAppointments());
    setIsModalOpen(false);

    const msg = `📅 *Novo Agendamento Confirmado!*\n\n👤 Cliente: ${data.clientName}\n📞 Tel: ${data.clientPhone}\n✂️ Serviço: ${service?.name || 'Corte'}\n💈 Barbeiro: ${barber?.name || 'Qualquer'}\n📆 Data: ${data.date} às ${data.time}`;
    sendTelegramMessage(telegramConfig, msg);

    setSuccessMessage(`Agendamento confirmado com sucesso para ${data.date} às ${data.time}!`);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col">
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <span className="font-medium text-sm sm:text-base">{successMessage}</span>
        </div>
      )}

      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />

        <div id="services">
          <ServicesList services={services} onSelectService={(id) => handleOpenBooking(id)} />
        </div>

        <div id="team">
          <BarberTeam barbers={barbers} onSelectBarber={(id) => handleOpenBooking(undefined, id)} />
        </div>

        {/* Testimonials / Features */}
        <section className="py-20 border-t border-[#27272a] bg-[#121215]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-red-500 font-semibold uppercase tracking-wider text-xs px-3 py-1 bg-red-500/10 rounded-full">
                Excelência
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Por que escolher a SmartAgenda?
              </h2>
              <p className="text-[#a1a1aa] mt-2">
                Oferecemos uma experiência completa de barbearia tradicional com tecnologia de ponta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-2xl">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-6">
                  <Scissors className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Profissionais Renomados</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  Nossa equipe passa por treinamentos constantes para dominar cortes clássicos, modernos e barbas impecáveis.
                </p>
              </div>

              <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-2xl">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ambiente Premium</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  Cerveja gelada, sinuca, boa música e um ambiente climatizado e sofisticado para seu momento de relaxamento.
                </p>
              </div>

              <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-2xl">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Agendamento sem Login</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  Em menos de 30 segundos você garante seu horário e recebe confirmação instantânea.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#09090b] border-t border-[#27272a] py-12 text-[#a1a1aa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center text-white font-black">
                SA
              </div>
              <span className="text-lg font-bold text-white tracking-wider">
                SMART<span className="text-red-500">AGENDA</span>
              </span>
            </div>
            <p className="text-sm">
              A barbearia definitiva para o homem moderno que valoriza seu tempo e sua aparência.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Segunda a Sexta:</span> <span className="text-white">09:00 - 20:00</span></li>
              <li className="flex justify-between"><span>Sábado:</span> <span className="text-white">09:00 - 18:00</span></li>
              <li className="flex justify-between"><span>Domingo:</span> <span className="text-red-500">Fechado</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contato & Local</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Av. Paulista, 1000 - Sala 42 - São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>(11) 99999-8888</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Redes Sociais</h4>
            <p className="text-sm mb-4">Siga-nos para ver trabalhos recentes e dicas de estilo.</p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#18181b] hover:bg-[#27272a] text-white rounded-lg border border-[#27272a] transition-colors text-sm font-medium"
            >
              <Instagram className="w-4 h-4 text-red-500" />
              Instagram
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#27272a] text-center text-xs text-[#71717a]">
          &copy; {new Date().getFullYear()} SmartAgenda Barbearia. Todos os direitos reservados. Desenvolvido com WLC 1.9.9.
        </div>
      </footer>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
        barbers={barbers}
        selectedServiceId={selectedServiceId}
        selectedBarberId={selectedBarberId}
        onConfirm={handleCreateAppointment}
      />
    </div>
  );
};

// --- Reconciliação Automática WLC 1.9.9 ---

export default PublicHome;
