import {useState,useMemo} from 'react';import {ArrowDownLeft,ArrowUpRight} from 'lucide-react';import Modal from '../../components/ui/Modal.jsx';import Button from '../../components/ui/Button.jsx';import DeltaChip from '../../components/ui/DeltaChip.jsx';
import {useCore,useSim} from '../../hooks/useSim.js';import {useFin} from '../../store/index.js';import {simulate} from '../../engine/simulate.js';import {inr} from '../../engine/format.js';
const CATS={in:['Income','Freelance','Gift','Refund'],out:['Food','Transport','Shopping','Fun','Other']},QUICK=[100,500,1000,2000];
export default function AddMoneyModal({onClose}){const c=useCore(),base=useSim(),addMoney=useFin(s=>s.addMoney),[type,setType]=useState('in'),[amt,setAmt]=useState(1000),[cat,setCat]=useState('Income'),[note,setNote]=useState('');
 const a=useMemo(()=>simulate({...c,balance:c.balance+(type==='in'?amt:-amt)}),[c,type,amt]),pick=t=>{setType(t);setCat(CATS[t][0])};
 return <Modal open onClose={onClose} title="Add money">
  <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">{[['in','Add income',ArrowDownLeft,'#22d3a0'],['out','Log expense',ArrowUpRight,'#fb7185']].map(([t,l,I,col])=><button key={t} onClick={()=>pick(t)} className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition" style={type===t?{background:col+'33',color:col}:{color:'#ffffff88'}}><I size={15}/>{l}</button>)}</div>
  <p className="text-center text-4xl font-bold">{inr(amt)}</p><input type="range" min={50} max={5000} step={50} value={amt} onChange={e=>setAmt(+e.target.value)} aria-label="Amount" className="my-3"/>
  <div className="flex flex-wrap justify-center gap-2">{QUICK.map(q=><button key={q} onClick={()=>setAmt(q)} className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20">{inr(q)}</button>)}</div>
  <div className="mt-4 flex flex-wrap gap-2">{CATS[type].map(k=><button key={k} onClick={()=>setCat(k)} className={`rounded-full border px-3 py-1 text-xs ${cat===k?'border-violet-400 bg-violet-500/30':'border-white/15'}`}>{k}</button>)}</div>
  <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note (optional)" className="mt-3 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm"/>
  <div className="mt-4 space-y-1.5 rounded-xl bg-black/25 p-3 text-sm"><p className="text-xs text-white/50">What changes</p>
   <div className="flex justify-between"><span>Balance</span><b>{inr(c.balance+(type==='in'?amt:-amt))}</b></div>
   <div className="flex justify-between"><span>Safe daily spend</span><span><b>{inr(a.sds)}</b><DeltaChip v={a.sds-base.sds} pre="₹"/></span></div>
   <div className="flex justify-between"><span>Survival odds</span><span><b>{a.survival.toFixed(0)}%</b><DeltaChip v={a.survival-base.survival} suf="%"/></span></div></div>
  <Button className="mt-4 w-full" variant={type==='in'?'success':'danger'} onClick={()=>{addMoney({type,amount:amt,label:note||cat,cat});onClose()}}>{type==='in'?'Add to balance':'Log expense'}</Button></Modal>}
