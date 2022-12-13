import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import NewPasswordSetup from './new-password-setup';

describe('new password setup', () => {
  // render the component
  beforeEach(() => {
    render(<NewPasswordSetup />);
  });

  describe('Add Timeline - password should be RegexValidation format', () => {
    test('password field should be present in the document', () => {
      const PasswordText = screen.getByText('New Password*');
      expect(PasswordText).toBeInTheDocument();
    });
    test('Password field should not be null', () => {
      const Password = screen.getByTestId('Password');
      expect(Password.querySelector('input').value).not.toBeNull();
    });
    test('Password field should not be undefined', () => {
      const Password = screen.getByTestId('Password');
      expect(Password.querySelector('input').value).not.toBeUndefined();
    });
    test('confirmPassword field should be present in the document', () => {
      const confirmPasswordText = screen.getByTestId('Confirm Password*');
      expect(confirmPasswordText).toBeInTheDocument();
    });
    test('confirmPassword field should not be null', () => {
      const confirmPassword = screen.getByTestId('confirmPassword');
      expect(confirmPassword.querySelector('input').value).not.toBeNull();
    });
    test('confirmPassword field should not be undefined', () => {
      const confirmPassword = screen.getByTestId('confirmPassword');
      expect(confirmPassword.querySelector('input').value).not.toBeUndefined();
    });
  });
});
