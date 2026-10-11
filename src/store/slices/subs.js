export const subsSlice=set=>({
 toggleSel:id=>set(s=>({selSubs:s.selSubs.includes(id)?s.selSubs.filter(x=>x!==id):[...s.selSubs,id]})),
 pauseSelected:()=>set(s=>({subs:s.subs.map(x=>s.selSubs.includes(x.id)?{...x,active:false}:x),selSubs:[],toast:{msg:'Subscriptions paused. Runway extended.',k:Date.now()}})),
 resumeSub:id=>set(s=>({subs:s.subs.map(x=>x.id===id?{...x,active:true}:x)}))});
