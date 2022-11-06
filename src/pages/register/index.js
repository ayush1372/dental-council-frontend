import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import aadhaarHoverIcon from '../../assets/images/aadhar-icon-register.svg';
import drivingLicence from '../../assets/images/driving-licence.svg';
import panCardIcon from '../../assets/images/pancard-icon.png';
import RegisterCard from './components/register-card/register-card';

export function Register() {
  const { t } = useTranslation();

  return (
    <Container data-testid="registerpage" sx={{ paddingTop: '80px' }}>
      <Typography
        align="center"
        variant="h1"
        data-testid={'register-title-testid'}
        color="primary"
        letterSpacing={'0.72px'}
        mb={1}
      >
        {t('Create ABHA number')}
      </Typography>
      <Typography
        textAlign="center"
        data-testid={'register-subTitle-testid'}
        fontWeight={400}
        maxWidth="899px"
        component="div"
        m="0 auto"
      >
        {t(
          'To Create ABHA Number Choose Any One Option From Below, Or If You Already Have ABHA Number Login With The Given Link Below.'
        )}
      </Typography>
      <Box px={{ xs: '0', lg: '50px' }}>
        <Grid container columnSpacing={6} my={{ xs: '32px', md: '64px' }}>
          <RegisterCard
            hoverIcon={drivingLicence}
            cardIcon={drivingLicence}
            body={'Create your ABHA Number using Driving License Number'}
            btnName={'Using Driving License'}
            navigation={'driving-licence'}
            dataTestid={'register-licenceTitle-testid'}
          />
          <RegisterCard
            hoverCard
            aadhaarBox
            cardIcon={aadhaarHoverIcon}
            body={'Create your ABHA Number using Aadhaar Number'}
            btnName={'Using Aadhaar'}
            navigation={'aadhaar'}
            dataTestid={'register-aadhaarCard-testid'}
          />
          <RegisterCard
            hoverIcon={panCardIcon}
            cardIcon={panCardIcon}
            body={'Create your ABHA Number using PAN Number'}
            btnName={'Using PAN number'}
            navigation={''}
            dataTestid={'register-panCard-testid'}
          />
        </Grid>
      </Box>
      <Box textAlign="center">
        <Typography variant="subtitle1" component="span">
          {t('Already Have ABHA Number?')}{' '}
        </Typography>
        <Link href="login" underline="always" variant="subtitle1" color="secondary">
          {t('Login Here')}
        </Link>
      </Box>
    </Container>
  );
}

export default Register;
