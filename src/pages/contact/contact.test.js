import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Contact } from './index';

test('Contact component snapshot', () => {
  const { container } = render(
    <Router>
      <Contact />
    </Router>
  );
  expect(container).toMatchSnapshot();
});
