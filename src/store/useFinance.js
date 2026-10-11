import {create} from 'zustand';import {persist} from 'zustand/middleware';
const uid=()=>Math.random().toString(36).slice(2,8);
export const FORK_COLORS=['#a78bfa','#38bdf8','#34d399'];
const CATS=['Food','Travel','Fun','Shopping','Food','Fun','Travel','Food','Shopping','Fun','Food'];
const seed=()=>({day:12,balance:6480,
 ledger:[120,90,180,150,110,200,95,140,160,130,110].map((amount,i)=>({id:'l'+i,day:i+1,cat:CATS[i],amount})),
 income:[{id:'i1',name:'Pocket money',amount:1000,day:22}],
 commitments:[{id:'c1',name:'Phone Plan',amount:399,day:18,icon:'📱',tag:'Recurring'},{id:'c2',name:'Travel Pass',amount:600,day:21,icon:'🚇',tag:'One-time'},{id:'c3',name:'Internet',amount:799,day:28,icon:'📶',tag:'Recurring'}],
 subs:[{id:'s1',name:'Spotify',amount:119,day:14,active:true,icon:'🎧'},{id:'s2',name:'Netflix',amount:249,day:16,active:false,icon:'🎬'},{id:'s3',name:'YouTube Premium',amount:149,day:19,active:true,icon:'▶️'},{id:'s4',name:'Amazon Prime',amount:179,day:23,active:false,icon:'📦'}],
 goals:[{id:'g1',name:'Emergency Fund',icon:'🛟',target:5000,saved:1500,plan:300,within:90},{id:'g2',name:'Goa Trip',icon:'🏖️',target:3000,saved:1900,plan:200,within:60}],
 forks:[],toast:null});
export const paceOf=s=>Math.max(60,Math.round(s.ledger.reduce((a,l)=>a+l.amount,0)/Math.max(1,s.day-1)));
export const snapshot=s=>({day:s.day,balance:s.balance,pace:paceOf(s),subs:s.subs,commitments:s.commitments,goals:s.goals,income:s.income});
const T=msg=>({msg,k:Date.now()});
export const useFinance=create(persist((set)=>({...seed(),
 say:msg=>set({toast:T(msg)}),
 addMoney:(amount,name,day,now)=>set(s=>now?{balance:s.balance+amount,toast:T(`+₹${amount} from ${name}. Forecast recalculated.`)}:{income:[...s.income,{id:uid(),name,amount,day}],toast:T(`${name} ₹${amount} scheduled for Day ${day}.`)}),
 logSpend:(amount,cat)=>set(s=>({balance:s.balance-amount,ledger:[...s.ledger,{id:uid(),day:s.day,cat,amount}],toast:T(`Logged ₹${amount} on ${cat}.`)})),
 forkOne:(label,amount)=>set(s=>s.forks.length>=3?s:{forks:[...s.forks,{id:uid(),title:label,label,amount,day:s.day,color:FORK_COLORS.find(c=>!s.forks.some(f=>f.color===c))}]}),
 forkThree:(label,amount)=>set(s=>({forks:[
  {id:uid(),title:'Buy now',label,amount,day:s.day,color:FORK_COLORS[0]},
  {id:uid(),title:'Wait 2 weeks',label,amount,day:Math.min(30,s.day+14),color:FORK_COLORS[1]},
  {id:uid(),title:'Cheaper option',label,amount:Math.round(amount*.6),day:s.day,color:FORK_COLORS[2]}]})),
 discard:id=>set(s=>({forks:id?s.forks.filter(f=>f.id!==id):[]})),
 merge:id=>set(s=>{const f=s.forks.find(x=>x.id===id);if(!f)return s;const now=f.day<=s.day;
  return{forks:[],balance:now?s.balance-f.amount:s.balance,ledger:now?[...s.ledger,{id:uid(),day:s.day,cat:'Shopping',amount:f.amount}]:s.ledger,
   commitments:now?s.commitments:[...s.commitments,{id:uid(),name:f.label,amount:f.amount,day:f.day,icon:'🛍️',tag:'One-time'}],toast:T(`Committed "${f.title}: ${f.label}" into reality.`)}}),
 addSub:(name,amount,day)=>set(s=>({subs:[...s.subs,{id:uid(),name,amount,day,active:true,icon:'🔁'}],toast:T(`${name} added.`)})),
 setSubs:(ids,active)=>set(s=>({subs:s.subs.map(x=>ids.includes(x.id)?{...x,active}:x)})),
 shock:(label,amt)=>set(s=>({balance:s.balance+amt,toast:T(`${label}: ${amt>0?'+':'-'}₹${Math.abs(amt)}. Forecast recalculated.`)})),
 addGoal:(name,target,plan)=>set(s=>({goals:[...s.goals,{id:uid(),name,icon:'🎯',target,saved:0,plan,within:60}],toast:T(`Goal "${name}" created.`)})),
 contribute:(id,amt)=>set(s=>({balance:s.balance-amt,goals:s.goals.map(g=>g.id===id?{...g,saved:g.saved+amt,plan:Math.max(0,g.plan-amt)}:g),toast:T(`₹${amt} moved to your goal.`)})),
 nextDay:()=>set(s=>{if(s.day>=30)return s;const p=paceOf(s),due=[...s.commitments,...s.subs.filter(x=>x.active)].filter(b=>b.day===s.day).reduce((a,b)=>a+b.amount,0),inc=s.income.filter(i=>i.day===s.day).reduce((a,b)=>a+b.amount,0);
  return{day:s.day+1,balance:s.balance-p-due+inc,ledger:[...s.ledger,{id:uid(),day:s.day,cat:'Food',amount:p}],forks:s.forks.map(f=>({...f,day:Math.max(f.day,s.day+1)}))}}),
 removeSpend:id=>set(s=>{const l=s.ledger.find(x=>x.id===id);return l?{ledger:s.ledger.filter(x=>x.id!==id),balance:s.balance+l.amount,toast:T(`Removed ₹${l.amount} ${l.cat}. Balance restored.`)}:s}),
 removeIncome:id=>set(s=>({income:s.income.filter(x=>x.id!==id)})),
 receiveIncome:id=>set(s=>{const i=s.income.find(x=>x.id===id);return i?{income:s.income.filter(x=>x.id!==id),balance:s.balance+i.amount,toast:T(`Received ₹${i.amount} from ${i.name}.`)}:s}),
 addCommitment:(name,amount,day)=>set(s=>({commitments:[...s.commitments,{id:uid(),name,amount,day,icon:'🧾',tag:'One-time'}],toast:T(`${name} added to upcoming bills.`)})),
 removeCommitment:id=>set(s=>({commitments:s.commitments.filter(x=>x.id!==id)})),
 removeSub:id=>set(s=>({subs:s.subs.filter(x=>x.id!==id)})),
 removeGoal:id=>set(s=>s.goals.length>1?{goals:s.goals.filter(x=>x.id!==id)}:s),
 reset:()=>set(seed())}),{name:'after10-v3',partialize:({toast,...r})=>r}));
