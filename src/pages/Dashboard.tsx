import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  if( isConnected ) {
    console.log(address);
  }
  return (
    <>
      <ConnectButton/>
      <h1>This is the Dashboard</h1>
    </>
  );
}

export default Dashboard;
