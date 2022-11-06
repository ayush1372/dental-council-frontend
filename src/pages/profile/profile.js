// import styles from './profile-new.module.scss';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse, Container, IconButton } from '@mui/material';

import { AbhaNumberCard } from './components/abha-number-card/abha-number-card';
// import { LoginSetPassword } from './components/login-set-password/login-set-password';

// import { verboseLog } from '../../config/debug';
// import  { PersistentDrawerLeft, ProfileDrawer } from './components/profile-drawer/profile-drawer';

export function Profile() {
  const [open, setOpen] = useState(true);
  // const [openDrawer, setOpenDrawer] = useState(false);

  // verboseLog('Drawer State',openDrawer)
  return (
    <Container maxWidth="md" sx={{ margin: '20px auto 20px', padding: '10px' }}>
      <Box>
        <Box>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon color="success" fontSize="inherit" />
                </IconButton>
              }
              sx={{ m: 2, marginLeft: '0px', borderRadius: '5px' }}
            >
              Your Mobile Number Is successfully updated.
            </Alert>
          </Collapse>
        </Box>
        {/* <Typography variant="h2" textAlign="center" component="span">
          Welcome to Your Profile
        </Typography> */}
        {/* <LoginSetPassword /> */}
        <AbhaNumberCard />
        {/* <Button 
          variant='contained'
          color='primary'
          onClick={() => setOpenDrawer(true)}
        >
          Open
        </Button>
        <Button 
          variant='contained'
          color='secondary'
          onClick={() => setOpenDrawer(false)}
        >
          Close
        </Button> */}
      </Box>
      {/* <ProfileDrawer />
      {/* <ResponsiveDrawer /> */}
      {/* {openDrawer && <PersistentDrawerLeft/>} */}
    </Container>
  );
}

export default Profile;
