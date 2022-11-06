import { createContext, useMemo, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';

import themeWrapper from './styles';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeWrapper(mode)}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWrapper;
