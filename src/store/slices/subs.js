const uid = () => Math.random().toString(36).slice(2, 8);

export const subsSlice = set => ({
  /* ---- Radar selection ---- */
  toggleSel: id => set(st => ({
    selSubs: st.selSubs.includes(id)
      ? st.selSubs.filter(x => x !== id)
      : [...st.selSubs, id],
  })),

  // freezes every selected subscription, then clears the selection
  pauseSelected: () => set(st => {
    const ids = st.selSubs;
    if (!ids.length) return {};
    return {
      subs: st.subs.map(x => (ids.includes(x.id) ? { ...x, active: false } : x)),
      selSubs: [],
      toast: {
        msg: `${ids.length} subscription${ids.length > 1 ? 's' : ''} paused.`,
        k: Date.now(),
      },
    };
  }),

  resumeSub: id => set(st => ({
    subs: st.subs.map(x => (x.id === id ? { ...x, active: true } : x)),
    toast: { msg: 'Subscription resumed.', k: Date.now() },
  })),

  /* ---- add / edit / delete ---- */
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