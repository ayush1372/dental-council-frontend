import { useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import EditWorkProfile from '../editable-profile/edit-work-profile';

const ReadWorkProfile = ({ handleEdit }) => {
  const { workProfileDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { current_work_details, work_details } = workProfileDetails || {};
  const { is_user_currently_working, work_nature, work_status } = work_details || {};

  const [showWorkDetails, setShowWorkDetails] = useState(false);
  const handleOnClick = () => {
    setShowWorkDetails(true);
  };
  return !showWorkDetails ? (
    <>
      {current_work_details?.map((work) => {
        const organizationName = work?.work_organization;
        return (
          <Box pt={2} key={organizationName}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography variant="h2" component="div">
                  {organizationName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={2} display="flex" justifyContent="center">
                <Button
                  startIcon={<EditIcon sx={{ mr: 1 }} />}
                  variant="contained"
                  color="secondary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item sx={12} md={2}>
                <Button
                  startIcon={<CloseIcon sx={{ mr: 1 }} />}
                  variant="outlined"
                  color="secondary"
                  onClick={handleEdit}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
            <Grid container item spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="body5" color="grey.label">
                  Are you currently working
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textPrimary.main">
                    {is_user_currently_working === 0
                      ? 'Yes'
                      : is_user_currently_working === 1
                      ? 'No'
                      : ''}
                  </Typography>
                </Grid>
              </Grid>
              {/* {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />} */}
              <Grid item xs={12} md={4}>
                <Typography variant="body5" color="grey.label">
                  Nature of Work
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textPrimary.main">
                    {work_nature?.name}
                  </Typography>
                </Grid>
              </Grid>
              {/* {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />} */}
              <Grid item xs={12} md={4}>
                <Typography variant="body5" color="grey.label">
                  Choose Work Status
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    {work_status?.name}
                  </Typography>
                </Grid>
              </Grid>
              {/* {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />} */}
            </Grid>

            <Box
              mt={2}
              sx={{
                borderLeft: '3px solid',
                borderLeftColor: 'secondary.lightOrange',
              }}
            >
              <Typography component="div" variant="subtitle2" color="primary" ml={1}>
                Current Work Details
              </Typography>
            </Box>
            <Grid container mt={2}>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Name of the organization where you work
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Name of the organization where you work
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Origanization Type
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Origanization Type
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Address
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Address
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}></Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Street
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Street
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Landmark
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Landmark
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Locality
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Locality
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  City/Town/village
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    City/Town/Village
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Sub District
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Sub District
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  District
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    District
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  State
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    State
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Country
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Country
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Postal Code
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    Postal Code
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} mt={1}>
                <Typography variant="body5" color="grey.label">
                  Telecommunication URL
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color=" mt={2}.main">
                    URL
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <Box
        mt={3}
        sx={{
          borderStyle: 'dashed',
          borderColor: 'primary.main',
          backgroundColor: 'grey1.light',
          padding: '20px 10px',
          cursor: 'pointer',
        }}
      >
        <Typography
          color="primary"
          component="div"
          variant="subtitle2"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <AddCircleOutlineRoundedIcon onClick={handleOnClick} />
          Add More Work Details
        </Typography>
      </Box>
    </>
  ) : (
    <EditWorkProfile />
  );
};

export default ReadWorkProfile;
