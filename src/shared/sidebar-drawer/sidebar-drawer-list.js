import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPersonalDetailsData,
  updateDoctorContactDetails,
} from '../../../src/store/actions/doctor-user-profile-actions';
export default function SideDrawerList({ handleSwitch, DrawerOptions, ActiveOption, open }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { personalDetails, registrationDetails } = useSelector(
    (state) => state?.doctorUserProfileReducer
  );

  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );
  const doctorEsignStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.esign_status
  );
  const { data } = useSelector((state) => state?.loginReducer?.loginData);
  const { qualification_detail_response_tos } = registrationDetails || {};

  const getQueryRaisedIconView = () => {
    let queryRaised;
    qualification_detail_response_tos?.slice(1)?.map((data) => {
      if (data?.queries?.length > 0) {
        queryRaised = true;
      }
    });
    return queryRaised;
  };
  const onTrackApplicationClick = () => {
    let personalData = { track_application_read_status: true };
    dispatch(updateDoctorContactDetails(personalData, personalDetails?.hp_profile_id)).then(() => {
      dispatch(getPersonalDetailsData(personalDetails?.hp_profile_id));
    });
  };

  return (
    <List sx={{ p: 0 }}>
      {DrawerOptions?.map((item, index) => (
        <Tooltip
          arrow
          placement="bottom-start"
          title={
            loggedInUserType === 'Doctor' &&
            (!personalDetails?.nmr_id ||
              logInDoctorStatus ||
              personalDetails?.hp_profile_status_id === 5 ||
              personalDetails?.hp_profile_status_id === 6) &&
            item?.tabName === 'work-details' &&
            index === 4
              ? 'You will be able to add work details after Profile Verification'
              : !open
              ? `${item?.name} `
              : ''
          }
          key={`profileOption_${index}`}
        >
          <ListItem
            key={`profileOption_${index}`}
            id={`profileOption_${index}`}
            disablePadding
            sx={{
              display: 'block',
              borderLeft:
                item?.tabName === ActiveOption
                  ? `5px solid ${theme.palette.secondary.lightOrange}`
                  : null,
              borderBottom: `1px solid ${theme.palette.inputBorderColor.main}`,
              '&:first-child': {
                borderTop: `1px solid ${theme.palette.inputBorderColor.main}`,
              },
            }}
          >
            <ListItemButton
              disabled={
                loggedInUserType === 'Doctor' &&
                (!personalDetails?.nmr_id ||
                  doctorEsignStatus === 3 ||
                  doctorEsignStatus === 2 ||
                  personalDetails?.esign_status === 2 ||
                  personalDetails?.esign_status === 3 ||
                  personalDetails?.hp_profile_status_id === 5 ||
                  personalDetails?.hp_profile_status_id === 6) &&
                (item?.tabName === 'voluntary-suspend-license' ||
                  item?.tabName === 'additional-qualifications' ||
                  item?.tabName === 'work-details')
                  ? true
                  : loggedInUserType === 'College' &&
                    (data?.user_sub_type === 2 ||
                      data?.user_sub_type === 3 ||
                      data?.user_sub_type === 4 ||
                      data?.user_sub_type === 5) &&
                    index === 2
                  ? true
                  : loggedInUserType === 'NMC' && data?.user_sub_type === 7 && index === 4
                  ? true
                  : false
              }
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => {
                handleSwitch(item?.tabName);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color:
                    item?.tabName === ActiveOption
                      ? theme.palette.secondary.lightOrange
                      : theme.palette.grey1.main,
                }}
              >
                {!open ? item?.icon && <Tooltip>{item?.icon}</Tooltip> : ''}
              </ListItemIcon>
              <ListItemText
                onClick={
                  item?.tabName === 'track-application' &&
                  !personalDetails.is_track_application_read_status &&
                  onTrackApplicationClick
                }
                display="flex"
                primary={
                  loggedInUserType === 'Doctor' &&
                  (item?.tabName === 'track-application' ||
                    item?.tabName === 'additional-qualifications') ? (
                    // eslint-disable-next-line react/jsx-indent
                    <Grid container columnGap={1} alignItems={'center'}>
                      <Grid item>{item?.name}</Grid>
                      {(item?.tabName === 'track-application' &&
                        !personalDetails.is_track_application_read_status) ||
                      (item?.tabName === 'additional-qualifications' &&
                        getQueryRaisedIconView()) ? (
                        // eslint-disable-next-line react/jsx-indent
                        <Grid item>
                          <Typography display={'flex'} alignItems={'center'}>
                            <ReportOutlinedIcon
                              fontSize="inherit"
                              sx={{ color: theme.palette.secondary.main }}
                            />
                          </Typography>
                        </Grid>
                      ) : (
                        ''
                      )}
                    </Grid>
                  ) : (
                    item?.name
                  )
                }
                primaryTypographyProps={{ variant: 'body3' }}
                sx={{
                  opacity: open ? 1 : 0,
                  color:
                    item?.tabName === ActiveOption
                      ? theme.palette.secondary.lightOrange
                      : theme.palette.textPrimary.main,
                }}
              />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
}
