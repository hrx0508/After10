import { Radar, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import Toggle from '../../components/ui/Toggle.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressRing from '../../components/ui/ProgressRing.jsx';
import { Icon } from '../../components/ui/IconMap.jsx';
import { useFin } from '../../store/index.js';
import { inr } from '../../engine/format.js';
export const SubRow = ({ s, on, toggle }) => <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2"><span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: s.color + '33', color: s.color }}><Icon name={s.icon} size={16} /></span>
    <div className="flex-1"><p className="text-sm font-semibold">{s.name}</p><p className="text-[11px] text-white/55">{inr(s.amount)} / month</p></div><Toggle on={on} onChange={toggle} label={`Select ${s.name}`} /></div>;
export default function SubscriptionRadar() {
    const { subs, selSubs, toggleSel, pauseSelected } = useFin(), act = subs.filter(s => s.active), sel = act.filter(s => selSubs.includes(s.id)), tot = sel.reduce((a, s) => a + s.amount, 0);
    return <GlassCard><SectionTitle icon={Radar} color="#818cf8" title="Subscription Radar" sub="Pause subscriptions and see the impact." />
        <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr]"><div className="space-y-2">{act.map(s => <SubRow key={s.id} s={s} on={selSubs.includes(s.id)} toggle={() => toggleSel(s.id)} />)}{!act.length && <p className="text-sm text-white/55">All subscriptions are paused.</p>}</div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-black/20 p-3 text-center"><ProgressRing v={act.length ? sel.length / act.length : 0} color="#22d3a0" size={84}><b className="text-2xl">{sel.length}</b></ProgressRing><p className="text-xs text-white/60">subscriptions<br /><b className="text-white">= {inr(tot)} / month</b></p><Button icon={Pause} className="w-full" disabled={!sel.length} onClick={pauseSelected}>Pause Selected</Button></div></div></GlassCard>
}
