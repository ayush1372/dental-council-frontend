import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { PageNotFound } from './index';

test('PageNotFound  snapshot', () => {
  const { container } = render(
    <Router>
      <PageNotFound />
    </Router>
  );
  expect(container).toMatchSnapshot();
});
