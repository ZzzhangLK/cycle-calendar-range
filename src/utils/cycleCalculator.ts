import type { Dayjs } from 'dayjs';

export interface CycleParams {
  workDays: number;
  restDays: number;
  startDate: Dayjs | null;
  showCommuteDays: boolean;
  commuteDays: number;
}

export interface DayData {
  type: 'work-day' | 'rest-day' | 'commute-day';
  content: '班' | '休' | '通';
}

/**
 * 根据给定的日期和周期参数计算其在周期中的状态（如工作、休息、通勤）。
 * @param value The date to check.
 * @param params The cycle parameters.
 * @returns The data for the day, or null if not applicable.
 */
export const getDayData = (
  value: Dayjs,
  params: CycleParams,
): DayData | null => {
  const { workDays, restDays, startDate, showCommuteDays, commuteDays } = params;

  if (!startDate || workDays <= 0 || restDays <= 0) {
    return null;
  }

  const actualCommuteDays = showCommuteDays ? commuteDays : 0;
  const totalDaysInCycle = workDays + restDays + actualCommuteDays;
  const diff = value.startOf('day').diff(startDate.startOf('day'), 'day');

  if (diff < 0) {
    return null;
  }

  const dayInCycle = diff % totalDaysInCycle;

  // 修正后的逻辑：先工作，再休息
  if (showCommuteDays) {
    const halfCommuteDays = actualCommuteDays / 2;
    // 顺序: 工作日 -> 通勤 -> 休息日 -> 通勤
    if (dayInCycle < workDays) {
      return { type: 'work-day', content: '班' };
    }
    if (dayInCycle < workDays + halfCommuteDays) {
      return { type: 'commute-day', content: '通' };
    }
    if (dayInCycle < workDays + halfCommuteDays + restDays) {
      return { type: 'rest-day', content: '休' };
    }
    return { type: 'commute-day', content: '通' };
  } else {
    // 顺序: 工作日 -> 休息日
    if (dayInCycle < workDays) {
      return { type: 'work-day', content: '班' };
    }
    return { type: 'rest-day', content: '休' };
  }
};
