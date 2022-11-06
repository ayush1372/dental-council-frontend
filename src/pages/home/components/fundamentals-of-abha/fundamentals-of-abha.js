import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';
import { Accordion, Button } from '../../../../ui/core';

export function FundamentalsOfAbha() {
  // const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Container sx={{ marginTop: { xs: '30px', md: '104px' } }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Typography variant="h3" color="primary" fontWeight={400} letterSpacing="0.03px" mb={0.5}>
            Support
          </Typography>
          <Typography variant="h1" letterSpacing="0.03px" color="primary.dark" mb={2}>
            FAQs
          </Typography>
          <Typography
            variant="body1"
            component="div"
            letterSpacing="0.72px"
            color="black.textBlack"
            mb={2}
          >
            Everything you need to know about the ABHA number. Can&apos;t find the answers you are
            looking for?
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
        </Grid>
        <Grid item xs={12} md={7} mt={{ xs: '24px', md: '0' }}>
          <Accordion
            content={[
              {
                body: 'ABHA number is a 14 digit number that will uniquely identify you as a participant in India’s digital healthcare ecosystem. ABHA number will establish a strong and trustable identity for you that will be accepted by healthcare providers and payers across the country',
                title: 'What is ABHA number?',
              },
              {
                body: 'ABHA (Ayushman Bharat Health Account) Address is a unique identifier (self declared username) that enables you to share and access your health records digitally. Your ABHA address may look like ‘yourname@consent manager’.For instance, xyz@abdm is a ABHA address with ABDM Consent Manager that will facilitate health data exchange for you with appropriate consent on the ABDM network',
                title: 'What is ABHA Address?',
              },
              {
                body: 'You can use your ABHA number to seamlessly sign up for a ABHA address, and ensure that the health records created for you are shared only with you. To enable health data sharing, it is recommended that you create ABDM ABHA address and link it with your ABHA number .',
                title: 'Linking ABHA number with ABHA address',
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default FundamentalsOfAbha;
