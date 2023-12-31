import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getNavMeta, LOGGED_IN } from './constants/navigation-meta';
import { RoutesGuard } from './helpers';
import { ErrorBoundary } from './helpers';
import store from './store/store';
import ThemeProviderWrapper from './theme/theme-provider-wrapper';

function App() {
  const navMeta = getNavMeta(LOGGED_IN);

  return (
    <ErrorBoundary>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
          <ThemeProviderWrapper>
            <CssBaseline />
            <RoutesGuard root navMeta={navMeta} />
          </ThemeProviderWrapper>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
