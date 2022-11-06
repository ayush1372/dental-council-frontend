import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import { LinkGuardian } from './link-guardian';

it('should render successfully', async () => {
  render(<LinkGuardian />);

  expect(screen.getByText('ABHA Number')).toBeInTheDocument();
  expect(screen.getByText('Mobile Number')).toBeInTheDocument();
  expect(screen.getByText('Aadhaar Number')).toBeInTheDocument();
});

it('should change checked option', () => {
  render(<LinkGuardian />);

  const firstRadio = screen.getByLabelText('ABHA Number');
  fireEvent.click(firstRadio);
  expect(firstRadio).toBeChecked();

  const secondRadio = screen.getByLabelText('Mobile Number');
  fireEvent.click(secondRadio);
  expect(secondRadio).toBeChecked();

  const thirdRadio = screen.getByLabelText('Aadhaar Number');
  fireEvent.click(thirdRadio);
  expect(thirdRadio).toBeChecked();
});
