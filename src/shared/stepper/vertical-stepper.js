import { makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import QueryRaiseIcon from '../../assets/images/query-raised-icon.svg';
import RejectedIcon from '../../assets/images/rejected-icon.svg';
import SubmittedIcon from '../../assets/images/submited-icon.svg';
import { monthsData } from '../../constants/common-data';
import {
  trackApplicationLabel,
  trackApplicationStatusColor,
  userActionId,
  userGroupTypeId,
} from '../../helpers/functions/common-functions';
import { Chip } from '../../ui/core';

export default function VerticalLinearStepper() {
  const ApplicationStatus = useSelector(
    (state) => state?.common?.doctorTrackApplicationTableData?.data?.data
  );
  const repeatedApplication = () => {
    let count = 0;
    data?.forEach((currObj) => {
      if (currObj?.action_id === 1 && currObj?.group_id === 1) {
        count = count + 1;
      }
    });
    return count;
  };

  const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${monthsData[dateObj.getMonth()].value}-${dateObj.getFullYear()}`;
  };
  const getTime = (date) => {
    const dateObj = new Date(date);

    return ` ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    statusBlock: {
      position: 'relative',
      marginBottom: '10px',

      '&:last-child': {
        '&.description': {
          border: 'none',
        },
      },
    },
    icon: {
      position: 'absolute',
      right: '16px',
      top: '0',
    },
  }));

  const classes = useStyles(theme);
  const data = [
    {
      workflow_status_id: 1,
      action_id: 1,
      group_id: 1,
      action_date: '2023-03-29 10:17:09.717197',
    },

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
      group_id: 1,
      action_date: '2023-03-29 10:24:26.177882',
      remarks: '',
    },

    {
      workflow_status_id: 1,
      action_id: 1,
      group_id: 1,
      action_date: '2023-03-29 10:29:31.312718',
      remarks: '',
    },

    {
      workflow_status_id: 2,
      action_id: 5,
      group_id: 3,
      action_date: '2023-03-29 10:30:07.295055',
      remarks: '',
    },
  ];

  return (
    <>
      {data.reverse()?.map((label, index) => (
        <Box className={classes.statusBlock} display="flex" flexDirection="column" key={index}>
          <Box display="flex" alignItems="center">
            {(label?.action_id === 1 && index === data?.length - 1) ||
            label?.action_id === 2 ||
            label?.action_id === 4 ? (
              <CheckCircleIcon
                sx={{
                  width: '20px',
                  height: '20px',
                  color: trackApplicationStatusColor(userActionId(label?.action_id)),
                }}
              />
            ) : (
              label?.action_id === 1 &&
              label?.group_id === 1 &&
              repeatedApplication() > 1 && (
                <img
                  width="20px"
                  height="25px"
                  src={SubmittedIcon}
                  alt="submitted icon"
                  color={
                    label?.action_id === 1 && label?.group_id === 1 && repeatedApplication() > 1
                      ? `${theme?.palette?.primary?.main}`
                      : 'none'
                  }
                />
              )
            )}
            {label?.action_id === 5 && (
              <img
                width="20px"
                height="30px"
                src={RejectedIcon}
                alt="RejectedIcon"
                color={trackApplicationStatusColor(userActionId(label?.action_id))}
              />
            )}
            {label?.action_id === 3 && (
              <img
                width="20px"
                height="25px"
                src={QueryRaiseIcon}
                alt="QueryRaiseIcon"
                color={trackApplicationStatusColor(userActionId(label?.action_id))}
              />
            )}

            <Typography component="div" fontWeight="600" pl={1}>
              {userActionId(label?.action_id) === 'Approve'
                ? `${userActionId(label?.action_id) + 'd'} by ${userGroupTypeId(label?.group_id)}`
                : (ApplicationStatus?.application_type === 3 ||
                    ApplicationStatus?.application_type === 4 ||
                    ApplicationStatus?.application_type === 5) &&
                  label?.workflow_status_id === 2 &&
                  label?.action_id === 1
                ? `Submitted and Auto Approved`
                : `${userActionId(label?.action_id)} by ${userGroupTypeId(label?.group_id)}`}
            </Typography>
            <Chip
              label={trackApplicationLabel(userActionId(label?.action_id))}
              type={
                userActionId(label?.action_id) === 'Submitted' ||
                userActionId(label?.action_id) === 'Forwarded' ||
                userActionId(label?.action_id) === 'Approve'
                  ? 'approved'
                  : userActionId(label?.action_id) === 'Rejected'
                  ? 'reject'
                  : userActionId(label?.action_id) === 'Query Raised'
                  ? 'queryRaised'
                  : ''
              }
            />
          </Box>
          <Box
            borderLeft={
              (label?.action_id !== 1 && index === data?.length - 1) ||
              label?.action_id === 2 ||
              label?.action_id === 4 ||
              ((ApplicationStatus?.application_type === 3 ||
                ApplicationStatus?.application_type === 4 ||
                ApplicationStatus?.application_type === 5) &&
                index !== data?.length - 1 &&
                label?.action_id !== 1)
                ? `2px solid ${theme?.palette?.success?.main}`
                : label?.action_id === 1 && repeatedApplication() > 1 && index !== data?.length - 1
                ? `2px solid ${theme?.palette?.primary?.main}`
                : label?.action_id === 5
                ? `2px solid ${theme?.palette?.youTubeColor?.main}`
                : label?.action_id === 3
                ? `2px solid ${theme?.palette?.secondary?.main}`
                : 'none'
            }
            pl={2}
            ml="10px"
            mt="5px"
            pb={1}
          >
            <Typography component="div" variant="body3" fontWeight="500">
              {label?.remarks}
            </Typography>
            <Typography component="div" variant="body3" fontWeight="500">
              {`${getDate(label?.action_date)} - ${getTime(label?.action_date)}  `}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
