import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../store/store';
import ThemeProviderWrapper from '../../theme/theme-provider-wrapper';
import SuspendLicenseVoluntaryRetirement from './index';

describe('suspend license and voluntary retirement', () => {
  describe('Add Timeline - from date field and to date field', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ThemeProviderWrapper>
            <SuspendLicenseVoluntaryRetirement />
          </ThemeProviderWrapper>
        </Provider>
      );
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
        <Provider store={store}>
          <SuspendLicenseVoluntaryRetirement
            tabName="voluntary-suspend-license"
            selectedValue="approve"
            handleSubmitDetails={jest.fn()}
          />
        </Provider>
      );
      const TextElement = screen.getByTestId('remark');
      fireEvent.click(TextElement);
      expect(TextElement).toBeInTheDocument();
    });
  });
});
