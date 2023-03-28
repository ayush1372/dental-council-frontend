import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../store/store';
import SuspendValuntaryPopup from './index';

test('renders', () => {
  render(
    <Provider store={store}>
      <SuspendValuntaryPopup />
    </Provider>
  );
});
