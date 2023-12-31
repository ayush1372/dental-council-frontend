import { useEffect, useState } from 'react';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Container, Grid, TablePagination, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../../config/debug';
import {
  searchDoctorDetails,
  searchDoctorDetailsById,
} from '../../../store/actions/doctor-search-actions';
import { Button } from '../../../ui/core/button/button';
// import successToast from '../../../ui/core/toaster';
import DoctorProfileModal from './doctor-profile-modal';

const SearchResults = ({ searchData, scrolldown }) => {
  if (scrolldown) {
    const element = document.getElementById('search-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const theme = useTheme();
  const dispatch = useDispatch();

  const { searchDetails } = useSelector((state) => state.searchDoctor);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [page, setPage] = useState(0);
  const [imagepath, setImagePath] = useState('');

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
    let finalSearchData = { ...searchData, page: newPage };
    dispatch(searchDoctorDetails(finalSearchData));
  };

  const handleViewProfile = (id, imagePath) => {
    verboseLog('ID', id);
    dispatch(searchDoctorDetailsById(id)).then(() => {
      setConfirmationModal(true);
    });
    // .catch((error) => {
    //   successToast(
    //     error?.data?.response?.data?.error,
    //     'RegistrationError',
    //     'error',
    //     'top-center'
    //   );
    // });

    setImagePath(imagePath);
  };

  useEffect(() => {
    setPage(0);
  }, [searchDetails?.data?.data?.count]);

  return (
    <Container
      id="search-section"
      maxWidth="lg"
      sx={{
        paddingTop: '20px',
      }}
    >
      <Box>
        <Typography color="primary.main" component="div" variant="h2">
          Search Result
        </Typography>
        <Typography color="primary.main" component="div" variant="subtitle2">
          {searchDetails?.data?.data?.count >= 1
            ? `${searchDetails?.data?.data?.count}  Matching records found `
            : `No record found `}
        </Typography>
        <Box mt={3}>
          <Box className="search-results" mt={3}>
            <Grid container spacing={2}>
              {searchDetails?.data?.data?.results.map((doctor, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={`doctor-${index}`}>
                    <Box
                      p={2}
                      borderRadius="10px"
                      boxShadow="2"
                      border={`1px solid ${theme.palette.grey2.light}`}
                    >
                      <Box className="doctor-details" display="flex">
                        <Box className="doctor-icon" width="80px" height="80px" mr={3}>
                          <img
                            src={`data:image/png;base64,${doctor?.profile_photo}`}
                            alt="doctor profile"
                            width="100%"
                            height="100%"
                          />
                        </Box>
                        <Box className="doctor-info" width="70%">
                          <Typography component="div" variant="subtitle1">
                            {doctor?.salutation + doctor?.full_name || ''}
                          </Typography>
                          <Typography component="div" variant="body5" color="grey.label" mt={2}>
                            State Dental Council
                          </Typography>
                          <Typography component="div" variant="body3" color="primary">
                            {doctor?.state_medical_council || ''}
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
                            Registration Number
                          </Typography>
                          <Typography component="div" variant="body3" color="primary">
                            {doctor?.registration_number || ''}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography component="div" variant="body5" color="grey.label">
                            Year of Registration
                          </Typography>
                          <Typography component="div" variant="body3" color="primary">
                            {doctor?.registration_year || ''}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        onClick={() => handleViewProfile(doctor?.profile_id, doctor?.profile_photo)}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          marginTop: '10px',
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ pr: '6px' }} /> View Profile
                      </Button>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          {searchDetails?.data?.data?.results?.length !== 0 && (
            <Box>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={searchDetails?.data?.data?.count || 0}
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
          )}
        </Box>
      </Box>
      {confirmationModal && (
        <DoctorProfileModal
          open={confirmationModal}
          setOpen={() => setConfirmationModal(false)}
          imagepath={imagepath}
        />
      )}
    </Container>
  );
};

export default SearchResults;
