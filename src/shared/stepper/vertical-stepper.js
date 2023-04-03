// import { Chip } from '@material-ui/core';

import { Chip, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography, useTheme } from '@mui/material';

export default function VerticalLinearStepper() {
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    statusBlock: {
      position: 'relative',
      marginBottom: '10px',

      '&:last-child': {
        '&.description': {
          border: 'none',
        },
      },
    },
    icon: {
      position: 'absolute',
      right: '16px',
      top: '0',
    },
    description: {
      borderLeft: '2px solid',
      borderColor: theme.palette.success.main,
    },
  }));

  const classes = useStyles(theme);

  return (
    <>
      <Box className={classes.statusBlock} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <CheckCircleIcon sx={{ width: '20px', height: '20px' }} />
          <Typography component="div" fontWeight="600" pl={1}>
            Application Details Updated
          </Typography>
          <Chip className={classes.icon} label="Approved" />
        </Box>
        <Box className={classes.description} pl={2} ml="10px" mt="5px" pb={1}>
          <Typography component="div">
            You have made following changes in your application
          </Typography>
          <Typography component="div" variant="body3" fontWeight="500">
            Tue, 31st Oct 2022 - 2:29pm
          </Typography>
        </Box>
      </Box>
      <Box className={classes.statusBlock} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <CheckCircleIcon sx={{ width: '20px', height: '20px' }} />
          <Typography component="div" fontWeight="600" pl={1}>
            Application Details Updated
          </Typography>
          <Chip className={classes.icon} label="Approved" />
        </Box>
        <Box className={classes.description} pl={2} ml="10px" mt="5px" pb={1}>
          <Typography component="div">
            You have made following changes in your application
          </Typography>
          <Typography component="div" variant="body3" fontWeight="500">
            Tue, 31st Oct 2022 - 2:29pm
          </Typography>
        </Box>
      </Box>
      <Box className={classes.statusBlock} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <CheckCircleIcon sx={{ width: '20px', height: '20px' }} />
          <Typography component="div" fontWeight="600" pl={1}>
            Application Details Updated
          </Typography>
          <Chip className={classes.icon} label="Approved" />
        </Box>
        <Box className={classes.description} pl={2} ml="10px" mt="5px" pb={1}>
          <Typography component="div">
            You have made following changes in your application
          </Typography>
          <Typography component="div" variant="body3" fontWeight="500">
            Tue, 31st Oct 2022 - 2:29pm
          </Typography>
        </Box>
      </Box>
    </>
  );
}
