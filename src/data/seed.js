export const seed = () => ({
  day: new Date().getDate(),
  balance: 0, pace: 0, income: 0, user: '',
  onboarded: false,
  commitments: [], subs: [], goals: [], tx: [], scheduled: [],
  forks: [], selFork: null, selSubs: [], burst: 0, toast: null, modal: null,
});

export const CATS = { Food: '#fb923c', Transport: '#38bdf8', Shopping: '#c084fc', Fun: '#f472b6', Bills: '#fbbf24', Chaos: '#f43f5e', Savings: '#22d3a0', Daily: '#94a3b8', Income: '#22d3a0', Other: '#64748b' };

export const CHAOS = [{ id: 'x1', name: 'Phone Repair', delta: -2500, icon: 'smartphone', blurb: 'Cracked screen at the worst time.' }, { id: 'x2', name: 'Bike Service', delta: -800, icon: 'wrench', blurb: 'Brakes and a chain refresh.' }, { id: 'x3', name: 'Freelance Payment', delta: 1500, icon: 'briefcase', blurb: 'A client finally pays up.' }, { id: 'x4', name: "Friend's Birthday", delta: -600, icon: 'gift', blurb: 'Gift and dinner split.' }, { id: 'x5', name: 'Surprise Refund', delta: 400, icon: 'receipt', blurb: 'An old order gets refunded.' }, { id: 'x6', name: 'Medical Visit', delta: -1200, icon: 'heart', blurb: 'Clinic fee and medicines.' }];