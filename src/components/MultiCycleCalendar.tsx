import { type JSX, useState, type CSSProperties } from 'react';
import { Calendar, Tag, Card, Button, Space } from 'antd';
import type { TagProps } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDateStore } from '../store/dateStore';
import { getDayData } from '../utils/cycleCalculator';

/**
 * 多周期日历显示组件。
 * 负责渲染日历，并根据全局状态中所有周期的数据，高亮显示每一天的状态。
 */
const MultiCycleCalendar = (): JSX.Element => {
  const { multiCycles } = useDateStore();
  const [calendarValue, setCalendarValue] = useState(() => dayjs());

  /**
   * 自定义渲染日历单元格的内容。
   * @param date The date being rendered.
   * @param info Extra info about the cell.
   */
  const cellRender = (date: Dayjs, info: { type: string }) => {
    if (info.type !== 'date') {
      return null;
    }

    const dayEvents = [];
    for (const cycle of multiCycles) {
      const dayData = getDayData(date, { ...cycle, showCommuteDays: false, commuteDays: 0 });
      if (dayData) {
        dayEvents.push({
          key: cycle.id,
          color: cycle.color,
          name: cycle.name,
          status: dayData.content,
        });
      }
    }

    if (dayEvents.length === 0) {
      return null;
    }

    return (
      <Space direction="vertical" size={4} style={{ width: '100%' }}>
        {dayEvents.map((item) => {
          const isWorkDay = item.status === '班';
          const tagProps: TagProps & { style: CSSProperties } = {
            style: {
              width: '100%',
              margin: 0,
            },
          };

          if (isWorkDay) {
            // 工作日：实心标签
            tagProps.color = item.color;
          } else {
            // 休息日：描边标签
            tagProps.style.backgroundColor = 'transparent';
            tagProps.style.borderColor = item.color;
            tagProps.style.color = item.color;
          }

          return (
            <Tag key={item.key} {...tagProps}>
              {item.name} - {item.status}
            </Tag>
          );
        })}
      </Space>
    );
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
    <Card title="多周期日历视图" style={{ marginTop: 24 }}>
      <div className="calendar-wrapper">
        <Button onClick={onPrevMonth} icon={<LeftOutlined />} />
        <div className="calendar-container">
          <Calendar
            cellRender={cellRender}
            value={calendarValue}
            onPanelChange={(date) => setCalendarValue(date)}
          />
        </div>
        <Button onClick={onNextMonth} icon={<RightOutlined />} />
      </div>
    </Card>
  );
};

export default MultiCycleCalendar;
