import {simulate} from './engine.js';
/** Plain-language grade for one outcome. */
export const grade=r=>r.end<0||r.survival<50?'No':r.survival<80||r.end<1000?'Risky':'Yes';
/** "Can I afford it?" — grades the purchase and searches for the cheapest fix (freeze a sub, or the 60% option). */
export function verdict(snap,amount,day=snap.day){
 const dec=[{amount,day}],r=simulate(snap,dec),g=grade(r);let fix=null;
 if(g!=='Yes'){
  for(const s of snap.subs.filter(x=>x.active)){const r2=simulate({...snap,subs:snap.subs.map(y=>y.id===s.id?{...y,active:false}:y)},dec);if(grade(r2)==='Yes'){fix=`Freeze ${s.name} and this fits.`;break}}
  if(!fix){const cheap=Math.round(amount*.6);if(grade(simulate(snap,[{amount:cheap,day}]))==='Yes')fix=`The cheaper option (₹${cheap}) fits.`}}
 return{grade:g,r,fix}}
