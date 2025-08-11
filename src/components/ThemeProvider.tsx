import React, { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useDateStore } from '../store/dateStore';
import zhCN from 'antd/locale/zh_CN';

/**
 * 主题提供者组件。
 * 该组件包裹整个应用，根据全局状态动态切换 Ant Design 的主题（亮色/暗色），
 * 并同步更新 body 的 class 以应用自定义的暗色模式样式。
 */
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme: currentTheme } = useDateStore();

  // 使用 useEffect 监听主题变化，并相应地在 body 元素上添加或移除 'dark' class。
  useEffect(() => {
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <ConfigProvider
      locale={zhCN} // 设置 Ant Design 组件语言为中文
      theme={{
        // 根据当前主题状态，应用 antd 的暗色或默认算法
        algorithm:
          currentTheme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          // 全局配置字体
          fontFamily: `'Noto Serif SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
        },
        components: {
          Calendar: { itemActiveBg: '#f5f5f5' },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
