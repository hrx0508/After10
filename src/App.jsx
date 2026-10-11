import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shell from './components/layout/Shell.jsx';
import Home from './features/home/Home.jsx';import Multiverse from './features/multiverse/Multiverse.jsx';
import Weather from './features/weather/Weather.jsx';import Subscriptions from './features/subscriptions/Subscriptions.jsx';
import Chaos from './features/chaos/Chaos.jsx';import Goals from './features/goals/Goals.jsx';import Orbit from './features/orbit/Orbit.jsx';
export default function App(){return <BrowserRouter><Routes><Route element={<Shell/>}>
 <Route index element={<Home/>}/><Route path="multiverse" element={<Multiverse/>}/><Route path="weather" element={<Weather/>}/>
 <Route path="subscriptions" element={<Subscriptions/>}/><Route path="chaos" element={<Chaos/>}/><Route path="goals" element={<Goals/>}/><Route path="orbit" element={<Orbit/>}/>
</Route></Routes></BrowserRouter>}
