import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../../store/store';
import AbhaNumberCard from './abha-number-card';

describe('Abha Number Card Render', () => {
  test('Abha Number Card Render > Check Abha Number Card title is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-card-title-testid');
    expect(titleElement.innerHTML).toEqual('Your ABHA Number Card');
  });

  test('Abha Number Card Render > Check Abha name is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-name-testid');
    expect(titleElement.innerHTML).toEqual('Aarush Sharma');
  });

  test('Abha Number Card Render > Check Abha number is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-testid');
    expect(titleElement.innerHTML).toEqual('42-3232-1234-2345');
  });

  test('Abha Number Card Render > Check Abha address is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-address-testid');
    expect(titleElement.innerHTML).toEqual('aarush.sharma@abdm');
  });

  test('Abha Number Card Render > Check Abha gender is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-gender-testid');
    expect(titleElement.innerHTML).toEqual('Male');
  });

  test('Abha Number Card Render > Check Abha dob is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-dob-testid');
    expect(titleElement.innerHTML).toEqual('13-02-0000');
  });

  test('Abha Number Card Render > Check Abha mobile numbert is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <AbhaNumberCard />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('abha-number-mobile-testid');
    expect(titleElement.innerHTML).toEqual('91-9956332182');
  });
});
