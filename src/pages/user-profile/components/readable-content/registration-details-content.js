import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const RegistrationDetailsContent = ({ doctorUserProfile }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const {
    registration_detail: {
      registration_date,
      registration_number,
      state_medical_council: { name: smcName },
      is_renewable,
      renewable_registration_date,
      is_name_change,
    },
  } =
    doctorUserProfile && Object.values(doctorUserProfile).length > 3
      ? doctorUserProfile
      : { registration_detail: { state_medical_council: {} } };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registered with council
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {smcName ? smcName : ''}
            </Typography>

            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registration Number
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography color="primary.main" variant="subtitle2">
              {registration_number ? registration_number : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registration Date
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography color="primary.main" variant="subtitle2">
              {registration_date ? registration_date : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registration
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="primary.main">
              {is_renewable === '1' ? 'Permanent' : is_renewable === '2' ? 'Renewable' : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Due Date of Renewal
          </Typography>
          <Grid display="flex">
            <Typography color="primary.main" variant="subtitle2">
              {renewable_registration_date ? renewable_registration_date : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registration Certificate
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="primary.main">
              {is_name_change === '0' ? 'Yes' : is_name_change === '1' ? 'No' : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor"></Typography>
        </Grid>
      </Grid> */}
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Upload the registration certificate
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            <AttachFileIcon fontSize="10px" />
            View attachment
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegistrationDetailsContent;
