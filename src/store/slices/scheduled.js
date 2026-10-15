const uid = () => Math.random().toString(36).slice(2, 8);

export const scheduledSlice = set => ({
  addScheduled: item => set(s => ({
    scheduled: [...s.scheduled, { id: uid(), ...item }],
    toast: { msg: `${item.label} scheduled for day ${item.day}.`, k: Date.now() },
  })),

  updateScheduled: (id, patch) => set(s => ({
    scheduled: s.scheduled.map(x => (x.id === id ? { ...x, ...patch } : x)),
    toast: { msg: 'Scheduled item updated.', k: Date.now() },
  })),

  deleteScheduled: id => set(s => ({
    scheduled: s.scheduled.filter(x => x.id !== id),
    toast: { msg: 'Scheduled item removed.', k: Date.now() },
  })),

  payScheduled: id => set(s => {
    const it = s.scheduled.find(x => x.id === id);
    if (!it) return {};
    const out = it.type === 'out';
    return {
      scheduled: s.scheduled.filter(x => x.id !== id),
      balance: s.balance + (out ? -it.amount : it.amount),
      tx: [{ id: uid(), type: it.type, amount: it.amount, label: it.label, cat: it.cat, day: it.day }, ...s.tx],
      toast: { msg: out ? `${it.label} paid.` : `${it.label} received.`, k: Date.now() },
    };
  }),
});