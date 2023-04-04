import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from '../../store/store';
import LoginPage from './index';

test('renders', () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </Router>
  );
});
