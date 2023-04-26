import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store/store';
import ThemeProviderWrapper from '../../../../theme/theme-provider-wrapper';
import VoluntarySuspendLicense from './voluntary-suspend-license';

test('renders', () => {
  render(
    <Provider store={store}>
      <ThemeProviderWrapper>
        <VoluntarySuspendLicense />
      </ThemeProviderWrapper>
    </Provider>
  );
});
