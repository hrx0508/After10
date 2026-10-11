import {Plus} from 'lucide-react';import GlassCard from '../../components/ui/GlassCard.jsx';import ProgressRing from '../../components/ui/ProgressRing.jsx';import Button from '../../components/ui/Button.jsx';import Badge from '../../components/ui/Badge.jsx';
import {useFin} from '../../store/index.js';import {useSim} from '../../hooks/useSim.js';import {inr} from '../../engine/format.js';
export default function GoalList(){const {pace,contribute,openModal}=useFin(),sim=useSim();
 return <div><div className="mb-4 flex justify-end"><Button icon={Plus} onClick={()=>openModal('goal',{})}>New goal</Button></div>
  <div className="grid gap-5 md:grid-cols-2">{sim.goals.map(g=>{const ok=g.eta<=g.within;return <GlassCard key={g.id} className="flex items-center gap-5" glow={ok?'#22d3a0':'#fb7185'}>
   <ProgressRing v={g.saved/g.target} color={ok?'#22d3a0':'#fb7185'} size={110} stroke={10}><b className="text-xl">{Math.round(g.saved/g.target*100)}%</b></ProgressRing>
   <div className="flex-1"><p className="text-lg font-bold">{g.name}</p><p className="text-sm text-white/60">{inr(g.saved)} of {inr(g.target)}</p>
    <div className="mt-2"><Badge color={ok?'#22d3a0':'#fb7185'}>{Number.isFinite(g.eta)?`ETA ${g.eta} days`:'No ETA'} · {ok?'On track':`past ${g.within}-day target`}</Badge></div>
    <p className="mt-1.5 text-xs text-white/50">{inr(g.saved)} saved = {(g.saved/pace).toFixed(0)} days of freedom.</p>
    <div className="mt-3 flex gap-2"><Button variant="ghost" onClick={()=>contribute(g.id,500)}>Add ₹500</Button><Button variant="ghost" onClick={()=>openModal('goal',{id:g.id})}>Adjust</Button></div></div></GlassCard>})}</div></div>}
