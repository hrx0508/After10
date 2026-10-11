import { motion } from 'framer-motion';
export default function Sparkline({ data, color = '#22d3a0', w = 160, h = 50 }) {
    if (data.length < 2) return null; const mx = Math.max(...data), mn = Math.min(...data), X = i => i * w / (data.length - 1), Y = v => h - 4 - (v - mn) / (mx - mn || 1) * (h - 8);
    const d = data.map((v, i) => `${i ? 'L' : 'M'}${X(i)},${Y(v)}`).join('');
    return <svg viewBox={`0 0 ${w} ${h}`} className="w-full"><defs><linearGradient id="sp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".4" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        <path d={`${d}L${w},${h}L0,${h}Z`} fill="url(#sp)" /><motion.path d={d} fill="none" stroke={color} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} /></svg>
}
