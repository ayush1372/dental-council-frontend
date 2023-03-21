import { makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography, useTheme } from '@mui/material';
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
    left: 'calc(-92% + 13px)',
    right: 'calc(92% + 4px)',
    '@media only screen and (max-width: 1365px)': {
      left: 'calc(-89% + 10px)',
      right: 'calc(92% + 3px)',
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.inputFocusColor.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
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
  const {
    created_at,
    smc_action_date,
    college_registrar_action_date,
    college_dean_action_date,
    nmc_action_date,
    doctor_status,
    nmc_status,
    collegeVerificationStatus,
    smc_status,
  } = selectedRowData;

  let applicationSubmittedDate = new Date(created_at?.value).toDateString();
  let applicationAtSMC;
  if (smc_action_date?.value) {
    applicationAtSMC = new Date(smc_action_date?.value).toDateString();
  } else {
    applicationAtSMC = '';
  }
  let applicationAtNMC;
  if (nmc_action_date?.value) {
    applicationAtNMC = new Date(nmc_action_date?.value).toDateString();
  } else {
    applicationAtNMC = '';
  }

  let finalCollegeDate;
  if (college_dean_action_date?.value) {
    finalCollegeDate = new Date(college_dean_action_date?.value).toDateString();
  }
  if (college_registrar_action_date?.value) {
    finalCollegeDate = new Date(college_registrar_action_date?.value).toDateString();
  }
  if (college_dean_action_date?.value && college_registrar_action_date?.value) {
    finalCollegeDate = new Date(college_dean_action_date?.value).toDateString();
  }

  const finalDates = [
    applicationSubmittedDate,
    applicationAtSMC,
    finalCollegeDate,
    applicationAtSMC,
    applicationAtNMC,
  ];

  const stepDescription = [
    '',
    'SMC will verify the application and take action.',
    'College will verify the application and take action.',
    'SMC will verify the application and take action.',
    'NMC will verify the Application and take action.',
  ];

  const stepStatus = [
    {
      type: doctor_status?.value.toLowerCase(),
      label: doctor_status?.value,
    },
    {
      type: smc_status?.value.toLowerCase(),
      label: smc_status?.value,
    },
    {
      type: collegeVerificationStatus?.value.toLowerCase(),
      label: collegeVerificationStatus?.value,
    },
    {
      type: smc_status?.value.toLowerCase(),
      label: smc_status?.value,
    },
    {
      type: nmc_status?.value.toLowerCase(),
      label: nmc_status?.value,
    },
  ];

  const theme = useTheme();

  const useStyles = makeStyles(() => ({
    stepperWrapper: {
      width: '1000px',
    },
  }));

  const classes = useStyles(theme);
  return (
    <Stepper
      className={classes.stepperWrapper}
      activeStep={activeStep}
      alternativeLabel
      connector={<QontoConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            sx={{
              fill: index === activeStep ? 'stepIconActive.main' : 'grey1.main',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="body3" component="div" textAlign="left">
              {label}
            </Typography>

            <Typography component="div" variant="body8" color="grey.label" textAlign="left">
              {stepDescription[index]}
              <br />
              {finalDates[index]}
            </Typography>
            <Box textAlign="left">
              <Chip
                type={stepStatus[index].type}
                label={<Typography variant="body4">{stepStatus[index].label}</Typography>}
              />
            </Box>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
