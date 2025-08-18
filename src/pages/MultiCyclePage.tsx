import type { JSX } from 'react';
import MultiCycleForm from '../components/MultiCycleForm';
import MultiCycleCalendar from '../components/MultiCycleCalendar';

const MultiCyclePage = (): JSX.Element => {
  return (
    <>
      <p className="site-description">
        在下方管理您的多个周期。您可以为每个周期设置独立的名称、颜色、工作/休息节奏和起始日期。
        <br />
        所有周期的状态将同时呈现在下方的日历中。
      </p>
      <MultiCycleForm />
      <MultiCycleCalendar />
    </>
  );
};

export default MultiCyclePage;
