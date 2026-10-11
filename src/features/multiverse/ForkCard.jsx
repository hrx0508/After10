import {motion} from 'framer-motion';import Card from '../../components/ui/Card.jsx';import Delta from '../../components/ui/Delta.jsx';import {risk} from '../../core/engine.js';import {inr} from '../../core/format.js';
const Row=({l,children})=><div className="flex items-center justify-between"><dt className="text-white/75">{l}</dt><dd>{children}</dd></div>;
export default function ForkCard({f,r,base,selected,onSelect,onDiscard}){const R=risk(r.survival),g0=base.goals[0],g1=r.goals[0],delay=Number.isFinite(g1.eta)&&Number.isFinite(g0.eta)?g1.eta-g0.eta:null,days=f.amount/Math.max(1,base.sds);
 return <Card layout onClick={onSelect} initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.5,filter:'blur(8px)'}} className="cursor-pointer" style={{borderColor:selected?f.color:f.color+'44',boxShadow:selected?`0 0 40px ${f.color}44`:'none'}}>
  <p className="font-bold" style={{color:f.color}}>{f.title}</p><p className="text-2xl font-bold">{inr(f.amount)}</p><p className="text-xs text-white/70">{f.label} · Day {f.day}</p>
  <dl className="mt-3 space-y-2 text-sm"><Row l="Safe daily spend">{inr(r.sds)}<Delta v={(r.sds-base.sds)/Math.max(1,Math.abs(base.sds))*100} suf="%"/></Row>
   <Row l="Month-end balance">{inr(r.end)}<Delta v={(r.end-base.end)/Math.max(1,Math.abs(base.end))*100} suf="%"/></Row>
   <Row l={`${g0.name} ETA`}>{Number.isFinite(g1.eta)?`${g1.eta}d`:'never'}{delay!=null&&<Delta v={delay} suf="d" good={-1}/>}</Row>
   <Row l="Health">{r.health}<Delta v={r.health-base.health}/></Row></dl>
  <p className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold" style={{background:R.c+'22',color:R.c}}>Risk: {R.n}</p>
  <p className="mt-3 rounded-xl bg-black/30 p-3 text-xs text-white/70">Regret meter: this costs <b>{days.toFixed(1)} days</b> of safe spending{delay>0?` and delays ${g0.name} by ${delay} days`:''}.</p>
  <button className="mt-2 text-xs text-white/70 underline" onClick={e=>{e.stopPropagation();onDiscard()}}>Dissolve this timeline</button></Card>}
