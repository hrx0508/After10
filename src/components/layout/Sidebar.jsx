import {NavLink} from 'react-router-dom';import {Home,GitBranch,CloudSun,Receipt,Repeat,Zap,Target,Orbit} from 'lucide-react';
export const NAV=[['/','Home',Home],['/multiverse','Money Multiverse',GitBranch],['/weather','Money Weather',CloudSun],['/ledger','Transactions',Receipt],['/subscriptions','Subscriptions',Repeat],['/chaos','Chaos Cards',Zap],['/goals','Savings Goals',Target],['/orbit','Orbit',Orbit]];
export default function Sidebar(){return <>
 <aside aria-label="Primary" className="fixed left-0 top-0 hidden h-full w-60 flex-col gap-1 border-r border-indigo-300/10 bg-[#060b1f]/80 p-5 backdrop-blur-xl md:flex">
  <p className="mb-1 text-2xl font-bold">AFTER<span className="text-indigo-400">₹10</span></p><p className="mb-6 text-[11px] text-indigo-200/70">See the consequences before you spend.</p>
  {NAV.map(([to,l,I])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive?'bg-indigo-500/25 font-bold text-white shadow-inner shadow-indigo-400/20':'text-indigo-100/75 hover:bg-white/5'}`}><I size={18}/>{l}</NavLink>)}
  <p className="mt-auto rounded-xl bg-white/5 p-3 text-xs text-indigo-100/75">Better choices today. A stronger tomorrow.</p></aside>
 <nav aria-label="Primary mobile" className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-indigo-300/10 bg-[#060b1f]/90 py-2 backdrop-blur-xl md:hidden">
  {NAV.map(([to,l,I])=><NavLink key={to} to={to} end={to==='/'} aria-label={l} className={({isActive})=>`p-2 ${isActive?'text-indigo-300':'text-white/70'}`}><I size={22}/></NavLink>)}</nav></>}
