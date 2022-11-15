import { useTheme } from '@mui/material/styles';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expiryTimestamp, expiryFunction, timerColor }) => {
  const theme = useTheme();
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => expiryFunction(),
  });

  return (
    <span style={{ color: timerColor ?? theme.palette.textPrimary.main }}>
      {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
    </span>
  );
};

export const SessionTimer = ({ valSeconds, expireFunction, color }) => {
  let time = new Date();
  time.setSeconds(time.getSeconds() + parseInt(valSeconds));

  return (
    <MyTimer expiryTimestamp={time} expiryFunction={expireFunction} timerColor={color}></MyTimer>
  );
};
