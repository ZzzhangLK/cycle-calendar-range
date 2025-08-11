import { Typography } from 'antd';
import CycleForm from '../components/CycleForm';
import CycleCalendar from '../components/CycleCalendar';
import Footer from '../components/Footer';

const { Title } = Typography;

const HomePage = () => {
  return (
    <div className="container">
      <Title level={2} style={{ textAlign: 'center' }}>
        周期日历
      </Title>
      <CycleForm />
      <CycleCalendar />
      <Footer />
    </div>
  );
};

export default HomePage;
