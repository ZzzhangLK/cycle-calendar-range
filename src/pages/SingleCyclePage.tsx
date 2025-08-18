import { Typography, Switch } from 'antd';
import { useDateStore } from '../store/dateStore';
import CycleForm from '../components/CycleForm';
import CycleCalendar from '../components/CycleCalendar';
import Footer from '../components/Footer';
import type { JSX } from 'react';
import StatsPanel from '../components/StatsPanel';

const { Title } = Typography;

/**
 * 单周期模式页面。
 * 整合了标题、主题切换、介绍、表单、日历和页脚等所有子组件。
 */
const SingleCyclePage = (): JSX.Element => {
  const { theme, toggleTheme } = useDateStore();

  return (
    <>
      <p className="site-description">
        周期日历是一款免费的在线工具，帮助您轻松计算和可视化您的工作与休息周期。
        <br />
        适用于各种轮班、排班制度，支持自定义上班天数、休息天数和通勤日。
      </p>
      <main>
        <CycleForm />
        <CycleCalendar />
        <StatsPanel />
      </main>
    </>
  );
};

export default SingleCyclePage;
