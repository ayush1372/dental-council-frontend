import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Home } from './index';

test('About component snapshot', () => {
  const { container } = render(
    <Router>
      <Home />
    </Router>
  );
  expect(container).toMatchSnapshot();
});
