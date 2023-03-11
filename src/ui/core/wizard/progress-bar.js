import { Box, Container, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { verboseLog } from '../../../config/debug';

export function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <LinearProgress
        variant="determinate"
        color="success"
        sx={{
          width: '100%',
          height: '12px',
          marginRight: 1,
          borderRadius: '5px',
          backgroundColor: 'grey2.main',
          '& .MuiLinearProgress-bar1Determinate': {
            borderRadius: '5px',
          },
        }}
        {...props}
      />
      <Typography
        variant="h3"
        fontSize="18px"
        fontWeight="600"
        width="fit-content"
        sx={{ color: 'primary.main' }}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const ProgressBar = ({ activeStep, steps, progress }) => {
  verboseLog('steps', steps);

  return (
    <Container backgroundColor="white" sx={{ width: '100%' }}>
      {progress !== false ? (
        <LinearProgressWithLabel activeStep={activeStep} value={progress} pb={2} />
      ) : (
        ''
      )}
    </Container>
  );
};

export default ProgressBar;
