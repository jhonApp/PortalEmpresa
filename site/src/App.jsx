import React from 'react';
import Header from './components/Header/Index';
import Sidebar from './components/Sidebar';
import GlobalStyle from './globalStyles';

function App() {
  const headerHeight = '64px';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '40vh auto', // Definindo a largura do Sidebar como 40vh e o Header ocupando o restante do espaço
      gap: '0', // Espaçamento entre os elementos
      height: '100vh', // Definindo a altura total da página
    }}>
      <GlobalStyle />
      <Sidebar headerHeight={headerHeight} style={{ height: '100vh' }} />
      <Header />
    </div>
  );
}

export default App;