/* eslint-disable no-console */
import { makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography, useTheme } from '@mui/material';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';

// import { useSelector } from 'react-redux';
import checkCircleFilled from '../../assets/images/ico-check-circle-filled.svg';
import { monthsData } from '../../constants/common-data';
import {
  userActionId,
  userGroupTypeId,
  workflowStatusId,
} from '../../helpers/functions/common-functions';
import { Chip } from '../../ui/core';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    // top: 10,
    left: 'calc(2% + 10px)',
    right: 'calc(92% + 4px)',
    top: '20%',
    transform: 'rotate(89deg)',
    '@media only screen and (max-width: 1365px)': {
      bottom: 0,
      left: '14px',
      right: '87%',
      transform: 'rotate(90deg)',
      transformOrigin: '5% 9%',
      zIndex: '0',
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
    fontSize: 34,
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
  console.log('stepper steps', steps);
  console.log('stepper selectedRowData', selectedRowData);
  // const ApplicationStatus = useSelector(
  //   (state) => state?.common?.doctorTrackApplicationTableData?.data?.data
  // );
  const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${monthsData[dateObj.getMonth()].value}-${dateObj.getFullYear()}`;
  };
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    stepperWrapper: {
      flexDirection: 'column-reverse',
      width: '100%',
    },
  }));

  const classes = useStyles(theme);

  const data = [
    { workflow_status_id: 1, action_id: 1, group_id: 1, action_date: '2023-03-29 10:17:09.717197' },
    {
      workflow_status_id: 1,
      action_id: 2,
      group_id: 2,
      action_date: '2023-03-29 10:19:41.505223',
      remarks: '',
    },
    {
      workflow_status_id: 1,
      action_id: 4,
      group_id: 4,
      action_date: '2023-03-29 10:24:26.177882',
      remarks: '',
    },
    {
      workflow_status_id: 1,
      action_id: 4,
      group_id: 2,
      action_date: '2023-03-29 10:29:31.312718',
      remarks: '',
    },
    {
      workflow_status_id: 2,
      action_id: 4,
      group_id: 3,
      action_date: '2023-03-29 10:30:07.295055',
      remarks: '',
    },
  ];
  return (
    <Stepper
      className={classes.stepperWrapper}
      activeStep={activeStep}
      alternativeLabel
      connector={<QontoConnector />}
      // orientation="vertical"
    >
      {/* {ApplicationStatus?.application_details?.map((label, index) => ( */}
      {data?.map((label, index) => (
        <Step key={index} sx={{ width: '100%' }}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            sx={{
              fill: index === activeStep ? 'stepIconActive.main' : 'grey1.main',
              alignItems: 'flex-start',
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body3" component="div" textAlign="left" pl={6}>
                {console.log(
                  'api resp',
                  label?.workflow_status_id,
                  workflowStatusId(label?.workflow_status_id)
                )}
                {`${userActionId(label?.action_id)} by ${userGroupTypeId(label?.group_id)}`}
              </Typography>

              <Typography
                component="div"
                variant="body8"
                color="grey.label"
                textAlign="left"
                pl={6}
              >
                {getDate(label?.action_date)}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Chip
                type={label?.workflow_status_id}
                label={
                  <Typography variant="body4">
                    {workflowStatusId(label?.workflow_status_id)}
                  </Typography>
                }
              />
            </Box>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
