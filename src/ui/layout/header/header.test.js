import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../store/store';
import { Header } from './header';

beforeEach(() => {
  render(
    <Router>
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>
  );
});

describe('login', () => {
  test('renders "Login" text on button initially', () => {
    const menuToggleHandler = screen.getByText('Login');
    expect(menuToggleHandler).toBeInTheDocument();
  });
});
