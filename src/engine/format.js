export const inr=n=>(n<0?'-':'')+'₹'+Math.abs(Math.round(n)).toLocaleString('en-IN');
export const dateLabel=d=>`Oct ${d}`;
export const pct=(a,b)=>b?((a-b)/Math.abs(b))*100:0;
export const healthTier=h=>h>=80?{n:'Excellent',c:'#22d3a0'}:h>=60?{n:'Good',c:'#2dd4bf'}:h>=40?{n:'Fair',c:'#fbbf24'}:{n:'Poor',c:'#fb7185'};
export const riskOf=s=>s>=75?{n:'Low',c:'#22d3a0',note:'On track'}:s>=45?{n:'Medium',c:'#fbbf24',note:'Watch spending'}:{n:'High',c:'#fb7185',note:'Act now'};
export const scenarioRisk=s=>s>=60?{n:'Good',c:'#22d3a0',note:'Best balance of fun & future.'}:s>=40?{n:'Moderate',c:'#fbbf24',note:'Better balance, more control.'}:{n:'Critical',c:'#fb7185',note:'High risk. May delay your goal.'};
export const skyColor=h=>h>=60?'#0d5c55':h>=40?'#6b4a0f':'#6b1427';
