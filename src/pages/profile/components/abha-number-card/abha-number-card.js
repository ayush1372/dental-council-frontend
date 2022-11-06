import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ABDMLOGO from '../../../../assets/images/abdm-profile-card-logo.svg';
import plusIcon from '../../../../assets/images/card-plus-icon.png';
import profilePic from '../../../../assets/images/child.png';
import mobileAppScan from '../../../../assets/images/mobileAppScan.png';
import nationalHealthAuthority from '../../../../assets/images/national-health-authority.svg';
import { Button } from '../../../../ui/core';

import styles from './abha-number-card.module.scss';

export function AbhaNumberCard() {
  const { t } = useTranslation();

  let dataObj = {
    name: 'Aarush Sharma',
    abha_no: '42-3232-1234-2345',
    abha_address: 'aarush.sharma@abdm',
    gender: 'Male',
    dob: '13-02-0000',
    mobile: '91-9956332182',
  };

  const onHandleDownload = () => {
    let { data } = '';

    var file = new Blob([data]);
    var fileURL = URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = fileURL;
    let name = 'healthId.png';
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  };

  const onHandlePdf = () => {
    let { data } = '';

    var file = new Blob([data], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  return (
    <Container maxWidth="sm" sx={{ margin: '20px auto 20px', padding: '10px' }}>
      <Typography
        variant="h1"
        mb={4}
        textAlign="center"
        data-testid={'abha-number-card-title-testid'}
      >
        {t('Your ABHA Number Card')}
      </Typography>

      <Box>
        <Box border="2px solid" borderColor="profileCardBorder.main">
          <Box
            sx={{ backgroundColor: 'primary.main' }}
            display="flex"
            justifyContent="space-between"
            p="24px 40px"
            height={'109px'}
          >
            <img src={nationalHealthAuthority} alt="National Health Authority" />
            <Box textAlign="center" color="white.main">
              <Typography
                fontSize="20px"
                lineHeight="32px"
                fontWeight="400"
                letterSpacing="0.4px"
                component={'div'}
                data-testid={'abha-number-header-title-testid'}
              >
                Ayushman Bharat Health Account
              </Typography>
              <Typography
                fontSize="18px"
                lineHeight="32px"
                fontWeight="400"
                letterSpacing="0.4px"
                component={'div'}
                data-testid={'abha-number-header-title-testid'}
              >
                ABHA Card
              </Typography>
            </Box>
            <img
              src={ABDMLOGO}
              alt="ABDM Logo"
              // height="57px" width={'132'}
            />
          </Box>
          <Box display="flex" p="24px 40px" gap={4} position="relative">
            <Box display="flex" flexDirection="column" justifyContent="space-between">
              <img src={profilePic} alt="Profile" width="106px" />
              <img src={plusIcon} alt="plus sign" className={styles.plusImage} />
            </Box>
            <Box width="100%">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Box mb={2}>
                    <Typography
                      variant="subtitle1"
                      lineHeight="24px"
                      letterSpacing="0.36px"
                      color="textSecondary"
                    >
                      Name/नाम
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight="500"
                      letterSpacing="0.48px"
                      color="textPrimary"
                      data-testid={'abha-number-name-testid'}
                    >
                      {dataObj.name}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography
                      variant="subtitle1"
                      lineHeight="24px"
                      letterSpacing="0.36px"
                      color="textSecondary"
                    >
                      ABHA Number/आभासंख्या
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight="500"
                      letterSpacing="0.48px"
                      color="textPrimary"
                      data-testid={'abha-number-testid'}
                    >
                      {dataObj.abha_no}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography
                      variant="subtitle1"
                      lineHeight="24px"
                      letterSpacing="0.36px"
                      color="textSecondary"
                    >
                      ABHA Address/आभापता
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight="500"
                      letterSpacing="0.48px"
                      color="textPrimary"
                      data-testid={'abha-number-address-testid'}
                    >
                      {dataObj.abha_address}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <img src={mobileAppScan} alt="Mobile App Scan" height={'120px'} width={'120px'} />
                </Box>
              </Box>
              <Box display="flex" width="100%" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="subtitle1"
                    lineHeight="24px"
                    letterSpacing="0.36px"
                    color="textSecondary"
                  >
                    Gender/लिंग
                  </Typography>
                  <Typography
                    variant="h2"
                    fontWeight="500"
                    letterSpacing="0.48px"
                    color="textPrimary"
                    data-testid={'abha-number-gender-testid'}
                  >
                    {dataObj.gender}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    lineHeight="24px"
                    letterSpacing="0.36px"
                    color="textSecondary"
                  >
                    Date of Birth/जन्मतिथि
                  </Typography>
                  <Typography
                    variant="h2"
                    fontWeight="500"
                    letterSpacing="0.48px"
                    color="textPrimary"
                    data-testid={'abha-number-dob-testid'}
                  >
                    {dataObj.dob}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    lineHeight="24px"
                    letterSpacing="0.36px"
                    color="textSecondary"
                  >
                    Mobile/मोबाईल
                  </Typography>
                  <Typography
                    variant="h2"
                    fontWeight="500"
                    letterSpacing="0.48px"
                    color="textPrimary"
                    data-testid={'abha-number-mobile-testid'}
                  >
                    {dataObj.mobile}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={5}>
          <Button variant="contained" color="secondary" onClick={onHandleDownload}>
            {t('Download ABHA Card')}
          </Button>

          <Button variant="outlined" color="secondary" onClick={onHandlePdf}>
            {t('Print ABHA Card')}
          </Button>

          <Button variant="outlined" color="secondary">
            {t('Link with digilocker')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AbhaNumberCard;
