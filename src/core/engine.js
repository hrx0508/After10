import {clamp as cl,inr} from './format.js';
export const DAYS=30;
const sum=a=>a.reduce((x,y)=>x+y.amount,0);
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const r=rng(42),NOISE=Array.from({length:300},()=>Array.from({length:DAYS+1},()=>[r(),r(),r()])); // common random numbers → scenarios stay comparable
export const tier=h=>h>=70?{n:'Stable',c:'#34d399'}:h>=45?{n:'At risk',c:'#fbbf24'}:{n:'Danger',c:'#fb7185'};
export const risk=s=>s>=85?{n:'Low',c:'#34d399'}:s>=60?{n:'Medium',c:'#fbbf24'}:{n:'High',c:'#fb7185'};
/** The one brain. s = state snapshot, decs = [{amount, day}] hypothetical or committed decisions. */
export function simulate(s,decs=[]){
 const t=s.day,left=DAYS-t+1,inc=(s.income||[]).filter(i=>i.day>=t),bills=[...s.commitments,...s.subs.filter(x=>x.active)].filter(b=>b.day>=t);
 const gr=s.goals.map(g=>Math.min(g.plan,Math.max(0,g.target-g.saved))),reserve=gr.reduce((a,b)=>a+b,0);
 const fixed=sum(bills),inflow=sum(inc),flexible=s.balance+inflow-fixed-reserve-sum(decs),sds=flexible/left,dd=x=>Math.max(x.day,t);
 const at=d=>s.balance-s.pace*(d-t+1)-sum(bills.filter(b=>b.day<=d))-sum(decs.filter(x=>dd(x)<=d))+sum(inc.filter(i=>i.day<=d));
 const curve=Array.from({length:left},(_,i)=>at(t+i)),end=curve[left-1],runway=left+end/s.pace;
 const weather=curve.map(v=>{const c=(v-reserve)/s.pace;return c<0?3:c<1.5?2:c<4?1:0});
 let ok=0;const paths=Array.from({length:left},()=>[]);
 for(let k=0;k<300;k++){let b=s.balance,dead=false;
  for(let d=t;d<=DAYS;d++){const n=NOISE[k][d];b-=s.pace*(.7+n[0]*.6);b-=sum(bills.filter(x=>x.day===d));b+=sum(inc.filter(x=>x.day===d));b-=sum(decs.filter(x=>dd(x)===d));
   if(n[1]<.05)b-=300+n[2]*1200;if(b<0)dead=true;paths[d-t].push(b)}
  if(!dead)ok++}
 const band=paths.map((v,i)=>{v.sort((a,b)=>a-b);return{day:t+i,lo:v[30],mid:v[150],hi:v[270]}});
 const survival=ok/3,funded=reserve?cl(end/reserve):1;
 const parts=[
  {k:'Budget Sustainability',s:survival/100*35,max:35,why:`${survival.toFixed(0)}% of simulated months reach Day 30 without hitting ₹0.`},
  {k:'Commitment Coverage',s:cl((s.balance+inflow)/Math.max(1,fixed*1.5))*20,max:20,why:`Balance + incoming money covers ${inr(fixed)} of upcoming bills.`},
  {k:'Emergency Buffer',s:cl(end/1000)*25,max:25,why:end>=1000?'You can absorb a surprise ₹1,000 expense.':`A surprise ₹1,000 would leave you ${inr(end-1000)} on Day 30.`},
  {k:'Savings Progress',s:funded*20,max:20,why:funded>=1?'Goal contributions are fully funded.':`Goals are only ${Math.round(funded*100)}% funded this month.`}];
 const health=Math.round(parts.reduce((a,p)=>a+p.s,0)),extra=Math.max(0,end-reserve);
 const goals=s.goals.map((g,i)=>{const pot=gr[i]*funded+(reserve?extra*gr[i]/reserve:0),rem=Math.max(0,g.target-g.saved);return{...g,eta:rem===0?0:pot>0?Math.round(rem/pot*30):Infinity}});
 return{left,fixed,inflow,reserve,flexible,sds,curve,band,end,runway,weather,survival,health,parts,goals,bills,pace:s.pace}}
