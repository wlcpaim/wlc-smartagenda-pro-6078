import React, { useState } from 'react';
import { TelegramConfig } from '../../types';
import { Send, CheckCircle2, AlertCircle, Save, Bot } from 'lucide-react';
import { sendTelegramMessage } from '../../utils/telegram';

interface TelegramSettingsProps {
  config: TelegramConfig;
  onSave: (config: TelegramConfig) => void;
}

export const TelegramSettings: React.FC<TelegramSettingsProps> = ({ config, onSave }) => {
  const [token, setToken] = useState(config.token);
  const [chatId, setChatId] = useState(config.chatId);
  const [enabled, setEnabled] = useState(config.enabled);
  const [loading, setLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ token, chatId, enabled });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTest = async () => {
    if (!token || !chatId) {
      setTestStatus('error');
      setErrorMsg('Preencha o Token e o Chat ID primeiro.');
      return;
    }

    setLoading(true);
    setTestStatus('idle');
    setErrorMsg('');

    try {
      const success = await sendTelegramMessage(
        { token, chatId, enabled: true },
        '🚀 *SmartAgenda Teste*:\nIntegração com Telegram configurada com sucesso!'
      );
      if (success) {
        setTestStatus('success');
      } else {
        setTestStatus('error');
        setErrorMsg('Falha ao enviar. Verifique o Token e Chat ID.');
      }
    } catch (err: any) {
      setTestStatus('error');
      setErrorMsg(err.message || 'Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Notificações via Telegram Bot</h3>
          <p className="text-sm text-[#a1a1aa]">Receba alertas em tempo real de novos agendamentos e walk-ins.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          Configurações salvas com sucesso!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#09090b] rounded-lg border border-[#27272a]">
          <div>
            <span className="font-medium text-white block">Ativar Notificações</span>
            <span className="text-xs text-[#a1a1aa]">Disparar mensagens automáticas ao agendar</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1">
            Telegram Bot Token
          </label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ex: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
            className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-white focus:outline-none focus:border-red-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1">
            Chat ID
          </label>
          <input
            type="text"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            placeholder="ex: -100123456789 ou @suabarbearia"
            className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-white focus:outline-none focus:border-red-500 text-sm"
          />
          <p className="text-xs text-[#a1a1aa] mt-1">
Dica: Adicione seu bot no grupo ou inicie uma conversa com ele e use o ID do chat correspondente.
          </p>
        </div>

        {testStatus === 'success' && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Mensagem de teste enviada com sucesso no Telegram!
          </div>
        )}

        {testStatus === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={handleTest}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-[#27272a] hover:bg-[#3f3f46] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Enviando...' : 'Testar Conexão'}
          </button>

          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-500/20"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
};
