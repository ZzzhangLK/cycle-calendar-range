# 周期日历 (Cycle Calendar)

一款免费、开源的在线工具，帮助您轻松计算和可视化您的工作与休息周期。适用于各种轮班、排班制度，支持自定义上班天数、休息天数和通勤日。

---

**[➡️ 访问线上应用](https://cycle-calendar-range.vercel.app/)**

![应用截图](https://cycle-calendar-range.vercel.app/screenshot.png) <!-- TODO: Replace with a real screenshot -->

## ✨ 功能特性

- **自定义周期**: 自由设定工作、休息、通勤的天数，以及周期的起始日期。
- **可视化日历**: 在日历上通过不同颜色和标签直观地展示“工作”、“休息”、“通勤”状态。
- **高级选项**: 支持设置通勤日，并能智能地将通勤日安排在休息日两端。
- **深色模式**: 支持手动和根据系统偏好自动切换亮色/暗色模式，保护您的眼睛。
- **响应式设计**: 完美适配桌面和移动设备，在任何屏幕尺寸上都有良好的用户体验。
- **SEO 友好**: 经过优化的SEO配置，更容易被搜索引擎发现。
- **多种字体**: 内置多种优雅的中文字体，可按喜好切换。

## 🛠️ 技术栈

- **前端框架**: [React](https://reactjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 组件库**: [Ant Design](https://ant.design/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **日期处理**: [Day.js](https://day.js.org/)
- **代码规范**: ESLint + Prettier

## 🚀 本地开发

1. **克隆项目到本地**

   ```bash
   git clone https://github.com/ZzzhangLK/cycle-calendar-range.git
   ```

2. **进入项目目录**

   ```bash
   cd cycle-calendar-range
   ```

3. **安装依赖**

   推荐使用 `yarn` 安装项目所需的所有依赖。

   ```bash
   yarn install
   ```

4. **启动开发服务器**

   项目将在 `http://localhost:5173` (或另一个可用端口) 启动。

   ```bash
   yarn dev
   ```

## 📜 可用脚本

在项目目录中，您可以运行以下几个内置脚本：

- **`yarn dev`**: 在开发模式下运行应用。
- **`yarn build`**: 将应用打包为生产环境的静态文件。
- **`yarn lint`**: 使用 ESLint 检查代码规范。

## 📄 许可证

本项目采用 [MIT](https://opensource.org/licenses/MIT) 许可证。
