import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
// import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, Typography } from '@mui/material';

// import { useSelector } from 'react-redux';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const WorkDetails = ({ workProfileDetails }) => {
  // const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };

  const { work_details } = workProfileDetails || {};
  const { is_user_currently_working, work_status, work_nature } = work_details || {};
  const workStatusName = work_status?.name || '';
  const workNatureName = work_nature?.name || '';

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Are you Currently Working?
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
            {/* {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )} */}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Nature of Work
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {workNatureName}
            </Typography>
            {/* {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '} */}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Choose Work Status
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color=" mt={2}.main">
              {workStatusName}
            </Typography>
            {/* {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '} */}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={8} lg={12}>
          <Typography variant="body5" color="inputTextColor.main">
            Upload the proof of work for govt.such as Appointment letter, Last pay slip, Recent
            transfer order etc.
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              <AttachFileIcon fontSize="10px" />
              View attachment
            </Typography>
            {/* {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '} */}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
    </Grid>
  );
};

export default WorkDetails;
