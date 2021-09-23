import { ThemeProvider } from '@material-ui/core/styles';
import React, { FC } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import NLTheme from './NLTheme';
import Routes from './routes/routes';

const App: FC = () => (
  <>
    <ThemeProvider theme={NLTheme}>
      <Routes />
    </ThemeProvider>
  </>
);

export default App;
