import { useEffect, useState } from 'react';
import { CalendarDays, Plus, Settings, ChevronDown, FastForward } from 'lucide-react';
import { useFin } from '../../store/index.js';
import Button from '../ui/Button.jsx';
import { Logo } from './Sidebar.jsx';

// real current date/time, ticks every second
function useNow() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return now;
}

export default function Topbar() {
    const { user, nextDay, openModal } = useFin();
    const now = useNow();

    const date = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    return <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/5 bg-navy-950/60 px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="md:hidden"><Logo /></div><div className="hidden md:block" />
        <div className="flex items-center gap-2 md:gap-3">
            <Button icon={Plus} onClick={() => openModal('add-money')}><span className="hidden sm:inline">Add Money</span></Button>

            {/* live date + time */}
            <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm sm:flex">
                <CalendarDays size={16} className="text-violet-300" />
                <span className="font-medium">{date}</span>
                <span className="tabular-nums text-white/50">· {time}</span>
                <span className="relative ml-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
            </div>

            {/* simulation control, kept separate from the live date */}
            {/* <button onClick={nextDay} aria-label="Advance simulation by one day" title="Advance simulation by one day"
                className="hidden rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 sm:block">
                <FastForward size={16} className="text-white/60" />
            </button> */}

            <div className="hidden items-center gap-2 sm:flex"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-sm font-bold">{user[0]}</span><span className="text-sm">{user}</span><ChevronDown size={14} /></div>
            <button aria-label="Settings" onClick={() => openModal('settings')} className="rounded-xl p-2 hover:bg-white/10"><Settings size={18} /></button></div></header>
}