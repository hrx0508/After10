import { useState } from 'react';
import GlassCard from './ui/GlassCard.jsx';
import Button from './ui/Button.jsx';
import { useFin } from '../store/index.js';

export default function Setup() {
  const completeSetup = useFin(s => s.completeSetup);
  const [f, setF] = useState({ user: '', balance: '', income: '', pace: '' });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const n = k => Number(f[k]);
  const valid = f.user.trim() && f.balance !== '' && n('balance') >= 0 && n('income') > 0 && n('pace') > 0;
  const field = 'w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-violet-400';

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-sm">
        <GlassCard glow="#818cf8">
          <p className="text-xl font-bold">Welcome 👋</p>
          <p className="mb-4 text-sm text-white/60">Tell us where you're starting from. You can change this later.</p>
          <div className="space-y-3">
            <label className="block text-xs text-white/60">Your name
              <input className={`${field} mt-1`} value={f.user} onChange={e => set('user', e.target.value)} />
            </label>
            <label className="block text-xs text-white/60">Current balance (₹)
              <input className={`${field} mt-1`} type="number" min="0" value={f.balance} onChange={e => set('balance', e.target.value)} />
            </label>
            <label className="block text-xs text-white/60">Monthly income / allowance (₹)
              <input className={`${field} mt-1`} type="number" min="1" value={f.income} onChange={e => set('income', e.target.value)} />
            </label>
            <label className="block text-xs text-white/60">Typical daily spending (₹)
              <input className={`${field} mt-1`} type="number" min="1" value={f.pace} onChange={e => set('pace', e.target.value)} />
            </label>
          </div>
          <Button className="mt-5 w-full" disabled={!valid}
            onClick={() => completeSetup({ user: f.user.trim(), balance: n('balance'), income: n('income'), pace: n('pace') })}>
            Get started
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}