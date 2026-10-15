import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import { WEATHER, weatherFor, LEGEND } from './weatherMeta.js';

const SPRING = { type: 'spring', stiffness: 380, damping: 24, mass: 0.6 };

/* live date: re-renders at midnight so "today" never goes stale */
function useLiveDate() {
  const read = () => {
    const n = new Date();
    return {
      year: n.getFullYear(),
      month: n.getMonth(),
      today: n.getDate(),
      total: new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate(),
    };
  };
  const [info, setInfo] = useState(read);

  useEffect(() => {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
    const t = setTimeout(() => setInfo(read()), next - now);
    return () => clearTimeout(t);
  }, [info.today, info.month]);

  return info;
}

const lift = (hovered, i) => {
  if (hovered === null) return { scale: 1, y: 0 };
  const dist = Math.abs(hovered - i);
  if (dist === 0) return { scale: 1.14, y: -8 };
  if (dist === 1) return { scale: 1.06, y: -3 };
  if (dist === 2) return { scale: 1.02, y: -1 };
  return { scale: 1, y: 0 };
};

const Legend = ({ className = '' }) => (
  <div className={`flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/70 ${className}`}>
    {LEGEND.map(([l, i]) => (
      <span key={l} className="flex items-center gap-1.5">
        <i className="h-2 w-2 rounded-full" style={{ background: WEATHER[i].c }} />
        {l}
      </span>
    ))}
  </div>
);

