import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Typography, Switch } from 'antd';
import { useDateStore } from './store/dateStore';
import SingleCyclePage from './pages/SingleCyclePage';
import MultiCyclePage from './pages/MultiCyclePage';
import ModeSwitcher from './components/ModeSwitcher';
import Footer from './components/Footer';
import type { JSX } from 'react';

const { Title } = Typography;

/**
 * 根布局组件。
 * 包含所有页面共享的页头、模式切换器、页脚等。
 * 通过 <Outlet /> 在中间渲染当前路由匹配的页面。
 */
const RootLayout = (): JSX.Element => {
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
      <ModeSwitcher />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * 应用主组件, 负责定义应用的路由结构。
 */
function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/single" replace />} />
        <Route path="single" element={<SingleCyclePage />} />
        <Route path="multi" element={<MultiCyclePage />} />
      </Route>
    </Routes>
  );
}

export default App;
