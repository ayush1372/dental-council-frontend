import { createContext, useMemo, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

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

  const { appFontType } = useSelector((state) => state.appFontSize);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeWrapper(mode, appFontType)}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWrapper;
