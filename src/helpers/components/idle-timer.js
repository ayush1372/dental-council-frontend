import { useState } from 'react';

import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '../../shared/common-modals/confirmation-modal';
import { refreshTokenAction } from '../../store/actions/login-action';
import { logout, resetCommonReducer } from '../../store/reducers/common-reducers';

export function IdleTimer() {
  // eslint-disable-next-line no-console
  console.log('onActive');
  // Set timeout values
  const timeout = 60000; // 600000; // 10 mins
  const promptTimeout = 1000 * 600; // 60000; 1 min
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Modal open state
  const [open, setOpen] = useState(false);

  // Time before idle
  const [remaining, setRemaining] = useState(0);

  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // In this case 30 minutes. Here you can open your prompt.
    // All events are disabled while the prompt is active.
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    if (remaining) {
      logoutUser();
    } else {
      // console.log('in prompt');
      setOpen(true);
      setRemaining(promptTimeout);
      reset();
    }
  };

  const onIdle = () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.

    // console.log('in onIdle');
    setOpen(false);
    setRemaining(0);
  };

  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()`
    // is true. Here you will also want to close your modal and perform
    // any active actions.
    setOpen(false);
    setRemaining(0);
  };

  const { activate, reset } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive,
  });

  const handleStillHere = () => {
    setRemaining(0);
    activate();
    refreshToken();
    reset();
    setOpen(false);
  };

  const refreshToken = () => {
    const requestObj = {
      refreshtoken: JSON.parse(localStorage.getItem('refreshtoken')),
    };
    dispatch(refreshTokenAction(requestObj));
  };

  const handleLogout = () => {
    setOpen(false);
    activate();
    logoutUser();
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
      text={{ heading: 'You Have Been Idle!', message: 'You will get timed out.' }}
    />
  );
}
