import { Typography, Switch } from 'antd';
import { useDateStore } from '../store/dateStore';
import CycleForm from '../components/CycleForm';
import CycleCalendar from '../components/CycleCalendar';
import Footer from '../components/Footer';

const { Title } = Typography;

const HomePage = () => {
  const { theme, toggleTheme } = useDateStore();

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
          周期日历
        </Title>
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          checkedChildren="暗"
          unCheckedChildren="亮"
          style={{ position: 'absolute', right: 0 }}
        />
      </div>
      <CycleForm />
      <CycleCalendar />
      <Footer />
    </div>
  );
};

export default HomePage;
