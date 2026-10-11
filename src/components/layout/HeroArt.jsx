export default function HeroArt({children,tall,className=''}){return <div className={`glass relative overflow-hidden rounded-2xl ${tall?'h-64':'h-36'} ${className}`}>
 <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b1860"/><stop offset=".6" stopColor="#6d3fb5"/><stop offset="1" stopColor="#f08a6b"/></linearGradient></defs>
  <rect width="320" height="200" fill="url(#sk)"/>{[[30,20],[80,50],[140,15],[200,35],[260,18],[290,60]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.3" fill="#fff" opacity=".8"/>)}
  <path d="M0 200V140L60 100L110 150L170 80L230 140L280 110L320 150V200Z" fill="#120f3d" opacity=".9"/><path d="M0 200V165L70 130L130 170L200 120L260 165L320 140V200Z" fill="#0a0827"/>
  <path d="M236 128l4-10 3 4 2-6 3 12z" fill="#05041a"/><circle cx="240" cy="112" r="3" fill="#05041a"/></svg>
 <div className="relative z-10 p-4 text-lg font-bold leading-snug drop-shadow">{children}</div></div>}
