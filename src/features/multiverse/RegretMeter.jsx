import { Hourglass } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import { useSim, useScenarioRows } from '../../hooks/useSim.js';
import { scenarioRisk, inr } from '../../engine/format.js';

export default function RegretMeter() {
    const base = useSim();
    const rows = useScenarioRows();
    const baseEta = base.goals?.[0]?.eta;

    return <GlassCard>
        <SectionTitle icon={Hourglass} color="#f472b6" title="Regret Meter" sub="What each choice costs in days of safe spending" />
        <div className="space-y-4">
            {rows.map(({ f, r }) => {
                const days = f.amount / Math.max(1, base.sds ?? 0);
                const rEta = r.goals?.[0]?.eta;
                const hasGoal = rEta !== undefined && baseEta !== undefined;
                const d = hasGoal ? rEta - baseEta : 0;
                const R = scenarioRisk(r.survival ?? 0);
                const progress = Math.min(1, Math.max(0, days / 20));

                return <div key={f.id}>
                    <div className="mb-1 flex justify-between text-sm">
                        <b>{f.title}</b>
                        <span style={{ color: R.c }}>{days.toFixed(1)} days · survival {(r.survival ?? 0).toFixed(0)}%</span>
                    </div>
                    <ProgressBar v={progress} color={R.c} />
                    <p className="mt-1 text-xs text-white/55">
                        {inr(f.amount)}{' '}
                        {!hasGoal
                            ? 'No goal set yet, so there is nothing to delay.'
                            : Number.isFinite(d) && d > 0
                                ? `delays your goal by ${d} days.`
                                : 'keeps your goal on track.'}
                    </p>
                </div>;
            })}
            {!rows.length && <p className="text-sm text-white/55">Run a simulation to see regret scores.</p>}
        </div>
    </GlassCard>;
}