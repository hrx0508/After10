import {motion} from 'framer-motion';import {useMemo} from 'react';import {useFin} from '../../store/index.js';
export default function Burst(){const k=useFin(s=>s.burst),ps=useMemo(()=>Array.from({length:36},()=>({a:Math.random()*6.28,r:60+Math.random()*180,s:3+Math.random()*6,c:['#c084fc','#38bdf8','#f472b6'][Math.floor(Math.random()*3)]})),[k]);
 if(!k||Date.now()-k>1500)return null;
 return <div key={k} className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">{ps.map((p,i)=><motion.i key={i} className="absolute rounded-full" style={{width:p.s,height:p.s,background:p.c}} initial={{x:0,y:0,opacity:1}} animate={{x:Math.cos(p.a)*p.r,y:Math.sin(p.a)*p.r,opacity:0,scale:0}} transition={{duration:1.1,ease:'easeOut'}}/>)}</div>}
