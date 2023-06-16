import { useEffect, useRef } from 'react';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './loader.module.scss';

export const Loader = () => {
  const mainRef = useRef(null);
  useEffect(() => {
    mainRef.current.focus();
  }, [mainRef]);

  return (
    <Box
      onBlur={() => mainRef.current.focus()}
      ref={mainRef}
      className={styles.loaderBlock}
      id="loaderComponent"
      tabIndex="-1"
    >
      <CircularProgress color="white" />
    </Box>
  );
};
