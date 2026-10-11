import { Hourglass } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import { useSim, useScenarioRows } from '../../hooks/useSim.js';
import { scenarioRisk, inr } from '../../engine/format.js';
export default function RegretMeter() {
    const base = useSim(), rows = useScenarioRows();
    return <GlassCard><SectionTitle icon={Hourglass} color="#f472b6" title="Regret Meter" sub="What each choice costs in days of safe spending" />
        <div className="space-y-4">{rows.map(({ f, r }) => {
            const days = f.amount / Math.max(1, base.sds), d = r.goals[0].eta - base.goals[0].eta, R = scenarioRisk(r.survival);
            return <div key={f.id}><div className="mb-1 flex justify-between text-sm"><b>{f.title}</b><span style={{ color: R.c }}>{days.toFixed(1)} days · survival {r.survival.toFixed(0)}%</span></div><ProgressBar v={days / 20} color={R.c} />
                <p className="mt-1 text-xs text-white/55">{inr(f.amount)} {Number.isFinite(d) && d > 0 ? `delays your goal by ${d} days` : 'keeps your goal on track'}.</p></div>
        })}{!rows.length && <p className="text-sm text-white/55">Run a simulation to see regret scores.</p>}</div></GlassCard>
}
