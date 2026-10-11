import {Wallet,CalendarDays,Target,HeartPulse,ShieldCheck} from 'lucide-react';import Card from '../../components/ui/Card.jsx';import Num from '../../components/ui/Num.jsx';import Delta from '../../components/ui/Delta.jsx';
import {tier,risk} from '../../core/engine.js';import {inr} from '../../core/format.js';
const Tile=({I,label,color,children})=><Card className="flex flex-col gap-1"><div className="flex items-center justify-between text-sm text-indigo-100/70">{label}<I size={18} color={color}/></div>{children}</Card>;
export default function StatCards({st,r}){const T=tier(r.health),R=risk(r.survival),g=r.goals[0],pace=r.pace;
 return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
  <Tile I={Wallet} label="Total balance" color="#34d399"><p className="text-3xl font-bold"><Num pre="₹" v={st.balance}/></p><div className="h-1.5 rounded bg-white/10"><div className="h-full rounded bg-emerald-400" style={{width:`${Math.min(100,st.balance/100)}%`}}/></div><p className="text-xs text-white/70">of ₹10,000 · +{inr(r.inflow)} incoming</p></Tile>
  <Tile I={CalendarDays} label="Safe daily spend" color="#a78bfa"><p className="text-3xl font-bold"><Num pre="₹" v={r.sds}/></p><p className="text-xs text-white/75">per day · your pace {inr(pace)}<Delta v={r.sds-pace} pre="₹"/></p></Tile>
  <Tile I={Target} label={g.name} color="#38bdf8"><p className="text-3xl font-bold">{inr(g.saved)}</p><p className="text-xs text-white/75">of {inr(g.target)} · {Math.round(g.saved/g.target*100)}%</p></Tile>
  <Tile I={HeartPulse} label="Financial health" color={T.c}><p className="text-3xl font-bold" style={{color:T.c}}><Num v={r.health}/><span className="text-base text-white/70">/100</span></p><p className="text-xs" style={{color:T.c}}>{T.n}</p></Tile>
  <Tile I={ShieldCheck} label="Risk level" color={R.c}><p className="text-3xl font-bold" style={{color:R.c}}>{R.n}</p><p className="text-xs text-white/75">{r.survival.toFixed(0)}% reach Day 30</p></Tile></div>}
