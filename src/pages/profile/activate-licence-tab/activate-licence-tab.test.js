import '@testing-library/jest-dom';

import { getByTestId, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../store/store';
import ActivateLicence from './activate-licence-tab';

describe('Table search', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ActivateLicence />
      </Provider>
    );
  });

  describe('Table search fields', () => {
    test('free search should present in the document', () => {
      const freesearch = screen.getByTestId('freesearch');
      expect(freesearch).toBeInTheDocument();
    });
  });
  const titleElement = getByTestId('tab-heading');
  expect(titleElement.innerHTML).toEqual('Application Requests');
});
