import React from 'react';

export const ProcessDiagram: React.FC<{ level1: number, level2: number }> = ({ level1, level2 }) => {
  // Map simulation levels (approx 10-12m) to SVG liquid heights
  const h1 = Math.max(10, Math.min(90, level1 * 6)); 
  const h2 = Math.max(10, Math.min(90, level2 * 7));

  return (
    <div className="w-full h-full relative flex items-center justify-center p-2 select-none">
        <svg viewBox="0 0 1000 600" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
            <defs>
                {/* 3D Metallic Body Gradient */}
                <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#334155" /> 
                    <stop offset="20%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="80%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                
                {/* Darker Metal for Pipes */}
                <linearGradient id="metalPipe" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                 {/* Horizontal Pipe Gradient */}
                 <linearGradient id="metalPipeH" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Liquid Gradient (Teal/Greenish) */}
                <linearGradient id="liquidGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.8"/>
                </linearGradient>

                {/* Glass/Water Effect overlay */}
                <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.0"/>
                    <stop offset="20%" stopColor="white" stopOpacity="0.1"/>
                    <stop offset="50%" stopColor="white" stopOpacity="0.3"/>
                    <stop offset="80%" stopColor="white" stopOpacity="0.1"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0.0"/>
                </linearGradient>

                <filter id="dropShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.5"/>
                    </feComponentTransfer>
                    <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                </filter>
            </defs>

            {/* --- PIPING CONNECTIONS (Behind Towers) --- */}
            
            {/* T1 Top to T2 Bottom (S-shape) */}
            <path d="M 280 200 L 320 200 L 320 350 L 380 350" fill="none" stroke="url(#metalPipeH)" strokeWidth="35" strokeLinecap="round" filter="url(#dropShadow)" />
            
            {/* T2 Top to ESP (Straight) */}
            <path d="M 530 200 L 640 200" fill="none" stroke="url(#metalPipeH)" strokeWidth="35" filter="url(#dropShadow)" />
            
            {/* ESP to Chimney */}
            <path d="M 760 400 L 820 400" fill="none" stroke="url(#metalPipeH)" strokeWidth="40" filter="url(#dropShadow)" />
            
            {/* Inlet Duct (Far Left) */}
            <path d="M 50 350 L 100 350 L 100 300 L 130 300" fill="none" stroke="url(#metalPipeH)" strokeWidth="40" />
            <text x="40" y="320" fill="#facc15" fontSize="14" fontWeight="bold">SO₂</text>


            {/* --- TOWER 1 (Level 1 Absorption) --- */}
            <g transform="translate(130, 150)">
                {/* Label */}
                <text x="75" y="-20" textAnchor="middle" fill="#facc15" fontSize="18" fontWeight="bold" className="tracking-widest filter drop-shadow-md">一级吸收塔</text>
                
                {/* Cone Top */}
                <path d="M 10 50 L 75 0 L 140 50" fill="url(#metalBody)" />
                
                {/* Main Body */}
                <rect x="10" y="50" width="130" height="200" fill="url(#metalBody)" />
                
                {/* Bottom Liquid Container Base */}
                <path d="M 0 250 L 10 250 L 10 330 Q 75 345 140 330 L 140 250 L 150 250 L 150 340 Q 75 365 0 340 Z" fill="url(#metalBody)" />
                
                {/* Liquid Level Animation */}
                <mask id="maskLiquid1">
                     <rect x="5" y={340 - h1 * 1.5} width="140" height={h1 * 1.5} fill="white" />
                </mask>
                <rect x="0" y="250" width="150" height="100" fill="url(#liquidGlow)" mask="url(#maskLiquid1)" opacity="0.9"/>
                
                {/* Detail Lines (Rings) */}
                <line x1="10" y1="120" x2="140" y2="120" stroke="#475569" strokeWidth="2" opacity="0.5" />
                <line x1="10" y1="180" x2="140" y2="180" stroke="#475569" strokeWidth="2" opacity="0.5" />

                {/* Side Pipes (3 lances) */}
                <g transform="translate(40, 100)">
                    <path d="M 0 0 L 10 0 L 10 180" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                    <path d="M 25 20 L 35 20 L 35 180" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                    <path d="M 50 40 L 60 40 L 60 180" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                </g>

                {/* Chemical Label */}
                <text x="75" y="300" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="bold" opacity="0.8">CaSO₄·H₂O</text>
                
                {/* O2 Input Arrow */}
                <path d="M -20 300 L 10 300" stroke="#a3e635" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="-35" y="305" fill="#a3e635" fontSize="12">O₂</text>
            </g>


            {/* --- TOWER 2 (Level 2 Absorption) --- */}
            <g transform="translate(380, 150)">
                 {/* Label */}
                 <text x="75" y="-20" textAnchor="middle" fill="#facc15" fontSize="18" fontWeight="bold" className="tracking-widest filter drop-shadow-md">二级吸收塔</text>

                {/* Cone Top */}
                <path d="M 10 50 L 75 0 L 140 50" fill="url(#metalBody)" />
                
                {/* Main Body */}
                <rect x="10" y="50" width="130" height="200" fill="url(#metalBody)" />
                
                {/* Bottom Base */}
                <path d="M 0 250 L 10 250 L 10 330 Q 75 345 140 330 L 140 250 L 150 250 L 150 340 Q 75 365 0 340 Z" fill="url(#metalBody)" />
                
                 {/* Liquid Level */}
                <mask id="maskLiquid2">
                     <rect x="5" y={340 - h2 * 1.5} width="140" height={h2 * 1.5} fill="white" />
                </mask>
                <rect x="0" y="250" width="150" height="100" fill="url(#liquidGlow)" mask="url(#maskLiquid2)" opacity="0.9"/>
                
                 {/* Rings */}
                <line x1="10" y1="120" x2="140" y2="120" stroke="#475569" strokeWidth="2" opacity="0.5" />
                <line x1="10" y1="180" x2="140" y2="180" stroke="#475569" strokeWidth="2" opacity="0.5" />

                 {/* Side Pipes */}
                 <g transform="translate(40, 100)">
                    <path d="M 0 0 L 10 0 L 10 180" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                    <path d="M 25 20 L 35 20 L 35 180" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                    <path d="M 50 40 L 60 40 L 60 180" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                </g>

                 {/* Chemical Label */}
                 <text x="75" y="300" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="bold" opacity="0.8">CaSO₄·H₂O</text>
                 
                 {/* O2 Input Arrow */}
                <path d="M -20 300 L 10 300" stroke="#a3e635" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="-35" y="305" fill="#a3e635" fontSize="12">O₂</text>
            </g>


            {/* --- WET ESP (Electrostatic Precipitator) --- */}
            <g transform="translate(640, 100)">
                 {/* Label */}
                 <text x="80" y="-10" textAnchor="middle" fill="#facc15" fontSize="18" fontWeight="bold" className="tracking-widest filter drop-shadow-md">湿式电除尘器</text>

                 {/* Main Box */}
                 <rect x="0" y="20" width="160" height="180" fill="url(#metalBody)" stroke="#475569" strokeWidth="1"/>
                 
                 {/* Top Exhausts (small pipes) */}
                 <rect x="20" y="0" width="20" height="20" fill="#94a3b8" />
                 <rect x="60" y="0" width="20" height="20" fill="#94a3b8" />
                 <rect x="100" y="0" width="20" height="20" fill="#94a3b8" />
                 
                 {/* Bottom Hopper */}
                 <path d="M 0 200 L 60 280 L 100 280 L 160 200 Z" fill="url(#metalBody)" />
                 
                 {/* Lower Exit Pipe */}
                 <rect x="65" y="280" width="30" height="40" fill="#64748b" />

                 {/* Ribs / Texture */}
                 <line x1="0" y1="60" x2="160" y2="60" stroke="#475569" strokeWidth="1" opacity="0.3" />
                 <line x1="0" y1="100" x2="160" y2="100" stroke="#475569" strokeWidth="1" opacity="0.3" />
                 <line x1="0" y1="140" x2="160" y2="140" stroke="#475569" strokeWidth="1" opacity="0.3" />
                 
                 {/* Horizontal Support Beams shown in image */}
                 <rect x="-10" y="150" width="180" height="10" fill="#334155" />
                 <rect x="-10" y="220" width="180" height="10" fill="#334155" />
                 
                 {/* Top Label for SO2 leaving */}
                 <text x="-20" y="50" fill="#facc15" fontSize="12" opacity="0.8">SO₂</text>
            </g>

            {/* --- CHIMNEY --- */}
            <g transform="translate(820, 50)">
                 {/* Tall Cone */}
                 <path d="M 60 0 L 120 450 L 0 450 Z" fill="url(#liquidGlow)" fillOpacity="0.4" />
                 <path d="M 60 0 L 120 450 L 0 450 Z" fill="url(#glassShine)" />
                 
                 {/* Rim at bottom */}
                 <rect x="-10" y="450" width="140" height="20" rx="5" fill="#22d3ee" fillOpacity="0.5" />
                 
                 {/* Smoke/Clean Gas */}
                 <path d="M 60 0 Q 80 -50 40 -100 Q 0 -150 60 -200" stroke="white" strokeWidth="0" fill="none" opacity="0.2">
                    <animate attributeName="stroke-width" values="0;20;40;0" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.3;0" dur="4s" repeatCount="indefinite" />
                 </path>
            </g>

            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#a3e635" />
                </marker>
            </defs>

        </svg>
    </div>
  );
};