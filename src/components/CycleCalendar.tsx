import { type JSX, useState } from 'react';
import { Calendar, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDateStore } from '../store/dateStore';

/**
 * 周期日历显示组件。
 * 负责渲染日历，并根据全局状态计算和高亮显示工作日、休息日和通勤日。
 */
const CycleCalendar = (): JSX.Element => {
  const { workDays, restDays, startDate, showCommuteDays, commuteDays } =
    useDateStore();

  const [calendarValue, setCalendarValue] = useState(() => dayjs());

  /**
   * 根据给定的日期计算其在周期中的状态（如工作、休息、通勤）。
   */
  const getDayData = (
    value: Dayjs,
  ): { type: string; content: string } | null => {
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
    const halfCommuteDays = actualCommuteDays / 2;

    if (showCommuteDays) {
      if (dayInCycle < halfCommuteDays) {
        return { type: 'commute-day', content: '通' };
      }
      if (dayInCycle < halfCommuteDays + restDays) {
        return { type: 'rest-day', content: '休' };
      }
      if (dayInCycle < halfCommuteDays + restDays + halfCommuteDays) {
        return { type: 'commute-day', content: '通' };
      }
      return { type: 'work-day', content: '班' };
    } else {
      // 如果不显示通勤日，则周期只包含休息日和工作日
      if (dayInCycle < restDays) {
        return { type: 'rest-day', content: '休' };
      }
      return { type: 'work-day', content: '班' };
    }
  };

  /**
   * 自定义渲染日历单元格的内容。
   */
  const cellRender = (date: Dayjs): JSX.Element | null => {
    const dayData = getDayData(date);
    if (!dayData) return null;

    return <div className={`day-label ${dayData.type}`}>{dayData.content}</div>;
  };

  /**
   * 切换到上一个月。
   */
  const onPrevMonth = () => {
    setCalendarValue(calendarValue.subtract(1, 'month'));
  };

  /**
   * 切换到下一个月。
   */
  const onNextMonth = () => {
    setCalendarValue(calendarValue.add(1, 'month'));
  };

  return (
    <div className="calendar-wrapper">
      <Button onClick={onPrevMonth} icon={<LeftOutlined />} />
      <div className="calendar-container">
        <Calendar
          cellRender={cellRender}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          cellClassName={(date) =>
            date.startOf('day').isSame(dayjs().startOf('day'))
              ? 'real-today'
              : ''
          }
          value={calendarValue}
          onPanelChange={(date) => setCalendarValue(date)}
        />
      </div>
      <Button onClick={onNextMonth} icon={<RightOutlined />} />
    </div>
  );
};

export default CycleCalendar;
