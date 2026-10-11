import { useEffect } from 'react';
import { Orbit, Check, Trash2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import Button from '../../components/ui/Button.jsx';
import Burst from '../../components/ui/Burst.jsx';
import ScenarioForm from './ScenarioForm.jsx';
import ScenarioCard from './ScenarioCard.jsx';
import { useFin } from '../../store/index.js';
import { useSim, useScenarioRows } from '../../hooks/useSim.js';
export default function MultiversePanel() {
    const { forks, selFork, runScenarios, selectFork, commit, discard } = useFin(), base = useSim(), rows = useScenarioRows();
    useEffect(() => { if (!forks.length) runScenarios('Concert Ticket', 1500) }, []);
    return <GlassCard className="relative"><SectionTitle icon={Orbit} color="#c084fc" title="Money Multiverse" sub="Simulate a decision and see how it changes your entire month." />
        <div className="grid gap-4 lg:grid-cols-[250px_1fr]"><ScenarioForm onRun={runScenarios} />
            <div><div className="grid gap-3 md:grid-cols-3">{rows.map(({ f, r }) => <ScenarioCard key={f.id} f={f} r={r} base={base} selected={selFork === f.id} onSelect={() => selectFork(f.id)} />)}</div>
                {!rows.length && <p className="py-12 text-center text-sm text-white/55">No simulation running. Pick an item and press Run Simulation.</p>}
                <div className="mt-4 grid grid-cols-[2fr_1fr] gap-3"><Button icon={Check} disabled={!rows.length} onClick={commit}>Commit This Decision</Button><Button variant="ghost" icon={Trash2} disabled={!rows.length} onClick={discard}>Discard</Button></div></div></div><Burst /></GlassCard>
}
