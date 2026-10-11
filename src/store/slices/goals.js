const uid=()=>Math.random().toString(36).slice(2,8);
export const goalsSlice=set=>({
 contribute:(id,amt)=>set(s=>({balance:s.balance-amt,goals:s.goals.map(g=>g.id===id?{...g,saved:Math.min(g.target,g.saved+amt),plan:Math.max(0,g.plan-amt)}:g),tx:[{id:uid(),type:'out',amount:amt,label:'Goal contribution',cat:'Savings',day:s.day},...s.tx],toast:{msg:`₹${amt} moved to your goal.`,k:Date.now()}})),
 updateGoal:(id,patch)=>set(s=>({goals:s.goals.map(g=>g.id===id?{...g,...patch}:g)})),
 addGoal:g=>set(s=>({goals:[...s.goals,{id:uid(),within:120,...g}]}))});
