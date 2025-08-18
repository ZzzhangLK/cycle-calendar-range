import { type JSX, useState, useMemo } from 'react';
import { Card, DatePicker, Statistic, Row, Col, Empty } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDateStore } from '../store/dateStore';
import { getDayData } from '../utils/cycleCalculator';

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

/**
 * 周期统计面板组件。
 * 负责显示指定日期范围内的总工作日、休息日和通勤日。
 */
const StatsPanel = (): JSX.Element => {
  const cycleParams = useDateStore();
  const { showCommuteDays } = cycleParams;
  const [dateRange, setDateRange] = useState<RangeValue>([
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ]);

  const stats = useMemo(() => {
    const [start, end] = dateRange || [null, null];
    if (!start || !end || !cycleParams.startDate) {
      return { work: 0, rest: 0, commute: 0 };
    }

    const counts = {
      work: 0,
      rest: 0,
      commute: 0,
    };

    let currentDate = start.clone();
    while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
      const dayData = getDayData(currentDate, cycleParams);
      if (dayData) {
        switch (dayData.type) {
          case 'work-day':
            counts.work++;
            break;
          case 'rest-day':
            counts.rest++;
            break;
          case 'commute-day':
            counts.commute++;
            break;
        }
      }
      currentDate = currentDate.add(1, 'day');
    }

    return counts;
  }, [dateRange, cycleParams]);

  const rangePresets: { label: string; value: [Dayjs, Dayjs] }[] = [
    { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    {
      label: '近3个月',
      value: [dayjs().subtract(2, 'month').startOf('month'), dayjs().endOf('month')],
    },
    { label: '今年', value: [dayjs().startOf('year'), dayjs().endOf('year')] },
    {
      label: '明年',
      value: [
        dayjs().add(1, 'year').startOf('year'),
        dayjs().add(1, 'year').endOf('year'),
      ],
    },
  ];

  return (
    <Card title="周期统计" style={{ marginTop: 24 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            presets={rangePresets}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} md={14}>
          {cycleParams.startDate ? (
            <Row gutter={16} justify="space-around">
              <Col>
                <Statistic title="总工作日" value={stats.work} suffix="天" />
              </Col>
              <Col>
                <Statistic title="总休息日" value={stats.rest} suffix="天" />
              </Col>
              {showCommuteDays && (
                <Col>
                  <Statistic
                    title="总通勤日"
                    value={stats.commute}
                    suffix="天"
                  />
                </Col>
              )}
            </Row>
          ) : (
            <Empty description="请先设置周期开始日期以启用统计" />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default StatsPanel;
