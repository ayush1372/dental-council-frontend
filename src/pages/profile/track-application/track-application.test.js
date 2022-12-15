import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { TrackApplicationDetails } from './track-application-details';

describe('track application details', () => {
  beforeEach(() => {
    render(<TrackApplicationDetails />);
  });

  describe('Add Timeline - track application details contain wizard steps', () => {
    test('wizard steps should be present in the document', () => {
      const Stepper = screen.getByText('wizard steps');
      expect(Stepper).toBeInTheDocument();
    });
  });
});
