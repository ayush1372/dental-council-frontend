import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Profile } from '../../../pages/profile/profile';
import store from '../../../store/store';
import { Header } from './header';

beforeEach(() => {
  render(
    <Router>
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>
  );
});

describe('login', () => {
  test('renders "Login" text on button initially', () => {
    const InidisplayedText = screen.getByText('Login');
    expect(InidisplayedText).toBeInTheDocument();
  });

  test('Header component snapshot', () => {
    const { container } = render(
      <Router>
        {' '}
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('Button Text changes to Logout on Login Click', () => {
    const buttonElement = screen.getByTestId('loginbtn');
    userEvent.click(buttonElement);
    const LoginText = screen.getByText('Logout');
    expect(LoginText).toBeInTheDocument();
  });

  test('Login Successful message is displayed', async () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    render(<ToastContainer></ToastContainer>);
    expect(await screen.findByText('Login Successful')).toBeInTheDocument();
  });

  test('User Profile is displayed', () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    render(<Profile></Profile>);
    const UserProfileText = screen.getByText('User Profile');
    expect(UserProfileText).toBeInTheDocument();
  });

  test('Timer starts on Login Click', () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    const TimerElement = screen.getByTestId('timer');
    expect(TimerElement).not.toBeNull();
  });

  test('Login Button Text changes to Logout on Login Click', () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    const LoginText = screen.getByText('Logout');
    expect(LoginText).toBeInTheDocument();
  });

  test('Login Successful message will be displayed', async () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    render(<ToastContainer></ToastContainer>);
    expect(await screen.findByText('Login Successful')).toBeInTheDocument();
  });

  test('User Profile Tab is displayed', () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    render(<Profile></Profile>);
    const UserProfileText = screen.getByText('User Profile');
    expect(UserProfileText).toBeInTheDocument();
  });

  test('Login Timer starts on Login Click', () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    const TimerElement = screen.getByTestId('timer');
    expect(TimerElement).not.toBeNull();
  });
});

describe('logout', () => {
  test('Logout Successful message will be displayed', async () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    render(<ToastContainer></ToastContainer>);
    expect(await screen.findByText('Logout Successful')).toBeInTheDocument();
  });

  test('renders "Login" text on Logout button when loggedout', () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    const LogoutText = screen.getByText('Login');
    expect(LogoutText).toBeInTheDocument();
  });

  test('Logout Successful  message is displayed', async () => {
    const buttonElement = screen.getByTestId('logoutbtn');
    userEvent.click(buttonElement);
    render(<ToastContainer></ToastContainer>);
    expect(await screen.findByText('Logout Successful')).toBeInTheDocument();
  });
});
