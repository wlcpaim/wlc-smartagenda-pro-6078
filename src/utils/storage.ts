import { Service, Barber, Appointment, TelegramConfig } from '../types';
import { initialServices, initialBarbers, initialAppointments, initialTelegramConfig } from '../data/initialData';

const SERVICES_KEY = 'smartagenda_services_v1';
const BARBERS_KEY = 'smartagenda_barbers_v1';
const APPOINTMENTS_KEY = 'smartagenda_appointments_v1';
const TELEGRAM_KEY = 'smartagenda_telegram_v1';

export const getServices = (): Service[] => {
  const data = localStorage.getItem(SERVICES_KEY);
  if (!data) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(initialServices));
    return initialServices;
  }
  try { return JSON.parse(data); } catch { return initialServices; }
};

export const saveServices = (services: Service[]) => {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};

export const getBarbers = (): Barber[] => {
  const data = localStorage.getItem(BARBERS_KEY);
  if (!data) {
    localStorage.setItem(BARBERS_KEY, JSON.stringify(initialBarbers));
    return initialBarbers;
  }
  try { return JSON.parse(data); } catch { return initialBarbers; }
};

export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  if (!data) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(initialAppointments));
    return initialAppointments;
  }
  try { return JSON.parse(data); } catch { return initialAppointments; }
};

export const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

export const getTelegramConfig = (): TelegramConfig => {
  const data = localStorage.getItem(TELEGRAM_KEY);
  if (!data) {
    localStorage.setItem(TELEGRAM_KEY, JSON.stringify(initialTelegramConfig));
    return initialTelegramConfig;
  }
  try { return JSON.parse(data); } catch { return initialTelegramConfig; }
};

export const saveTelegramConfig = (config: TelegramConfig) => {
  localStorage.setItem(TELEGRAM_KEY, JSON.stringify(config));
};
// --- Reconciliação Automática WLC 1.9.9 ---

export const saveAppointment = (app: any) => saveAppointments([...getAppointments(), app]);

export const updateAppointmentStatus: any = () => null;
