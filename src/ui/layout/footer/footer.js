import { Box, Container, Divider, Grid } from '@mui/material';

import { AbdmHealthRecords } from './components/abdm-health-records/abdm-health-records';
import { Address } from './components/address/address';
import { Copyright } from './components/copyright/copyright';
import { ImportantLinks } from './components/important-links/important-links';
import { Policies } from './components/policies/policies';

export const Footer = () => (
  <Box>
    <Divider variant="fullWidth" component="div" sx={{ boxShadow: '1' }} />
    <Box bgcolor="primary.main" color="white.main" py={4}>
      <Container>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={3} mb={{ xs: 3, md: 0 }}>
            <Address />
          </Grid>
          <Grid item xs={12} sm={6} md={3} mb={{ xs: 3, md: 0 }}>
            <ImportantLinks />
          </Grid>
          <Grid item xs={12} sm={6} md={3} mb={{ xs: 3, md: 0 }}>
            <Policies />{' '}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AbdmHealthRecords />
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Copyright />
  </Box>
);
