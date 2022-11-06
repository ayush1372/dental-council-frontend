import { useEffect, useState } from 'react';

const timerDisplay = (remaining) => {
  if (remaining < 1) return '00:00';
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;

  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
};

function useCountdown(init) {
  let initFallback = init || 120;
  const [countdown, setCountdown] = useState(initFallback);
  const [countdownDisplay, setCountdownDisplay] = useState(timerDisplay(initFallback));
  const [countdownActive, setCountdownActive] = useState(true);

  useEffect(() => {
    const timer =
      countdownActive &&
      countdown >= 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
        setCountdownDisplay(timerDisplay(countdown - 1));
        if (countdown - 1 < 1) setCountdownActive(false);
      }, 1000);
    return () => clearInterval(timer);
  }, [countdown, countdownActive]);

  const handleCountdownRestart = () => {
    setCountdown(initFallback);
    setCountdownDisplay(timerDisplay(initFallback));
    setCountdownActive(true);
  };
  return {
    countdown,
    countdownDisplay,
    countdownActive,
    handleCountdownRestart,
  };
}

export default useCountdown;
