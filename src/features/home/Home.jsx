import {useNavigate} from 'react-router-dom';import Card from '../../components/ui/Card.jsx';import Btn from '../../components/ui/Btn.jsx';import {GitBranch} from 'lucide-react';
import ForecastChart from '../../components/charts/ForecastChart.jsx';import WeatherStrip from '../weather/WeatherStrip.jsx';
import StatCards from './StatCards.jsx';import HealthBreakdown from './HealthBreakdown.jsx';import DaysOfLife from './DaysOfLife.jsx';import SpendDonut from './SpendDonut.jsx';import Upcoming from './Upcoming.jsx';import Insights from './Insights.jsx';
import {useFinance} from '../../store/useFinance.js';import {useSim} from '../../hooks/useSim.js';
export default function Home(){const st=useFinance(),r=useSim(),go=useNavigate();
 return <div className="space-y-5"><div><h1 className="text-3xl font-bold">Good morning, Explorer 👋</h1><p className="text-sm text-indigo-200/80">Here's your financial snapshot for Day {st.day}. Let's make it count.</p></div>
  <StatCards st={st} r={r}/>
  <Card><div className="mb-3 flex items-center justify-between"><h3 className="font-bold">Money weather</h3><Btn onClick={()=>go('/weather')}>Full forecast</Btn></div><WeatherStrip sim={r} day={st.day}/></Card>
  <div className="grid gap-5 lg:grid-cols-3"><Card className="lg:col-span-2"><div className="mb-2 flex items-center justify-between"><h3 className="font-bold">Projected balance · risk fan</h3><Btn v="primary" onClick={()=>go('/multiverse')}><GitBranch size={16}/>Fork my month</Btn></div><ForecastChart base={r}/></Card><HealthBreakdown r={r}/></div>
  <div className="grid gap-5 lg:grid-cols-3"><DaysOfLife r={r}/><SpendDonut ledger={st.ledger}/><Insights st={st} r={r}/></div><Upcoming st={st}/></div>}
