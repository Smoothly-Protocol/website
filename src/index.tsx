import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);

