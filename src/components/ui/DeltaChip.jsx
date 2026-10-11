import { motion } from 'framer-motion';
export default function DeltaChip({ v, pre = '', suf = '', good = 1, dec = 0 }) {
    if (!Number.isFinite(v) || Math.abs(v) < Math.pow(10, -dec) / 2) return null; const ok = v * good > 0;
    return <motion.span key={Math.round(v * 10)} initial={{ scale: .5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className={`ml-1.5 inline-block rounded-full px-1.5 py-0.5 text-[11px] font-bold ${ok ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>{v > 0 ? '+' : '-'}{pre}{Math.abs(v).toFixed(dec)}{suf}</motion.span>
}
