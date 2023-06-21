import { makeStyles } from '@material-ui/core';
import { Box, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularLoader() {
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    loader: {
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: '9999',
    },
    spinner: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }));
  const classes = useStyles(theme);
  return (
    <Box className={classes.loader}>
      <CircularProgress className={classes.spinner} />
    </Box>
  );
}
