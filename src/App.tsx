import React, { useState } from 'react';
import PublicHome from './pages/PublicHome';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col">
      {/* Top bar quick toggle for demo convenience */}
      <div className="bg-zinc-900 border-b border-zinc-800 text-xs px-4 py-2 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-zinc-400 font-medium">SmartAgenda 1.9.9</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('public')}
            className={`px-3 py-1 rounded transition-colors ${currentView === 'public' ? 'bg-red-600 text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}
          >
            Landing Page
          </button>
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1 rounded transition-colors ${currentView === 'admin' ? 'bg-red-600 text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}
          >
            Painel Admin
          </button>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col">
        {currentView === 'public' ? (
          <PublicHome onNavigateAdmin={() => setCurrentView('admin')} />
        ) : (
          <AdminDashboard onNavigatePublic={() => setCurrentView('public')} />
        )}
      </div>
    </div>
  );
}