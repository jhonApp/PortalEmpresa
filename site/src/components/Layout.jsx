import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import GlobalStyle from '../globalStyles';

function Layout({ children }) {
  const headerHeight = '64px';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '0',
      height: '100vh',
    }}>
      <GlobalStyle></GlobalStyle>
      <Sidebar headerHeight={headerHeight} style={{ height: '100vh' }} />
      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
