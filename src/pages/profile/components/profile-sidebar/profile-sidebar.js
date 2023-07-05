import { useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Grid } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import SideDrawerList from '../../../../shared/sidebar-drawer/sidebar-drawer-list';
import ProfileImage from '../profile-image/profile-image';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  [theme.breakpoints.up('xl')]: {
    width: 255,
  },
  backgroundColor: `${theme.palette.white.main}`,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: `${theme.palette.white.main}`,

  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 2.1),
  backgroundColor: `${theme.palette.white.main}`,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    [theme.breakpoints.up('xl')]: {
      width: 320,
    },
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.grey1.light,
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

export default function MiniDrawer({ DrawerOptions = [], handleSwitch }) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.common);
  const { nmcProfileData } = useSelector((state) => state.nmc);
  const { smcProfileData } = useSelector((state) => state.smc);
  const { nbeData } = useSelector((state) => state.nbe);
  const { personalDetails } = useSelector((state) => state.doctorUserProfileReducer);
  const { collegeData } = useSelector((state) => state.college);

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{ sx: { position: 'relative', border: 'none' } }}
    >
      <DrawerHeader
        sx={
          !open
            ? { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
            : {
                background: `linear-gradient(to bottom, ${theme.palette.grey.main} 0%,  ${theme.palette.grey.main} 100px, ${theme.palette.white.main} 20%,  ${theme.palette.white.main} 100%)`,
                mb: 4,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }
        }
      >
        {open ? (
          <Grid container>
            <Grid item xs={12}>
              <ProfileImage
                name={
                  loggedInUserType === 'Doctor'
                    ? personalDetails?.personal_details?.full_name
                    : loggedInUserType === 'College'
                    ? collegeData?.data?.name
                    : loggedInUserType === 'NMC'
                    ? nmcProfileData?.data?.display_name
                    : loggedInUserType === 'SMC'
                    ? smcProfileData?.data?.display_name
                    : loggedInUserType === 'NBE'
                    ? nbeData?.data?.display_name
                    : null
                }
              />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        <IconButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          sx={{ position: 'absolute', top: '2px' }}
        >
          {open ? <MenuOpenIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <SideDrawerList
        open={open}
        handleSwitch={handleSwitch}
        DrawerOptions={DrawerOptions}
        ActiveOption={userActiveTab}
      />
    </Drawer>
  );
}
