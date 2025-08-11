import { useState } from 'react';
import { Calendar, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDateStore } from '../store/dateStore';

const CycleCalendar = () => {
  const {
    workDays,
    restDays,
    startDate,
    showCommuteDays,
    commuteDays,
  } = useDateStore();

  const [calendarValue, setCalendarValue] = useState(() => dayjs());

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
      // Cycle starts with rest days
      if (dayInCycle < restDays) {
        return { type: 'rest-day', content: '休' };
      }
      return { type: 'work-day', content: '班' };
    }
  };

  const cellRender = (date: Dayjs) => {
    const dayData = getDayData(date);
    if (!dayData) return null;

    return <div className={`day-label ${dayData.type}`}>{dayData.content}</div>;
  };

  const onPrevMonth = () => {
    setCalendarValue(calendarValue.subtract(1, 'month'));
  };

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
            date.startOf('day').isSame(dayjs().startOf('day')) ? 'real-today' : ''
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
