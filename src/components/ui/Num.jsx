import {useEffect,useState} from 'react';import {animate,useMotionValue} from 'framer-motion';
export default function Num({v,pre='',suf='',dec=0,className=''}){const mv=useMotionValue(v),[t,setT]=useState(v);
 useEffect(()=>{const c=animate(mv,v,{type:'spring',stiffness:110,damping:20}),u=mv.on('change',setT);return()=>{c.stop();u()}},[v]);
 return <span className={className}>{pre}{(Number.isFinite(t)?t:0).toLocaleString('en-IN',{maximumFractionDigits:dec,minimumFractionDigits:dec})}{suf}</span>}
