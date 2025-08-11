import { useState } from 'react';
import { Calendar, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDateStore } from '../store/dateStore';

/**
 * 周期日历显示组件。
 * 负责渲染日历，并根据全局状态计算和高亮显示工作日、休息日和通勤日。
 * @returns {JSX.Element} 渲染一个包含自定义逻辑的 Ant Design 日历。
 */
const CycleCalendar = () => {
  const { workDays, restDays, startDate, showCommuteDays, commuteDays } =
    useDateStore();

  const [calendarValue, setCalendarValue] = useState(() => dayjs());

  /**
   * 根据给定的日期计算其在周期中的状态（如工作、休息、通勤）。
   * @param {Dayjs} value - 需要计算状态的日期。
   * @returns {{ type: string; content: string } | null} 返回一个包含类型和显示内容的对象，如果日期无效则返回 null。
   */
  const getDayData = (value: Dayjs) => {
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
   * @param {Dayjs} date - 当前单元格的日期。
   * @returns {JSX.Element | null} 返回一个 div 元素用于在单元格右下角显示状态文字。
   */
  const cellRender = (date: Dayjs) => {
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
