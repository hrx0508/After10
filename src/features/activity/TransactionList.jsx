import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import { useFin } from '../../store/index.js';
import { CATS } from '../../data/seed.js';
import { inr, dateLabel } from '../../engine/format.js';
export default function TransactionList() {
    const tx = useFin(s => s.tx), [f, setF] = useState('all'), list = tx.filter(t => f === 'all' || t.type === f);
    return <GlassCard><div className="mb-3 flex gap-2">{[['all', 'All'], ['in', 'Income'], ['out', 'Spending']].map(([k, l]) => <button key={k} onClick={() => setF(k)} className={`rounded-full px-3 py-1 text-xs ${f === k ? 'bg-violet-500/40' : 'bg-white/8'}`}>{l}</button>)}</div>
        <div className="divide-y divide-white/8"><AnimatePresence initial={false}>{list.map(t => <motion.div key={t.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 py-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: (CATS[t.cat] || '#64748b') + '26', color: CATS[t.cat] || '#94a3b8' }}>{t.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</span>
            <div className="flex-1"><p className="text-sm font-medium">{t.label}</p><p className="text-[11px] text-white/50">{t.cat} · {dateLabel(t.day)}</p></div><b className={t.type === 'in' ? 'text-emerald-300' : 'text-white'}>{t.type === 'in' ? '+' : '-'}{inr(t.amount)}</b></motion.div>)}</AnimatePresence></div></GlassCard>
}
