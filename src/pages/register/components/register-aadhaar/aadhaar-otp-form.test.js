import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AadhaarOtpForm } from './aadhaar-otp-form';

beforeEach(() => {
  render(
    <Router>
      <AadhaarOtpForm />
    </Router>
  );
});

test('AadhaarOtpForm  snapshot', () => {
  const { container } = render(
    <Router>
      <AadhaarOtpForm />
    </Router>
  );
  expect(container).toMatchSnapshot();
});

test('Renders Header', () => {
  const ConfirmOtp = screen.getByTestId('header');
  expect(ConfirmOtp).toBeInTheDocument();
});

test('Renders OTP Text Content', () => {
  const OTP_Text = screen.getByTestId('OTP_text');
  expect(OTP_Text).toBeInTheDocument();
});
