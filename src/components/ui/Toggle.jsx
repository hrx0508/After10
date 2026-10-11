import {motion} from 'framer-motion';
export default function Toggle({on,onChange,label}){return <button role="switch" aria-checked={on} aria-label={label} onClick={onChange} className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${on?'bg-violet-500 justify-end':'bg-white/15 justify-start'}`}>
 <motion.span layout transition={{type:'spring',stiffness:500,damping:30}} className="h-5 w-5 rounded-full bg-white shadow"/></button>}
