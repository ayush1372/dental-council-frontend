import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store/store';
import CollegeDetails from './college-details';

let modifiedStore = { ...store, college: { data: { name: 'testStudent' } } };
describe('College Details', () => {
  beforeEach(() => {
    render(
      <Provider store={modifiedStore}>
        <CollegeDetails setShowTable={jest.fn()} />
      </Provider>
    );
  });

  describe('Application pending list - from date field and to date field', () => {
    test(' field should be present in the document', () => {
      const collegeDetails = screen.getByTestId('College Details');
      expect(collegeDetails).toBeInTheDocument();
    });
    test('College Name field should not be null', () => {
      const CollegeName = screen.getByTestId('College Name');
      expect(CollegeName).not.toBeNull();
    });
    test('from date field should not be undefined', () => {
      const CollegeName = screen.getByTestId('College Name');
      expect(CollegeName).not.toBeUndefined();
    });
    test('button should click on show table', () => {
      const showTable = screen.getByTestId('showTable');
      fireEvent.click(showTable);
    });
    test('button should show the details', () => {
      const submitButton = screen.getByTestId('submitDetail');
      fireEvent.click(submitButton);
    });
    test('button should show the confirm modal', () => {
      const approval = screen.getByTestId('approve');
      fireEvent.click(approval);
      const condfirmModal = screen.getByTestId('confirmModal');
      fireEvent.click(condfirmModal);
    });
  });
});
