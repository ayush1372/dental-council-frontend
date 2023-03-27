import { useState } from 'react';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { capitalize } from '../../../../helpers/functions/common-functions';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const CommunicationAddress = ({ personalDetails }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const [queryRaisedField, setQueryRaisedField] = useState('');

  const { communication_address } = personalDetails || {};
  const { country, state, district, sub_district, pincode, village } = communication_address || {};

  const countryName = country?.name || '';
  const stateName = state?.name || '';
  const districtName = district?.name || '';
  const subDistrictName = sub_district?.name || '';
  const villageName = village?.name || '';

  const ClosePopup = () => {
    setOpenModal(false);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            House
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.house}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('House');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Street
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.street}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Street');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Landmark
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.landmark}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Landmark');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="bod5" color="grey.label">
            City/Town/Village
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {villageName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('City/Town/Village');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            District
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {capitalize(districtName)}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('District');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
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
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Sub District');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            State/Union Territory
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {capitalize(stateName)}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('State/Union Territory');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Country
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {countryName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Country');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
      </Grid>

      <Grid container item spacing={2}>
        <Grid item xs={12} md={3}>
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
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Pincode');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
      </Grid>
      {openModal && (
        <RaiseQueryPopup
          ClosePopup={ClosePopup}
          setOpenModal={setOpenModal}
          queryRaisedField={queryRaisedField}
          setQueryRaisedFor={setQueryRaisedField}
        />
      )}
    </Grid>
  );
};

export default CommunicationAddress;
