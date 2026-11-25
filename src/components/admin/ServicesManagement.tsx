import React, { useState } from 'react';
import { Service } from '../../types';
import { Scissors, Plus, Trash2, Edit2, DollarSign, Clock, X } from 'lucide-react';

interface ServicesManagementProps {
  services: Service[];
  onSaveService: (service: Service) => void;
  onDeleteService: (id: string) => void;
}

export const ServicesManagement: React.FC<ServicesManagementProps> = ({
  services,
  onSaveService,
  onDeleteService,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(50);
  const [description, setDescription] = useState('');

  const handleOpenNew = () => {
    setEditingId(null);
    setName('');
    setDuration(30);
    setPrice(50);
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingId(service.id);
    setName(service.name);
    setDuration(service.duration);
    setPrice(service.price);
    setDescription(service.description || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || duration <= 0 || price <= 0) {
      alert('Preencha os campos obrigatórios corretamente.');
      return;
    }

    const newService: Service = {
      id: editingId || 'srv_' + Date.now(),
      name,
      duration: Number(duration),
      price: Number(price),
      description,
    };

    onSaveService(newService);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18181b] p-4 rounded-xl border border-[#27272a]">
        <h3 className="font-semibold text-lg text-[#f4f4f5] flex items-center gap-2">
          <Scissors className="w-5 h-5 text-red-500" /> Catálogo de Serviços ({services.length})
        </h3>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-red-600/20"
        >
          <Plus className="w-4 h-4" /> NOVO SERVIÇO
        </button>
      </div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 flex flex-col justify-between hover:border-red-500/50 transition-all">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-base text-[#f4f4f5]">{service.name}</h4>
                <span className="text-lg font-bold text-red-500">R$ {service.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#a1a1aa] mb-4 min-h-[32px]">{service.description || 'Sem descrição cadastrada.'}</p>

              <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mb-4">
                <span className="flex items-center gap-1 bg-[#09090b] px-2.5 py-1 rounded-lg border border-[#27272a]">
                  <Clock className="w-3.5 h-3.5 text-red-500" /> {service.duration} min
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#27272a]">
              <button
                onClick={() => handleOpenEdit(service)}
                className="p-2 text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#27272a] rounded-lg transition-colors"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja excluir este serviço?')) {
                    onDeleteService(service.id);
                  }
                }}
                className="p-2 text-[#a1a1aa] hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                title="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Criar/Editar Serviço */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#27272a]">
              <h3 className="text-lg font-bold text-[#f4f4f5]">
                {editingId ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#a1a1aa] hover:text-[#f4f4f5] rounded-lg hover:bg-[#27272a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Nome do Serviço</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Corte Degradê + Barba"
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Duração (min)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    step={5}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Preço (R$)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    step={0.5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] uppercase mb-1.5">Descrição</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalhes do serviço..."
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#f4f4f5] focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#27272a] text-[#f4f4f5] hover:bg-[#3f3f46]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                >
                  Salvar Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
