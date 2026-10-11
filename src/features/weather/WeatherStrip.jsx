import {motion} from 'framer-motion';import {WX} from './weatherMeta.js';
/** 30-day forecast calendar. sim = simulation, day = today, base = optional reality sim to flag worsened days. */
export default function WeatherStrip({sim,day,base,picked,onPick}){
 return <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">{Array.from({length:30},(_,x)=>{const d=x+1,j=d-day,past=j<0,w=WX[past?0:sim.weather[j]],worse=!past&&base&&sim.weather[j]>base.weather[j],bill=sim.bills.find(b=>b.day===d);
  return <motion.button key={d} whileHover={{y:-3}} onClick={()=>onPick?.(d)} aria-label={`Day ${d} ${past?'done':w.n}`} className={`relative rounded-xl border p-2 text-center ${picked===d?'border-white':'border-indigo-300/10'} ${past?'opacity-30':''} ${worse?'ring-2 ring-rose-400':''}`} style={{background:past?'transparent':w.bg}}>
   <w.I size={18} color={w.c} className="mx-auto"/><p className="mt-1 text-[10px] text-white/75">Day {d}</p><p className="text-[10px] font-bold" style={{color:w.c}}>{past?'Done':w.n}</p>{bill&&!past&&<span className="absolute -right-1 -top-1 text-xs">{bill.icon}</span>}</motion.button>})}</div>}
