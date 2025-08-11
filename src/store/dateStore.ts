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

/**
 * 获取用户系统的初始主题偏好（亮色或暗色）。
 * @returns {'light' | 'dark'} 返回 'dark' 或 'light'。
 */
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

// 使用 Zustand 创建全局状态存储
export const useDateStore = create<DateStore>((set) => ({
  workDays: 12, // 默认上班天数
  restDays: 5, // 默认放假天数
  startDate: dayjs('2025-08-03'), // 默认周期开始日期
  showCommuteDays: false, // 默认是否显示通勤日
  commuteDays: 2, // 默认通勤日天数
  theme: getInitialTheme(), // 初始主题模式

  // 设置上班天数
  setWorkDays: (days) => set({ workDays: days }),

  // 设置放假天数
  setRestDays: (days) => set({ restDays: days }),

  // 设置周期开始日期
  setStartDate: (date) => set({ startDate: date }),

  // 设置是否显示通勤日
  setShowCommuteDays: (show) => set({ showCommuteDays: show }),

  // 设置通勤日天数
  setCommuteDays: (days) => set({ commuteDays: days }),

  // 切换主题模式
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
