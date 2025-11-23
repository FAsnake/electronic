import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatRow, MetricCard } from './components/StatBox';
import { TowerChart, LoadChart } from './components/Charts';
import { ProcessDiagram } from './components/ProcessDiagram';
import { SystemMetrics, ChartDataPoint } from './types';
import { INITIAL_CHART_DATA, PUMPS_T1, PUMPS_T2 } from './constants';
import { Droplets, Wind, Activity, Gauge, Zap, Waves, Factory } from 'lucide-react';

const App: React.FC = () => {
  // System State
  const [metrics, setMetrics] = useState<SystemMetrics>({
    efficiencyT1: 87.7,
    efficiencyT2: 83.4,
    phT1: 5.44,
    phT2: 6.29,
    slurrySupplyT1: 13.2,
    slurrySupplyT2: 7.3,
    valveOpenT1: 25,
    valveOpenT2: 26.6,
    levelT1: 11.12,
    levelT2: 8.79,
    densityT1: 1.09,
    densityT2: 1.02,
    airFlowT1: 9766.8,
    airFlowT2: 4946,
    load: 378,
    so2Inlet: 1719.7,
    so2Outlet: 25.8
  });

  const [chartData, setChartData] = useState<ChartDataPoint[]>(INITIAL_CHART_DATA);
  const [mounted, setMounted] = useState(false);

  // Simulation Loop
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      // Jitter values to simulate live data
      setMetrics(prev => ({
        ...prev,
        load: Math.max(300, Math.min(450, prev.load + (Math.random() - 0.5) * 10)),
        so2Inlet: Math.max(1500, Math.min(2000, prev.so2Inlet + (Math.random() - 0.5) * 50)),
        so2Outlet: Math.max(15, Math.min(40, prev.so2Outlet + (Math.random() - 0.5) * 2)),
        efficiencyT1: Math.min(99.9, prev.efficiencyT1 + (Math.random() - 0.5) * 0.1),
        levelT1: Math.max(10, Math.min(12, prev.levelT1 + (Math.random() - 0.5) * 0.05)),
        levelT2: Math.max(8, Math.min(10, prev.levelT2 + (Math.random() - 0.5) * 0.05)),
        airFlowT1: prev.airFlowT1 + (Math.random() - 0.5) * 100,
      }));

      // Update Charts
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setChartData(prev => {
        const newData = [...prev.slice(1), {
          time: timeStr,
          inlet: 1700 + Math.random() * 200,
          outlet: 20 + Math.random() * 10,
          load: 370 + Math.random() * 20
        }];
        return newData;
      });

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="w-full h-screen bg-slate-950 flex items-center justify-center text-cyan-500">Initializing System...</div>;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col overflow-hidden text-slate-200 selection:bg-cyan-500/30">
      <Header />
      
      {/* Main Content Grid */}
      <main className="flex-1 p-2 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT COLUMN: KEY METRICS */}
        <section className="lg:col-span-3 flex flex-col gap-2 h-full overflow-y-auto pr-1 custom-scrollbar">
          {/* Efficiency Cards */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-slate-900/50 border border-cyan-500/30 p-3 rounded-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-400 opacity-50"></div>
               <div className="text-slate-400 text-xs uppercase mb-1">T1 Desulf Eff.</div>
               <div className="text-2xl font-digital text-cyan-300">{metrics.efficiencyT1.toFixed(1)}<span className="text-sm">%</span></div>
               <Gauge className="absolute bottom-2 right-2 text-cyan-900 opacity-50" size={24}/>
            </div>
            <div className="bg-slate-900/50 border border-cyan-500/30 p-3 rounded-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-400 opacity-50"></div>
               <div className="text-slate-400 text-xs uppercase mb-1">T2 Desulf Eff.</div>
               <div className="text-2xl font-digital text-cyan-300">{metrics.efficiencyT2.toFixed(1)}<span className="text-sm">%</span></div>
               <Gauge className="absolute bottom-2 right-2 text-cyan-900 opacity-50" size={24}/>
            </div>
          </div>

          {/* pH Cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
             <div className="bg-slate-900/50 border border-emerald-500/30 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-emerald-900/50 text-emerald-300 px-1 rounded border border-emerald-700">PH Set</span>
                </div>
                <div className="text-center my-2">
                    <div className="text-emerald-400 text-2xl font-digital font-bold">{metrics.phT1.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500">Ref: 4.99</div>
                </div>
                <div className="text-center text-[10px] text-slate-400">T1 pH Value</div>
             </div>
             <div className="bg-slate-900/50 border border-emerald-500/30 p-3 rounded-lg">
                <div className="text-center my-6">
                    <div className="text-emerald-400 text-2xl font-digital font-bold">{metrics.phT2.toFixed(2)}</div>
                </div>
                <div className="text-center text-[10px] text-slate-400">T2 pH Value</div>
             </div>
          </div>

          {/* List Metrics */}
          <div className="flex flex-col gap-1">
            <StatRow label="T1 Slurry Supply" value={metrics.slurrySupplyT1} unit="m³/h" icon={Droplets} subValue="6.14 m³/h" />
            <StatRow label="T2 Slurry Supply" value={metrics.slurrySupplyT2} unit="m³/h" icon={Droplets} />
            <StatRow label="T1 Valve Open" value={metrics.valveOpenT1} unit="%" icon={Activity} color="text-emerald-400"/>
            <StatRow label="T2 Valve Open" value={metrics.valveOpenT2} unit="%" icon={Activity} color="text-emerald-400"/>
            
            <div className="mt-4 pt-4 border-t border-slate-800">
              <StatRow label="T1 Absorp Level" value={metrics.levelT1.toFixed(2)} unit="m" icon={Waves} subValue="10.91 m" />
              <StatRow label="T2 Absorp Level" value={metrics.levelT2.toFixed(2)} unit="m" icon={Waves} />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <StatRow label="T1 Slurry Density" value={metrics.densityT1} unit="g/cm³" icon={Droplets} color="text-yellow-400" />
              <StatRow label="T2 Slurry Density" value={metrics.densityT2} unit="g/cm³" icon={Droplets} color="text-yellow-400"/>
            </div>

             <div className="mt-4 pt-4 border-t border-slate-800">
              <StatRow label="T1 Air Flow" value={metrics.airFlowT1.toFixed(1)} unit="Nm³/h" icon={Wind} />
              <StatRow label="T2 Air Flow" value={metrics.airFlowT2.toFixed(0)} unit="Nm³/h" icon={Wind} />
            </div>
          </div>
        </section>

        {/* CENTER COLUMN: VISUALIZATION */}
        <section className="lg:col-span-6 flex flex-col gap-4 h-full">
           {/* Top Big Metrics */}
           <div className="grid grid-cols-3 gap-4">
              <MetricCard 
                title="Unit Load" 
                value={Math.round(metrics.load)} 
                unit="MW" 
                subtext="Generator"
                icon={<Zap size={24}/>}
              />
               <MetricCard 
                title="Inlet SO2" 
                value={Math.round(metrics.so2Inlet)} 
                unit="mg/m³" 
                subtext="Raw Gas"
                icon={<Factory size={24}/>}
              />
               <MetricCard 
                title="Outlet SO2" 
                value={metrics.so2Outlet} 
                unit="mg/m³" 
                subtext="Clean Gas"
                icon={<Wind size={24}/>}
              />
           </div>

           {/* Process Diagram Area */}
           <div className="flex-1 bg-[#0b1120] border border-slate-800 rounded-xl relative overflow-hidden group">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#155e75 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Labels overlaying the diagram */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="px-2 py-1 bg-slate-800/80 text-xs text-slate-300 border border-slate-600 rounded backdrop-blur-md">#1 Unit ▼</span>
              </div>

              {/* The Diagram */}
              <ProcessDiagram level1={metrics.levelT1} level2={metrics.levelT2} />
           </div>

           {/* Bottom Load Chart */}
           <div className="h-48">
              <LoadChart data={chartData} />
           </div>
        </section>

        {/* RIGHT COLUMN: CHARTS & CONTROL */}
        <section className="lg:col-span-3 flex flex-col gap-4 h-full">
            {/* Chart 1 */}
            <div className="h-48">
                <TowerChart 
                    data={chartData} 
                    title="T1 SO2 Concentration" 
                    colorInlet="#22d3ee" 
                    colorOutlet="#34d399" 
                />
            </div>

            {/* Chart 2 */}
            <div className="h-48">
                <TowerChart 
                    data={chartData} 
                    title="T2 SO2 Concentration" 
                    colorInlet="#22d3ee" 
                    colorOutlet="#facc15" 
                />
            </div>

            {/* Pump Control Panel */}
            <div className="flex-1 bg-slate-900/40 border border-cyan-900/50 rounded-lg flex flex-col overflow-hidden">
                 <div className="p-3 border-b border-cyan-900/50 bg-cyan-950/20 flex justify-between items-center">
                    <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                        <Activity size={16} /> Circulation Plan
                    </h3>
                    <div className="text-[10px] text-slate-400">Auto-Efficiency: <span className="text-emerald-400">82%</span></div>
                 </div>
                 
                 <div className="p-4 flex-1 overflow-y-auto">
                    <div className="flex justify-between mb-4 text-sm">
                        <div className="text-slate-400">Running: <span className="text-white font-bold font-digital text-lg">2+1</span></div>
                        <div className="text-slate-400">Proposal: <span className="text-emerald-400 font-bold font-digital text-lg">2+1</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="text-center text-xs text-slate-500 mb-2 border-b border-slate-800 pb-1">Tower 1</div>
                        <div className="text-center text-xs text-slate-500 mb-2 border-b border-slate-800 pb-1">Tower 2</div>

                        {/* Pump Rows */}
                        {PUMPS_T1.map((pump, idx) => (
                            <React.Fragment key={`row-${idx}`}>
                                {/* T1 Pump */}
                                <div className="flex items-center justify-between bg-slate-800/30 p-2 rounded border border-slate-700/50">
                                    <span className="text-xs text-slate-300">{pump.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${pump.status === 'running' ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-slate-600'}`}></div>
                                        <span className={`text-xs font-digital w-10 text-right ${pump.status === 'running' ? 'text-emerald-400' : 'text-slate-500'}`}>
                                            {pump.current.toFixed(1)}A
                                        </span>
                                    </div>
                                </div>

                                {/* T2 Pump */}
                                <div className="flex items-center justify-between bg-slate-800/30 p-2 rounded border border-slate-700/50">
                                    <span className="text-xs text-slate-300">{PUMPS_T2[idx].name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${PUMPS_T2[idx].status === 'running' ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-slate-600'}`}></div>
                                        <span className={`text-xs font-digital w-10 text-right ${PUMPS_T2[idx].status === 'running' ? 'text-emerald-400' : 'text-slate-500'}`}>
                                            {PUMPS_T2[idx].current.toFixed(1)}A
                                        </span>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mt-4 p-2 bg-cyan-900/10 border border-cyan-800/30 rounded text-[10px] text-cyan-200/60 text-center">
                        System Status: OPTIMAL
                    </div>
                 </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default App;
