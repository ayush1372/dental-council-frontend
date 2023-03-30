import Box from '@mui/material/Box';

import ButtonGroupWizard from './button-group-wizard';
import ProgressBar from './progress-bar';
import WizardSteps from './wizard-steps';

export default function Wizard({
  activeStep,
  children,
  completed,
  enableNaviagation,
  handleBack,
  handleNext,
  progress,
  steps,
  isStepClickEnable,
  handleStep,
}) {
  return (
    <Box width="100%" bgcolor={'white'}>
      <WizardSteps
        steps={steps}
        activeStep={activeStep}
        isStepClickEnable={isStepClickEnable}
        handleStep={handleStep}
      />
      <ProgressBar
        steps={steps}
        activeStep={activeStep}
        progress={progress}
        completed={completed}
      />
      {children}
      <Box px={4}>
        {enableNaviagation && (
          <ButtonGroupWizard
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
          />
        )}
      </Box>
    </Box>
  );
}
