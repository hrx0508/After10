import {useState} from 'react';import {motion} from 'framer-motion';import Card from '../../components/ui/Card.jsx';import PageHead from '../../components/ui/PageHead.jsx';import Btn from '../../components/ui/Btn.jsx';
import ForecastChart from '../../components/charts/ForecastChart.jsx';import WeatherStrip from './WeatherStrip.jsx';import {WX} from './weatherMeta.js';
import {useFinance} from '../../store/useFinance.js';import {useSim,useForkRows} from '../../hooks/useSim.js';import {inr} from '../../core/format.js';
export default function Weather(){const st=useFinance(),base=useSim(),rows=useForkRows(),[sel,setSel]=useState('reality'),[pick,setPick]=useState(st.day);
 const cur=sel==='reality'?base:rows.find(x=>x.f.id===sel)?.r||base,i=Math.max(0,pick-st.day),low=Math.min(...cur.curve),shield=Math.max(0,low),absorb=low>=1000,w=WX[cur.weather[i]];
 const here=[...st.commitments,...st.subs.filter(s=>s.active)].filter(b=>b.day===pick),inc=st.income.filter(x=>x.day===pick);
 return <div><PageHead title="Money Weather" sub="Your next 30 days, read like a forecast. Bills are fronts, shocks are storms."/>
 <div className="mb-4 flex flex-wrap gap-2"><Btn v={sel==='reality'?'primary':'ghost'} onClick={()=>setSel('reality')}>Reality</Btn>{rows.map(({f})=><Btn key={f.id} onClick={()=>setSel(f.id)} style={sel===f.id?{background:f.color,color:'#000'}:{}}>{f.title}</Btn>)}</div>
 <Card><WeatherStrip sim={cur} day={st.day} base={sel==='reality'?null:base} picked={pick} onPick={setPick}/>
  <motion.div key={pick+sel} initial={{opacity:0}} animate={{opacity:1}} className="mt-4 rounded-xl bg-black/30 p-4 text-sm"><b style={{color:w.c}}>Day {pick}: {w.n}.</b> Projected balance {inr(cur.curve[i])} — {((cur.curve[i]-cur.reserve)/cur.pace).toFixed(1)} days of cushion after goal money.
   {here.length>0&&<span> Bills: {here.map(b=>`${b.name} ${inr(b.amount)}`).join(', ')}.</span>}{inc.length>0&&<span className="text-emerald-300"> Money in: {inc.map(b=>`${b.name} ${inr(b.amount)}`).join(', ')}.</span>}</motion.div></Card>
 <div className="mt-5 grid gap-5 lg:grid-cols-3"><Card className="lg:col-span-2"><p className="mb-2 text-sm text-indigo-200/80">Balance forecast with risk range</p><ForecastChart base={base} forks={rows}/></Card>
  <Card><p className="text-sm text-indigo-200/80">Storm shield · lowest projected balance</p><div className="my-4 h-4 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full" animate={{width:`${Math.min(100,shield/2000*100)}%`,background:absorb?'linear-gradient(90deg,#34d399,#38bdf8)':'#fb7185'}}/></div>
   <p className="text-sm">{inr(shield)} of shield. {absorb?'A surprise ₹1,000 expense is absorbed.':'A surprise ₹1,000 expense would break your month.'}</p></Card></div></div>}
