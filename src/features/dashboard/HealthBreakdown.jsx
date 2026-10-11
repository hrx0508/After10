import { HeartPulse, Info, AlertTriangle, CheckCircle2, Layers, ShieldCheck, Wallet, PiggyBank } from 'lucide-react'; 
import GlassCard from '../../components/ui/GlassCard.jsx'; 
import SectionTitle from '../../components/ui/SectionTitle.jsx'; 
import ProgressBar from '../../components/ui/ProgressBar.jsx'; 
import { useSim } from '../../hooks/useSim.js';
const IC = { sustain: Layers, cover: ShieldCheck, buffer: Wallet, savings: PiggyBank };
export default function HealthBreakdown() {
    const sim = useSim(), low = [...sim.parts].sort((a, b) => a.pct - b.pct)[0];
    return <GlassCard><SectionTitle icon={HeartPulse} color="#c084fc" title="Financial Health Breakdown" right={<Info size={14} className="text-white/40" />} />
        <div className="space-y-3">{sim.parts.map(p => {
            const I = IC[p.id]; return <div key={p.id} className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: p.tone + '26', color: p.tone }}><I size={17} /></span>
                <div className="flex-1"><div className="mb-1 flex justify-between text-xs"><span>{p.label}</span><b>{Math.round(p.pct)}%</b></div><ProgressBar v={p.pct / 100} color={p.tone} h={5} /></div></div>
        })}</div>
        <div className="mt-4 rounded-xl border p-3 text-xs" style={{ borderColor: low.pct < 50 ? '#fb718566' : '#22d3a066', background: low.pct < 50 ? '#fb71851a' : '#22d3a01a' }}>
            <p className="mb-1 flex items-center gap-1.5 font-bold">{low.pct < 50 ? <AlertTriangle size={14} className="text-amber-300" /> : <CheckCircle2 size={14} className="text-emerald-300" />}Why did it change?</p><p className="text-white/70">{low.label} is lowest at {Math.round(low.pct)}%. {low.why}</p></div></GlassCard>
}
