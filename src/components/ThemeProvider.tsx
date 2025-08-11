import { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useDateStore } from '../store/dateStore';
import zhCN from 'antd/locale/zh_CN';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme: currentTheme } = useDateStore();

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: `'Noto Serif SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
