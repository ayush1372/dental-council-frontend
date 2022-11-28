import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store/store';
import TableSearch from './table-search';

describe('Table search', () => {
  // render the component
  beforeEach(() => {
    render(
      <Provider store={store}>
        <TableSearch />
      </Provider>
    );
  });

  describe('Table search fields', () => {
    test('free search should present in the document', () => {
      const freesearch = screen.getByTestId('freesearch');
      expect(freesearch).toBeInTheDocument();
    });
    test('filterByName field should present in the document', () => {
      const filterByName = screen.getByTestId('filterByName');
      expect(filterByName).toBeInTheDocument();
    });
    test('filterByRegNo field should present in the document', () => {
      const filterByRegNo = screen.getByTestId('filterByRegNo');
      expect(filterByRegNo).toBeInTheDocument();
    });
    test('filterButton button should present in the document', () => {
      const filterButton = screen.getByTestId('filterButton');
      expect(filterButton).toBeInTheDocument();
    });
    test('exportButton button should present in the document', () => {
      const exportButton = screen.getByTestId('exportButton');
      expect(exportButton).toBeInTheDocument();
    });
  });
});
