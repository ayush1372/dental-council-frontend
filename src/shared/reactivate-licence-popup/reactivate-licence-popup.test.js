import { render, screen } from '@testing-library/react';

import ReactivateLicencePopup from './re-activate-licence-popup';

describe('Reactivate Licence', () => {
  beforeEach(() => {
    render(<ReactivateLicencePopup />);
  });

  test('from date field should not be undefined', () => {
    const fromDate = screen.getByTestId('fromDate');
    expect(fromDate.querySelector('input').value).not.toBeUndefined();
  });
  test('Enter reason for reactivation', () => {
    const Reason = screen.getByTestId('Reason');
    expect(Reason).toBeInTheDocument();
  });
  test('Renders field name reason', () => {
    const FieldNameReason = screen.getByTestId('fieldname_reason');
    expect(FieldNameReason).toBeInTheDocument();
  });
});
