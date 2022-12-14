import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import CollegeDetails from './college-details';

describe('College Details', () => {
  // render the component
  beforeEach(() => {
    render(<CollegeDetails />);
  });

  describe('Application pending list - from date field and to date field', () => {
    test(' field should be present in the document', () => {
      const collegeDetails = screen.getByTestId('College Details');
      expect(collegeDetails).toBeInTheDocument();
    });
    test('College Name field should not be null', () => {
      const CollegeName = screen.getByTestId('College Name');
      expect(CollegeName.querySelector('input').value).not.toBeNull();
    });
    test('from date field should not be undefined', () => {
      const CollegeName = screen.getByTestId('College Name');
      expect(CollegeName.querySelector('input').value).not.toBeUndefined();
    });
  });

  describe('Alert', () => {
    test('Alert should be present in the document', () => {
      const Alert = screen.getByTestId('Alert!');
      expect(Alert).toBeInTheDocument();
    });
  });
});
