import { useRef, useState } from 'react';

import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '../../shared/common-modals/confirmation-modal';
import { logoutAction } from '../../store/actions/login-action';
import { logout, resetCommonReducer } from '../../store/reducers/common-reducers';
import { millisecondToDate } from '../functions/common-functions';

export function IdleTimer() {
  // Set timeout values
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Modal open state
  const [open, setOpen] = useState(false);
  const timerId = useRef(null);

  // Time before idle

  const onIdle = () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    setOpen(true);

    const refreshToken = localStorage.getItem('refreshtoken');

    if (refreshToken) {
      let timer = millisecondToDate(refreshToken) - new Date().getTime();

      // if user is idle till the refresh token expires, then it automatically logout
      timerId.current = setTimeout(() => {
        dispatch(logoutAction()).then((response) => {
          if (response) {
            logoutUser();
          }
        });
      }, timer);
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 30,
    onIdle: onIdle,
  });

  const handleStillHere = () => {
    setOpen(false);
    clearTimeout(timerId.current);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch(logoutAction()).then((response) => {
      if (response) {
        logoutUser();
      }
    });
  };

  const logoutUser = () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(resetCommonReducer());
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ConfirmationModal
      showModal={open}
      handleNo={handleStillHere}
      handleNoText={'Stay'}
      handleYes={handleLogout}
      handleYesText={'Logout'}
      text={{
        heading: 'Session Idle',
        message:
          'The session has exceeded the time limit of inactivity. Please click "Stay" to resume the session.',
      }}
    />
  );
}
