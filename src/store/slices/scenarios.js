const uid=()=>Math.random().toString(36).slice(2,8);
export const scenarioSlice=set=>({
 runScenarios:(item,amount)=>set(s=>{const f=[{id:uid(),kind:'now',title:'Buy Now',badge:'Popular',icon:'bag',amount,day:s.day,label:item},
  {id:uid(),kind:'wait',title:'Wait 2 Weeks',icon:'clock',amount,day:Math.min(30,s.day+14),label:item,thrift:.3},
  {id:uid(),kind:'cheap',title:`Cheaper ${item.split(' ')[0]}`,icon:'tag',amount:Math.round(amount*.4/10)*10,day:s.day,label:item}];return{forks:f,selFork:f[0].id}}),
 selectFork:id=>set({selFork:id}),
 discard:()=>set({forks:[],selFork:null,burst:Date.now(),toast:{msg:'Simulation discarded.',k:Date.now()}}),
 commit:()=>set(s=>{const f=s.forks.find(x=>x.id===s.selFork);if(!f)return s;const now=f.day<=s.day;
  return{forks:[],selFork:null,balance:now?s.balance-f.amount:s.balance,
   tx:now?[{id:uid(),type:'out',amount:f.amount,label:f.label,cat:'Shopping',day:s.day},...s.tx]:s.tx,
   commitments:now?s.commitments:[...s.commitments,{id:uid(),name:f.label,amount:f.amount,day:f.day,icon:'bag',kind:'One-time'}],
   toast:{msg:`Committed "${f.title}". Everything recalculated.`,k:Date.now()}}})});
