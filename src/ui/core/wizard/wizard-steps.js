import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stepper as MuiStepper } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { verboseLog } from '../../../config/debug';
import { Button } from '../button/button';

const WizardSteps = ({
  activeStep,
  steps,
  isStepClickEnable,
  handleStep,
  showCheckCirlce = false,
}) => {
  verboseLog('steps', steps);

  return (
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
            onClick={() => {
              isStepClickEnable && handleStep(index);
            }}
          >
            <StepLabel
              StepIconProps={{
                completed: showCheckCirlce,
                icon:
                  showCheckCirlce && index < activeStep ? (
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
  );
};

export default WizardSteps;
