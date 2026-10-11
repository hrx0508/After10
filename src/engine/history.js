/** Running balance per day (1..day) rebuilt from the transaction log. */
export function balanceHistory(tx,day){const out=[];let b=0;for(let d=1;d<=day;d++){tx.filter(t=>t.day===d).forEach(t=>{b+=t.type==='in'?t.amount:-t.amount});out.push(b)}return out}
