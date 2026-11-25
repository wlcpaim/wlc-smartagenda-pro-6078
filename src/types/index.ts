export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
};

export type Barber = {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
};

export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type Appointment = {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: 'online' | 'walk_in';
  price: number;
  createdAt: string;
};

export type TelegramConfig = {
  token: string;
  chatId: string;
  enabled: boolean;
};