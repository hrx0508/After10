import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import Button from '../../components/ui/Button.jsx';
import { CalendarDays, Plus, Pencil, Trash2, Check, X, Clock } from 'lucide-react';
import AreaChart from '../../components/charts/AreaChart.jsx';
import { useFin } from '../../store/index.js';
import { useSim } from '../../hooks/useSim.js';
import { WEATHER, weatherFor } from '../weather/weatherMeta.js';
import { inr } from '../../engine/format.js';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CATS = ['Food', 'Transport', 'Shopping', 'Fun', 'Bills', 'Savings', 'Other'];

/* ---------- schedule editor ---------- */
function ScheduleEditor({ item, day, total, monthName, onClose }) {
  const { addScheduled, updateScheduled } = useFin();
  const isNew = !item;
  const [f, setF] = useState(
    item
      ? { label: item.label, amount: String(item.amount), type: item.type, cat: item.cat, day: String(item.day), note: item.note ?? '' }
      : { label: '', amount: '', type: 'out', cat: 'Other', day: String(day), note: '' }
  );
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const amount = Number(f.amount);
  const d = Number(f.day);
  const errors = {
    label: !f.label.trim() && 'Say what it is for',
    amount: !(amount > 0) && 'Enter an amount above 0',
    day: !(Number.isInteger(d) && d >= 1 && d <= total) && `Day must be 1–${total}`,
  };
  const valid = !errors.label && !errors.amount && !errors.day;
  const accent = f.type === 'out' ? '#fb7185' : '#22d3a0';

  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  const save = () => {
    if (!valid) return;
    const data = { label: f.label.trim(), amount, type: f.type, cat: f.cat, day: d, note: f.note.trim() };
    isNew ? addScheduled(data) : updateScheduled(item.id, data);
    onClose();
  };

  const field = 'w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-sky-400';

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
        <GlassCard glow={accent}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">{isNew ? 'Schedule' : 'Edit scheduled'}</p>
              <p className="text-xs text-white/55">{monthName} {d || '–'}</p>
            </div>
            <button aria-label="Close" onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10"><X size={16} /></button>
          </div>

          {/* expense / income switch */}
          <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-black/30 p-1 text-sm">
            {[['out', 'Expense'], ['in', 'Income']].map(([k, l]) => (
              <button key={k} type="button" onClick={() => set('type', k)}
                className="rounded-lg py-1.5 font-semibold transition-colors"
                style={f.type === k ? { background: (k === 'out' ? '#fb7185' : '#22d3a0') + '33', color: k === 'out' ? '#fda4af' : '#6ee7b7' } : { color: '#ffffff88' }}>
                {l}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <label className="block text-xs text-white/60">What is it about?
              <input className={`${field} mt-1`} autoFocus maxLength={32} value={f.label}
                onChange={e => set('label', e.target.value)} placeholder="e.g. Friend's birthday dinner" />
              {errors.label && f.label !== '' && <span className="text-rose-300">{errors.label}</span>}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-white/60">Amount (₹)
                <input className={`${field} mt-1`} type="number" min="1" inputMode="numeric" value={f.amount}
                  onChange={e => set('amount', e.target.value)} placeholder="500" />
              </label>
              <label className="block text-xs text-white/60">Day of month
                <input className={`${field} mt-1`} type="number" min="1" max={total} inputMode="numeric" value={f.day}
                  onChange={e => set('day', e.target.value)} />
              </label>
            </div>
            {f.amount !== '' && errors.amount && <p className="text-xs text-rose-300">{errors.amount}</p>}
            {errors.day && <p className="text-xs text-rose-300">{errors.day}</p>}

            <div>
              <p className="mb-1.5 text-xs text-white/60">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {CATS.map(c => (
                  <button key={c} type="button" onClick={() => set('cat', c)}
                    className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${f.cat === c ? 'border-sky-400 bg-sky-400/20 text-sky-200' : 'border-white/10 text-white/60 hover:bg-white/5'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-xs text-white/60">Note (optional)
              <input className={`${field} mt-1`} maxLength={60} value={f.note}
                onChange={e => set('note', e.target.value)} placeholder="Split with 3 friends" />
            </label>
          </div>

          <div className="mt-5 flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button className="flex-1" disabled={!valid} onClick={save}>{isNew ? 'Schedule' : 'Save changes'}</Button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

/* ---------- calendar ---------- */
export default function CalendarGrid() {
  const { tx, scheduled, deleteScheduled, payScheduled } = useFin();
  const sim = useSim();

  const { year, month, today, lead, total, monthLabel, monthShort } = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    return {
      year: y,
      month: m,
      today: now.getDate(),
      lead: new Date(y, m, 1).getDay(),
      total: new Date(y, m + 1, 0).getDate(),
      monthLabel: now.toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
      monthShort: now.toLocaleString('en-IN', { month: 'short' }),
    };
  }, []);

  const [sel, setSel] = useState(today);
  const [editor, setEditor] = useState(null); // null = closed, {} = new, item = edit
  const [confirmId, setConfirmId] = useState(null);

  const bills = d => sim.bills.filter(b => b.day === d);
  const txs = d => tx.filter(t => t.day === d);
  const sch = d => scheduled.filter(x => x.day === d);
  const dt = txs(sel);
  const ds = sch(sel);
  const proj = sel >= today ? sim.curve[sel - today] : null;

  const openNew = d => { setSel(d); setEditor({ day: d }); };

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <GlassCard>
        <SectionTitle icon={CalendarDays} color="#38bdf8" title={monthLabel} sub="Tap a date to schedule an expense or income" />

        <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-white/50">
          {DOW.map(d => <span key={d}>{d}</span>)}
        </div>

        <div className="mt-1.5 grid grid-cols-7 gap-1.5">
          {Array.from({ length: lead }, (_, i) => <span key={'b' + i} />)}

          {Array.from({ length: total }, (_, i) => {
            const d = i + 1;
            const M = WEATHER[weatherFor(d, today, sim)];
            const b = bills(d);
            const t = txs(d);
            const s = sch(d);
            const isToday = d === today;
            const past = d < today;

            return (
              <motion.button
                key={d}
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openNew(d)}
                className="group relative aspect-square cursor-pointer rounded-xl border p-1 text-left"
                style={{
                  background: M.c + (past ? '0d' : '22'),
                  borderColor: sel === d ? '#fff' : isToday ? M.c : '#ffffff14',
                  boxShadow: isToday ? `0 0 14px -2px ${M.c}` : undefined,
                }}
              >
                <span className="text-xs font-bold">{d}</span>
                <M.I size={14} color={M.c} className="absolute right-1 top-1" />

                <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <Plus size={16} className="text-white" />
                </span>

                {isToday && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-1 text-[8px] font-bold leading-tight">TODAY</span>
                )}

                <div className="absolute bottom-1 left-1 flex gap-0.5">
                  {b.length > 0 && <i className="h-1.5 w-1.5 rounded-full bg-sky-400" />}
                  {t.some(x => x.type === 'in') && <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  {t.some(x => x.type === 'out') && <i className="h-1.5 w-1.5 rounded-full bg-rose-400" />}
                  {s.length > 0 && <i className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/55">
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-sky-400" />Bill</span>
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />Money in</span>
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-400" />Money out</span>
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400" />Scheduled</span>
        </p>
      </GlassCard>

      <div className="space-y-5">
        <GlassCard>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-lg font-bold">{monthShort} {sel}{sel === today ? ' · Today' : ''}</p>
              <p className="text-xs text-white/55">
                {sel < today ? 'Past day' : proj != null ? `Projected balance ${inr(proj)}` : ''}
              </p>
            </div>
            <Button icon={Plus} variant="ghost" onClick={() => openNew(sel)}><span className="hidden sm:inline">Schedule</span></Button>
          </div>

          <div className="mt-3 space-y-2 text-sm">
            {/* scheduled items: editable */}
            <AnimatePresence initial={false}>
              {ds.map(x => (
                <motion.div key={x.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate font-semibold">{x.label}</span>
                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-400/20 px-1.5 py-px text-[9px] font-bold uppercase text-amber-300">
                          <Clock size={9} />Scheduled
                        </span>
                      </span>
                      <span className="block text-[11px] text-white/50">{x.cat}{x.note ? ` · ${x.note}` : ''}</span>
                    </span>
                    <b className={x.type === 'in' ? 'text-emerald-300' : 'text-rose-300'}>
                      {x.type === 'in' ? '+' : '-'}{inr(x.amount)}
                    </b>
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-1">
                    {confirmId === x.id ? (
                      <>
                        <button onClick={() => { deleteScheduled(x.id); setConfirmId(null); }}
                          className="rounded-lg bg-rose-500/20 px-2 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-500/30">Delete?</button>
                        <button onClick={() => setConfirmId(null)} className="rounded-lg px-2 py-1 text-xs text-white/60 hover:bg-white/10">No</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => payScheduled(x.id)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-emerald-300 hover:bg-emerald-400/10">
                          <Check size={13} />{x.type === 'in' ? 'Received' : 'Paid'}
                        </button>
                        <button aria-label="Edit" title="Edit" onClick={() => setEditor(x)}
                          className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"><Pencil size={14} /></button>
                        <button aria-label="Delete" title="Delete" onClick={() => setConfirmId(x.id)}
                          className="rounded-lg p-1.5 text-white/60 hover:bg-rose-500/15 hover:text-rose-300"><Trash2 size={14} /></button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {bills(sel).map(b => (
              <p key={b.id} className="flex justify-between"><span>Bill: {b.name}</span><b>{inr(b.amount)}</b></p>
            ))}
            {dt.map(t => (
              <p key={t.id} className="flex justify-between">
                <span>{t.label}</span>
                <b className={t.type === 'in' ? 'text-emerald-300' : 'text-rose-300'}>{t.type === 'in' ? '+' : '-'}{inr(t.amount)}</b>
              </p>
            ))}
            {!bills(sel).length && !dt.length && !ds.length && <p className="text-white/50">Nothing scheduled.</p>}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="mb-2 text-sm font-bold">Projected balance</p>
          <AreaChart series={[{ name: 'Reality', color: '#22d3a0', data: sim.curve }]} startDay={today} height={180} />
        </GlassCard>
      </div>

      <AnimatePresence>
        {editor && (
          <ScheduleEditor
            key={editor.id ?? 'new'}
            item={editor.id ? editor : null}
            day={editor.day ?? sel}
            total={total}
            monthName={monthShort}
            onClose={() => setEditor(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}