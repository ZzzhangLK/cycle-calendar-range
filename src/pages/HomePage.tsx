import { Typography, Switch } from 'antd';
import { useDateStore } from '../store/dateStore';
import CycleForm from '../components/CycleForm';
import CycleCalendar from '../components/CycleCalendar';
import Footer from '../components/Footer';
import type { JSX } from 'react';
import StatsPanel from '../components/StatsPanel';

const { Title } = Typography;

/**
 * 首页组件。
 * 作为应用的主页面，整合了标题、主题切换、介绍、表单、日历和页脚等所有子组件。
 */
const HomePage = (): JSX.Element => {
  const { theme, toggleTheme } = useDateStore();

  return (
    <div className="container">
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
          周期日历 - 智能排班与轮班周期计算器
        </Title>
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          checkedChildren="暗"
          unCheckedChildren="亮"
          style={{ position: 'absolute', right: 0 }}
        />
      </header>
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
      <Footer />
    </div>
  );
};

export default HomePage;
