import { useState } from 'react';

import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Container, Grid, Link, Tab, Tabs, Typography } from '@mui/material';

import { Accordion } from '../../ui/core/accordion/accordion';

const general_faqs_accordion_content = [
  {
    body: 'ABHA number is a 14 digit number that will uniquely identify you as a participant in India’s digital healthcare ecosystem. ABHA number will establish a strong and trustable identity for you that will be accepted by healthcare providers and payers across the country',
    title: 'What is ABHA number ?',
  },
  {
    body: 'ABHA (Ayushman Bharat Health Account) Address is a unique identifier (self declared username) that enables you to share and access your health records digitally. Your ABHA address may look like ‘yourname@consent manager’.For instance, xyz@abdm is a ABHA address with ABDM Consent Manager that will facilitate health data exchange for you with appropriate consent on the ABDM network',
    title: 'What is ABDM ?',
  },
  {
    body: 'You can use your ABHA number to seamlessly sign up for a ABHA address, and ensure that the health records created for you are shared only with you. To enable health data sharing, it is recommended that you create ABDM ABHA address and link it with your ABHA number .',
    title: 'Linking ABHA number with ABHA address',
  },
  {
    body: 'it is Voluntary that you create ABDM ABHA address and link it with your ABHA number .',
    title: 'Voluntary Opt-out ?',
  },
  {
    body: 'To enable health data sharing, it is recommended that you create ABDM ABHA address and link it with your ABHA number .',
    title: 'What is HIE-CM ?',
  },
  {
    body: 'it is ABHA Number that you create ABDM ABHA address and link it with your ABHA number .',
    title: 'How do i get ABHA Number ?',
  },
];

const other_faqs_accordion_content = [
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
];

const miscellaneous_content = [
  {
    body: 'ABHA number is a 14 digit number that will uniquely identify you as a participant in India’s digital healthcare ecosystem. ABHA number will establish a strong and trustable identity for you that will be accepted by healthcare providers and payers across the country',
    title: 'What is Miscellaneous?',
  },
  {
    body: 'ABHA (Ayushman Bharat Health Account) Address is a unique identifier (self declared username) that enables you to share and access your health records digitally. Your ABHA address may look like ‘yourname@consent manager’.For instance, xyz@abdm is a ABHA address with ABDM Consent Manager that will facilitate health data exchange for you with appropriate consent on the ABDM network',
    title: 'What is support?',
  },
  {
    body: 'You can use your ABHA number to seamlessly sign up for a ABHA address, and ensure that the health records created for you are shared only with you. To enable health data sharing, it is recommended that you create ABDM ABHA address and link it with your ABHA number .',
    title: 'Linking ABHA number with ABHA address',
  },
];
const iframe =
  '<iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=9th%20Floor%2C%20Tower-L%2C%20Jeevan%20Bharati%20Building%2C%20Connaught%20Place%2C%20New%20Delhi%20-%20110001&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';

const Iframe = () => {
  return (
    <iframe
      width="100%"
      height="539"
      title="Google Maps"
      id="gmap_canvas"
      src="https://maps.google.com/maps?q=9th%20Floor%2C%20Tower-L%2C%20Jeevan%20Bharati%20Building%2C%20Connaught%20Place%2C%20New%20Delhi%20-%20110001&t=&z=13&ie=UTF8&iwloc=&output=embed"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
    ></iframe>
  );
};

export function Contact() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, value) => {
    setTabValue(value);
  };
  return (
    <Container maxWidth="lg">
      <Box p={4}>
        <Box mb={10}>
          <Typography variant="h2" color="primary">
            Get In Touch With Us For More Information
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box backgroundColor="primary.main" p={4} borderRadius="10px" color="white.main">
              <Box sx={{ display: 'flex', marginTop: '52px' }}>
                <Box sx={{ marginTop: '4px' }}>
                  <LocationOnOutlinedIcon />
                </Box>
                <Box pl={1.5}>
                  <Typography variant="body1">ADDRESS</Typography>
                  <Box>
                    <Typography variant="body1">
                      9th Floor, Tower-l, Jeevan Bharati Building, Connaught Place, New Delhi -
                      110001
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', marginTop: '24px' }}>
                <Box sx={{ marginTop: '4px' }}>
                  <CallOutlinedIcon />
                </Box>
                <Box>
                  <Box pl={1.5}>
                    <Typography variant="body1">CONTACT US</Typography>
                    <Box>
                      <Box>
                        <Typography variant="body1">Toll-Free Number : 1800-11-4477 </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body1">E-mail: abdm@nha.gov.in </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                backgroundColor="white.main"
                color="primary.main"
                mt={5}
                borderRadius="10px"
                padding={'21px 27px 15px 28px'}
              >
                <Typography variant="body1">
                  Note:- Please do not file your grievance on “CONTACT US”, instead kindly address
                  it on our grievance portal by visiting{' '}
                  <Link color="secondary.main" href="https://grievance.abdm.gov.in" target="_blank">
                    https://grievance.abdm.gov.in
                  </Link>{' '}
                  and register your grievances there.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box ml={4}>
              <Iframe iframe={iframe} />
            </Box>
          </Grid>
        </Grid>
        <Box
          mt={2}
          sx={{
            display: 'flex',
          }}
        >
          <Box>
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                width: '268px',
                '.MuiButtonBase-root': {
                  alignItems: 'flex-start',
                  color: 'tabDefaultTextColor.main',
                  borderLeft: '4px solid',
                  borderLeftColor: 'grey.main',
                  textTransform: 'capitalize',
                  '&.Mui-selected': {
                    color: 'white.main',
                    backgroundColor: 'tabHighlightedBackgroundColor.main',
                    borderLeft: '4px solid',
                    borderLeftColor: 'secondary.main',
                  },
                },
              }}
            >
              <Tab label="General FAQs" />
              <Tab label="Other FAQs" />
              <Tab label="Miscellaneous" />
            </Tabs>
          </Box>
          <Box
            ml={2}
            sx={{
              width: '100%',
            }}
          >
            <Accordion
              content={
                tabValue === 0
                  ? general_faqs_accordion_content
                  : tabValue === 1
                  ? other_faqs_accordion_content
                  : tabValue === 2
                  ? miscellaneous_content
                  : ''
              }
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
export default Contact;
