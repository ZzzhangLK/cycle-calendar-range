import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

interface DateStore {
  workDays: number;
  restDays: number;
  startDate: Dayjs | null;
  showCommuteDays: boolean;
  commuteDays: number;
  theme: 'light' | 'dark';
  setWorkDays: (days: number) => void;
  setRestDays: (days: number) => void;
  setStartDate: (date: Dayjs | null) => void;
  setShowCommuteDays: (show: boolean) => void;
  setCommuteDays: (days: number) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

export const useDateStore = create<DateStore>((set) => ({
  workDays: 12,
  restDays: 5,
  startDate: dayjs('2025-08-03'),
  showCommuteDays: false,
  commuteDays: 2,
  theme: getInitialTheme(),
  setWorkDays: (days) => set({ workDays: days }),
  setRestDays: (days) => set({ restDays: days }),
  setStartDate: (date) => set({ startDate: date }),
  setShowCommuteDays: (show) => set({ showCommuteDays: show }),
  setCommuteDays: (days) => set({ commuteDays: days }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
