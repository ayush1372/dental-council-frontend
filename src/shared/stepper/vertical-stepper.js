import { makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';

import QueryRaiseIcon from '../../assets/images/query-raised-icon.svg';
import RejectedIcon from '../../assets/images/rejected-icon.svg';
import SubmittedIcon from '../../assets/images/submited-icon.svg';
import { monthsData } from '../../constants/common-data';
import {
  trackApplicationLabel,
  trackApplicationStatusColor,
  userGroupTypeId,
} from '../../helpers/functions/common-functions';
import { Chip } from '../../ui/core';
export default function VerticalLinearStepper() {
  const userTrackActionId = (actionType) => {
    const actionTypeObj = {
      1: 'Submitted',
      2: 'Forwarded',
      3: 'Query Raised',
      4: 'Approve',
      5: 'Rejected',
      6: 'Temporarily Blacklisted',
      7: 'Permanently Blacklisted',
    };
    return actionTypeObj[actionType];
  };

  const ApplicationStatus = useSelector(
    (state) => state?.common?.doctorTrackApplicationTableData?.data?.data
  );
  const repeatedApplication = () => {
    let count = 0;
    ApplicationStatus?.application_details?.forEach((currObj) => {
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

    let ans = dateObj?.getMinutes();
    let minute;
    if (ans >= 0 && ans <= 9) {
      minute = '0' + ans;
    } else {
      minute = ans;
    }
    return ` ${dateObj?.getHours()}:${minute}`;
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


  return (
    <>
      {ApplicationStatus?.application_details
        ?.slice(0)
        ?.reverse()
        ?.map((label, index) => (
          <Box className={classes.statusBlock} display="flex" flexDirection="column" key={index}>
            <Box display="flex" alignItems="center">
              {(label?.action_id === 1 &&
                index === ApplicationStatus?.application_details?.length - 1) ||
              label?.action_id === 2 ||
              label?.action_id === 6 ||
              label?.action_id === 4 ? (
                <CheckCircleIcon
                  sx={{
                    width: '20px',
                    height: '20px',
                    color: trackApplicationStatusColor(userTrackActionId(label?.action_id)),
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
                  color={trackApplicationStatusColor(userTrackActionId(label?.action_id))}
                />
              )}
              {label?.action_id === 3 && (
                <img
                  width="20px"
                  height="25px"
                  src={QueryRaiseIcon}
                  alt="QueryRaiseIcon"
                  color={trackApplicationStatusColor(userTrackActionId(label?.action_id))}
                />
              )}

              <Typography component="div" fontWeight="600" pl={1}>
                {userTrackActionId(label?.action_id) === 'Approve'
                  ? `Applications ${
                      label?.action_id === 4
                        ? label?.group_id === 3
                          ? userTrackActionId(label?.action_id) + 'd'
                          : 'Verified'
                        : userTrackActionId(label?.action_id) + 'd'
                    } by ${userGroupTypeId(label?.group_id)}`
                  : (ApplicationStatus?.application_type === 3 ||
                      ApplicationStatus?.application_type === 4 ||
                      ApplicationStatus?.application_type === 5) &&
                    (label?.workflow_status_id === 2 ||
                      label?.workflow_status_id === 5 ||
                      label?.workflow_status_id === 6) &&
                    label?.action_id === 1
                  ? `Application Submitted and Auto Approved`
                  : `Application ${userTrackActionId(label?.action_id)} by ${userGroupTypeId(
                      label?.group_id
                    )}`}
              </Typography>
              <Chip
                label={trackApplicationLabel(userTrackActionId(label?.action_id))}
                type={
                  userTrackActionId(label?.action_id) === 'Submitted' ||
                  userTrackActionId(label?.action_id) === 'Forwarded' ||
                  userTrackActionId(label?.action_id) === 'Approve' ||
                  userTrackActionId(label?.action_id) === 'Temporary suspension'
                    ? 'approved'
                    : userTrackActionId(label?.action_id) === 'Rejected'
                    ? 'reject'
                    : userTrackActionId(label?.action_id) === 'Query Raised'
                    ? 'queryRaised'
                    : null
                }
              />
            </Box>
            <Box
              borderLeft={
                (label?.action_id !== 1 &&
                  label?.action_id !== 6 &&
                  index === ApplicationStatus?.application_details?.length - 1) ||
                label?.action_id === 2 ||
                label?.action_id === 4 ||
                ((ApplicationStatus?.application_type === 3 ||
                  ApplicationStatus?.application_type === 4 ||
                  ApplicationStatus?.application_type === 5) &&
                  index !== ApplicationStatus?.application_details?.length - 1 &&
                  label?.action_id !== 1)
                  ? `2px solid ${theme?.palette?.success?.main}`
                  : label?.action_id === 1 &&
                    repeatedApplication() > 1 &&
                    index !== ApplicationStatus?.application_details?.length - 1
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
              <Typography component="div" variant="body1" fontWeight="500">
                {userTrackActionId(label?.action_id) === 'Forwarded' &&
                userGroupTypeId(label?.group_id) === 'SMC'
                  ? 'SDC reviewed the application and forwarded to college for further verification'
                  : userTrackActionId(label?.action_id) === 'Approve' &&
                    userGroupTypeId(label?.group_id) === 'College'
                  ? 'College reviewed and verified the application. Application now has been sent to SDC for further verification.'
                  : userTrackActionId(label?.action_id) === 'Rejected' &&
                    userGroupTypeId(label?.group_id) === 'College'
                  ? 'Your application has been rejected by college for following reason'
                  : userTrackActionId(label?.action_id) === 'Approve' &&
                    userGroupTypeId(label?.group_id) === 'SMC'
                  ? 'SDC reviewed and verified the application.'
                  : userTrackActionId(label?.action_id) === 'Approve' &&
                    userGroupTypeId(label?.group_id) === 'NMC'
                  ? 'DCI reviewed and approved the application.'
                  : ''}
              </Typography>
              <Typography component="div" variant="body3" fontWeight="500">
                {`${label?.remarks ? label?.remarks : ''}`}
              </Typography>
              <Typography component="div" variant="body3" fontWeight="500">
                {`${moment(getDate(ApplicationStatus?.submission_date)).format('DD-MM-YYYY')} - ${
                  getTime(label?.action_date) ? getTime(label?.action_date) : ''
                }`}
              </Typography>
            </Box>
          </Box>
        ))}
    </>
  );
}
