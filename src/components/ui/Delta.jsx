import {motion} from 'framer-motion';
/** Animated ▲/▼ chip. good=1 → up is good, good=-1 → down is good. */
export default function Delta({v,suf='',pre='',dec=0,good=1}){if(!Number.isFinite(v)||Math.abs(v)<Math.pow(10,-dec)/2)return null;const ok=v*good>0;
 return <motion.span key={Math.round(v*10)} initial={{scale:.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:400,damping:18}}
  className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${ok?'bg-emerald-400/15 text-emerald-300':'bg-rose-500/20 text-rose-300'}`}>{v>0?'▲':'▼'} {pre}{Math.abs(v).toFixed(dec)}{suf}</motion.span>}
