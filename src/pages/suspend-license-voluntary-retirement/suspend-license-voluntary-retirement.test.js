import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import SuspendLicenseVoluntaryRetirement from './index';

describe('suspend license and voluntary retirement', () => {
  // render the component
  beforeEach(() => {
    render(<SuspendLicenseVoluntaryRetirement />);
  });

  describe('Add Timeline - from date field and to date field', () => {
    test('from date field should be present in the document', () => {
      const fromDate = screen.getByTestId('fromDate');
      expect(fromDate).toBeInTheDocument();
    });
    test('from date field should not be null', () => {
      const fromDate = screen.getByTestId('fromDate');
      expect(fromDate.querySelector('input').value).not.toBeNull();
    });
    test('from date field should not be undefined', () => {
      const fromDate = screen.getByTestId('fromDate');
      expect(fromDate.querySelector('input').value).not.toBeUndefined();
    });
    test('to date field should be present in the document', () => {
      const toDate = screen.getByTestId('toDate');
      expect(toDate).toBeInTheDocument();
    });
    test('to date field should not be null', () => {
      const toDate = screen.getByTestId('toDate');
      expect(toDate.querySelector('input').value).not.toBeNull();
    });
    test('to date field should not be undefined', () => {
      const toDate = screen.getByTestId('toDate');
      expect(toDate.querySelector('input').value).not.toBeUndefined();
    });
  });

  describe('Remarks', () => {
    test('Remarks should be present in the document', () => {
      const remark = screen.getByTestId('remark');
      expect(remark).toBeInTheDocument();
    });
  });
});
