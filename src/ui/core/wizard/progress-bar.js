import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../../config/debug';
export function LinearProgressWithLabel(props) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
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
        {/* {`${Math.round(props.value)}%`}{' '} */}
        {props.value === 0
          ? '0/4'
          : props.value === 25
          ? '1/4'
          : props.value === 50
          ? '2/4'
          : props.value === 75
          ? '3/4'
          : props.value === 100 && '4/4'}
      </Typography>
      {loggedInUserType === 'Doctor' && props?.value === 75 && (
        <Box display="flex" alignItems={'center'} justifyContent="center">
          <Tooltip
            title="Add work details to complete your profile"
            arrow
            placement="right"
            p={2}
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: 'primary.main',
                  fontSize: '13px',
                  borderRadius: '5px',
                },
              },
            }}
          >
            <Box display="flex" alignItems={'center'} justifyContent="center">
              {props?.value === 75 && <InfoOutlinedIcon color='primary.main' sx={{ color: 'primary.main' }}/>}
            </Box>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const ProgressBar = ({ activeStep, steps, progress, width = '' }) => {
  verboseLog('steps', steps);

  return (
    <Box backgroundColor="white" width={width}>
      {progress !== false ? (
        <LinearProgressWithLabel activeStep={activeStep} value={progress} pb={2} />
      ) : (
        ''
      )}
    </Box>
  );
};

export default ProgressBar;
