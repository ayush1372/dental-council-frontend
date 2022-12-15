import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store/store';
import ActivateLicence from './activate-licence-tab';

describe('Table search', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ActivateLicence />
      </Provider>
    );
  });

  describe('Export button ', () => {
    test('exportButton button should present in the document', () => {
      const exportButton = screen.getByTestId('exportButton');
      expect(exportButton).toBeInTheDocument();
    });
  });
});
