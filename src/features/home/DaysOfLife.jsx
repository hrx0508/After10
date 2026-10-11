import {useState} from 'react';import Card from '../../components/ui/Card.jsx';import Ring from '../../components/ui/Ring.jsx';import Num from '../../components/ui/Num.jsx';import Delta from '../../components/ui/Delta.jsx';import {inr} from '../../core/format.js';
/** Prices as survival time. */
export default function DaysOfLife({r}){const [p,setP]=useState(499),cost=p/r.pace,after=r.runway-cost;
 return <Card><h3 className="mb-1 font-bold">Days of life</h3><p className="mb-3 text-xs text-white/70">Price any item in survival time.</p>
  <div className="flex items-center gap-4"><Ring v={r.runway/r.left/1.5} color={r.runway>=r.left?'#38bdf8':'#fb7185'} size={110}><Num v={r.runway} dec={1} className="text-2xl font-bold"/><p className="text-[10px] text-white/70">days runway</p></Ring>
   <div className="flex-1"><input type="range" min={50} max={5000} step={50} value={p} onChange={e=>setP(+e.target.value)} className="w-full" aria-label="Price"/><p className="mt-1 text-sm">{inr(p)} = <b>{cost.toFixed(1)} days</b> of your life</p>
    <p className="text-xs text-white/75">Runway becomes {after.toFixed(1)} days<Delta v={-cost} dec={1} suf="d"/></p></div></div></Card>}
