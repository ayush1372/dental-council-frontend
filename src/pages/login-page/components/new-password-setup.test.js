import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from '../../../store/store';
import NewPasswordSetup from './new-password-setup';

describe('new password setup', () => {
  // render the component
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <NewPasswordSetup />
        </Provider>
      </Router>
    );
  });

  describe('Add Timeline - password should be RegexValidation format', () => {
    test('password field should be present in the document', () => {
      const PasswordText = screen.getByText('New Password');
      expect(PasswordText).toBeInTheDocument();
    });
    test('Password field should not be null', () => {
      const Password = screen.getByTestId('confirmPassword');
      expect(Password).not.toBeNull();
    });
    test('Password field should not be undefined', () => {
      const Password = screen.getByTestId('confirmPassword');
      expect(Password).not.toBeUndefined();
    });
    test('confirmPassword field should be present in the document', () => {
      const confirmPasswordText = screen.getByText('Confirm Password');
      expect(confirmPasswordText).toBeInTheDocument();
    });
    test('confirmPassword field should not be null', () => {
      const confirmPassword = screen.getByTestId('confirmPassword');
      expect(confirmPassword).not.toBeNull();
    });
    test('confirmPassword field should not be undefined', () => {
      const confirmPassword = screen.getByTestId('confirmPassword');
      expect(confirmPassword).not.toBeUndefined();
    });
  });
});
