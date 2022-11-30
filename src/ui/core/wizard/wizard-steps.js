import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { Stepper as MuiStepper } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from 'prop-types';

import { verboseLog } from '../../../config/debug';
import { Button } from '../button/button';
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

const WizardSteps = ({ activeStep, steps, progress }) => {
  verboseLog('steps', steps);

  return (
    <Container spacing={4} disableGutters backgroundColor="white">
      {progress !== false ? (
        <Box mb={1} sx={{ width: '100%' }}>
          <LinearProgressWithLabel activeStep={activeStep} value={progress} pb={2} />
        </Box>
      ) : (
        ''
      )}
      <MuiStepper activeStep={activeStep} connector={false}>
        {steps.map((label, index) => (
          <Step key={label} sx={{ padding: '0', flexBasis: `${100 / steps.length}%` }}>
            <Button
              data-testid={`step_${index}_button`}
              sx={{
                width: '100%',
                height: '102px',
                padding: '12px',
                border: '1px solid',
                borderColor: 'inputBorderColor.main',
                borderBottomColor:
                  index === activeStep
                    ? 'inputFocusColor.main'
                    : index < activeStep
                    ? 'success.main'
                    : 'inputBorderColor.main',
                borderBottomWidth: '4px',
                borderRadius: '0px',
                '&:focus': {
                  backgroundColor: 'white.main',
                },
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 1,
                },
              }}
            >
              <StepLabel
                StepIconProps={{
                  icon:
                    index < activeStep ? (
                      <CheckCircleIcon sx={{ color: 'success.main', fontSize: '28px' }} />
                    ) : (
                      index + 1
                    ),
                  sx: {
                    fill: index === activeStep ? 'stepIconActive.main' : 'grey2.main',
                    '& .MuiStepIcon-text': {
                      fill: index > activeStep ? 'grey1.main' : '',
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Button>
          </Step>
        ))}
      </MuiStepper>
    </Container>
  );
};

export default WizardSteps;
