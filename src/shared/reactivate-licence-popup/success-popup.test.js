import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';

import SuccessPopup from './success-popup';

describe('Reactivate Licence', () => {
  beforeEach(() => {
    render(<SuccessPopup />);
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
