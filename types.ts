export interface ChartDataPoint {
  time: string;
  inlet: number;
  outlet: number;
  load?: number;
}

export interface PumpStatus {
  id: number;
  name: string;
  current: number;
  status: 'running' | 'stopped' | 'warning';
}

export interface SystemMetrics {
  efficiencyT1: number;
  efficiencyT2: number;
  phT1: number;
  phT2: number;
  slurrySupplyT1: number;
  slurrySupplyT2: number;
  valveOpenT1: number;
  valveOpenT2: number;
  levelT1: number;
  levelT2: number;
  densityT1: number;
  densityT2: number;
  airFlowT1: number;
  airFlowT2: number;
  load: number;
  so2Inlet: number;
  so2Outlet: number;
}