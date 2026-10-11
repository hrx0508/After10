import {useMemo} from 'react';import {simulate} from '../core/engine.js';import {useFinance,snapshot} from '../store/useFinance.js';
const NONE=[];
/** Reality (or reality + hypothetical decisions). Pass a memoised array. */
export const useSim=(decs=NONE)=>{const s=useFinance();return useMemo(()=>simulate(snapshot(s),decs),[s.day,s.balance,s.ledger,s.subs,s.commitments,s.goals,s.income,decs])};
/** One simulation per open fork. */
export const useForkRows=()=>{const s=useFinance();return useMemo(()=>s.forks.map(f=>({f,r:simulate(snapshot(s),[f])})),[s.day,s.balance,s.ledger,s.subs,s.commitments,s.goals,s.income,s.forks])};
/** What-if helper: scenario(mutator, decs) → simulation. */
export const useScenario=()=>{const s=useFinance();return (mut,decs=NONE)=>simulate({...snapshot(s),...mut(snapshot(s))},decs)};
