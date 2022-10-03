import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { applyInterceptors } from './store/axios';
import customTheme from './utils/theme';

// We call the applyInterceptors in `main.tsx`
// since we need to apply all of the axios interceptors
applyInterceptors();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
);
