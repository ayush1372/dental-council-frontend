import { Box, Button, Container, Grid, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './page-not-found.module.scss';

export function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Grid container p={8}>
        <Grid item xs="12">
          <Box className={styles.main}  sx={{ backgroundColor: 'primary.main'}} p={8}>
            <Typography variant="h1" textAlign="left" sx={{ color: 'white.main'}}>
              404
            </Typography>
            <Typography variant="h1" textAlign="left" sx={{ color: 'white.main'}}>
              Page Not Found
            </Typography>
            <Box my={2}>
              <Typography varient="body1" sx={{ color: 'white.main'}}>
                We are sorry, the page you requested could not be found. Please go back to homepage.
              </Typography>
            </Box>
            <Button onClick={()=>navigate('/')} variant="contained" color="white">
              Go Back
            </Button>
          </Box>

        </Grid>
      </Grid>
    </Container>
  );
}
export default PageNotFound;
