import {motion,AnimatePresence} from 'framer-motion';import {useEffect} from 'react';import {CheckCircle2} from 'lucide-react';import {useFin} from '../../store/index.js';
export default function Toast(){const toast=useFin(s=>s.toast);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>useFin.setState({toast:null}),2800);return()=>clearTimeout(t)},[toast]);
 return <AnimatePresence>{toast&&<motion.div key={toast.k} initial={{opacity:0,y:30,scale:.9}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:30}} className="fixed bottom-20 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-2xl md:bottom-8"><CheckCircle2 size={16} className="text-emerald-600"/>{toast.msg}</motion.div>}</AnimatePresence>}
