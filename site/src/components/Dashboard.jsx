import React from 'react';
import Header from './Header'; // Caminho relativo ao arquivo Dashboard
import Sidebar from './Sidebar';
import GlobalStyle from '../globalStyles';

function Dashboard() {
  const headerHeight = '64px';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '40vh auto',
      gap: '0',
      height: '100vh',
    }}>
      <GlobalStyle />
      <Sidebar headerHeight={headerHeight} style={{ height: '100vh' }} />
      <Header />
    </div>
  );
}

export default Dashboard;
