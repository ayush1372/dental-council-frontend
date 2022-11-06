import { fireEvent, render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../../store/store';
import LoginAbhaNumber from './login-abha-number';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Login Abha Number', () => {
  // afterEach(cleanup);

  test('renders LoginAuthMethodForm title initially', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <LoginAbhaNumber />
        </Provider>
      </Router>
    );
    const loginAbhaTitle = getAllByTestId('login-abha-number-title')[0];
    expect(useTranslation(loginAbhaTitle)).toBeTruthy();
  });

  test('renders LoginAuthMethodForm > abha number textbox', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <LoginAbhaNumber />
        </Provider>
      </Router>
    );
    const abhaNumberElement = getAllByTestId('login-abha-number-form')[0];
    fireEvent.change(abhaNumberElement.querySelector('div').querySelector('input'), {
      target: { value: '12121212122121' },
    });
    expect(abhaNumberElement.querySelector('div').querySelector('input').value).toBe(
      '12121212122121'
    );
  });

  test('renders LoginAuthMethodForm > password textbox', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <LoginAbhaNumber />
        </Provider>
      </Router>
    );
    const pwdElement = getAllByTestId('login-abha-number-pwd-form')[0];
    fireEvent.change(pwdElement.querySelector('div').querySelector('input'), {
      target: { value: '12121212122121' },
    });
    expect(pwdElement.querySelector('div').querySelector('input').value).toBe('12121212122121');
  });

  test('renders LoginAuthMethodForm > OTP on Mobile Number linked with Aadhaar using radio box', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <LoginAbhaNumber />
        </Provider>
      </Router>
    );
    const optionElement = getAllByTestId('login-otp=option-change')[0];
    expect(optionElement.querySelector('input').checked).toEqual(false);
    fireEvent.click(optionElement);
    expect(optionElement.querySelector('input').checked).toEqual(true);
  });

  test('renders LoginAuthMethodForm > OTP on Mobile Number linked with your ABHA number', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <LoginAbhaNumber />
        </Provider>
      </Router>
    );
    const optionElement = getAllByTestId('login-otp=option-change')[0];
    fireEvent.click(optionElement);
    expect(optionElement.querySelector('input').checked).toEqual(true);
  });
});
