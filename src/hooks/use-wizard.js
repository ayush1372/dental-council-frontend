import { useEffect, useState } from 'react';

const useWizard = (initStep, steps = [], progressiveValues = [0], isReadMode) => {
  const [activeStep, setActiveStep] = useState(initStep || 0);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(progressiveValues[0]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    isReadMode
      ? setProgress((prevProgress) => prevProgress)
      : setProgress((prevProgress) =>
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
    isReadMode
      ? setProgress((prevProgress) => prevProgress)
      : setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress - progressiveValues[activeStep + 1]
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
