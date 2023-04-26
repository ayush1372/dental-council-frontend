import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../store/store';
import ThemeProviderWrapper from '../../../theme/theme-provider-wrapper';
import { MainLayout } from './main-layout';

test('MainLayout component snapshot', () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <ThemeProviderWrapper>
          <MainLayout />
        </ThemeProviderWrapper>
      </Router>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
