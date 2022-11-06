// import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme/styles';
import ThemeProviderWrapper from '../src/theme/theme-provider-wrapper';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProviderWrapper>
      <Story />
    </ThemeProviderWrapper>
  ),
];
