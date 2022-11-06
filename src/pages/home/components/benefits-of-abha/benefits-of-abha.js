import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import easyPhrSignup from '../../../../assets/images/easy-PHR-sign-up.svg';
import hassleFreeAccess from '../../../../assets/images/hassle-free access.svg';
import uifiedBenefits from '../../../../assets/images/unified-benefits.svg';
import uniqueTrustableIdentity from '../../../../assets/images/unique-trustable-identity.svg';

export function BenefitsOfAbha() {
  const { t } = useTranslation();

  const cardContent = [
    {
      imageUrl: uniqueTrustableIdentity,
      title: 'Unique & Trustable Identity',
      description:
        'Establish unique identity across different healthcare providers within the healthcare ecosystem',
    },
    {
      imageUrl: uifiedBenefits,
      title: 'Unified Benefits',
      description:
        'Link all healthcare benefits ranging from public health programmes to insurance schemes to your unique ABHA number',
    },
    {
      imageUrl: hassleFreeAccess,
      title: 'Hassle-free Access',
      description: 'Avoid long lines for registration in healthcare facilities across the country',
    },
    {
      imageUrl: easyPhrSignup,
      title: 'Easy PHR Sign Up',
      description:
        'Seamless sign up for PHR (Personal Health Records) applications such as ABDM ABHA application for Health data sharing',
    },
  ];
  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <Container
        sx={{ paddingBottom: { xs: '40px', md: '80px' }, paddingTop: { xs: '40px', md: '80px' } }}
      >
        <Typography
          textAlign="center"
          variant="h1"
          color="white.main"
          letterSpacing="0.72px"
          fontWeight="500"
          mb={2}
        >
          {t('Benefits Of ABHA Number')}
        </Typography>
        <Typography
          margin="0 auto 40px"
          fontWeight={400}
          color="white.main"
          component="div"
          textAlign="center"
          align="center"
          maxWidth="899px"
        >
          ABHA Number Is A 14 Digit Number That Will Uniquely Identify You As A Participant In
          India’s Digital Healthcare Ecosystem. ABHA Number Will Establish A Strong And Trustable
          Identity For You That Will Be Accepted By Healthcare Providers And Payers Across The
          Country
        </Typography>
        <Grid container spacing={3}>
          {cardContent.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} alignItems="center" key={index}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <img src={item.imageUrl} alt={item.title} />
                  <CardContent>
                    <Typography gutterBottom color="primary" variant="body1" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body3"
                      color="text.secondary"
                      textAlign="center"
                      component="div"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default BenefitsOfAbha;
