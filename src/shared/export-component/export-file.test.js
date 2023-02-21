import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

// import { Provider } from 'react-redux';
// import store from '../../store/store';
import ExportFiles from './export-file';

describe('Button', () => {
  beforeEach(() => {
    render(<ExportFiles />);
  });

  describe('exportButton', () => {
    test('exportButton button should present in the document', () => {
      const exportButton = screen.getByTestId('export_Button');
      expect(exportButton).toBeInTheDocument();
    });
  });
});
