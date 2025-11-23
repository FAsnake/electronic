import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

interface MetricsChartProps {
  data: ChartDataPoint[];
  title: string;
  colorInlet: string;
  colorOutlet: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-cyan-500/50 p-2 rounded shadow-lg text-xs">
        <p className="text-slate-300 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const TowerChart: React.FC<MetricsChartProps> = ({ data, title, colorInlet, colorOutlet, height = 180 }) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-900/40 border border-white/5 rounded-lg overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-50"></div>
      <div className="px-3 py-2 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent border-b border-white/5">
        <h3 className="text-cyan-300 font-semibold italic tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rotate-45"></span>
            {title}
        </h3>
        <div className="flex gap-2">
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span className="w-2 h-0.5 bg-emerald-400"></span> Inlet
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span className="w-2 h-0.5 bg-amber-400"></span> Outlet
            </div>
        </div>
      </div>
      <div className="flex-1 w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorInlet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorInlet} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colorInlet} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutlet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorOutlet} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colorOutlet} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 'auto']} width={30} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="inlet" stroke={colorInlet} fillOpacity={1} fill="url(#colorInlet)" strokeWidth={2} activeDot={{ r: 4 }} name="Inlet SO2" animationDuration={1000}/>
            <Area type="monotone" dataKey="outlet" stroke={colorOutlet} fillOpacity={1} fill="url(#colorOutlet)" strokeWidth={2} activeDot={{ r: 4 }} name="Outlet SO2" animationDuration={1000}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const LoadChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-slate-900/40 border border-white/5 rounded-lg flex flex-col relative">
       <div className="px-3 py-2 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent border-b border-white/5">
        <h3 className="text-cyan-300 font-semibold italic tracking-wide">LOAD / OUTLET SO2 TREND</h3>
      </div>
      <div className="flex-1 w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
             <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} iconType="rect" wrapperStyle={{fontSize: '12px', color: '#94a3b8'}}/>
            <Area yAxisId="left" type="monotone" dataKey="load" stroke="#f59e0b" fill="url(#colorLoad)" strokeWidth={2} name="Load (MW)" />
            <Line yAxisId="right" type="monotone" dataKey="outlet" stroke="#22d3ee" strokeWidth={2} dot={false} name="Outlet SO2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
