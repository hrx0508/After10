import {motion,AnimatePresence} from 'framer-motion';import {X} from 'lucide-react';
export default function Modal({open,onClose,title,children}){return <AnimatePresence>{open&&<motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
 <motion.div onClick={e=>e.stopPropagation()} initial={{y:30,scale:.95}} animate={{y:0,scale:1}} exit={{y:20,scale:.95}} className="glass w-full max-w-md p-6">
  <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><button onClick={onClose} aria-label="Close"><X size={20}/></button></div>{children}</motion.div></motion.div>}</AnimatePresence>}
