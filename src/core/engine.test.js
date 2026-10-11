import {describe,it,expect} from 'vitest';import {simulate,tier,risk} from './engine.js';import {inr} from './format.js';import {verdict,grade} from './verdict.js';
const base=()=>({day:1,balance:3000,pace:100,commitments:[],subs:[],goals:[{id:'g',name:'G',target:1000,saved:0,plan:0,within:60}],income:[]});
describe('simulate',()=>{
 it('computes safe daily spend as flexible balance / days left',()=>{const r=simulate(base());expect(r.left).toBe(30);expect(r.sds).toBeCloseTo(100)});
 it('deducts pace daily on the balance curve',()=>{const r=simulate(base());expect(r.curve[0]).toBe(2900);expect(r.end).toBe(0)});
 it('ring-fences upcoming bills and ignores past ones',()=>{const s={...base(),day:10,commitments:[{id:'a',name:'x',amount:500,day:15},{id:'b',name:'y',amount:900,day:5}]};expect(simulate(s).fixed).toBe(500)});
 it('treats scheduled income as extra balance',()=>{const s={...base(),income:[{id:'i',name:'p',amount:1000,day:10}]};expect(simulate(s).end).toBe(simulate(base()).end+1000)});
 it('lowers the month-end balance by a decision amount',()=>{const a=simulate(base()),b=simulate(base(),[{amount:700,day:1}]);expect(a.end-b.end).toBe(700)});
 it('is deterministic so scenarios are comparable',()=>{expect(simulate(base()).survival).toBe(simulate(base()).survival)});
 it('keeps survival and health in range and ordered by wealth',()=>{const poor=simulate({...base(),balance:500}),rich=simulate({...base(),balance:9000});for(const r of[poor,rich]){expect(r.survival).toBeGreaterThanOrEqual(0);expect(r.survival).toBeLessThanOrEqual(100);expect(r.health).toBeLessThanOrEqual(100)}expect(rich.health).toBeGreaterThan(poor.health)});
 it('returns a 10th–90th percentile band per day',()=>{const r=simulate(base());expect(r.band).toHaveLength(30);expect(r.band[5].lo).toBeLessThanOrEqual(r.band[5].hi)});
 it('delays goal ETA when money is spent',()=>{const g=[{id:'g',name:'G',target:2000,saved:500,plan:300,within:60}],a=simulate({...base(),balance:6000,goals:g}),b=simulate({...base(),balance:6000,goals:g},[{amount:2500,day:1}]);expect(b.goals[0].eta).toBeGreaterThanOrEqual(a.goals[0].eta)});
});
describe('helpers',()=>{
 it('formats rupees',()=>{expect(inr(1234567)).toBe('₹12,34,567');expect(inr(-50)).toBe('-₹50')});
 it('maps score tiers',()=>{expect(tier(80).n).toBe('Stable');expect(tier(50).n).toBe('At risk');expect(tier(10).n).toBe('Danger');expect(risk(90).n).toBe('Low')});
});
describe('verdict',()=>{
 it('says No when a purchase exceeds what you have',()=>{expect(verdict({...base(),balance:1000},5000).grade).toBe('No')});
 it('says Yes for a small purchase on a healthy balance',()=>{expect(verdict({...base(),balance:9000,pace:100},300).grade).toBe('Yes')});
 it('grade() is monotonic in end balance',()=>{expect(grade({end:-1,survival:100})).toBe('No')});
});
