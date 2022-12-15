import React from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <>
    { openConnectModal ? (
      <Landing />
    ) : (
      <Dashboard />
    )}
    </>
  ); 
}

export default App;
