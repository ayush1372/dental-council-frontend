import { render, screen } from '@testing-library/react';

import { OtpComponentLinkGuardian } from './index';

test('renders', () => {
  render(<OtpComponentLinkGuardian />);
});
it('should render successfully', async () => {
  render(<OtpComponentLinkGuardian />);

  expect(screen.getByText('Confirm OTP')).toBeInTheDocument();
});
