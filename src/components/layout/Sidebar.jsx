import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Orbit, CloudSun, Repeat, Zap, Target, CalendarDays, Receipt } from 'lucide-react';
import { useFin } from '../../store/index.js';
import ProgressBar from '../ui/ProgressBar.jsx';
export const NAV = [{ to: '/', label: 'Home', icon: Home }, { to: '/multiverse', label: 'Money Multiverse', icon: Orbit }, { to: '/weather', label: 'Money Weather', icon: CloudSun }, { to: '/subscriptions', label: 'Subscriptions', icon: Repeat }, { to: '/chaos', label: 'Chaos Cards', icon: Zap }, { to: '/goals', label: 'Savings Goals', icon: Target }, { to: '/calendar', label: 'Calendar', icon: CalendarDays }, { to: '/activity', label: 'Activity', icon: Receipt }];
export const Logo = () => <div className="flex items-center gap-3"><svg width="40" height="40" viewBox="0 0 40 40"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#c026d3" /></linearGradient></defs><path d="M6 32L20 4l14 28-14-8z" fill="url(#lg)" /><path d="M20 4v20l14 8z" fill="#fff" opacity=".25" /></svg>
    <div><p className="text-xl font-bold leading-none">AFTER<span className="text-cyan-300">₹10</span></p><p className="mt-1 text-[10px] leading-tight text-white/55">See the consequences<br />before you spend.</p></div></div>;
export default function Sidebar() {
    const day = useFin(s => s.day);
    return <aside className="fixed left-0 top-0 z-30 hidden h-full w-56 flex-col border-r border-white/10 bg-navy-950/70 p-4 backdrop-blur-xl md:flex"><div className="mb-8 mt-2"><Logo /></div>
        <nav className="flex flex-col gap-1">{NAV.map(({ to, label, icon: I }) => <NavLink key={to} to={to} end={to === '/'} className="relative rounded-xl px-3 py-2.5 text-sm">{({ isActive }) => <>
            {isActive && <motion.span layoutId="nav" className="absolute inset-0 rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-600/50 to-indigo-600/20 shadow-[0_0_24px_-6px_#8b5cf6]" />}
            <span className={`relative flex items-center gap-3 ${isActive ? 'font-bold text-white' : 'text-white/65 hover:text-white'}`}><I size={18} />{label}</span></>}</NavLink>)}</nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm font-bold leading-snug">Better choices today.<br />A stronger tomorrow.</p><div className="mt-3"><ProgressBar v={day / 30} color="#a78bfa" h={6} /></div><p className="mt-1.5 text-[11px] text-white/50">{30 - day} days to go</p></div></aside>
}
