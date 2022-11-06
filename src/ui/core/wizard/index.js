import Box from '@mui/material/Box';

import ButtonGroupWizard from './button-group-wizard';
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
}) {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'grey' }}>
      <WizardSteps
        steps={steps}
        activeStep={activeStep}
        progress={progress}
        completed={completed}
      />
      {children}
      <Box sx={{ px: 4 }}>
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
