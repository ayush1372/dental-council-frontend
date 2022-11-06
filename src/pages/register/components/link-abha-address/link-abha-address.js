// import pride from '../../../ui/core/svg-icons/icons/pride.png';
// import successToast from '../../../ui/core/toaster';
// import { Button } from '../../../../ui/core/button/button';
// import { getNavMeta } from '../../../../constants/navigation-meta';
// import { Typography } from '../../../../theme/typography';
// import Transgender from '@mui/icons-material/Transgender';
// import Man from '@mui/icons-material/Man';
// import WomanIcon from '@mui/icons-material/Woman';

import { useState } from 'react';

import BadgeIcon from '@mui/icons-material/Badge';
import Email from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import WcIcon from '@mui/icons-material/Wc';
import { Divider, Grid, InputAdornment, TextField } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Button } from '../../../../ui/core';
import { SvgImageComponent } from '../../../../ui/core/svg-icons';

import styles from './link-abha-address.module.scss';

export function LinkAbhaAddress() {
  // const [suggestions, setSuggestions] = useState(['nihal','nihal1998','nihal1207']);
  const [abhaAddress, setAbhaAddress] = useState(undefined);
  const suggestions = ['nihal', 'nihal1998', 'nihal1207'];
  const [showAbhaAddress, setShowAbhaAddress] = useState(false);

  const handleChange = (e, suggestionValue) => {
    if (e.key !== 'Tab' || e.key !== 'Enter') e.preventDefault();
    setShowAbhaAddress(false);
    setAbhaAddress(suggestionValue ? suggestionValue : e.target.value);
  };

  const navigate = useNavigate();

  const previewAbhaAddress = () => {
    setShowAbhaAddress(true);
    document.getElementById('submitAbhaAddress').scrollIntoView({ behavior: 'smooth' });
  };

  // const showAbhaAddressToast = () => {
  //   abhaAddress
  //     ? successToast(`Your Entered Abha Address is ${abhaAddress}`, 'link-abha', 'success')
  //     : successToast('Please Enter an abha Address', 'link-abha', 'error');
  // };

  // const redirectProfile = () => {
  //   getNavMeta(true).then(navigate('/Profile'));
  // };

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '30px' }}>
        <Box p="30px" borderRadius="6px" boxShadow={2} borderColor="primary.main">
          <Box mb={5}>
            <Typography mb={1} variant="h4">
              Your Profile{' '}
            </Typography>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ width: 'fit-content', marginRight: '8px' }}>
                Fetched From ABHA Number
              </Typography>
              <SvgImageComponent width="20px" height="20px" icon="checkCircle" fill="green" />
            </span>
            <Divider sx={{ marginTop: '12px' }} />
            <Grid
              container
              columnSpacing={{ xs: 2 }}
              mt={3}
              sx={{ wordWrap: 'break-word' }}
              display="flex"
              alignItems="center"
            >
              <Grid item xs={12} sm={6} md={4}>
                <Typography mb={1} variant="body1" display="flex">
                  Full Name
                  <BadgeIcon
                    sx={{ height: '21px', width: '21px', color: '#264488', marginLeft: '8px' }}
                  ></BadgeIcon>
                </Typography>
                <Typography mb={1} variant="subtitle2">
                  Nihal Mahadik
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography mb={1} variant="body1" display="flex">
                  Gender
                  <WcIcon
                    sx={{ height: '21px', width: '21px', color: '#264488', marginLeft: '8px' }}
                  ></WcIcon>
                </Typography>
                <Typography mb={1} variant="subtitle2">
                  Male
                  {/* <WomanIcon sx={{ color: '#e0517c' }}></WomanIcon>
                  <Man sx={{ color: '#264488', marginRight: '3px' }}></Man>
                  {/* <Transgender sx={{ color: 'orange' }}></Transgender> */}
                  {/* <img src={pride} alt="prideIcon" height="22px" width="22px"></img> */}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography mb={1} variant="body1" display="flex">
                  Email
                  <Email
                    sx={{ height: '21px', width: '21px', color: '#264488', marginLeft: '8px' }}
                  ></Email>
                </Typography>
                <Typography mb={1} variant="subtitle2">
                  nihal.mahadik@lntinfotech.com
                </Typography>
              </Grid>
            </Grid>
            <Grid container columnSpacing={{ xs: 2 }} mt={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography mb={1} variant="body1" display="flex">
                  Address
                  <HomeIcon
                    sx={{ height: '21px', width: '21px', color: '#264488', marginLeft: '8px' }}
                  ></HomeIcon>
                </Typography>
                <Typography mb={1} variant="subtitle2">
                  Flat no. 1, Wing B, Prestige Heights, New Model Colony, Shivajinagar - 411016
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography mb={1} variant="body1" display="flex">
                  District
                  <LocationCityIcon
                    sx={{ height: '21px', width: '21px', color: '#264488', marginLeft: '8px' }}
                  ></LocationCityIcon>
                </Typography>
                <Typography mb={1} variant="subtitle2">
                  Pune
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography mb={1} variant="body1" display="flex">
                  State
                  <MapIcon
                    sx={{ height: '21px', width: '21px', color: '#264488', marginLeft: '8px' }}
                  ></MapIcon>
                </Typography>
                <Typography mb={1} variant="subtitle2">
                  Maharashtra
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ marginBottom: '24px' }} />
          <Box>
            <Typography mb={1} variant="h6">
              Create Your easy to remember ABHA address
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'justify' }}>
              To kickstart your digital health journey and start sharing your health records with
              different healthcare providers, link a ABHA address with your ABHA number.
            </Typography>
            <Box className={styles.inputAbhaAddress} mt={4} mb={5}>
              <TextField
                id="link-abhaAdress"
                name="link-abhaAdress"
                variant="outlined"
                onChange={handleChange}
                value={abhaAddress}
                placeholder="Please enter your ABHA address"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        backgroundColor: (theme) => theme.palette.grey,
                        padding: '27.5px 14px',
                        borderTopLeftRadius: (theme) => theme.shape.borderRadius + 'px',
                        borderBottomLeftRadius: (theme) => theme.shape.borderRadius + 'px',
                      }}
                    >
                      <Typography variant="subtitle2">@abdm</Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: '100%' }}
              />
              {abhaAddress === undefined || abhaAddress === null || abhaAddress === '' ? (
                <Typography color="#FF5630" display="flex" alignItems="center" pl={0.5}>
                  <SvgImageComponent icon="error" height="12px" width="12px" />
                  <Typography fontSize="12px" pl={0.5}>
                    Please Enter a ABHA address
                  </Typography>
                </Typography>
              ) : (
                ''
              )}
              <Typography
                id="adreess_suggesstions"
                component="div"
                variant="subtitle1"
                textAlign="left"
                mt={0.5}
                paddingLeft="3px"
              >
                Suggestions: {'  '}
                {suggestions.map((item, index) => {
                  return index === suggestions.length - 1 ? (
                    <Typography
                      key={`${index}_${item}`}
                      id={`suggestion_${index}_${item}`}
                      variant="subtitle2"
                      component="span"
                      color="primary"
                      tabIndex={0}
                      onClick={(e) => handleChange(e, item)}
                      onKeyDown={(e) => (e.key === 'Enter' ? handleChange(e, item) : '')}
                      ml={0.2}
                      sx={{
                        cursor: 'pointer',
                        '&:focus-visible': {
                          paddingBottom: '3px',
                          textDecoration: 'underline 3px',
                          textDecorationColor: '#d66025',
                          // textDecorationColor: '#264488',
                          textUnderlineOffset: '5px',
                          outline: 'none',
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  ) : (
                    <span>
                      <Typography
                        key={`${index}_${item}`}
                        id={`${index}_${item}`}
                        variant="subtitle2"
                        component="span"
                        color="primary"
                        tabIndex={0}
                        onClick={(e) => handleChange(e, item)}
                        onKeyDown={(e) => (e.key === 'Enter' ? handleChange(e, item) : '')}
                        ml={0.2}
                        sx={{
                          cursor: 'pointer',
                          '&:focus-visible': {
                            paddingBottom: '3px',
                            textDecoration: 'underline 3px',
                            textDecorationColor: '#d66025',
                            textUnderlineOffset: '5px',
                            outline: 'none',
                          },
                        }}
                      >
                        {item}
                      </Typography>
                      <Typography variant="subtitle2" component="span">
                        {','}
                      </Typography>
                    </span>
                  );
                })}
              </Typography>
            </Box>
            <Button
              id="submitAbhaAddress"
              variant="contained"
              size="medium"
              color="primary"
              onClick={abhaAddress ? previewAbhaAddress : ''}
            >
              Create Address
            </Button>
            {showAbhaAddress ? (
              <Box>
                <span
                  style={{
                    display: 'block',
                    width: 'fit-content',
                    margin: '48px auto 0px',
                    border: '3px solid #264488',
                    borderRadius: '5px',
                    padding: '15px 48px',
                    // backgroundColor: '#f1f1f1',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" component="span">
                    Your ABHA address will be -{' '}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="secondary"
                    sx={{ textDecoration: 'underline 2px', textUnderlineOffset: '2px' }}
                  >
                    {abhaAddress.concat('@abdm')}
                  </Typography>
                </span>
                <span
                  style={{
                    display: 'block',
                    width: 'fit-content',
                    margin: '15px auto 0px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    id="submitAbhaAddress"
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={() => navigate('/profile')}
                    sx={{
                      margin: '20px auto',
                    }}
                  >
                    Link and Go to Profile
                  </Button>
                </span>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
}
