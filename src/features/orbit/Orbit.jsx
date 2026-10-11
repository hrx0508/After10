import {useMemo,useState} from 'react';import {motion} from 'framer-motion';import Card from '../../components/ui/Card.jsx';import PageHead from '../../components/ui/PageHead.jsx';
import {useFinance} from '../../store/useFinance.js';import {useSim} from '../../hooks/useSim.js';import {inr} from '../../core/format.js';
/** Finances as a solar system: sun = balance, planets = goals, moons = subscriptions, asteroid = a purchase you're considering. */
export default function Orbit(){const st=useFinance(),[amt,setAmt]=useState(0),decs=useMemo(()=>amt?[{amount:amt,day:st.day}]:[],[amt,st.day]),r=useSim(decs),C=300,sun=26+Math.max(0,r.end)/10000*50;
 const rad=eta=>Number.isFinite(eta)?Math.min(250,95+eta*2.2):250;
 return <div><PageHead title="Orbit" sub="Drag a purchase into the system. Watch planets drift away from the sun."/>
 <Card><svg viewBox="0 0 600 600" className="mx-auto max-h-[560px] w-full" role="img" aria-label="Solar system of your finances">
  {[100,160,220].map(x=><circle key={x} cx={C} cy={C} r={x} fill="none" stroke="rgba(129,140,248,.12)"/>)}
  <motion.circle cx={C} cy={C} animate={{r:sun}} fill="#fbbf24" style={{filter:'drop-shadow(0 0 24px #f59e0b)'}}/><text x={C} y={C+4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1200">{inr(st.balance)}</text>
  {st.subs.map((s,i)=><g key={s.id} className="spin" style={{'--d':`${6+i*2}s`,opacity:s.active?1:.25}}><circle cx={C+sun+16+i*9} cy={C} r={3+s.amount/60} fill="#a78bfa"/></g>)}
  {r.goals.map((g,i)=><g key={g.id} className="spin" style={{'--d':`${22+i*10}s`}}><motion.circle animate={{cx:C+rad(g.eta)}} cy={C} r={10+g.saved/g.target*14} fill={g.eta<=g.within?'#38bdf8':'#fb7185'} style={{filter:'drop-shadow(0 0 8px #38bdf8)'}}/></g>)}
  {amt>0&&<motion.circle animate={{cx:C-260+amt/5000*180}} cy={C-160} r={9+amt/500} fill="#94a3b8" initial={false}/>}</svg>
  <div className="mx-auto max-w-md"><input type="range" min={0} max={5000} step={100} value={amt} onChange={e=>setAmt(+e.target.value)} className="w-full" aria-label="Purchase amount"/>
   <p className="text-center text-sm">{amt?<>Asteroid: <b>{inr(amt)}</b> · {r.goals.map(g=>`${g.name} ETA ${Number.isFinite(g.eta)?g.eta+'d':'never'}`).join(' · ')}</>:'Slide to send a purchase toward your system.'}</p></div></Card></div>}
