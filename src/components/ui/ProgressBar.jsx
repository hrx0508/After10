import { motion } from 'framer-motion';
export default function ProgressBar({ v, color = '#22d3a0', h = 8 }) {
    return <div className="w-full overflow-hidden rounded-full bg-white/10" style={{ height: h }}>
        <motion.div className="shimmer h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min(100, Math.max(0, v * 100))}%` }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} style={{ backgroundImage: `linear-gradient(90deg,${color},#ffffff88,${color})`, backgroundColor: color }} /></div>
}
