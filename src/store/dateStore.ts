import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

interface DateStore {
  workDays: number;
  restDays: number;
  startDate: Dayjs | null;
  setWorkDays: (days: number) => void;
  setRestDays: (days: number) => void;
  setStartDate: (date: Dayjs | null) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  workDays: 12,
  restDays: 5,
  startDate: dayjs('2025-08-03'),
  setWorkDays: (days) => set({ workDays: days }),
  setRestDays: (days) => set({ restDays: days }),
  setStartDate: (date) => set({ startDate: date }),
}));
