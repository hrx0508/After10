import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Skull, Play, Pencil, Trash2, Plus, X } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import Button from '../../components/ui/Button.jsx';
import DeltaChip from '../../components/ui/DeltaChip.jsx';
import AnimatedNumber from '../../components/ui/AnimatedNumber.jsx';
import { Icon } from '../../components/ui/IconMap.jsx';
import { useFin } from '../../store/index.js';
import { useSim, useCore } from '../../hooks/useSim.js';
import { simulate } from '../../engine/simulate.js';
import { inr } from '../../engine/format.js';

const COLORS = ['#22c55e', '#ef4444', '#f43f5e', '#38bdf8', '#a78bfa', '#fbbf24', '#fb923c', '#f472b6'];
// only icon names already used in your seed data, so they exist in IconMap
const ICONS = ['music', 'tv', 'play', 'bag', 'wifi', 'smartphone', 'gift', 'heart'];

const BLANK = { name: '', amount: '', day: '1', color: COLORS[0], icon: ICONS[0] };

/* ---------- add / edit modal ---------- */
function SubEditor({ sub, onClose }) {
  const { addSub, updateSub } = useFin();
  const isNew = !sub;
  const [f, setF] = useState(
    sub ? { name: sub.name, amount: String(sub.amount), day: String(sub.day), color: sub.color, icon: sub.icon } : BLANK
  );
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const amount = Number(f.amount);
  const day = Number(f.day);
  const errors = {
    name: !f.name.trim() && 'Give it a title',
    amount: !(amount > 0) && 'Enter a price above 0',
    day: !(Number.isInteger(day) && day >= 1 && day <= 31) && 'Day must be 1–31',
  };
  const valid = !errors.name && !errors.amount && !errors.day;

  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  const save = () => {
    if (!valid) return;
    const data = { name: f.name.trim(), amount, day, color: f.color, icon: f.icon };
    isNew ? addSub(data) : updateSub(sub.id, data);
    onClose();
  };

  const field = 'w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-violet-400';

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="w-full max-w-sm"
      >
        <GlassCard glow={f.color}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg font-bold">{isNew ? 'Add subscription' : 'Edit subscription'}</p>
            <button aria-label="Close" onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10"><X size={16} /></button>
          </div>

          {/* live preview */}
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: f.color + '33', color: f.color }}>
              <Icon name={f.icon} size={20} />
            </span>
            <div>
              <p className="font-bold">{f.name.trim() || 'Subscription name'}</p>
              <p className="text-xs text-white/55">{amount > 0 ? inr(amount) : '₹0'} on Day {day || '–'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs text-white/60">Title
              <input className={`${field} mt-1`} value={f.name} maxLength={28} autoFocus
                onChange={e => set('name', e.target.value)} placeholder="e.g. Hotstar" />
              {errors.name && f.name !== '' && <span className="text-rose-300">{errors.name}</span>}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-white/60">Price (₹ / month)
                <input className={`${field} mt-1`} type="number" min="1" inputMode="numeric" value={f.amount}
                  onChange={e => set('amount', e.target.value)} placeholder="199" />
              </label>
              <label className="block text-xs text-white/60">Billing day
                <input className={`${field} mt-1`} type="number" min="1" max="31" inputMode="numeric" value={f.day}
                  onChange={e => set('day', e.target.value)} />
              </label>
            </div>
            {f.amount !== '' && errors.amount && <p className="text-xs text-rose-300">{errors.amount}</p>}
            {errors.day && <p className="text-xs text-rose-300">{errors.day}</p>}

            <div>
              <p className="mb-1.5 text-xs text-white/60">Colour</p>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(c => (
                  <button key={c} type="button" aria-label={`Colour ${c}`} onClick={() => set('color', c)}
                    className="h-7 w-7 rounded-full transition-transform hover:scale-110"
                    style={{ background: c, boxShadow: f.color === c ? `0 0 0 2px #0b1020, 0 0 0 4px ${c}` : undefined }} />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs text-white/60">Icon</p>
              <div className="flex flex-wrap gap-2">
                {ICONS.map(n => (
                  <button key={n} type="button" aria-label={n} onClick={() => set('icon', n)}
                    className="grid h-9 w-9 place-items-center rounded-lg border transition-colors"
                    style={{
                      borderColor: f.icon === n ? f.color : '#ffffff18',
                      background: f.icon === n ? f.color + '33' : 'transparent',
                      color: f.icon === n ? f.color : '#ffffffaa',
                    }}>
                    <Icon name={n} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button className="flex-1" disabled={!valid} onClick={save}>{isNew ? 'Add' : 'Save changes'}</Button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

/* ---------- main list ---------- */
export default function SubscriptionList() {
  const { subs, resumeSub, deleteSub, pace } = useFin();
  const c = useCore();
  const base = useSim();
  const [editor, setEditor] = useState(null); // null = closed, {} = new, sub = edit
  const [confirmId, setConfirmId] = useState(null);

  const drain = subs.filter(s => s.active).reduce((a, s) => a + s.amount, 0);

  return (
    <div className="space-y-5">
      <GlassCard glow="#fb7185">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-white/60">Monthly vampire drain</p>
            <p className="text-5xl font-bold"><AnimatedNumber pre="₹" v={drain} /></p>
            <p className="text-sm text-white/60">That's {(drain / pace).toFixed(1)} days of your daily spending.</p>
          </div>
          <Button icon={Plus} onClick={() => setEditor({})}><span className="hidden sm:inline">Add subscription</span></Button>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {subs.map(s => {
            const alt = simulate({ ...c, subs: c.subs.map(x => (x.id === s.id ? { ...x, active: !x.active } : x)) });
            const gain = alt.runway - base.runway;
            const asking = confirmId === s.id;

            return (
              <GlassCard key={s.id} layout exit={{ opacity: 0, scale: 0.9 }} className={s.active ? '' : 'opacity-60'}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: s.color + '33', color: s.color }}>
                      <Icon name={s.icon} size={20} />
                    </span>
                    <div>
                      <p className="font-bold">{s.name}</p>
                      <p className="text-xs text-white/55">{inr(s.amount)} on Day {s.day}</p>
                    </div>
                  </div>
                  <span className="flex text-rose-400">
                    {Array.from({ length: Math.min(4, Math.ceil(s.amount / 80)) }, (_, i) => <Skull key={i} size={13} />)}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant={s.active ? 'ghost' : 'success'}
                    icon={s.active ? undefined : Play}
                    onClick={() => {
                      if (s.active) useFin.setState(st => ({ subs: st.subs.map(x => (x.id === s.id ? { ...x, active: false } : x)) }));
                      else resumeSub(s.id);
                    }}
                  >
                    {s.active ? 'Freeze' : 'Resume'}
                  </Button>
                  <DeltaChip v={gain} dec={1} suf=" days runway" />

                  <span className="ml-auto flex items-center gap-1">
                    {asking ? (
                      <>
                        <button onClick={() => { deleteSub(s.id); setConfirmId(null); }}
                          className="rounded-lg bg-rose-500/20 px-2 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-500/30">Delete?</button>
                        <button onClick={() => setConfirmId(null)} className="rounded-lg px-2 py-1 text-xs text-white/60 hover:bg-white/10">No</button>
                      </>
                    ) : (
                      <>
                        <button aria-label={`Edit ${s.name}`} title="Edit" onClick={() => setEditor(s)}
                          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"><Pencil size={15} /></button>
                        <button aria-label={`Delete ${s.name}`} title="Delete" onClick={() => setConfirmId(s.id)}
                          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-rose-500/15 hover:text-rose-300"><Trash2 size={15} /></button>
                      </>
                    )}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </AnimatePresence>

        {/* add-your-own card */}
        <motion.button
          layout type="button" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
          onClick={() => setEditor({})}
          className="flex min-h-[132px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 text-sm text-white/55 transition-colors hover:border-violet-400/60 hover:bg-violet-500/5 hover:text-violet-200"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5"><Plus size={20} /></span>
          Add your own subscription
        </motion.button>
      </div>

      <AnimatePresence>
        {editor && <SubEditor key={editor.id ?? 'new'} sub={editor.id ? editor : null} onClose={() => setEditor(null)} />}
      </AnimatePresence>
    </div>
  );
}