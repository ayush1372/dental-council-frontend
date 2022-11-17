import Box from '@mui/material/Box';

import { Button } from '../button/button';

const ButtonGroupWizard = ({
  handlePrevious,
  handleNext,
  labelNext = 'Next',
  labelPrevioius = 'Back',
  disabledNext,
  disabledPrevious,
  hidePrevious = true,
  loading,
  dataTestidNext,
}) => {
  // if we've passed handlePrevious function then we will show back button
  hidePrevious = !(typeof handlePrevious === 'function');
  return (
    <Box
      mt={2}
      // p="0px 24px"
      sx={{ display: 'flex', justifyContent: !hidePrevious ? 'space-between' : 'right' }}
    >
      {!hidePrevious && (
        <Button
          disabled={disabledPrevious}
          color="grey"
          variant="contained"
          onClick={handlePrevious}
        >
          {labelPrevioius}
        </Button>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleNext}
        data-testid={dataTestidNext}
        disabled={loading || disabledNext}
      >
        {labelNext}
      </Button>
    </Box>
  );
};

export default ButtonGroupWizard;
