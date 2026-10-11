import { inr } from './format.js';
export function buildInsights({ sim, state }) {
    const out = [], act = state.subs.filter(s => s.active);
    const pick = state.selSubs.length ? act.filter(s => state.selSubs.includes(s.id)) : [...act].sort((a, b) => b.amount - a.amount).slice(0, 2);
    if (pick.length) out.push({ tone: 'good', text: `You can save ${inr(pick.reduce((a, s) => a + s.amount, 0))}/month by pausing ${pick.length} subscription${pick.length > 1 ? 's' : ''}.` });
    const i = sim.weather.findIndex(w => w >= 2);
    out.push(i >= 0 ? { tone: 'warn', text: `Your budget will be tight around day ${state.day + i} (${sim.weather[i] === 3 ? 'Storm' : 'Rain'}).` } : { tone: 'good', text: 'No tight days ahead. Your forecast looks calm.' });
    out.push(state.forks.length ? { tone: 'info', text: 'Consider the cheaper option to stay on track with your goal.' } : state.pace > sim.sds ? { tone: 'warn', text: `You spend ${inr(state.pace - sim.sds)}/day above your safe limit.` } : { tone: 'info', text: `You're ${inr(sim.sds - state.pace)}/day under your safe limit. Nice.` });
    return out
}
