import { NavLink } from 'react-router-dom';
import { NAV } from './Sidebar.jsx';
export default function MobileNav() {
    return <nav className="fixed inset-x-0 bottom-0 z-30 flex gap-1 overflow-x-auto border-t border-white/10 bg-navy-950/90 px-2 py-1.5 backdrop-blur-xl md:hidden">
        {NAV.map(({ to, label, icon: I }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-w-16 flex-1 flex-col items-center gap-0.5 rounded-lg py-1 text-[10px] ${isActive ? 'bg-violet-600/30 text-violet-200' : 'text-white/55'}`}><I size={18} />{label.replace('Money ', '')}</NavLink>)}</nav>
}
