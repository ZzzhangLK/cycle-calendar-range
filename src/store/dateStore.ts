import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

// 多周期模式下的单个周期对象接口
export interface MultiCycle {
  id: string;
  name: string;
  color: string;
  workDays: number;
  restDays: number;
  startDate: Dayjs | null;
}

interface DateStore {
  // --- 单周期模式状态 ---
  workDays: number;
  restDays: number;
  startDate: Dayjs | null;
  showCommuteDays: boolean;
  commuteDays: number;
  setWorkDays: (days: number) => void;
  setRestDays: (days: number) => void;
  setStartDate: (date: Dayjs | null) => void;
  setShowCommuteDays: (show: boolean) => void;
  setCommuteDays: (days: number) => void;

  // --- 多周期模式状态 ---
  multiCycles: MultiCycle[];
  addMultiCycle: () => void;
  removeMultiCycle: (id: string) => void;
  updateMultiCycle: (id: string, newValues: Partial<MultiCycle>) => void;

  // --- 全局共享状态 ---
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/**
 * 获取用户系统的初始主题偏好（亮色或暗色）。
 */
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

// 随机颜色列表，用于新周期的默认颜色
const defaultColors = ['#FF4D4F', '#FAAD14', '#13C2C2', '#52C41A', '#2F54EB', '#722ED1'];

// 使用 Zustand 创建全局状态存储
export const useDateStore = create<DateStore>((set) => ({
  // --- 单周期模式的默认值 ---
  workDays: 12,
  restDays: 5,
  startDate: dayjs('2025-07-05'),
  showCommuteDays: false,
  commuteDays: 2,

  // --- 多周期模式的默认值 ---
  multiCycles: [
    {
      id: uuidv4(),
      name: '主业',
      color: defaultColors[0],
      workDays: 4,
      restDays: 3,
      startDate: dayjs().startOf('month'),
    },
    {
      id: uuidv4(),
      name: '副业',
      color: defaultColors[1],
      workDays: 3,
      restDays: 4,
      startDate: dayjs().startOf('month').add(4, 'days'), // 从上个周日开始
    },
  ],

  // --- 全局共享状态 ---
  theme: getInitialTheme(),

  // --- 单周期模式的 Actions ---
  setWorkDays: (days) => set({ workDays: days }),
  setRestDays: (days) => set({ restDays: days }),
  setStartDate: (date) => set({ startDate: date }),
  setShowCommuteDays: (show) => set({ showCommuteDays: show }),
  setCommuteDays: (days) => set({ commuteDays: days }),

  // --- 多周期模式的 Actions ---
  addMultiCycle: () =>
    set((state) => ({
      multiCycles: [
        ...state.multiCycles,
        {
          id: uuidv4(),
          name: '新周期',
          color: defaultColors[state.multiCycles.length % defaultColors.length],
          workDays: 1,
          restDays: 1,
          startDate: dayjs(),
        },
      ],
    })),
  removeMultiCycle: (id) =>
    set((state) => ({
      multiCycles: state.multiCycles.filter((cycle) => cycle.id !== id),
    })),
  updateMultiCycle: (id, newValues) =>
    set((state) => ({
      multiCycles: state.multiCycles.map((cycle) =>
        cycle.id === id ? { ...cycle, ...newValues } : cycle,
      ),
    })),

  // --- 全局共享 Actions ---
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
