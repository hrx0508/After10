import {motion} from 'framer-motion';import {useRef,useState,useId} from 'react';import {inr} from '../../engine/format.js';
/** series:[{name,color,data:number[]}] — x index i ↔ day startDay+i */
export default function AreaChart({series,startDay=1,height=240,zeroLine=true}){
 const ref=useRef(),[h,setH]=useState(null),uid=useId().replace(/:/g,''),W=700,H=height,P={l:48,r:12,t:12,b:24},n=Math.max(...series.map(s=>s.data.length));
 const all=series.flatMap(s=>s.data),mx=Math.max(...all,1)*1.05,mn=Math.min(...all,0),X=i=>P.l+i*(W-P.l-P.r)/Math.max(1,n-1),Y=v=>H-P.b-(v-mn)/(mx-mn||1)*(H-P.t-P.b);
 const path=d=>d.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(''),ticks=[0,1,2,3].map(i=>mn+(mx-mn)*i/3);
 const move=e=>{const b=ref.current.getBoundingClientRect(),x=(e.clientX-b.left)/b.width*W;setH(Math.max(0,Math.min(n-1,Math.round((x-P.l)/((W-P.l-P.r)/Math.max(1,n-1))))))};
 return <div className="relative" ref={ref} onPointerMove={move} onPointerLeave={()=>setH(null)}>
  <svg viewBox={`0 0 ${W} ${H}`} className="w-full touch-none"><defs><filter id={uid+'g'}><feGaussianBlur stdDeviation="4"/></filter>
   {series.map((s,i)=><linearGradient key={i} id={uid+i} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={s.color} stopOpacity=".35"/><stop offset="1" stopColor={s.color} stopOpacity="0"/></linearGradient>)}</defs>
   {ticks.map((t,i)=><g key={i}><line x1={P.l} x2={W-P.r} y1={Y(t)} y2={Y(t)} stroke="rgba(255,255,255,.07)"/><text x={P.l-6} y={Y(t)+3} textAnchor="end" fill="#8b93d6" fontSize="10">{inr(t)}</text></g>)}
   {Array.from({length:Math.min(n,8)},(_,i)=>Math.round(i*(n-1)/Math.min(n-1,7||1))).map((i,k)=><text key={k} x={X(i)} y={H-6} textAnchor="middle" fill="#8b93d6" fontSize="10">D{startDay+i}</text>)}
   {zeroLine&&mn<0&&<line x1={P.l} x2={W-P.r} y1={Y(0)} y2={Y(0)} stroke="#f43f5e" strokeDasharray="4 6" opacity=".7"/>}
   {series.map((s,i)=><g key={s.name}>{i===0&&<motion.path d={`${path(s.data)}L${X(s.data.length-1)},${H-P.b}L${X(0)},${H-P.b}Z`} fill={`url(#${uid}${i})`} initial={{opacity:0}} animate={{opacity:1}}/>}
    <motion.path fill="none" stroke={s.color} strokeWidth="8" opacity=".3" filter={`url(#${uid}g)`} initial={{pathLength:0}} animate={{d:path(s.data),pathLength:1}} transition={{duration:.9}}/>
    <motion.path fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" initial={{pathLength:0}} animate={{d:path(s.data),pathLength:1}} transition={{duration:.9}}/></g>)}
   {h!=null&&<g><line x1={X(h)} x2={X(h)} y1={P.t} y2={H-P.b} stroke="#fff" opacity=".35"/>{series.map(s=>s.data[h]!=null&&<circle key={s.name} cx={X(h)} cy={Y(s.data[h])} r="4.5" fill={s.color} stroke="#fff"/>)}</g>}</svg>
  {h!=null&&<div className="pointer-events-none absolute top-2 rounded-xl border border-white/15 bg-navy-900/95 px-3 py-2 text-xs shadow-xl" style={{left:`${Math.min(72,X(h)/W*100)}%`}}>
   <p className="mb-1 font-bold">Day {startDay+h}</p>{series.map(s=>s.data[h]!=null&&<p key={s.name} style={{color:s.color}}>{s.name}: {inr(s.data[h])}</p>)}</div>}</div>}
