import { useState, useMemo } from 'react';
import { Wallet, Eye, EyeOff, CalendarClock, Target, HeartPulse, ShieldCheck } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import AnimatedNumber from '../../components/ui/AnimatedNumber.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import ProgressRing from '../../components/ui/ProgressRing.jsx';
import Sparkline from '../../components/charts/Sparkline.jsx';
import DeltaChip from '../../components/ui/DeltaChip.jsx';
import { useSim } from '../../hooks/useSim.js';
import { useFin } from '../../store/index.js'; import { balanceHistory } from '../../engine/history.js'; import { healthTier, riskOf, inr } from '../../engine/format.js';
const Tile = ({ icon: I, c }) => <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: c + '26', color: c }}><I size={20} /></span>;
export default function StatCards() {
    const { balance, income, day, pace, tx } = useFin(), sim = useSim(), [hide, setHide] = useState(false), g = sim.goals[0], T = healthTier(sim.health), R = riskOf(sim.survival);
    const hist = useMemo(() => balanceHistory(tx, day), [tx, day]);
    return <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-[1.5fr_1fr_1.2fr_1fr_1fr]">
        <GlassCard className="col-span-2 md:col-span-3 xl:col-span-1" glow="#22d3a0"><div className="relative z-10"><div className="flex items-center gap-3"><Tile icon={Wallet} c="#22d3a0" /><div className="flex-1"><p className="text-sm text-white/65">Total Balance</p>
            <p className="text-3xl font-bold">{hide ? '₹ ••••' : <AnimatedNumber pre="₹ " v={balance} />}</p></div><button aria-label="Toggle balance" onClick={() => setHide(!hide)} className="text-white/50 hover:text-white">{hide ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
            <p className="mt-2 text-xs text-white/55">of {inr(income)}</p><div className="mt-1.5"><ProgressBar v={balance / income} /></div></div><div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-50"><Sparkline data={hist} /></div></GlassCard>
        <GlassCard glow="#8b5cf6"><div className="flex items-start justify-between"><div><p className="text-sm text-white/65">Safe Daily Spend</p><p className="mt-2 text-3xl font-bold"><AnimatedNumber pre="₹ " v={sim.sds} /></p><p className="text-xs text-white/55">per day<DeltaChip v={sim.sds - pace} pre="₹" /></p></div><Tile icon={CalendarClock} c="#8b5cf6" /></div></GlassCard>
        <GlassCard glow="#a78bfa"><div className="flex items-center justify-between gap-2"><div><div className="flex items-center gap-2 text-sm text-white/65"><Target size={16} className="text-violet-300" />Savings Goal</div><p className="mt-2 text-2xl font-bold"><AnimatedNumber pre="₹ " v={g.saved} /></p><p className="text-xs text-white/55">of {inr(g.target)}</p></div>
            <ProgressRing v={g.saved / g.target} color="#22d3a0" size={70} stroke={7}><span className="text-sm font-bold">{Math.round(g.saved / g.target * 100)}%</span></ProgressRing></div></GlassCard>
        <GlassCard glow={T.c}><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 text-sm text-white/65"><HeartPulse size={16} style={{ color: T.c }} />Financial Health</div><p className="mt-2 text-3xl font-bold" style={{ color: T.c }}>{T.n}</p><p className="text-xs text-white/55">Score {sim.health}/100</p></div></div></GlassCard>
        <GlassCard glow={R.c}><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 text-sm text-white/65"><ShieldCheck size={16} style={{ color: R.c }} />Risk Level</div><p className="mt-2 text-3xl font-bold" style={{ color: R.c }}>{R.n}</p><p className="text-xs text-white/55">{R.note}</p></div><span className="pulse mt-1 h-3 w-3 rounded-full" style={{ background: R.c, '--p': R.c + '88' }} /></div></GlassCard></div>
}
