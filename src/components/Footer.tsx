import type { JSX } from 'react';

/**
 * 页面页脚组件。
 * 显示版权信息和项目开源地址。
 */
const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Copyright © {currentYear} cycle-calendar-range. All Rights Reserved.
        </p>
        <p>
          Open Source project, available on{' '}
          <a
            href="https://github.com/ZzzhangLK/cycle-calendar-range"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
