import {inr} from '../../core/format.js';
export const DONUT_COLORS=['#818cf8','#38bdf8','#34d399','#fbbf24','#fb7185','#a78bfa'];
/** data: [{name,value}] */
export default function Donut({data,size=130}){const tot=data.reduce((a,d)=>a+d.value,0)||1,R=size/2-14,C=2*Math.PI*R;let off=0;
 return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Spending by category: ${data.map(d=>`${d.name} ${inr(d.value)}`).join(', ')}`}>
  {data.map((d,i)=>{const len=d.value/tot*C,el=<circle key={d.name} cx={size/2} cy={size/2} r={R} fill="none" stroke={DONUT_COLORS[i%6]} strokeWidth="18" strokeDasharray={`${len} ${C-len}`} strokeDashoffset={-off} transform={`rotate(-90 ${size/2} ${size/2})`}/>;off+=len;return el})}
  <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize="13" fontWeight="700" fill="#e6ebff">{inr(tot)}</text></svg>}
