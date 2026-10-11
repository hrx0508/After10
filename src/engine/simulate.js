// The single brain: every screen reads from simulate(state, decisions).
export const DAYS=30;
const sum=a=>a.reduce((x,y)=>x+y.amount,0),cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const r=rng(42),NOISE=Array.from({length:300},()=>Array.from({length:DAYS+1},()=>[r(),r(),r()])); // common random numbers → scenarios comparable
export function simulate(s,decs=[]){
 const t=s.day,left=DAYS-t+1,bills=[...s.commitments,...s.subs.filter(x=>x.active)].filter(b=>b.day>=t);
 const gr=s.goals.map(g=>Math.min(g.plan,Math.max(0,g.target-g.saved))),reserve=gr.reduce((a,b)=>a+b,0);
 const dd=x=>Math.max(x.day,t),spend=sum(decs),fixed=sum(bills),soon=decs.reduce((a,x)=>a+x.amount*(1-.5*(dd(x)-t)/left),0), // waiting lets you plan around a purchase
 flexible=s.balance-fixed-reserve-soon,sds=flexible/left;
 const th=d=>decs.reduce((a,x)=>d<dd(x)?Math.max(a,x.thrift||0):a,0),burn=d=>{let p=0;for(let i=t;i<=d;i++)p+=s.pace*(1-th(i));return p};
 const at=d=>s.balance-burn(d)-sum(bills.filter(b=>b.day<=d))-sum(decs.filter(x=>dd(x)<=d));
 const curve=Array.from({length:left},(_,i)=>at(t+i)),end=curve[left-1],runway=left+end/s.pace;
 const weather=curve.map(v=>{const c=(v-reserve)/s.pace;return c<0?3:c<3?2:c<8?1:0});
 let ok=0;
 for(let k=0;k<300;k++){let b=s.balance,dead=false;
  for(let d=t;d<=DAYS&&!dead;d++){const n=NOISE[k][d];b-=s.pace*(.7+n[0]*.6)*(1-th(d));b-=sum(bills.filter(x=>x.day===d));b-=sum(decs.filter(x=>dd(x)===d));if(n[1]<.05)b-=300+n[2]*1200;if(b<0)dead=true}
  if(!dead)ok++}
 const survival=ok/300*100,funded=reserve?cl(end/reserve):1,saved=s.goals.reduce((a,g)=>a+g.saved,0),tgt=s.goals.reduce((a,g)=>a+g.target,0)||1;
 const parts=[
  {id:'sustain',label:'Budget Sustainability',pct:survival,w:.35,tone:'#22d3a0',why:`${survival.toFixed(0)}% of simulated months reach Day 30 above ₹0.`},
  {id:'cover',label:'Commitment Coverage',pct:cl((s.balance-soon-s.pace*left)/(fixed*1.8||1))*100,w:.2,tone:'#38bdf8',why:'How comfortably your bills are covered after daily spending.'},
  {id:'buffer',label:'Emergency Buffer',pct:cl(end/2000)*100,w:.25,tone:'#fbbf24',why:end>=1000?'You can absorb a surprise ₹1,000 expense.':'A surprise ₹1,000 expense would hurt your Day 30 balance.'},
  {id:'savings',label:'Savings Progress',pct:cl(saved/tgt)*100*funded,w:.2,tone:'#f472b6',why:funded<1?`Goals are only ${Math.round(funded*100)}% funded this month.`:'Goal contributions are funded; progress builds slowly.'}];
 const health=Math.round(parts.reduce((a,p)=>a+p.pct*p.w,0)),extra=Math.max(0,end-reserve);
 const goals=s.goals.map((g,i)=>{const pot=gr[i]*funded+(reserve?extra*gr[i]/reserve:0),rem=Math.max(0,g.target-g.saved);
  return{...g,pot,eta:rem===0?0:pot>0?Math.round(rem/pot*30):Infinity,proj:cl((g.saved+pot*left/30)/g.target)*100}});
 return{left,fixed,reserve,flexible,sds,curve,end,runway,weather,survival,health,parts,goals,bills}}
