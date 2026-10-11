import {useMemo} from 'react';import {motion} from 'framer-motion';import {verdict} from '../../core/verdict.js';import {snapshot,useFinance} from '../../store/useFinance.js';import {inr} from '../../core/format.js';
const C={Yes:'#34d399',Risky:'#fbbf24',No:'#fb7185'},T={Yes:'You can afford this.',Risky:'Affordable, but it puts your month at risk.',No:'This would break your month.'};
/** Instant "Can I afford it?" answer for the amount on the slider. */
export default function Verdict({amount}){const s=useFinance(),v=useMemo(()=>verdict(snapshot(s),amount,s.day),[s.day,s.balance,s.ledger,s.subs,s.commitments,s.goals,s.income,amount]);
 return <motion.div key={v.grade} initial={{scale:.96,opacity:.6}} animate={{scale:1,opacity:1}} role="status" className="mt-4 rounded-xl border p-3 text-sm" style={{borderColor:C[v.grade]+'66',background:C[v.grade]+'14'}}>
  <p className="font-bold" style={{color:C[v.grade]}}>{v.grade}: {T[v.grade]}</p><p className="text-xs text-white/75">Day 30 balance {inr(v.r.end)} · {v.r.survival.toFixed(0)}% chance of reaching Day 30.</p>{v.fix&&<p className="mt-1 text-xs">Fix: {v.fix}</p>}</motion.div>}
