import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import { WEATHER, weatherFor, LEGEND } from './weatherMeta.js';
export default function WeatherStrip({ sim, base, day, selected, onSelect, title = 'Money Weather', sub = 'Your 30-day financial forecast' }) {
    return <GlassCard><SectionTitle icon={CloudSun} color="#fbbf24" title={title} sub={sub} right={<div className="hidden flex-wrap justify-end gap-x-4 gap-y-1 text-[11px] text-white/70 lg:flex">{LEGEND.map(([l, i]) => <span key={l} className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: WEATHER[i].c }} />{l}</span>)}</div>} />
        <div className="flex gap-2 overflow-x-auto pb-2">{Array.from({ length: 30 }, (_, i) => {
            const d = i + 1, w = weatherFor(d, day, sim), M = WEATHER[w], worse = base && d >= day && w > weatherFor(d, day, base), past = d < day;
            return <motion.button key={d} whileHover={{ y: -4 }} onClick={() => onSelect?.(d)} className={`relative flex w-[58px] shrink-0 flex-col items-center gap-1 rounded-xl border px-1 py-2.5 ${past ? 'opacity-45' : ''}`}
                style={{ background: M.c + '1f', borderColor: selected === d || d === day ? M.c : M.c + '44', boxShadow: d === day ? `0 0 18px -2px ${M.c}` : undefined }}>
                <M.I size={22} color={M.c} /><span className="text-[11px] font-semibold">Day {d}</span><span className="text-[11px]" style={{ color: M.c }}>{M.label}</span>
                {worse && <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-rose-400" />}{d === day && <span className="absolute -top-2 rounded-full bg-violet-500 px-1.5 text-[9px] font-bold">TODAY</span>}</motion.button>
        })}</div></GlassCard>
}
