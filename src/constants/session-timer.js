import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expiryTimestamp }) => {
  const { seconds, minutes } = useTimer({ expiryTimestamp, onExpire: () => {} });

  return minutes < 1 ? (
    <span style={{ color: '#dc3545' }}>
      {minutes < 10 ? '0' + minutes : minutes} &nbsp; : &nbsp;{' '}
      {seconds < 10 ? '0' + seconds : seconds}
    </span>
  ) : (
    <span style={{ color: '#ffc107' }}>
      {minutes < 10 ? '0' + minutes : minutes} &nbsp; : &nbsp;{' '}
      {seconds < 10 ? '0' + seconds : seconds}
    </span>
  );
};

export const sessionTimer = (valSeconds) => {
  let time = new Date();
  time.setSeconds(time.getSeconds() + parseInt(valSeconds));

  return <MyTimer expiryTimestamp={time}></MyTimer>;
};
