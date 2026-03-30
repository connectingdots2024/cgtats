'use client';

import { useState } from 'react';
import { 
  Zap, Brain, Cpu, Activity, Settings, Sliders, 
  BarChart3, Shield, AlertTriangle, RefreshCw, 
  Search, Plus, CheckCircle2, XCircle, Info,
  Sparkles, Database, Code, Globe, MessageSquare
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const performanceData = [
  { time: '00:00', accuracy: 92, latentcy: 1.2 },
  { time: '04:00', accuracy: 94, latentcy: 1.1 },
  { time: '08:00', accuracy: 91, latentcy: 1.5 },
  { time: '12:00', accuracy: 95, latentcy: 1.0 },
  { time: '16:00', accuracy: 93, latentcy: 1.3 },
  { time: '20:00', accuracy: 96, latentcy: 0.9 },
  { time: '23:59', accuracy: 94, latentcy: 1.1 },
];

const modelNodes = [
  { id: 'm1', name: 'Neural Scorer v4.2', type: 'Transformer', status: 'Optimal', health: 98, load: 45, nodes: 12, color: 'text-primary' },
  { id: 'm2', name: 'Semantic Parser v3.1', type: 'NLP', status: 'Optimal', health: 95, load: 22, nodes: 8, color: 'text-accent' },
  { id: 'm3', name: 'Predictive Hires v2.0', type: 'Regression', status: 'Warning', health: 82, load: 89, nodes: 4, color: 'text-warning' },
  { id: 'm4', name: 'Outreach Synthesizer', type: 'LLM', status: 'Optimal', health: 99, load: 12, nodes: 6, color: 'text-success' },
];

export default function AIHub() {
  const [temperature, setTemperature] = useState(70);

  return (
    <div className="space-y-10">
      {/* HEADER: Neural Institutional Synergy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Neural Synergy Hub</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">AI Control <span className="text-primary not-italic">Center</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Retrain Strategic Mode
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Manifest Neural Node
           </button>
        </div>
      </div>

      {/* NEURAL NODE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modelNodes.map((node) => (
          <div key={node.id} className="p-8 rounded-[40px] bg-surface border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
             <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl bg-background border border-border ${node.color} group-hover:scale-110 transition-transform shadow-inner`}>
                   <Brain className="w-6 h-6" />
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black italic uppercase tracking-widest ${
                   node.status === 'Optimal' ? 'bg-success/5 text-success border border-success/20' : 'bg-warning/5 text-warning border border-warning/20'
                }`}>
                   {node.status}
                </div>
             </div>
             <p className="text-xl font-black text-white italic tracking-tight uppercase leading-none mb-1">{node.name}</p>
             <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mb-6">{node.type} Architecture</p>
             
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-[10px] font-black text-text-muted uppercase italic mb-1.5">
                      <span>Neural Health</span>
                      <span className="text-white">{node.health}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-background border border-border rounded-full overflow-hidden">
                      <div className={`h-full ${node.health > 90 ? 'bg-success' : 'bg-warning'} transition-all duration-1000`} style={{ width: `${node.health}%` }} />
                   </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                   <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-text-muted" />
                      <span className="text-[10px] font-black text-text-muted uppercase italic">{node.nodes} Nodes</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-text-muted" />
                      <span className="text-[10px] font-black text-text-muted uppercase italic">{node.load}% Load</span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* PERFORMANCE METRICS & CONFIG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Neural Performance</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Accuracy vs Latency Manifest</p>
               </div>
               <div className="flex items-center gap-4 p-1.5 bg-background border border-border rounded-2xl shadow-inner">
                  <button className="px-6 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20">24H Flux</button>
                  <button className="px-6 py-2 rounded-xl text-[10px] font-black text-text-muted uppercase italic tracking-widest hover:text-white transition-colors">7D Manifest</button>
               </div>
            </div>
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#2d3436" vertical={false} />
                     <XAxis stroke="#636e72" fontSize={10} fontWeight="black" tickFormatter={(v) => v.toUpperCase()} axisLine={false} tickLine={false} />
                     <YAxis stroke="#636e72" fontSize={10} fontWeight="black" axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #312e81', borderRadius: '20px', fontSize: '10px', color: '#fff' }}
                        itemStyle={{ fontWeight: 'black', textTransform: 'uppercase' }}
                     />
                     <Line type="monotone" dataKey="accuracy" stroke="#6c5ce7" strokeWidth={4} dot={{ r: 6, fill: '#6c5ce7', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                     <Line type="monotone" dataKey="latentcy" stroke="#a29bfe" strokeWidth={4} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* SYNERGY CONFIG MANIFOLD */}
         <div className="p-10 rounded-[40px] bg-surface border border-border space-y-10">
            <div>
               <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Logic Manifold</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Institutional Tuning</p>
            </div>
            
            <div className="space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] font-black text-white uppercase italic tracking-widest">Neural Temperature</p>
                     <span className="text-[10px] font-black text-primary uppercase italic">{temperature / 100}</span>
                  </div>
                  <input 
                     type="range" 
                     min="0" max="100" 
                     value={temperature} 
                     onChange={(e) => setTemperature(parseInt(e.target.value))}
                     className="w-full accent-primary bg-background h-2 rounded-full border border-border appearance-none cursor-pointer"
                  />
                  <p className="text-[10px] font-bold text-text-muted uppercase italic leading-tight">Controls strategic creativity vs institutional precision.</p>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-black text-white uppercase italic tracking-widest mb-4">Strategic Manifests</p>
                  {[
                    { label: 'Auto-Manifest Scoring', icon: Zap, enabled: true },
                    { label: 'Semantic Enrichment', icon: Sparkles, enabled: true },
                    { label: 'Strategic Outreach', icon: MessageSquare, enabled: false },
                    { label: 'Predictive Attrition', icon: BarChart3, enabled: false },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <s.icon className={`w-4 h-4 ${s.enabled ? 'text-primary' : 'text-text-muted'}`} />
                          <span className="text-[10px] font-black text-white uppercase italic">{s.label}</span>
                       </div>
                       <div className={`w-10 h-5 rounded-full relative transition-colors ${s.enabled ? 'bg-primary' : 'bg-surface-hover'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${s.enabled ? 'left-6 shadow-[0_0_10px_white]' : 'left-1'}`} />
                       </div>
                    </div>
                  ))}
               </div>
               
               <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase italic tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                  Commit Logic Manifest
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
