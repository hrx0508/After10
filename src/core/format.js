export const inr=n=>(n<0?'-':'')+'₹'+Math.abs(Math.round(n)).toLocaleString('en-IN');
export const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
