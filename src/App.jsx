import {lazy,Suspense} from 'react';import {HashRouter,Routes,Route} from 'react-router-dom';import {MotionConfig} from 'framer-motion';
import Shell from './components/layout/Shell.jsx';
const page=f=>lazy(f);
const Home=page(()=>import('./features/home/Home.jsx')),Multiverse=page(()=>import('./features/multiverse/Multiverse.jsx')),Weather=page(()=>import('./features/weather/Weather.jsx')),
 Subscriptions=page(()=>import('./features/subscriptions/Subscriptions.jsx')),Chaos=page(()=>import('./features/chaos/Chaos.jsx')),Goals=page(()=>import('./features/goals/Goals.jsx')),
 Orbit=page(()=>import('./features/orbit/Orbit.jsx')),Ledger=page(()=>import('./features/ledger/Ledger.jsx'));
/** HashRouter: deep links work on any static host without server rewrites. */
export default function App(){return <MotionConfig reducedMotion="user"><HashRouter><Suspense fallback={<p role="status" className="p-8 text-center text-white/70">Loading…</p>}><Routes><Route element={<Shell/>}>
 <Route index element={<Home/>}/><Route path="multiverse" element={<Multiverse/>}/><Route path="weather" element={<Weather/>}/><Route path="ledger" element={<Ledger/>}/>
 <Route path="subscriptions" element={<Subscriptions/>}/><Route path="chaos" element={<Chaos/>}/><Route path="goals" element={<Goals/>}/><Route path="orbit" element={<Orbit/>}/>
 <Route path="*" element={<Home/>}/></Route></Routes></Suspense></HashRouter></MotionConfig>}
