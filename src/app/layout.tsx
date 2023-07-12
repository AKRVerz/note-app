'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from 'src/utils/customTheme';
import store from 'src/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ToastContainer />
          <CacheProvider>
            <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
          </CacheProvider>
        </Provider>
      </body>
    </html>
  );
}
