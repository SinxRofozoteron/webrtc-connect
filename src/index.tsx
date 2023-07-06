import { createRoot } from 'react-dom/client';
import React from 'react';

import { App } from './App';

export const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(<App />);
};

console.log('LOADED MFE');

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_conversation-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}
