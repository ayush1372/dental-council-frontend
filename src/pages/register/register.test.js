import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../store/store';
import Register from './index';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Register Render', () => {
  test('Register Render > Check register title is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('register-title-testid');
    expect(titleElement.innerHTML).toEqual('Create ABHA number');
  });

  test('Register Render > Check register sub-title is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getByTestId('register-subTitle-testid');
    expect(titleElement.innerHTML).toEqual(
      'To Create ABHA Number Choose Any One Option From Below, Or If You Already Have ABHA Number Login With The Given Link Below.'
    );
  });

  test('Register Render > Check register licence title is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-licenceTitle-testid')[0];
    expect(titleElement.innerHTML).toEqual('Using Driving License');
  });

  test('Register Render > Check register licence body is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-licenceTitle-testid')[1];
    expect(titleElement.innerHTML).toEqual('Create your ABHA Number using Driving License Number');
  });

  test('Register Render > Check register licence button name is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-licenceTitle-testid')[2];
    expect(titleElement).toBeTruthy();
  });

  test('Register Render > diriving licence navigation', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-licenceTitle-testid')[2];
    fireEvent.click(titleElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('driving-licence');
  });

  test('Register Render > Check register aadhaar card title is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-aadhaarCard-testid')[0];
    expect(titleElement.innerHTML).toEqual('Using Aadhaar');
  });

  test('Register Render > Check register aadhaar card body is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-aadhaarCard-testid')[1];
    expect(titleElement.innerHTML).toEqual('Create your ABHA Number using Aadhaar Number');
  });

  test('Register Render > Check register aadahaar card button name is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-aadhaarCard-testid')[2];
    expect(titleElement).toBeTruthy();
  });

  test('Register Render > aadhaar page navigation', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-aadhaarCard-testid')[2];
    fireEvent.click(titleElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('aadhaar');
  });

  test('Register Render > Check register pan card title is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-panCard-testid')[0];
    expect(titleElement.innerHTML).toEqual('Using PAN Number');
  });

  test('Register Render > Check register Pan card body is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-panCard-testid')[1];
    expect(titleElement.innerHTML).toEqual('Create your ABHA Number using PAN Number');
  });

  test('Register Render > Check register pan card button name is rendered', () => {
    const { getAllByTestId } = render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
    const titleElement = getAllByTestId('register-panCard-testid')[2];
    expect(titleElement).toBeTruthy();
  });
});
