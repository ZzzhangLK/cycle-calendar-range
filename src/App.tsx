import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import type { JSX } from 'react';

/**
 * 应用主组件, 负责定义应用的路由结构。
 */
function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
