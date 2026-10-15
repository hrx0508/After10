import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seed } from '../data/seed.js';
import { uiSlice } from './slices/ui.js';
import { moneySlice } from './slices/money.js';
import { scenarioSlice } from './slices/scenarios.js';
import { subsSlice } from './slices/subs.js';
import { goalsSlice } from './slices/goals.js';
import { scheduledSlice } from './slices/scheduled.js';

export const useFin = create(
  persist(
    (...a) => ({
      ...seed(),
      ...uiSlice(...a),
      ...moneySlice(...a),
      ...scenarioSlice(...a),
      ...subsSlice(...a),
      ...goalsSlice(...a),
      ...scheduledSlice(...a),
    }),
    {
      name: 'after10-v2',
      partialize: ({ toast, modal, ...r }) => r,
      version: 4,
      migrate: () => seed(), // one-time wipe of old demo data
    }
  )
);