import {ResponsiveContainer,ComposedChart,Area,Line,XAxis,YAxis,Tooltip,ReferenceLine,CartesianGrid} from 'recharts';import {inr} from '../../core/format.js';
/** Reality line + p10–p90 risk fan + one line per fork. */
export default function ForecastChart({base,forks=[],height=260}){
 const data=base.band.map((b,i)=>{const row={day:b.day,band:[Math.round(b.lo),Math.round(b.hi)],reality:Math.round(base.curve[i])};forks.forEach(({f,r})=>{row[f.id]=Math.round(r.curve[i])});return row});
 return <ResponsiveContainer width="100%" height={height}><ComposedChart data={data}><defs><linearGradient id="fan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8" stopOpacity=".35"/><stop offset="100%" stopColor="#7c5cff" stopOpacity=".05"/></linearGradient></defs>
  <CartesianGrid stroke="rgba(148,163,255,.08)" vertical={false}/><XAxis dataKey="day" tick={{fill:'#8b95c9',fontSize:11}} tickFormatter={d=>`D${d}`}/><YAxis tick={{fill:'#8b95c9',fontSize:11}} width={52} tickFormatter={v=>`₹${v}`}/>
  <Tooltip contentStyle={{background:'#0a1030',border:'1px solid #3b4a9a',borderRadius:12}} labelFormatter={d=>`Day ${d}`} formatter={(v,n)=>[Array.isArray(v)?`${inr(v[0])} – ${inr(v[1])}`:inr(v),n]}/>
  <ReferenceLine y={0} stroke="#fb7185" strokeDasharray="4 4"/>
  <Area dataKey="band" name="Likely range" stroke="none" fill="url(#fan)"/>
  <Line dataKey="reality" name="Reality" stroke="#818cf8" strokeWidth={3} dot={false}/>
  {forks.map(({f})=><Line key={f.id} dataKey={f.id} name={f.title} stroke={f.color} strokeWidth={2.5} strokeDasharray="6 4" dot={false}/>)}</ComposedChart></ResponsiveContainer>}
