import { Grid } from '@mui/material';

import { Button } from '../button/button';

const ButtonGroupWizard = ({
  handlePrevious,
  handleNext,
  labelNext = 'Next',
  labelPrevioius = 'Back',
  disabledNext,
  disabledPrevious,
  hidePrevious = true,
  hideNext = true,
  loading,
  dataTestidNext,
}) => {
  // if we've passed handlePrevious function then we will show back button
  hidePrevious = !(typeof handlePrevious === 'function');
  hideNext = !(typeof handleNext === 'function');
  return (
    <Grid container mt={2} display="flex" justifyContent={hidePrevious ? 'end' : 'space-between'}>
      {!hidePrevious && (
        <Grid item xs={12} md={1}>
          <Button
            disabled={disabledPrevious}
            color="grey"
            variant="contained"
            onClick={handlePrevious}
            sx={{
              width: '100%',
              margin: {
                xs: '5px 0',
                md: '0',
              },
            }}
          >
            {labelPrevioius}
          </Button>
        </Grid>
      )}
      {!hideNext && (
        <Grid item xs={12} md="auto">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            data-testid={dataTestidNext}
            disabled={loading || disabledNext}
            sx={{
              width: '50%',
              margin: {
                xs: '5px 0',
                md: '0',
              },
            }}
          >
            {labelNext}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ButtonGroupWizard;
