import {CalendarDays,Plus,Minus,SkipForward,RotateCcw} from 'lucide-react';import Btn from '../ui/Btn.jsx';import {useFinance} from '../../store/useFinance.js';
export default function Topbar({onOpen}){const {day,nextDay,reset}=useFinance();
 return <header className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 rounded-xl border border-indigo-300/15 bg-white/5 px-3 py-2 text-sm"><CalendarDays size={16}/>Day {day} of 30</div>
  <div className="flex flex-wrap gap-2"><Btn v="good" onClick={()=>onOpen('money')}><Plus size={16}/>Add money</Btn><Btn v="primary" onClick={()=>onOpen('spend')}><Minus size={16}/>Log spend</Btn>
   <Btn onClick={nextDay} disabled={day>=30}><SkipForward size={16}/>Next day</Btn><Btn onClick={reset} title="Reset demo"><RotateCcw size={16}/></Btn></div></header>}
