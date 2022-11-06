// import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';

import Contact from '../contact';

function Support() {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: 'grey.main',
          height: '200px',
          padding: '62px 0 0 56px',
        }}
      >
        <Box>
          <Typography variant="h1" color="primary.main">
            Support
          </Typography>
        </Box>
        <Box mt={2}>
          <Breadcrumbs
            sx={{
              '.MuiBreadcrumbs-separator': {
                color: 'primary.main',
              },
            }}
          >
            <Typography variant="body1" color="primary.main">
              Home
            </Typography>
            <Typography variant="body1" color="primary.main">
              Support
            </Typography>
            <Typography variant="body1" color="breadCrumbActiveColor.main">
              Contact Us
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Box>
        <Contact />
      </Box>
    </Box>
  );
}

export default Support;
