import {motion} from 'framer-motion';
export default function GlassCard({children,className='',glow,style,...p}){
 return <motion.div {...p} className={`glass relative overflow-hidden rounded-2xl p-4 ${className}`} style={{...(glow?{boxShadow:`0 0 40px -12px ${glow}`}:{}),...style}}>{children}</motion.div>}
