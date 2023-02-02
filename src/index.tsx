import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import App from './App';
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import './css/rainbowkit.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const { chains, provider } = configureChains(
  [goerli, polygon, optimism, arbitrum],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Smoothly Protocol',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);

