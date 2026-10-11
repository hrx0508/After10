import {motion} from 'framer-motion';
export default function Card({children,className='',...p}){return <motion.div {...p} className={`glass relative p-5 ${className}`}>{children}</motion.div>}
