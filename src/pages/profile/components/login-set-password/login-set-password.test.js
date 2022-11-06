import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import { LoginSetPassword } from './login-set-password';

test('Set Password component snapshot', () => {
  const { container } = render(<LoginSetPassword />);
  expect(container).toMatchSnapshot();
});

it('should render successfully', async () => {
  render(<LoginSetPassword />);
  expect(screen.getByText('OTP on Mobile number linked with Aadhaar')).toBeInTheDocument();
  expect(screen.getByText('OTP on Mobile number linked with ABHA Number')).toBeInTheDocument();
});

it('should check Radio Button to be checked ', () => {
  render(<LoginSetPassword />);

  const firstRadio = screen.getByLabelText('OTP on Mobile number linked with Aadhaar');
  fireEvent.click(firstRadio);
  expect(firstRadio).toBeChecked();

  const secondRadio = screen.getByLabelText('OTP on Mobile number linked with ABHA Number');
  fireEvent.click(secondRadio);
  expect(secondRadio).toBeChecked();
});

test('Renders Set Password Field', () => {
  render(<LoginSetPassword />);
  const TextElement = screen.getByTestId('passwordtxt');
  fireEvent.click(TextElement);
  const PasswordText = screen.getByText('Set Password');
  expect(PasswordText).toBeInTheDocument();
});

test('Renders Confirm Password Field', () => {
  render(<LoginSetPassword />);
  const TextElement = screen.getByTestId('confirmpasswordtxt');
  fireEvent.click(TextElement);
  const ConfirmPasswordText = screen.getByText('Confirm Password*');
  expect(ConfirmPasswordText).toBeInTheDocument();
});
