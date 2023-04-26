import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from '../../store/store';
import SuccessPopup from './success-popup';

describe('Reactivate License', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <SuccessPopup />
        </Provider>
      </Router>
    );
  });
  test('Renders Popup message', () => {
    const MsgPopup = screen.getByTestId('popup-input-text');
    expect(MsgPopup).toBeInTheDocument();
  });
  test('Renders Popup message', () => {
    const SuccessMessage = screen.getByTestId('popup-input-success-text');
    expect(SuccessMessage).toBeInTheDocument();
  });
});
