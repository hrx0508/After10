import {useState} from 'react';import {AnimatePresence} from 'framer-motion';import {Play,Check,Trash2,GitBranch} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';import Btn from '../../components/ui/Btn.jsx';import PageHead from '../../components/ui/PageHead.jsx';import ForecastChart from '../../components/charts/ForecastChart.jsx';
import ForkCard from './ForkCard.jsx';import Verdict from './Verdict.jsx';import Ripple from './Ripple.jsx';import {useFinance} from '../../store/useFinance.js';import {useSim,useForkRows} from '../../hooks/useSim.js';import {inr} from '../../core/format.js';
const PRESETS=[['Concert ticket',2500],['Sneakers',2200],['Dinner out',850],['Goa weekend',3500]];
export default function Multiverse(){const st=useFinance(),base=useSim(),rows=useForkRows(),[label,setLabel]=useState('Concert ticket'),[amt,setAmt]=useState(2500),[sel,setSel]=useState(null);
 const chosen=rows.find(x=>x.f.id===sel)||rows[0];
 return <div><PageHead title="Money Multiverse" sub="Fork your month. See every future side by side. Commit one or let it go."/>
 <div className="grid gap-5 lg:grid-cols-[320px_1fr]"><Card><label htmlFor="what" className="mb-2 block text-sm text-indigo-200/85">What are you planning to buy?</label>
   <div className="mb-3 flex flex-wrap gap-2">{PRESETS.map(([l,v])=><Btn key={l} className="!px-3 !py-1 text-xs" onClick={()=>{setLabel(l);setAmt(v)}}>{l}</Btn>)}</div>
   <input id="what" value={label} onChange={e=>setLabel(e.target.value)} className="w-full rounded-xl border border-indigo-300/20 bg-black/30 px-4 py-2.5"/>
   <p className="mt-4 text-right text-2xl font-bold">{inr(amt)}</p><input type="range" min={500} max={5000} step={50} value={amt} onChange={e=>setAmt(+e.target.value)} className="w-full" aria-label="Amount in rupees"/>
   <div className="flex justify-between text-xs text-white/60"><span>₹500</span><span>₹5,000</span></div>
   <Verdict amount={amt}/>
   <Btn v="primary" className="mt-4 w-full" onClick={()=>st.forkThree(label||'Purchase',amt)}><Play size={16}/>Run simulation</Btn>
   <Btn className="mt-2 w-full" disabled={rows.length>=3} onClick={()=>st.forkOne(label||'Purchase',amt)}><GitBranch size={16}/>Add one fork ({rows.length}/3)</Btn></Card>
  <Card><div className="mb-2 flex flex-wrap gap-4 text-xs"><span className="text-indigo-300">● Reality</span>{rows.map(({f})=><span key={f.id} style={{color:f.color}}>● {f.title}</span>)}</div><ForecastChart base={base} forks={rows} height={290}/></Card></div>
 {!rows.length&&<p className="mt-6 text-center text-white/70">No forks yet. Pick a purchase and run the simulation to see what it really costs.</p>}
 <div className="mt-5 grid gap-5 lg:grid-cols-3"><AnimatePresence>{rows.map(({f,r})=><ForkCard key={f.id} f={f} r={r} base={base} selected={chosen?.f.id===f.id} onSelect={()=>setSel(f.id)} onDiscard={()=>st.discard(f.id)}/>)}</AnimatePresence></div>
 {chosen&&<><Ripple base={base} r={chosen.r} title={chosen.f.title}/><div className="mt-5 flex flex-wrap justify-center gap-3"><Btn v="primary" className="min-w-52" onClick={()=>st.merge(chosen.f.id)}><Check size={16}/>Commit "{chosen.f.title}"</Btn><Btn v="danger" className="min-w-40" onClick={()=>st.discard()}><Trash2 size={16}/>Discard all</Btn></div></>}</div>}
