import { ChartDataPoint, PumpStatus } from './types';

export const INITIAL_CHART_DATA: ChartDataPoint[] = Array.from({ length: 20 }, (_, i) => ({
  time: `${10 + Math.floor(i / 2)}:${(i % 2) * 30}`.padStart(5, '0'),
  inlet: 1600 + Math.random() * 400,
  outlet: 150 + Math.random() * 50,
  load: 350 + Math.random() * 50,
}));

export const PUMPS_T1: PumpStatus[] = [
  { id: 1, name: '1 Cycle', current: 0.0, status: 'stopped' },
  { id: 2, name: '2 Cycle', current: 95.9, status: 'running' },
  { id: 3, name: '3 Cycle', current: 102.9, status: 'running' },
];

export const PUMPS_T2: PumpStatus[] = [
  { id: 4, name: '1 Cycle', current: 0.3, status: 'stopped' },
  { id: 5, name: '2 Cycle', current: 0.0, status: 'stopped' },
  { id: 6, name: '3 Cycle', current: 84.1, status: 'running' },
];
