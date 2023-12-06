import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './about.module.scss';

export function About() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Grid container p={8}>
        <Grid item xs="12">
          <Box className={styles.main} sx={{ backgroundColor: 'primary.main' }} p={8}>
            <Typography variant="h1" textAlign="left" sx={{ color: 'white.main' }}>
              Introduction
            </Typography>
            <Box my={2}>
              <Typography varient="body1" sx={{ color: 'white.main' }}>
                <p>
                  {' '}
                  The Dental Council of India - a Statutory Body - was constituted on 12th April
                  1949 under an Act of Parliament - The Dentists Act, 1948 (XVI of 1948). The
                  amendments were made through an ordinance promulgated by the President of India on
                  27th August 1992. Through this ordinance, new sections i.e. Section 10A, 10B, 10C
                  were introduced in the Dentists Act, 1948 primarily to restrict mushroom growth of
                  dental colleges, increase of the seats in any of the courses and starting of new
                  higher courses without the prior permission of the Central Government, Ministry of
                  Health & Family Welfare. The amendment was duly notified by the Government of
                  India in Extraordinary Gazette of India, Part-II, Section-I on 3rd April 1993 with
                  effective from 1st June 1992.
                </p>
              </Typography>
              <Typography varient="body1" sx={{ color: 'white.main' }}>
                <p>
                  {' '}
                  The Council is financed mainly by grants from the Government of India, Ministry of
                  Health & Family Welfare (Department of Health & Family Welfare) though the other
                  source of income of the Council is the 1/4th share of fees realized every year by
                  various State Dental Councils under Section 53 of the Dentists Act, 1948,
                  Inspection fee from the Dental Institutions under Section 15 of the Dentists Act,
                  1948 and application fee from the organization to apply for permission to Set up
                  New Dental College, Opening of Higher Courses of Study and Increase of Admission
                  Capacity in Dental Colleges under section 10A of the Dentists (Amendment) Act,
                  1993.
                </p>
              </Typography>
            </Box>
            <Button onClick={() => navigate('/')} variant="contained" color="white">
              Go Back To Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default About;
