import {PiggyBank,Settings2} from 'lucide-react';import GlassCard from '../../components/ui/GlassCard.jsx';import SectionTitle from '../../components/ui/SectionTitle.jsx';import ProgressBar from '../../components/ui/ProgressBar.jsx';import Button from '../../components/ui/Button.jsx';
import {useFin} from '../../store/index.js';import {useSim,useScenarioRows} from '../../hooks/useSim.js';import {inr} from '../../engine/format.js';
export default function SavingsGoalCard(){const open=useFin(s=>s.openModal),selFork=useFin(s=>s.selFork),base=useSim(),rows=useScenarioRows(),g=base.goals[0],f=rows.find(x=>x.f.id===selFork),delay=f?f.r.goals[0].eta-g.eta:0;
 return <GlassCard className="h-full"><SectionTitle icon={PiggyBank} color="#22d3a0" title="Savings Goal" sub="Your future self will thank you."/>
  <p className="font-bold">{g.name}</p><div className="my-2 flex items-center gap-3"><ProgressBar v={g.saved/g.target}/><span className="text-xs text-white/55">{inr(g.target)}</span></div>
  <p className="text-xs text-white/70">Saved {inr(g.saved)} <span className="text-white/30">|</span> To go {inr(g.target-g.saved)}</p>
  <p className="mt-3 rounded-lg bg-black/25 px-3 py-2 text-xs">Estimated delay: <b className={delay>0?'text-rose-300':'text-emerald-300'}>{Number.isFinite(delay)?(delay>0?`${delay} days`:'None'):'Never'}</b>{f?` if you choose ${f.f.title}`:''}</p>
  <Button variant="ghost" icon={Settings2} className="mt-3 w-full" onClick={()=>open('goal',{id:g.id})}>Adjust Goal</Button></GlassCard>}
