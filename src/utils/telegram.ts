import { getTelegramConfig } from './storage';

export const sendTelegramNotification = async (message: string): Promise<boolean> => {
  const config = getTelegramConfig();
  if (!config.enabled || !config.token || !config.chatId) {
    console.log('Telegram desativado ou configurado incorretamente.');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${config.token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Erro ao enviar notificação Telegram:', error);
    return false;
  }
};
// --- Reconciliação Automática WLC 1.9.9 ---

export const sendTelegramMessage: any = () => null;
