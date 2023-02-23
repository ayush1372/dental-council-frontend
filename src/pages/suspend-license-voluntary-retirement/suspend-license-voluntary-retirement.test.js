import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import SuspendLicenseVoluntaryRetirement from './index';

describe('suspend license and voluntary retirement', () => {
  describe('Add Timeline - from date field and to date field', () => {
    beforeEach(() => {
      render(<SuspendLicenseVoluntaryRetirement />);
    });
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
  });

  describe('Remarks', () => {
    test('Remarks should be present in the document', () => {
      render(
        <SuspendLicenseVoluntaryRetirement
          tabName="voluntary-suspend-license"
          selectedValue="approve"
          handleSubmitDetails={jest.fn()}
        />
      );
      const TextElement = screen.getByTestId('remark');
      fireEvent.click(TextElement);
      expect(TextElement).toBeInTheDocument();
    });
  });
});
