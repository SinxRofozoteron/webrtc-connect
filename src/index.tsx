import { createRoot } from 'react-dom/client';
import React from 'react';

import { App, type AppProps } from './App';

export const mount = (el: HTMLElement, props: AppProps) => {
  const root = createRoot(el);
  root.render(<App {...props} />);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_conversation-dev-root');

  if (devRoot) {
    mount(devRoot, { locale: 'en' });
  }
}
