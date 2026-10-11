import { useState } from 'react';
import { ShoppingBag, Search, Play } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { inr } from '../../engine/format.js';
const PRESETS = [['Concert Ticket', 1500], ['Sneakers', 2800], ['Headphones', 1800], ['Dinner Out', 850]];
export default function ScenarioForm({ onRun }) {
    const [item, setItem] = useState('Concert Ticket'), [amt, setAmt] = useState(1500);
    return <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="mb-3 flex items-center gap-2 text-sm font-medium"><ShoppingBag size={16} className="text-violet-300" />What are you planning to buy?</p>
        <div className="relative"><Search size={15} className="absolute left-3 top-3 text-white/45" /><input value={item} onChange={e => setItem(e.target.value)} aria-label="Item" className="w-full rounded-xl border border-violet-400/30 bg-navy-900/70 py-2.5 pl-9 pr-3 text-sm" /></div>
        <div className="mt-2 flex flex-wrap gap-1.5">{PRESETS.map(([l, v]) => <button key={l} onClick={() => { setItem(l); setAmt(v) }} className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] hover:bg-white/15">{l}</button>)}</div>
        <p className="mt-4 text-right text-lg font-bold">{inr(amt)}</p><input type="range" min={500} max={5000} step={50} value={amt} onChange={e => setAmt(+e.target.value)} aria-label="Amount" />
        <div className="flex justify-between text-[11px] text-white/50"><span>₹500</span><span>₹5,000</span></div>
        <Button icon={Play} className="mt-4 w-full" onClick={() => onRun(item || 'Purchase', amt)}>Run Simulation</Button></div>
}
