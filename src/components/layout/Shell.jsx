import {useEffect,useState} from 'react';import {Outlet,useLocation} from 'react-router-dom';import {motion,AnimatePresence} from 'framer-motion';
import Sidebar from './Sidebar.jsx';import Topbar from './Topbar.jsx';import QuickAddModal from '../../features/quickadd/QuickAddModal.jsx';
import {useFinance} from '../../store/useFinance.js';import {useSim} from '../../hooks/useSim.js';
export default function Shell(){const toast=useFinance(s=>s.toast),r=useSim(),loc=useLocation(),[mode,setMode]=useState(null);
 useEffect(()=>{document.body.style.setProperty('--sky',r.health>=70?'#14307a':r.health>=45?'#6b4a0f':'#6b1427')},[r.health]); // sky mood follows health
 useEffect(()=>{if(toast){const t=setTimeout(()=>useFinance.setState({toast:null}),2800);return()=>clearTimeout(t)}},[toast]);
 return <div className="min-h-screen"><a href="#main" className="skip">Skip to content</a><Sidebar/>
  <main id="main" tabIndex={-1} className="mx-auto outline-none max-w-6xl p-4 pb-24 md:ml-60 md:p-8"><Topbar onOpen={setMode}/>
   <AnimatePresence mode="wait"><motion.div key={loc.pathname} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.25}}><Outlet/></motion.div></AnimatePresence></main>
  <QuickAddModal mode={mode} onClose={()=>setMode(null)}/>
  <AnimatePresence>{toast&&<motion.div key={toast.k} role="status" aria-live="polite" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:30}} className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-xl md:bottom-8">{toast.msg}</motion.div>}</AnimatePresence></div>}
