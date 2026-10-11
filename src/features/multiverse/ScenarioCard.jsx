import {motion} from 'framer-motion';import {Icon} from '../../components/ui/IconMap.jsx';import Badge from '../../components/ui/Badge.jsx';import DeltaChip from '../../components/ui/DeltaChip.jsx';import {inr,pct,scenarioRisk} from '../../engine/format.js';
const Row=({label,value,d})=><div className="mb-2.5"><p className="text-[11px] text-white/55">{label}</p><div className="flex items-baseline justify-between"><span className="font-semibold">{value}</span><DeltaChip v={d} suf="%" /></div></div>;
export default function ScenarioCard({f,r,base,selected,onSelect}){const R=scenarioRisk(r.survival),c=selected?'#a78bfa':R.c;
 return <motion.button layout whileHover={{y:-4}} onClick={onSelect} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="glass relative rounded-2xl p-4 text-left" style={{borderColor:selected?'#a78bfa':R.c+'55',boxShadow:selected?'0 0 34px -6px #8b5cf6':undefined}}>
  <div className="mb-2 flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold"><span className="grid h-7 w-7 place-items-center rounded-lg" style={{background:c+'33',color:c}}><Icon name={f.icon} size={15}/></span>{f.title}</span>{f.badge&&<Badge>{f.badge}</Badge>}</div>
  <p className="mb-3 text-xl font-bold">{inr(f.amount)}</p>
  <Row label="Safe Daily Spend" value={`${inr(r.sds)} /day`} d={pct(r.sds,base.sds)}/><Row label="Month End Balance" value={inr(r.end)} d={pct(r.end,base.end)}/>
  <Row label="Goal Progress" value={`${Math.round(r.goals[0].proj)}%`} d={r.goals[0].proj-base.goals[0].proj}/>
  <div className="mt-3"><Badge color={R.c}>{R.n}</Badge><p className="mt-1.5 text-[11px] text-white/60">{R.note}</p></div></motion.button>}
