import Greeting from '../features/dashboard/Greeting.jsx';
import StatCards from '../features/dashboard/StatCards.jsx';
import HealthBreakdown from '../features/dashboard/HealthBreakdown.jsx';
import QuickInsights from '../features/dashboard/QuickInsights.jsx';
import UpcomingCommitments from '../features/dashboard/UpcomingCommitments.jsx';
import WeatherStrip from '../features/weather/WeatherStrip.jsx';
import MultiversePanel from '../features/multiverse/MultiversePanel.jsx';
import SubscriptionRadar from '../features/subscriptions/SubscriptionRadar.jsx';
import ChaosCards from '../features/chaos/ChaosCards.jsx';
import SavingsGoalCard from '../features/goals/SavingsGoalCard.jsx';
import HeroArt from '../components/layout/HeroArt.jsx';
import { useSim, useScenarioRows } from '../hooks/useSim.js';
import { useFin } from '../store/index.js';
export default function HomePage() {
    const sim = useSim(), rows = useScenarioRows(), sel = useFin(s => s.selFork), day = useFin(s => s.day), cur = rows.find(r => r.f.id === sel)?.r;
    return <div className="grid gap-5 xl:grid-cols-[1fr_320px]"><div className="min-w-0 space-y-5"><Greeting /><StatCards />
        <WeatherStrip sim={cur || sim} base={cur ? sim : null} day={day} sub={cur ? 'Showing the selected simulation. Red dots mark days that get worse.' : 'Your 30-day financial forecast'} />
        <MultiversePanel /><div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] 2xl:grid-cols-[1.5fr_1.1fr_1fr]"><div className="lg:col-span-2 2xl:col-span-1"><SubscriptionRadar /></div><ChaosCards /><SavingsGoalCard /></div></div>
        <aside className="space-y-5"><HeroArt>Small decisions<br />create big futures.</HeroArt><HealthBreakdown /><UpcomingCommitments /><QuickInsights /><HeroArt tall>Small steps today.<br />Big freedom tomorrow.</HeroArt></aside></div>
}
