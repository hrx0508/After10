import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader.jsx';
import WeatherStrip from '../features/weather/WeatherStrip.jsx';
import { WEATHER, weatherFor } from '../features/weather/weatherMeta.js';
import GlassCard from '../components/ui/GlassCard.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import Button from '../components/ui/Button.jsx';
import { useSim, useScenarioRows } from '../hooks/useSim.js';
import { useFin } from '../store/index.js';
import { inr, dateLabel } from '../engine/format.js';
export default function WeatherPage() {
    const base = useSim(), rows = useScenarioRows(), { day, commitments, subs } = useFin(), [sel, setSel] = useState('reality'), [d, setD] = useState(day);
    const cur = sel === 'reality' ? base : rows.find(x => x.f.id === sel)?.r || base, low = Math.min(...cur.curve), ok = low >= 1000, w = WEATHER[weatherFor(d, day, cur)], bills = [...commitments, ...subs.filter(s => s.active)].filter(b => b.day === d);
    return <div><PageHeader title="Money Weather" sub="Read your next 30 days like a forecast.">{[['reality', 'Reality'], ...rows.map(({ f }) => [f.id, f.title])].map(([k, l]) => <Button key={k} variant={sel === k ? 'primary' : 'ghost'} onClick={() => setSel(k)}>{l}</Button>)}</PageHeader>
        <div className="space-y-5"><WeatherStrip sim={cur} base={sel === 'reality' ? null : base} day={day} selected={d} onSelect={setD} />
            <div className="grid gap-5 md:grid-cols-2"><GlassCard glow={w.c}><p className="flex items-center gap-2 text-lg font-bold"><w.I color={w.c} />Day {d} · {w.label}</p>{d >= day ? <p className="mt-2 text-sm text-white/70">Projected balance {inr(cur.curve[d - day])}, which is {((cur.curve[d - day] - cur.reserve) / 110).toFixed(1)} days of cushion after goal money.</p> : <p className="mt-2 text-sm text-white/60">This day has passed.</p>}
                {bills.length > 0 && <p className="mt-2 text-sm">Incoming front: {bills.map(b => `${b.name} ${inr(b.amount)}`).join(', ')} on {dateLabel(d)}.</p>}</GlassCard>
                <GlassCard><p className="flex items-center gap-2 font-bold"><ShieldCheck className="text-sky-300" />Storm shield</p><p className="mb-3 text-xs text-white/55">Lowest projected balance this month</p><ProgressBar v={Math.max(0, low) / 2000} color={ok ? '#38bdf8' : '#fb7185'} h={12} />
                    <p className="mt-2 text-sm">{inr(Math.max(0, low))} of shield. {ok ? 'A surprise ₹1,000 expense is absorbed.' : 'A surprise ₹1,000 expense would break your month.'}</p></GlassCard></div></div></div>
}
