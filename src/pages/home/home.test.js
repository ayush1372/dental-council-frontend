import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('Displays Home Page Message', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const HomeTab = screen.getByTestId('homepage');
  userEvent.click(HomeTab);
  const Welcomemsg = screen.getByText('Welcome to ReactJS boilerplate');
  expect(Welcomemsg).toBeInTheDocument();
});

test('Displays Home Page', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const HomeTab = screen.getByTestId('homepage');
  userEvent.click(HomeTab);
  const Welcomemsg = screen.getByText('Welcome to ReactJS boilerplate');
  expect(Welcomemsg).toBeInTheDocument();
});
