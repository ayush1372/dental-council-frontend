import { useEffect, useState } from 'react';

const useWizard = (initStep, steps = [], progressiveValues = [100]) => {
  const [activeStep, setActiveStep] = useState(initStep || 0);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : progressiveValues[activeStep + 1] + prevProgress
    );
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const resetStep = () => {
    setActiveStep(0);
  };

  const handleComplete = () => setCompleted(true);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : progressiveValues[activeStep + 1] - prevProgress
    );
  };

  useEffect(() => {
    if (!steps?.length) return;
    if (activeStep === steps.length) {
      setCompleted(true);
    } else setCompleted(false);
  }, [activeStep, steps]);

  return {
    activeStep,
    setActiveStep,
    completed,
    setCompleted,
    handleNext,
    handleBack,
    handleStep,
    handleComplete,
    progress,
    resetStep,
  };
};

export default useWizard;
