import {CalendarDays,Plus,Settings,ChevronDown,FastForward} from 'lucide-react';import {useFin} from '../../store/index.js';import Button from '../ui/Button.jsx';import {Logo} from './Sidebar.jsx';
export default function Topbar(){const {day,user,nextDay,openModal}=useFin();
 return <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/5 bg-navy-950/60 px-4 py-3 backdrop-blur-xl md:px-8">
  <div className="md:hidden"><Logo/></div><div className="hidden md:block"/>
  <div className="flex items-center gap-2 md:gap-3">
   <Button icon={Plus} onClick={()=>openModal('add-money')}><span className="hidden sm:inline">Add Money</span></Button>
   <button onClick={nextDay} title="Advance one day" className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 sm:flex"><CalendarDays size={16} className="text-violet-300"/>Day {day} of 30<FastForward size={14} className="text-white/50"/></button>
   <div className="hidden items-center gap-2 sm:flex"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-sm font-bold">{user[0]}</span><span className="text-sm">{user}</span><ChevronDown size={14}/></div>
   <button aria-label="Settings" onClick={()=>openModal('settings')} className="rounded-xl p-2 hover:bg-white/10"><Settings size={18}/></button></div></header>}
