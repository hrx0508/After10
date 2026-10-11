import {useState} from 'react';import {motion} from 'framer-motion';import {inr} from '../../core/format.js';
const W=640,H=260,P={l:52,r:12,t:12,b:24};
/** Dependency-free SVG chart: Reality line, p10–p90 risk fan, one dashed line per fork. */
export default function ForecastChart({base,forks=[],height=260}){const [h,setH]=useState(null),n=base.band.length;
 const all=[...base.band.flatMap(b=>[b.lo,b.hi]),...base.curve,...forks.flatMap(({r})=>r.curve),0],mx=Math.max(...all),mn=Math.min(...all),step=(W-P.l-P.r)/Math.max(1,n-1);
 const X=i=>P.l+i*step,Y=v=>P.t+(mx-v)/(mx-mn||1)*(H-P.t-P.b),L=c=>c.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join('');
 const area=L(base.band.map(b=>b.hi))+base.band.map((b,i)=>`L${X(n-1-i).toFixed(1)},${Y(base.band[n-1-i].lo).toFixed(1)}`).join('')+'Z';
 const ticks=[0,1,2,3].map(i=>mn+(mx-mn)*i/3),i=h??0,b=base.band[i];
 const move=e=>{const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W;setH(Math.max(0,Math.min(n-1,Math.round((x-P.l)/step))))};
 return <div><svg viewBox={`0 0 ${W} ${H}`} style={{height}} className="w-full touch-pan-y" role="img" onPointerMove={move} onPointerLeave={()=>setH(null)}
   aria-label={`Balance forecast from day ${base.band[0].day} to 30. Reality ends at ${inr(base.end)}. Likely range on day 30: ${inr(b.lo)} to ${inr(b.hi)}.`}>
  <defs><linearGradient id="fan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8" stopOpacity=".4"/><stop offset="100%" stopColor="#7c5cff" stopOpacity=".06"/></linearGradient></defs>
  {ticks.map(t=><g key={t}><line x1={P.l} x2={W-P.r} y1={Y(t)} y2={Y(t)} stroke="rgba(148,163,255,.1)"/><text x={P.l-6} y={Y(t)+4} textAnchor="end" fontSize="10" fill="#a5b0e0">₹{Math.round(t)}</text></g>)}
  <line x1={P.l} x2={W-P.r} y1={Y(0)} y2={Y(0)} stroke="#fb7185" strokeDasharray="4 4"/><text x={W-P.r} y={Y(0)-4} textAnchor="end" fontSize="10" fill="#fb7185">₹0</text>
  <path d={area} fill="url(#fan)"/>
  <motion.path d={L(base.curve)} fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.8}}/>
  {forks.map(({f,r})=><motion.path key={f.id} d={L(r.curve)} fill="none" stroke={f.color} strokeWidth="2.5" strokeDasharray="6 4" initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:1}} transition={{duration:.8}}/>)}
  {h!=null&&<line x1={X(h)} x2={X(h)} y1={P.t} y2={H-P.b} stroke="#fff" strokeOpacity=".4"/>}
  {[0,Math.floor((n-1)/2),n-1].map(k=><text key={k} x={X(k)} y={H-6} textAnchor="middle" fontSize="10" fill="#a5b0e0">Day {base.band[k].day}</text>)}</svg>
  <p className="mt-1 min-h-5 text-xs text-white/75">Day {b.day} · Reality {inr(base.curve[i])} · likely {inr(b.lo)}–{inr(b.hi)}{forks.map(({f,r})=><span key={f.id} style={{color:f.color}}> · {f.title} {inr(r.curve[i])}</span>)}</p></div>}
