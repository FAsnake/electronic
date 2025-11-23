import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatRowProps {
  label: string;
  value: number | string;
  unit: string;
  icon?: LucideIcon;
  color?: string;
  subValue?: string;
  warning?: boolean;
}

export const StatRow: React.FC<StatRowProps> = ({ label, value, unit, icon: Icon, color = "text-cyan-400", subValue, warning }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-900/50 border-l-2 border-slate-700 hover:border-cyan-400 hover:bg-white/5 transition-all group">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`p-2 rounded bg-slate-800 text-slate-400 group-hover:text-cyan-300 transition-colors`}>
            <Icon size={18} />
          </div>
        )}
        <span className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-right">
        <div className={`font-digital text-lg md:text-xl font-bold ${warning ? 'text-amber-400 animate-pulse' : color}`}>
          {value} <span className="text-xs text-slate-500 font-sans">{unit}</span>
        </div>
        {subValue && <div className="text-[10px] text-slate-500">Ref: {subValue}</div>}
      </div>
    </div>
  );
};

interface MetricCardProps {
    title: string;
    value: number;
    unit: string;
    subtext: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, subtext, icon, trend }) => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-4 group hover:border-cyan-500/40 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]">
             {/* Glow effect */}
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
            
            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-900/40 to-slate-900 border border-cyan-500/30 text-cyan-300 shadow-inner">
                {icon}
            </div>
            <div>
                <div className="text-3xl font-digital font-bold text-white drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    {value} <span className="text-sm font-sans text-slate-400">{unit}</span>
                </div>
                <div className="text-xs text-cyan-200/70 uppercase tracking-wider font-semibold mt-1">{title}</div>
                <div className="w-full h-[2px] bg-slate-700 mt-2 relative overflow-hidden">
                     <div className="absolute left-0 top-0 h-full bg-cyan-400 w-2/3 animate-[pulse_3s_infinite]"></div>
                </div>
            </div>
        </div>
    )
}