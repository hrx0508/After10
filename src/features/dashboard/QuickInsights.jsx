import { Lightbulb, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import { useFin } from '../../store/index.js'; import { useSim } from '../../hooks/useSim.js';
import { buildInsights } from '../../engine/insights.js';
const T = { good: [CheckCircle2, '#22d3a0'], warn: [AlertTriangle, '#fbbf24'], info: [Sparkles, '#38bdf8'] };
export default function QuickInsights() {
    const state = useFin(), sim = useSim(), items = buildInsights({ sim, state });
    return <GlassCard><SectionTitle icon={Lightbulb} color="#fbbf24" title="Quick Insights" /><div className="space-y-2.5">{items.map((it, i) => { const [I, c] = T[it.tone]; return <div key={i} className="flex gap-3 text-xs"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: c + '26', color: c }}><I size={15} /></span><p className="self-center text-white/80">{it.text}</p></div> })}</div></GlassCard>
}
