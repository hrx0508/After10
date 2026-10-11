import { useMemo } from 'react'; import { useShallow } from 'zustand/react/shallow'; import { useFin } from '../store/index.js'; import { simulate } from '../engine/simulate.js';
const NONE = [], core = s => ({ day: s.day, balance: s.balance, pace: s.pace, subs: s.subs, commitments: s.commitments, goals: s.goals });
export const useCore = () => useFin(useShallow(core));
export const useSim = (decs = NONE) => { const c = useCore(); return useMemo(() => simulate(c, decs), [c, decs]) };
export const useScenarioRows = () => { const c = useCore(), forks = useFin(s => s.forks); return useMemo(() => forks.map(f => ({ f, r: simulate(c, [f]) })), [c, forks]) };
