import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

const steps = [
  'Application Submitted',
  'Pending At SMC',
  'Pending At NMC',
  'Application Approved/Rejected',
];

export default function ApplicationStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box display={'flex'}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Tue, 31st Oct 2022 - 2:29pm
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary.main"
            borderRadius={'20px'}
            bgcolor={'#36B37E'}
            width={'45%'}
            align="center"
          >
            Completed
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Request ID
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary.main"
            borderRadius={'20px'}
            bgcolor={'#4870CC'}
            width={'45%'}
            align="center"
          >
            In Progress
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Request ID
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary.main"
            borderRadius={'20px'}
            bgcolor={'#8A8A8A'}
            width={'45%'}
            align="center"
          >
            Pending
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Request ID
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary.main"
            borderRadius={'20px'}
            bgcolor={'#8A8A8A'}
            width={'45%'}
            align="center"
          >
            Pending
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
}
