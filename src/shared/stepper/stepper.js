// import Check from '@mui/icons-material/Check';/
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grid, Typography } from '@mui/material';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';

import checkCircleFilled from '../../assets/images/ico-check-circle-filled.svg';
import { Chip } from '../../ui/core';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'success.main',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#36B37E',
    zIndex: 1,
    fontSize: 28,
  },
  '& .QontoStepIcon-active': {
    marginTop: '8px',
  },
  '& .QontoStepIcon-checkCircleFilled': {
    opacity: '30%',
    marginTop: '8px',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, index, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active, index }} className={className}>
      {completed ? (
        <CheckCircleIcon className="QontoStepIcon-completedIcon" />
      ) : active ? (
        <div className="QontoStepIcon-active">
          <img alt="circle_filled" src={checkCircleFilled} />
        </div>
      ) : (
        <div className="QontoStepIcon-checkCircleFilled">
          <img alt="circle_filled" src={checkCircleFilled} />
        </div>
      )}
    </QontoStepIconRoot>
  );
}
export default function ApplicationStepper({ activeStep = 1, steps, selectedRowData }) {
  const { created_at, doctor_status, nmc_status, smc_status } = selectedRowData;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                sx={{ fill: index === activeStep ? 'stepIconActive.main' : 'grey1.main' }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item container>
        <Grid item xs={8} md={3}>
          <Typography variant="body3" color="grey.label">
            {new Date(created_at?.value).toDateString()}
          </Typography>
          <Chip type={doctor_status?.value.toLowerCase()} label={doctor_status?.value} />
        </Grid>
        <Grid item xs={8} md={3}>
          <Typography variant="body3" color="grey.label">
            SMC will verify the applcation and take action
          </Typography>
          <Chip type={smc_status?.value.toLowerCase()} label={smc_status?.value} sx={{ ml: 1 }} />
        </Grid>
        <Grid item xs={8} md={3}>
          <Typography variant="body3" color="grey.label">
            NMC will verify the applcation and take action
          </Typography>
          <Chip type={nmc_status?.value.toLowerCase()} label={nmc_status?.value} sx={{ ml: 1 }} />
        </Grid>
        <Grid item xs={8} md={3}>
          <Typography variant="body3" color="grey.label">
            Application can be approved or rejected
          </Typography>
          <Chip type="pending" label="Pending" sx={{ ml: 1 }} />
        </Grid>
      </Grid>
    </Grid>
  );
}
