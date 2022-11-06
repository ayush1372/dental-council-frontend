import { Box, Container, Grid } from '@mui/material';

import { AbdmHealthRecords } from './components/abdm-health-records/abdm-health-records';
import { Address } from './components/address/address';
import { Copyright } from './components/copyright/copyright';
import { ImportantLinks } from './components/important-links/important-links';
import { Policies } from './components/policies/policies';

import styles from './footer.module.scss';

export const Footer = () => (
  <>
    <Box className={styles.footerWrapper}>
      <Container>
        <Grid container columnSpacing={{ xs: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Address />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ImportantLinks />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Policies />{' '}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AbdmHealthRecords />
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Copyright />
  </>
);
