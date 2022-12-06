// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import { Button } from '../../../../ui/core';

import { useState } from 'react';

// import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Divider, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
    width: 320,
  },
  backgroundColor: '#F8F7FA',

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
  backgroundColor: '#F8F7FA',

  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 2.1),
  backgroundColor: '#F8F7FA',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: 320,
    },
    // position: 'relative',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#F8F7FA',
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

export default function MiniDrawer({ DrawerOptions = [], handleSwitch, ActiveOption = 0 }) {
  const [open, setOpen] = useState(true);
  // const [openOptions, setOpenOptions] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  return (
    <Box display="flex" width="100%">
      <Box
        position="relative"
        bgcolor="white.main"
        borderRight={`2px solid ${theme.palette.inputBorderColor.main}`}
      >
        <CssBaseline />
        <Drawer variant="permanent" open={open} PaperProps={{ sx: { position: 'relative' } }}>
          <DrawerHeader
            sx={
              !open && { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
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
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {open ? <MenuOpenIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* {open ? (
            <Typography
              vairant="body1"
              color="primary.main"
              bgcolor="white.main"
              p="10px 0px 10px 24px"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              My Account
              <IconButton sx={{ mr: 2.5 }} onClick={() => setOpenOptions(!openOptions)}>
                {openOptions ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Typography>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" py={1.2}>
              <AssignmentIndOutlinedIcon
                sx={{ color: theme.palette.primary.main }}
                onClick={() => setOpenOptions(!openOptions)}
              />
              <KeyboardArrowDownIcon
                sx={{ fontSize: '12px', color: theme.palette.primary.main }}
                onClick={() => setOpenOptions(!openOptions)}
              />
            </Box>
          )} */}
          {/* <Collapse
            in={openOptions}
            // timeout={800}
            easing={{
              enter: 'linear',
              exit: 'linear',
            }}
          > */}
          <List sx={{ p: 0 }}>
            {DrawerOptions.map((item, index) => (
              <ListItem
                key={`profileOption_${index}`}
                id={`profileOption_${index}`}
                disablePadding
                sx={{
                  display: 'block',
                  bgcolor: index === ActiveOption ? theme.palette.white.main : null,
                  border: '1px solid #EDEDF6',
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    handleSwitch(index);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color:
                        index === ActiveOption
                          ? theme.palette.primary.main
                          : theme.palette.grey1.main,
                    }}
                  >
                    {!open ? item.icon : null}
                    {/* {item.icon} */}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ fontSize: '16px' }}
                    sx={{
                      opacity: open ? 1 : 0,
                      color:
                        index === ActiveOption
                          ? theme.palette.primary.main
                          : theme.palette.textPrimary.main,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* </Collapse> */}
        </Drawer>
      </Box>
      {/* <Container sx={{ flexGrow: 1, px: 3, bgcolor: 'white.main' }}>
        {DrawerOptions.map((item, index) =>
          item.option === ActiveOption ? (
            <Box mt={8} key={index}>
              {item.element}
            </Box>
          ) : (
            ''
          )
        )}
      </Container> */}
    </Box>
  );
}
