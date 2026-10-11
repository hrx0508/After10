import { Skull, Play } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import Button from '../../components/ui/Button.jsx';
import DeltaChip from '../../components/ui/DeltaChip.jsx';
import AnimatedNumber from '../../components/ui/AnimatedNumber.jsx';
import { Icon } from '../../components/ui/IconMap.jsx';
import { useFin } from '../../store/index.js';
import { useSim, useCore } from '../../hooks/useSim.js';
import { simulate } from '../../engine/simulate.js';
import { inr } from '../../engine/format.js';
export default function SubscriptionList() {
    const { subs, toggleSel, pauseSelected, resumeSub, pace } = useFin(), c = useCore(), base = useSim(), drain = subs.filter(s => s.active).reduce((a, s) => a + s.amount, 0);
    return <div className="space-y-5"><GlassCard glow="#fb7185"><p className="text-sm text-white/60">Monthly vampire drain</p><p className="text-5xl font-bold"><AnimatedNumber pre="₹" v={drain} /></p><p className="text-sm text-white/60">That's {(drain / pace).toFixed(1)} days of your daily spending.</p></GlassCard>
        <div className="grid gap-4 md:grid-cols-2">{subs.map(s => {
            const alt = simulate({ ...c, subs: c.subs.map(x => x.id === s.id ? { ...x, active: !x.active } : x) }), gain = alt.runway - base.runway;
            return <GlassCard key={s.id} layout className={s.active ? '' : 'opacity-60'}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: s.color + '33', color: s.color }}><Icon name={s.icon} size={20} /></span>
                <div><p className="font-bold">{s.name}</p><p className="text-xs text-white/55">{inr(s.amount)} on Day {s.day}</p></div></div><span className="flex text-rose-400">{Array.from({ length: Math.min(4, Math.ceil(s.amount / 80)) }, (_, i) => <Skull key={i} size={13} />)}</span></div>
                <div className="mt-4 flex items-center"><Button variant={s.active ? 'ghost' : 'success'} icon={s.active ? undefined : Play} onClick={() => { if (s.active) { useFin.setState(st => ({ subs: st.subs.map(x => x.id === s.id ? { ...x, active: false } : x) })) } else resumeSub(s.id) }}>{s.active ? 'Freeze' : 'Resume'}</Button><DeltaChip v={gain} dec={1} suf=" days runway" /></div></GlassCard>
        })}</div></div>
}
