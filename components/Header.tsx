import React, { useState, useEffect } from 'react';
import { Monitor, Power, Bell, Settings, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-teal-900 via-[#0f2d36] to-teal-900 border-b border-teal-700/50 shadow-lg shadow-cyan-900/20 p-2 flex items-center justify-between relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>

      <div className="flex items-center gap-6 z-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-header font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 tracking-wider">
            黄金埠环保岛智慧管控平台
          </h1>
          <span className="text-[10px] text-cyan-400/60 tracking-[0.2em] uppercase">Desulfurization System Control</span>
        </div>
        
        <nav className="hidden md:flex gap-1 ml-8">
          {['Autonomous Run', 'Evaluation', 'Desulf. Forecast', 'Report', 'Economics'].map((item, idx) => (
            <button 
              key={item}
              className={`px-4 py-1 text-sm font-medium transition-all duration-300 skew-x-[-10deg] border-l border-r border-white/10 hover:bg-cyan-900/40 ${idx === 0 ? 'bg-cyan-800/40 text-cyan-200 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-slate-400 hover:text-cyan-200'}`}
            >
              <span className="skew-x-[10deg] block">{item}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 z-10 text-cyan-100">
        <div className="text-right hidden lg:block">
          <div className="text-xs text-cyan-400 font-digital">{time.toLocaleDateString()} {time.toLocaleTimeString()}</div>
          <div className="text-xs text-slate-400">Welcome, Admin</div>
        </div>
        
        <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Monitor size={18} /></button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-yellow-400"><Bell size={18} /></button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Settings size={18} /></button>
            <button className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"><Power size={18} /></button>
        </div>
      </div>
    </header>
  );
};