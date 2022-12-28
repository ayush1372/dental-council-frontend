import { useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { CssBaseline, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import ProfileImage from '../profile-image/profile-image';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  [theme.breakpoints.up('lg')]: {
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
    [theme.breakpoints.up('lg')]: {
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

export default function MiniDrawer({
  DrawerOptions = [],
  handleSwitch,
  ActiveOption = 'dashboard',
}) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.ui);
  return (
    <Box
      display="flex"
      width="100%"
      borderRadius="8px"
      p={4}
      bgcolor={theme.palette.grey1.lighter}
      gap={4}
      justifyContent="space-between"
      minHeight={'550px'}
    >
      <Box bgcolor={theme.palette.white.main} borderRadius="8px">
        <CssBaseline />
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
                    background: `linear-gradient(to bottom, ${theme.palette.grey.main} 0%,  ${theme.palette.grey.main} 50%, ${theme.palette.white.main} 20%,  ${theme.palette.white.main} 100%)`,
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
                        ? 'Dr. ABC'
                        : loggedInUserType === 'College'
                        ? 'IP University'
                        : loggedInUserType === 'NMC'
                        ? 'National Medical Commission'
                        : loggedInUserType === 'SMC'
                        ? 'Maharashtra Medical Council'
                        : loggedInUserType !== 'Doctor' &&
                          loggedInUserType !== 'College' &&
                          loggedInUserType !== 'SMC' &&
                          loggedInUserType !== 'NMC'
                        ? 'Dr. ABC'
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
          {/* <Divider /> */}

          <List sx={{ p: 0 }}>
            {DrawerOptions.map((item, index) => (
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
                    primaryTypographyProps={{ fontSize: '14px' }}
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
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        sx={{
          width: '69%',
          bgcolor:
            (userActiveTab === 'my-profile' && loggedInUserType === 'Doctor') ||
            (userActiveTab === 'New-doctor-registration' && loggedInUserType === 'SMC')
              ? 'none'
              : `${theme.palette.white.main}`,
          flex: 1,
          borderRadius: '8px',
        }}
      >
        {DrawerOptions.map((item, index) =>
          item.tabName === ActiveOption ? <Box key={index}>{item.element}</Box> : ''
        )}
      </Box>
    </Box>
  );
}
