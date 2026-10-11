import {motion} from 'framer-motion';import Card from '../../components/ui/Card.jsx';import {tier} from '../../core/engine.js';
export default function HealthBreakdown({r}){const T=tier(r.health),worst=[...r.parts].sort((a,b)=>a.s/a.max-b.s/b.max)[0];
 return <Card><h3 className="mb-3 font-bold">Financial health breakdown</h3>{r.parts.map(p=><div key={p.k} className="mb-3"><div className="flex justify-between text-sm"><span>{p.k}</span><b>{Math.round(p.s/p.max*100)}%</b></div>
  <div className="my-1 h-1.5 rounded bg-white/10"><motion.div className="h-full rounded" style={{background:T.c}} animate={{width:`${p.s/p.max*100}%`}}/></div><p className="text-xs text-white/70">{p.why}</p></div>)}
  <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs text-amber-100"><b>Why it changed:</b> {worst.k} is your weakest area. {worst.why}</p></Card>}
