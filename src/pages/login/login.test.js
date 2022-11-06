import { fireEvent, render } from '@testing-library/react';
// import { useTranslation } from 'react-i18next';
// import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../store/store';
import Login from './index';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({t: key => key})
// }));

describe('Login Render', () => {
  // afterEach(cleanup);

  test('Login Render > Choose Recovery Option in login', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const buttonElement = getAllByTestId('login-option-change')[0];
    expect(buttonElement.querySelector('input').checked).toEqual(false);
    fireEvent.click(buttonElement);
    expect(buttonElement.querySelector('input').checked).toEqual(true);
  });

  test('Login Render > Abha number pattern test', () => {
    const aahaRegEx = /^\d{2}-?\d{4}-?\d{4}-?\d{4}$/i;

    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const buttonElement = getAllByTestId('abha-no-testid')[0];
    fireEvent.change(buttonElement.querySelector('div').querySelector('input'), {
      target: { value: '12121212122121' },
    });
    expect(buttonElement.querySelector('div').querySelector('input').value).toMatch(aahaRegEx);
  });

  test('Login Render > Abha number test', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const buttonElement = getAllByTestId('abha-no-testid')[0];
    fireEvent.change(buttonElement.querySelector('div').querySelector('input'), {
      target: { value: '12121212122121' },
    });
    expect(buttonElement.querySelector('div').querySelector('input').value).toMatch(
      '12121212122121'
    );
  });
  // test('Abha number year in login', () => {

  //   const { getAllByTestId } = render(
  //     <Router>
  //       <Provider store={store}>
  //         <Login />
  //       </Provider>
  //     </Router>
  //   );
  //   const selectElement = getAllByTestId('login-year-select')[0];

  //   const selectNode = selectElement.querySelector('div').childNodes[0].childNodes[0];

  //   fireEvent.click(selectNode);
  //   let options = getAllByTestId('login-year-option')[0];
  //   expect(options[0].selected).toBeFalsy();
  //   expect(options[1].selected).toBeFalsy();
  //   expect(options[2].selected).toBeTruthy();
  // });

  test('Button click in login', async () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const buttonElement = getAllByTestId('login-btn-testid')[0];
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeTruthy();
  });
});
