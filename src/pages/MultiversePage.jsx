import PageHeader from '../components/layout/PageHeader.jsx';
import MultiversePanel from '../features/multiverse/MultiversePanel.jsx';
import RegretMeter from '../features/multiverse/RegretMeter.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import AreaChart from '../components/charts/AreaChart.jsx';
import { useSim, useScenarioRows } from '../hooks/useSim.js';
import { useFin } from '../store/index.js';
export default function MultiversePage() {
    const base = useSim(), rows = useScenarioRows(), day = useFin(s => s.day), C = ['#c084fc', '#38bdf8', '#fb923c'];
    const series = [{ name: 'Reality', color: '#22d3a0', data: base.curve }, ...rows.map(({ f, r }, i) => ({ name: f.title, color: C[i % 3], data: r.curve }))];
    return <div><PageHeader title="Money Multiverse" sub="Fork your month, compare timelines, then commit or let it go." /><div className="space-y-5"><MultiversePanel />
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]"><GlassCard><div className="mb-2 flex flex-wrap gap-4 text-xs"><span className="text-emerald-300">● Reality</span>{rows.map(({ f }, i) => <span key={f.id} style={{ color: C[i % 3] }}>● {f.title}</span>)}</div><AreaChart series={series} startDay={day} height={280} /></GlassCard><RegretMeter /></div></div></div>
}
