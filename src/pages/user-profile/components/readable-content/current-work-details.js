import { useState } from 'react';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const CurrentWorkDetails = ({ workProfileDetails }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };

  const { current_work_details } = workProfileDetails || {};
  const { facility, work_organization, url, address } = current_work_details?.[0] || {};
  const { state, district, pincode, address_line1, sub_district, village } = address || {};
  const subDistrictName = sub_district?.name || '';
  const villageName = village?.name || '';

  return (
    <Grid container spacing={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="primary.main">
            {facility === 0 ? 'Facility' : facility === 1 ? 'Organization' : ''}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Organisation Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {work_organization ? work_organization : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Organisation Type
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {address_line1 ? address_line1 : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Address
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {address_line1 ? address_line1 : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body5" color="grey.label">
              Street
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography variant="subtitle2" color="textPrimary.main">
                {address_line1 ? address_line1 : ''}
              </Typography>
              {userActiveTab === 'dashboard' && (
                <ContactSupportOutlinedIcon
                  color="primary"
                  onClick={() => setOpenModal(true)}
                  fontSize="width30"
                />
              )}{' '}
            </Grid>
          </Grid>
          {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
          <Grid item xs={12} md={4}>
            <Typography variant="body5" color="grey.label">
              Landmark
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography variant="subtitle2" color="textPrimary.main">
                {address_line1 ? address_line1 : ''}
              </Typography>
              {userActiveTab === 'dashboard' && (
                <ContactSupportOutlinedIcon
                  color="primary"
                  onClick={() => setOpenModal(true)}
                  fontSize="width30"
                />
              )}{' '}
            </Grid>
          </Grid>
          {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
          <Grid item xs={12} md={4}>
            <Typography variant="body5" color="grey.label">
              Locality
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography variant="subtitle2" color="textPrimary.main">
                {address_line1 ? address_line1 : ''}
              </Typography>
              {userActiveTab === 'dashboard' && (
                <ContactSupportOutlinedIcon
                  color="primary"
                  onClick={() => setOpenModal(true)}
                  fontSize="width30"
                />
              )}{' '}
            </Grid>
          </Grid>
          {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            State
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {state?.name || ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            District
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {district?.name || ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Sub District
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {subDistrictName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            City/Town/Village
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {villageName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Address
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {address_line1 ? address_line1 : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Pincode
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {pincode ? pincode : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="body5" color="grey.label">
            Teleconsultation URL
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {url ? url : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CurrentWorkDetails;
