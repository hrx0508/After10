import { seed } from '../../data/seed.js';

const uid = () => Math.random().toString(36).slice(2, 8);

export const uiSlice = set => ({
    say: msg => set({ toast: { msg, k: Date.now() } }),
    openModal: (type, props = {}) => set({ modal: { type, props } }),
    closeModal: () => set({ modal: null }),

    completeSetup: ({ user, balance, income, pace }) =>
        set({ user, balance, income, pace, onboarded: true, day: new Date().getDate() }),

    resetAll: () => set({ ...seed(), onboarded: false }),

    addSub: s => set(st => ({
        subs: [...st.subs, { id: uid(), active: true, ...s }],
        toast: { msg: `${s.name} added.`, k: Date.now() },
    })),
    updateSub: (id, patch) => set(st => ({
        subs: st.subs.map(x => (x.id === id ? { ...x, ...patch } : x)),
        toast: { msg: 'Subscription updated.', k: Date.now() },
    })),
    deleteSub: id => set(st => ({
        subs: st.subs.filter(x => x.id !== id),
        selSubs: st.selSubs.filter(x => x !== id),
        toast: { msg: 'Subscription removed.', k: Date.now() },
    })),
});