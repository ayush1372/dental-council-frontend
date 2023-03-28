import { useState } from 'react';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { capitalize } from '../../../../helpers/functions/common-functions';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const CommunicationAddress = ({ personalDetails }) => {
  const { data } = useSelector((state) => state.loginReducer?.loginData);

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
          <Tooltip title="Correct the house name">
            <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
          </Tooltip>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.house}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('House');
                }}
                fontSize="width30"
              />
            )}{' '}
            <Tooltip title="Correct the house name">
              <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
            </Tooltip>
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
            {(data?.user_type === 3 || data?.user_type === 4) && (
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
