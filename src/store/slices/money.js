import {seed} from '../../data/seed.js';import {inr} from '../../engine/format.js';
const uid=()=>Math.random().toString(36).slice(2,8),log=(s,type,amount,label,cat)=>({id:uid(),type,amount:Math.abs(amount),label,cat,day:s.day});
export const moneySlice=set=>({
 addMoney:({type,amount,label,cat})=>set(s=>({balance:s.balance+(type==='in'?amount:-amount),tx:[log(s,type,amount,label||cat,cat),...s.tx],toast:{msg:`${type==='in'?'Added':'Logged'} ${inr(amount)}. Forecast updated.`,k:Date.now()}})),
 shock:(label,delta)=>set(s=>({balance:s.balance+delta,tx:[log(s,delta>0?'in':'out',delta,label,'Chaos'),...s.tx],toast:{msg:`${label}: ${delta>0?'+':'-'}${inr(Math.abs(delta))}. Forecast recalculated.`,k:Date.now()}})),
 nextDay:()=>set(s=>{if(s.day>=30)return{toast:{msg:'Month complete. Reset the demo to replay.',k:Date.now()}};
  const due=[...s.commitments,...s.subs.filter(x=>x.active)].filter(b=>b.day===s.day),paid=due.reduce((a,b)=>a+b.amount,0);
  return{day:s.day+1,balance:s.balance-s.pace-paid,tx:[...due.map(b=>log(s,'out',b.amount,b.name,'Bills')),log(s,'out',s.pace,'Daily spending','Daily'),...s.tx],forks:s.forks.map(f=>({...f,day:Math.max(f.day,s.day+1)}))}}),
 setPace:pace=>set({pace}),
 reset:()=>set({...seed()})});
