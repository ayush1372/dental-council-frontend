import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Container,
  Dialog,
  Divider,
  Grid,
  InputAdornment,
  TablePagination,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import doctorImage from '../../../assets/images/doctor-image.png';
import { Button } from '../../../ui/core/button/button';
import { TextField } from '../../../ui/core/form/textfield/textfield';
// import SearchCard from './search-card';
const SearchResults = () => {
  //   const [showData, setShowData] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const {
    formState: { errors },
    register,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      search: '',
    },
  });
  const handleClose = () => {
    setConfirmationModal(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '20px',
      }}
    >
      <Box>
        <Typography color="primary.main" component="div" variant="h2">
          Search Results
        </Typography>
        <Typography color="primary.main" component="div" variant="subtitle2">
          (100 Matching Records Found)
        </Typography>
        <Box mt={3}>
          <Box
            className="options"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <TextField
              data-testid="search-doctor"
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="search"
              required="false"
              placeholder={'You can search anything here'}
              defaultValue={getValues().search}
              error={errors.search?.message}
              {...register('search')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ paddingRight: '3px' }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="search-results" mt={3}>
            <Grid container spacing={2}>
              {new Array(rowsPerPage).fill(1).map((doctor, index) => {
                return (
                  <Grid item md={4} key={`doctor-${index}`}>
                    <Box p={2} borderRadius="10px" border="1px solid grey">
                      <Box className="doctor-details" display="flex">
                        <Box className="doctor-icon" width="30%">
                          <img src={doctorImage} alt="do Image" />
                        </Box>
                        <Box className="doctor-info" width="70%">
                          <Typography component="div" variant="subtitle1">
                            Dr. Aditi Kumari
                          </Typography>
                          <Typography component="div" variant="body5" color="grey.label" mt={2}>
                            State Medical Council
                          </Typography>
                          <Typography component="div" variant="body3" color="primary">
                            West Bengal Medical Council
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        className="more-info"
                        display="flex"
                        justifyContent="space-between"
                        mt={2}
                      >
                        <Box>
                          <Typography component="div" variant="body5" color="grey.label">
                            Registration number
                          </Typography>
                          <Typography component="div" variant="body3" color="primary">
                            15580
                          </Typography>
                        </Box>
                        <Box>
                          <Typography component="div" variant="body5" color="grey.label">
                            Year of Info
                          </Typography>
                          <Typography component="div" variant="body3" color="primary">
                            1960
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        onClick={() => setConfirmationModal(true)}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          marginTop: '10px',
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ pr: '6px' }} /> View my Profile
                      </Button>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={100}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'primary.main',
                variant: 'body1',
              }}
            />
          </Box>
        </Box>
      </Box>
      <Dialog
        maxWidth="sm"
        sx={{
          '.MuiPaper-root': {
            borderRadius: '10px',
            width: '100%',
          },
        }}
        open={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
        }}
      >
        <Box width="100%">
          <Box bgcolor="grey2.dark" p={3} display="flex" justifyContent="flex-end">
            <CloseIcon color="white" onClick={handleClose} />
          </Box>
          <Box className="docter-details" px={6}>
            <Box className="info" display="flex" py={1}>
              <Box className="icon" width="30%" position="relative">
                <Box className="outer-image">
                  <img src={doctorImage} alt="doctor Image" />
                </Box>
              </Box>
              <Box className="details" width="70%">
                <Typography variant="h2" color="textPrimary.main" component="div">
                  Dr. Aditi Kumari
                </Typography>
                <Typography variant="subtitle1" color="textPrimary.main" component="div">
                  West Bengal Medical Council
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Typography variant="subtitle1" color="textPrimary.main" component="div" mt={2} mb={1}>
              View IMR Details
            </Typography>
            <Box display="flex" width="100%">
              <Box width="62%">
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Father/Husband Name
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    N/A
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Date of Birth
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    N/A
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Mobile number
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    XXXXXX2137 <ContentCopyIcon fontSize="10px" color="primary" />
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Email address
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    adxxx.xxxxx@gmail.com <ContentCopyIcon fontSize="10px" color="primary" />
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Qualification
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    MBBS
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Qualification year
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    1994
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="45%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    University Name
                  </Typography>
                  <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                    U.Calcutta
                  </Typography>
                </Box>
              </Box>
              <Box width="38%" borderLeft="1px solid" borderColor="grey.main" pl={3}>
                {/* <Box
                  sx={{
                    borderLeft: '1px solid',
                    borderLeftColor: 'grey.main',
                    padding: '0 10px',
                  }}
                > */}
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="55%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Year of Info
                  </Typography>
                  <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                    1960
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="55%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Registration No.
                  </Typography>
                  <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                    15580
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="55%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    Date of Reg.
                  </Typography>
                  <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                    19/08/1944
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="55%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    UPRN No.
                  </Typography>
                  <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                    N/A
                  </Typography>
                </Box>
                <Box className="detail" display="flex" mb={1}>
                  <Typography
                    component="div"
                    width="55%"
                    color="inputTextColor.main"
                    variant="body1"
                  >
                    NMR ID
                  </Typography>
                  <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                    7676372736
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="options" display="flex" justifyContent="flex-end" mb={2}>
              <Button
                sx={{
                  marginRight: '10px',
                }}
                color="grey"
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button color="secondary" variant="contained">
                Print
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default SearchResults;
