import React from 'react';
import Header from './components/Header/Index';
import Sidebar from './components/Sidebar';
import GlobalStyle from './globalStyles';

function App() {
  return (
    <>
     <GlobalStyle />
     <Header />
     <Sidebar />
    </>
  );
}

export default App;
