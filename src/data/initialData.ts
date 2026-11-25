import { Service, Barber, Appointment, TelegramConfig } from '../types';

export const initialServices: Service[] = [
  {
    id: 's1',
    name: 'Corte Degradê / Tesoura',
    duration: 30,
    price: 45,
    description: 'Corte moderno com acabamento na navalha e lavagem inclusa.'
  },
  {
    id: 's2',
    name: 'Barba Terapia',
    duration: 30,
    price: 40,
    description: 'Toalha quente, óleos essenciais, massagem facial e navalha.'
  },
  {
    id: 's3',
    name: 'Combo Master (Corte + Barba)',
    duration: 60,
    price: 75,
    description: 'Nosso serviço completo com direito a choque gelado e modelagem.'
  },
  {
    id: 's4',
    name: 'Pigmentação & Acabamento',
    duration: 20,
    price: 30,
    description: 'Disfarce de fios brancos ou barba falhada com tinta especial.'
  }
];

export const initialBarbers: Barber[] = [
  {
    id: 'b1',
    name: 'Carlos Blade',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    specialty: 'Degradê Navalhado & Estilo Clássico'
  },
  {
    id: 'b2',
    name: 'Marcos Razor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    specialty: 'Barba Terapia & Visagismo'
  },
  {
    id: 'b3',
    name: 'Diego Fade',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    specialty: 'Cortes Modernos & Freestyle'
  }
];

const todayStr = new Date().toISOString().split('T')[0];

export const initialAppointments: Appointment[] = [
  {
    id: 'app-1',
    clientName: 'Roberto Silva',
    clientPhone: '(11) 98765-4321',
    serviceId: 's3',
    barberId: 'b1',
    date: todayStr,
    time: '09:00',
    status: 'completed',
    type: 'online',
    price: 75,
    createdAt: new Date().toISOString()
  },
  {
    id: 'app-2',
    clientName: 'Lucas Mendes',
    clientPhone: '(11) 91234-5678',
    serviceId: 's1',
    barberId: 'b2',
    date: todayStr,
    time: '10:30',
    status: 'in_progress',
    type: 'walk_in',
    price: 45,
    createdAt: new Date().toISOString()
  },
  {
    id: 'app-3',
    clientName: 'Felipe Santos',
    clientPhone: '(11) 99887-7665',
    serviceId: 's2',
    barberId: 'b3',
    date: todayStr,
    time: '14:00',
    status: 'confirmed',
    type: 'online',
    price: 40,
    createdAt: new Date().toISOString()
  }
];

export const initialTelegramConfig: TelegramConfig = {
  token: '',
  chatId: '',
  enabled: false
};
// --- Reconciliação Automática WLC 1.9.9 ---

export const getInitialServices = () => initialServices;

export const getInitialBarbers = () => initialBarbers;
