import { useMemo } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import AreaChart from '../components/charts/AreaChart.jsx';
import AnimatedNumber from '../components/ui/AnimatedNumber.jsx';
import Button from '../components/ui/Button.jsx';
import TransactionList from '../features/activity/TransactionList.jsx';
import CategoryBars from '../features/activity/CategoryBars.jsx';
import { useFin } from '../store/index.js';
import { balanceHistory } from '../engine/history.js';
import { Plus } from 'lucide-react';
export default function ActivityPage() {
    const { tx, day, openModal } = useFin(), h = useMemo(() => balanceHistory(tx, day), [tx, day]), inc = tx.filter(t => t.type === 'in').reduce((a, t) => a + t.amount, 0), out = tx.filter(t => t.type === 'out').reduce((a, t) => a + t.amount, 0);
    return <div><PageHeader title="Activity" sub="Every rupee in and out, with the story behind your balance."><Button icon={Plus} onClick={() => openModal('add-money')}>Add Money</Button></PageHeader>
        <div className="mb-5 grid gap-4 sm:grid-cols-3">{[['Money in', inc, '#22d3a0'], ['Money out', out, '#fb7185'], ['Net', inc - out, '#a78bfa']].map(([l, v, c]) => <GlassCard key={l} glow={c}><p className="text-sm text-white/60">{l}</p><p className="text-3xl font-bold" style={{ color: c }}><AnimatedNumber pre="₹" v={v} /></p></GlassCard>)}</div>
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]"><div className="space-y-5"><GlassCard><p className="mb-2 font-bold">Balance history</p><AreaChart series={[{ name: 'Balance', color: '#a78bfa', data: h }]} height={220} /></GlassCard><TransactionList /></div><CategoryBars /></div></div>
}
