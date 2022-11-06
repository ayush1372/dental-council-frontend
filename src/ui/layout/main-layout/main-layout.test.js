import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../store/store';
import { MainLayout } from './main-layout';

test('MainLayout component snapshot', () => {
  const { container } = render(
    <Router>
      {' '}
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </Router>
  );
  expect(container).toMatchSnapshot();
});
