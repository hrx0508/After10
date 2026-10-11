import {useState} from 'react';import Modal from '../../components/ui/Modal.jsx';import Btn from '../../components/ui/Btn.jsx';import {useFinance} from '../../store/useFinance.js';
const SRC=['Pocket money','Freelance','Stipend','Gift'],CAT=['Food','Travel','Fun','Shopping','Bills','Other'];
const inp='w-full rounded-xl border border-indigo-300/20 bg-black/30 px-4 py-2.5';
export default function QuickAddModal({mode,onClose}){const st=useFinance(),[amt,setAmt]=useState(''),[tag,setTag]=useState(null),[when,setWhen]=useState('now'),[day,setDay]=useState(st.day+3);
 const money=mode==='money',a=+amt||0,opts=money?SRC:CAT,cur=tag||opts[0];
 const go=()=>{money?st.addMoney(a,cur,Math.min(30,Math.max(st.day,+day||st.day)),when==='now'):st.logSpend(a,cur);setAmt('');setTag(null);onClose()};
 return <Modal open={!!mode} onClose={onClose} title={money?'Add money':'Log a spend'}>
  <input type="number" autoFocus value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Amount in ₹" className={inp} aria-label="Amount"/>
  <div className="my-4 flex flex-wrap gap-2">{opts.map(o=><Btn key={o} v={cur===o?'primary':'ghost'} onClick={()=>setTag(o)}>{o}</Btn>)}</div>
  {money&&<div className="mb-4 flex items-center gap-2"><Btn v={when==='now'?'good':'ghost'} onClick={()=>setWhen('now')}>Got it today</Btn><Btn v={when==='later'?'good':'ghost'} onClick={()=>setWhen('later')}>Coming later</Btn>
   {when==='later'&&<input type="number" value={day} min={st.day} max={30} onChange={e=>setDay(e.target.value)} className={`${inp} w-24`} aria-label="Day"/>}</div>}
  <Btn v={money?'good':'primary'} className="w-full" disabled={!a} onClick={go}>{money?'Add money':'Log spend'}</Btn></Modal>}
