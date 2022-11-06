import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AadhaarDetails } from './aadhaar-details';

beforeEach(() => {
  render(
    <Router>
      <AadhaarDetails />
    </Router>
  );
});

test('Renders gender', () => {
  const Gender = screen.getByTestId('gender');
  // expecTobeInTheDocument
  expect(Gender).toBeInTheDocument();
});

test('Renders name', () => {
  const Name = screen.getByTestId('name');
  expect(Name).toBeInTheDocument();
});

test('Renders Date Of Birth', () => {
  const DOB = screen.getByTestId('dateOfBirth');
  expect(DOB).toBeInTheDocument();
});

test('Renders Address', () => {
  const Address = screen.getByTestId('address');
  expect(Address).toBeInTheDocument();
});
