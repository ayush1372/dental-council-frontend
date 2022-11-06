import { Box, Container, Typography } from '@mui/material';

import styles from './page-not-found.module.scss';

export function PageNotFound() {
  return (
    <Container maxWidth="lg">
      <Box className={styles.main} p={8}>
        <Typography variant="h1" textAlign="center">
          Page Not Found
        </Typography>
      </Box>
    </Container>
  );
}
export default PageNotFound;
