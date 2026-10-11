import {Lightbulb,AlertTriangle,CheckCircle2} from 'lucide-react';import Card from '../../components/ui/Card.jsx';import {inr} from '../../core/format.js';
const make=(st,r)=>{const out=[],act=st.subs.filter(s=>s.active),drain=act.reduce((a,s)=>a+s.amount,0),storm=r.weather.findIndex(w=>w>=3);
 if(act.length)out.push({I:Lightbulb,c:'#fbbf24',t:`Pausing ${act.length} subscriptions frees ${inr(drain)}/month.`});
 if(storm>=0)out.push({I:AlertTriangle,c:'#fb7185',t:`Your budget gets tight around Day ${st.day+storm} (storm).`});
 if(r.sds<r.pace)out.push({I:AlertTriangle,c:'#fb7185',t:`You spend ${inr(r.pace-r.sds)}/day above your safe limit.`});
 else out.push({I:CheckCircle2,c:'#34d399',t:`You have ${inr(r.sds-r.pace)}/day of breathing room.`});
 return out};
export default function Insights({st,r}){return <Card><h3 className="mb-3 font-bold">Quick insights</h3><ul className="space-y-3 text-sm">{make(st,r).map((x,i)=><li key={i} className="flex gap-3"><x.I size={18} color={x.c} className="shrink-0"/>{x.t}</li>)}</ul></Card>}
