import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  ButtonBase,
  Card,
  Collapse,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { t } from 'i18next';

// import { useTranslation } from 'react-i18next';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import { LinkGuardian } from '../link-guardian/link-guardian';
// import ViewAbhaNumber from '../view-abha-number/view-abha-number';
import AadhaarABHARegisterForm from './aadhaar-abha-registration';
import BasicModal from './popup';
import pic from './temporary/child.png';
import { ViewCreateAbhaNumber } from './view-create-abha-number';

const Age = 19;

export function AadhaarDetails({ onNext }) {
  const [open, setOpen] = useState(true);
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const handleSubmit = () => {
    onNext();
  };
  const data = {
    name: 'AARUSH SHARMA',
    gender: 'Male',
    dob: '18/09/2009',
    address: 'Hno. 22/33, Shivakshi Road, Pune, Maharashtra.',
  };

  return (
    <Box>
      {Age < 18 ? <BasicModal /> : ''}
      <Box sx={{ width: '100%', marginRight: '0px' }}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon color="success" fontSize="inherit" />
              </IconButton>
            }
            sx={{ m: 2, marginLeft: '0px', borderRadius: '5px' }}
          >
            Your Aadhaar Authentication has been successfully completed.
          </Alert>
        </Collapse>
      </Box>

      <Typography ml={0} mt={1} variant="h2">
        Your Profile Details
      </Typography>

      <Typography ml={0} mb={3} mt={1} variant="subtitle2">
        We Have Fetched Your Details From Aadhaar Card Below.
      </Typography>

      <Card
        sx={{
          width: '485px',
          height: '280px',
        }}
      >
        <Box ml={3}>
          <Grid container spacing={2}>
            <Grid
              item
              sx={{
                paddingLeft: '0px',
              }}
            >
              <ButtonBase
                sx={{ width: '199px', height: '139px', marginRight: '5px', marginBottom: '20px' }}
              >
                <Img alt="complex" src={pic} />
              </ButtonBase>

              <Grid item xs display="flex" flexDirection="column">
                <Typography color="grey.dark">Gender</Typography>
                <Typography variant="body2" gutterBottom data-testid="gender">
                  {data.gender}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs container direction="column">
              <Grid item xs display="flex" flexDirection="column" mb={2} mt={1}>
                <Typography color="grey.dark">Full Name</Typography>
                <Typography variant="body2" gutterBottom data-testid="name">
                  {data.name}
                </Typography>
              </Grid>
              <Grid item xs display="flex" flexDirection="column" mb={4}>
                <Typography color="grey.dark">Date of Birth</Typography>

                <Typography variant="body2" gutterBottom data-testid="dateOfBirth">
                  {data.dob}
                </Typography>
              </Grid>
              <Grid item xs display="flex" flexDirection="column" mb={2}>
                <Typography color="grey.dark">Address</Typography>
                <Typography variant="body2" gutterBottom data-testid="address">
                  {data.address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <ButtonGroupWizard
        handleNext={handleSubmit}
        disabledPrevious
        // labelNext={t('Next').concat(` : Step ${nextStep}`)}
        labelNext={t('Continue : Step 3')}
      />
    </Box>
  );
}

export const ProfileCompletion = ({ onNext }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    onNext();
  };
  const handleNextStep = () => {
    return setActiveStep(activeStep + 1);
  };

  return (
    <Box>
      {activeStep === 0 && <AadhaarDetails onNext={handleNextStep} />}
      {activeStep === 1 ? (
        Age < 18 ? (
          <LinkGuardian onNext={handleNextStep} nextStep={activeStep + 2} />
        ) : (
          <AadhaarABHARegisterForm onNext={handleNextStep} />
        )
      ) : (
        ''
      )}
      {activeStep === 2 ? (
        Age < 18 ? (
          <AadhaarABHARegisterForm onNext={handleNext} />
        ) : (
          <ViewCreateAbhaNumber onNext={handleNext} />
        )
      ) : (
        ''
      )}
    </Box>
  );
};
