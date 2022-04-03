import '../styles/index.css';

import type { AppProps } from 'next/app';

import { ContextWrapper } from '@utils/state';
import { ThemeProvider } from 'next-themes';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
