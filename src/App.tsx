import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

/**
 * 应用主组件。
 * 负责定义应用的路由结构。
 * @returns {JSX.Element} 路由配置。
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
