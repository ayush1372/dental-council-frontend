import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function SideDrawerList({ handleSwitch, DrawerOptions, ActiveOption, open }) {
  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );
  const { data } = useSelector((state) => state?.loginReducer?.loginData);

  return (
    <List sx={{ p: 0 }}>
      {DrawerOptions?.map((item, index) => (
        <Tooltip
          title={
            loggedInUserType === 'Doctor' &&
            (!personalDetails?.nmr_id ||
              logInDoctorStatus ||
              personalDetails?.hp_profile_status_id === 5 ||
              personalDetails?.hp_profile_status_id === 6) &&
            item.tabName === 'work-details' &&
            index === 4
              ? 'You will be able to add work details after Profile Verification'
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
                item.tabName === ActiveOption
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
                  (logInDoctorStatus &&
                    (personalDetails?.hp_profile_status_id === 5 ||
                      personalDetails?.hp_profile_status_id === 6))) &&
                (item.tabName === 'voluntary-suspend-license' ||
                  item.tabName === 'additional-qualifications' ||
                  item.tabName === 'work-details')
                  ? true
                  : loggedInUserType === 'College' &&
                    (data?.user_sub_type === 2 || data?.user_sub_type === 3) &&
                    index === 2
                  ? true
                  : false
              }
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => {
                handleSwitch(item.tabName);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color:
                    item.tabName === ActiveOption
                      ? theme.palette.secondary.lightOrange
                      : theme.palette.grey1.main,
                }}
              >
                {!open ? item.icon : null}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: 'body3' }}
                sx={{
                  opacity: open ? 1 : 0,
                  color:
                    item.tabName === ActiveOption
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