/* ---------- custom colourful scroll rail ---------- */
function ScrollRail({ scrollerRef, days, today, dateOf, onHoverIndex, onDragChange }) {
  const N = days.length;
  const trackRef = useRef(null);
  const drag = useRef(null);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [tip, setTip] = useState(null);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const width = Math.min(100, Math.max(8, (el.clientWidth / el.scrollWidth) * 100));
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setThumb({ left: ratio * (100 - width), width });
  }, [scrollerRef]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, [scrollerRef, sync, N]);

  const idxAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const f = Math.min(0.999, Math.max(0, (clientX - r.left) / r.width));
    return { idx: Math.floor(f * N), x: clientX - r.left, frac: f };
  };

  const onTrackMove = (e) => {
    const { idx, x } = idxAt(e.clientX);
    setTip({ x, idx });
    onHoverIndex(idx);
  };

  const onTrackLeave = () => {
    setActive(false);
    setTip(null);
    onHoverIndex(null);
  };

  const onTrackDown = (e) => {
    const el = scrollerRef.current;
    const { frac } = idxAt(e.clientX);
    el.scrollTo({ left: frac * el.scrollWidth - el.clientWidth / 2, behavior: 'smooth' });
  };

  const onThumbDown = (e) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    const el = scrollerRef.current;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    setDragging(true);
    onDragChange?.(true);
  };

  const onThumbMove = (e) => {
    if (!drag.current) return;
    const el = scrollerRef.current;
    const trackW = trackRef.current.clientWidth;
    const travel = trackW * (1 - thumb.width / 100);
    const max = el.scrollWidth - el.clientWidth;
    if (travel <= 0) return;
    el.scrollLeft = drag.current.left + ((e.clientX - drag.current.x) / travel) * max;
  };

  const onThumbUp = (e) => {
    drag.current = null;
    setDragging(false);
    onDragChange?.(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const centre = Math.min(N - 1, Math.max(0, Math.round(((thumb.left + thumb.width / 2) / 100) * N - 0.5)));
  const glow = days[centre].c;
  const expanded = active || dragging;

  return (
    <div className="relative px-4 pb-3 pt-1">
      {tip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute -top-7 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md"
          style={{
            left: 16 + tip.x,
            background: days[tip.idx].c + '33',
            borderColor: days[tip.idx].c,
            color: '#fff',
            boxShadow: `0 4px 14px -4px ${days[tip.idx].c}`,
          }}
        >
          {dateOf(tip.idx + 1, { weekday: 'short', day: 'numeric', month: 'short' })} ·{' '}
          <span style={{ color: days[tip.idx].c }}>{days[tip.idx].label}</span>
        </motion.div>
      )}

      <motion.div
        ref={trackRef}
        onPointerEnter={() => setActive(true)}
        onPointerMove={onTrackMove}
        onPointerLeave={onTrackLeave}
        onPointerDown={onTrackDown}
        animate={{ height: expanded ? 16 : 8 }}
        transition={SPRING}
        className="relative flex w-full cursor-pointer touch-none overflow-hidden rounded-full bg-white/5"
      >
        {days.map((M, i) => (
          <span
            key={i}
            className="h-full flex-1 transition-opacity duration-200"
            style={{
              background: M.c,
              opacity: tip?.idx === i ? 0.95 : i + 1 < today ? 0.22 : 0.5,
            }}
          />
        ))}

        <span
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.9)]"
          style={{ left: `${((today - 0.5) / N) * 100}%` }}
        />

        <motion.div
          onPointerDown={onThumbDown}
          onPointerMove={onThumbMove}
          onPointerUp={onThumbUp}
          onPointerCancel={onThumbUp}
          animate={{ scaleY: dragging ? 1.12 : 1 }}
          transition={SPRING}
          className={`absolute inset-y-0 rounded-full border-2 border-white/80 backdrop-blur-[2px] ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            left: `${thumb.left}%`,
            width: `${thumb.width}%`,
            background: 'linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,.12))',
            boxShadow: `0 0 ${expanded ? 18 : 10}px 1px ${glow}, inset 0 0 8px ${glow}66`,
            transition: 'box-shadow .25s',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ---------- main component ---------- */
export default function WeatherStrip({
  sim, base, selected, onSelect,
  title = 'Money Weather',
  sub,
}) {
  const { year, month, today, total } = useLiveDate();
  const todayRef = useRef(null);
  const scrollerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [dragging, setDragging] = useState(false);

  const dateOf = useCallback(
    (d, opts) => new Date(year, month, d).toLocaleDateString('en-IN', opts),
    [year, month]
  );

  // fall back to the last known weather if the forecast is shorter than the month
  const wx = useCallback(
    (d, s) => WEATHER[weatherFor(d, today, s)] ?? WEATHER[weatherFor(Math.min(d, 30), today, s)],
    [today]
  );

  const days = useMemo(
    () => Array.from({ length: total }, (_, i) => wx(i + 1, sim)),
    [total, sim, wx]
  );

  useEffect(() => {
    todayRef.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [today]);

  const subtitle = sub ?? `Your forecast for ${dateOf(1, { month: 'long', year: 'numeric' })}`;

  return (
    <GlassCard>
      <SectionTitle
        icon={CloudSun}
        color="#fbbf24"
        title={title}
        sub={subtitle}
        right={<Legend className="hidden justify-end lg:flex" />}
      />
      <Legend className="mb-3 flex lg:hidden" />

      <div
        ref={scrollerRef}
        onMouseLeave={() => setHovered(null)}
        className={`flex gap-2 overflow-x-auto px-4 pb-4 pt-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? '' : 'snap-x'
        }`}
      >
        {days.map((M, i) => {
          const d = i + 1;
          const worse = base && d >= today && WEATHER.indexOf(M) > WEATHER.indexOf(wx(d, base));
          const past = d < today;
          const isToday = d === today;
          const isSelected = selected === d;
          const isHot = hovered === i;
          const wd = dateOf(d, { weekday: 'short' });

          const glow = isHot
            ? `0 10px 28px -4px ${M.c}aa, 0 0 0 1px ${M.c}`
            : isToday
            ? `0 0 18px -2px ${M.c}`
            : '0 0 0 0 transparent';

          return (
            <motion.button
              key={d}
              ref={isToday ? todayRef : null}
              type="button"
              animate={{ ...lift(hovered, i), opacity: past && !isHot ? 0.45 : 1 }}
              whileTap={{ scale: 0.94, y: 0 }}
              transition={SPRING}
              onHoverStart={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelect?.(d)}
              className={`relative flex w-[58px] shrink-0 snap-center cursor-pointer flex-col items-center gap-1 overflow-visible rounded-xl border px-1 py-2.5 outline-none transition-[box-shadow,border-color] duration-300 ${
                isSelected ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-transparent' : ''
              }`}
              style={{
                background: M.c + '1f',
                borderColor: isHot || isSelected || isToday ? M.c : M.c + '44',
                boxShadow: glow,
                zIndex: isHot ? 20 : 1,
              }}
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{ background: `linear-gradient(160deg, ${M.c}55 0%, ${M.c}10 70%)` }}
                animate={{ opacity: isHot ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-2 h-7 w-7 -translate-x-1/2 rounded-full blur-md"
                style={{ background: M.c }}
                animate={{ opacity: isHot ? 0.55 : 0, scale: isHot ? 1.5 : 0.6 }}
                transition={SPRING}
              />
              <motion.span
                className="relative"
                animate={
                  isHot
                    ? { scale: 1.25, rotate: [0, -12, 10, -6, 0], y: -1 }
                    : { scale: 1, rotate: 0, y: 0 }
                }
                transition={isHot ? { duration: 0.6, ease: 'easeInOut' } : SPRING}
              >
                <M.I size={22} color={M.c} />
              </motion.span>

              <span className="relative whitespace-nowrap text-[11px] font-semibold">
                {wd} {d}
              </span>
              <motion.span
                className="relative whitespace-nowrap text-[11px]"
                style={{ color: M.c }}
                animate={{ scale: isHot ? 1.08 : 1 }}
                transition={SPRING}
              >
                {M.label}
              </motion.span>

              {worse && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
                </span>
              )}
              {isToday && (
                <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-violet-500 px-1.5 py-px text-[9px] font-bold leading-tight">
                  TODAY
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <ScrollRail
        scrollerRef={scrollerRef}
        days={days}
        today={today}
        dateOf={dateOf}
        onHoverIndex={setHovered}
        onDragChange={setDragging}
      />
    </GlassCard>
  );
}