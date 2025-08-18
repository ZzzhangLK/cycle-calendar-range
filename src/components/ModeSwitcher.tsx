import { Segmented } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import type { JSX } from 'react';

const ModeSwitcher = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // 从当前路径中提取模式名称，例如 /single -> single
  const currentMode = location.pathname.substring(1);

  const handleModeChange = (value: string | number) => {
    navigate(`/${value}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
      <Segmented
        options={[
          { label: '单周期模式', value: 'single' },
          { label: '多周期模式', value: 'multi' },
        ]}
        value={currentMode}
        onChange={handleModeChange}
      />
    </div>
  );
};

export default ModeSwitcher;
