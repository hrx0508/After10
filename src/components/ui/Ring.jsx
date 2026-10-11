import {motion} from 'framer-motion';
export default function Ring({v,color,size=130,stroke=11,children}){const R=(size-stroke)/2,C=2*Math.PI*R,p=Math.min(1,Math.max(0,v||0));
 return <div className="relative grid place-items-center" style={{width:size,height:size}}>
  <svg width={size} height={size} className="absolute -rotate-90"><circle cx={size/2} cy={size/2} r={R} stroke="rgba(255,255,255,.08)" strokeWidth={stroke} fill="none"/>
  <motion.circle cx={size/2} cy={size/2} r={R} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={C} initial={{strokeDashoffset:C}} animate={{strokeDashoffset:C*(1-p),stroke:color}} transition={{type:'spring',stiffness:60,damping:16}} style={{filter:`drop-shadow(0 0 7px ${color})`}}/></svg>
  <div className="text-center">{children}</div></div>}
