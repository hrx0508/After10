import { Link } from 'react-router-dom';
import { PiggyBank, Settings2, Plus } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import Button from '../../components/ui/Button.jsx';
import { useFin } from '../../store/index.js';
import { useSim, useScenarioRows } from '../../hooks/useSim.js';
import { inr } from '../../engine/format.js';

export default function SavingsGoalCard() {
    const open = useFin(s => s.openModal);
    const selFork = useFin(s => s.selFork);
    const base = useSim();
    const rows = useScenarioRows();

    const g = base.goals?.[0];

    // empty state: no goal created yet
    if (!g) {
        return <GlassCard className="h-full">
            <SectionTitle icon={PiggyBank} color="#22d3a0" title="Savings Goal" sub="Your future self will thank you." />
            <p className="text-sm text-white/55">No goal yet. Set one to start tracking your savings.</p>
            <Link to="/goals" className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 px-2.5 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/30">
                <Plus size={13} />Add a goal
            </Link>
        </GlassCard>;
    }

    const f = rows.find(x => x.f.id === selFork);
    const forkEta = f?.r?.goals?.[0]?.eta;
    const delay = f && forkEta !== undefined && g.eta !== undefined ? forkEta - g.eta : 0;
    const progress = g.target > 0 ? Math.min(1, g.saved / g.target) : 0;

    return <GlassCard className="h-full">
        <SectionTitle icon={PiggyBank} color="#22d3a0" title="Savings Goal" sub="Your future self will thank you." />
        <p className="font-bold">{g.name}</p>
        <div className="my-2 flex items-center gap-3"><ProgressBar v={progress} /><span className="text-xs text-white/55">{inr(g.target)}</span></div>
        <p className="text-xs text-white/70">Saved {inr(g.saved)} <span className="text-white/30">|</span> To go {inr(Math.max(0, g.target - g.saved))}</p>
        <p className="mt-3 rounded-lg bg-black/25 px-3 py-2 text-xs">Estimated delay: <b className={delay > 0 ? 'text-rose-300' : 'text-emerald-300'}>{Number.isFinite(delay) ? (delay > 0 ? `${delay} days` : 'None') : 'Never'}</b>{f ? ` if you choose ${f.f.title}` : ''}</p>
        <Button variant="ghost" icon={Settings2} className="mt-3 w-full" onClick={() => open('goal', { id: g.id })}>Adjust Goal</Button>
    </GlassCard>;
}