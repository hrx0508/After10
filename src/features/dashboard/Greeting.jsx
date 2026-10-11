import {useFin} from '../../store/index.js';
export default function Greeting(){const u=useFin(s=>s.user),h=new Date().getHours(),g=h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening';
 return <div className="mb-5"><h1 className="text-3xl font-bold tracking-tight">{g}, {u}! <span className="inline-block origin-[70%_70%] animate-[wave_2s_ease-in-out_infinite]">👋</span></h1><p className="text-sm text-white/60">Here's your financial snapshot for today. Let's make it count.</p>
 <style>{`@keyframes wave{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(16deg)}20%,40%{transform:rotate(-10deg)}}`}</style></div>}
