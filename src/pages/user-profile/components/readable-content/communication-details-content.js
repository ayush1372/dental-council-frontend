import { useState } from 'react';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { capitalize } from '../../../../helpers/functions/common-functions';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const CommunicationAddress = ({ personalDetails }) => {
  const { data } = useSelector((state) => state.loginReducer?.loginData);
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

  const [openModal, setOpenModal] = useState(false);
  const [queryRaisedField, setQueryRaisedField] = useState('');

  const { communication_address } = personalDetails || {};
  const { country, state, district, sub_district, pincode, village, is_same_address } =
    communication_address || {};

  const countryName = is_same_address
    ? personalDetails?.kyc_address?.country?.name || ''
    : country?.name || '';
  const stateName = is_same_address
    ? personalDetails?.kyc_address?.state?.name || ''
    : state?.name || '';
  const districtName = is_same_address
    ? personalDetails?.kyc_address?.district?.name || ''
    : district?.name || '';
  const subDistrictName = is_same_address
    ? personalDetails?.kyc_address?.sub_district?.name || ''
    : sub_district?.name || '';
  const villageName = is_same_address
    ? personalDetails?.kyc_address?.village?.name || ''
    : village?.name || '';

  const ClosePopup = () => {
    setOpenModal(false);
  };

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query?.query_comment;
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
            {getQueryRaised('House') !== undefined && (
              <Tooltip title={getQueryRaised('House')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.house === '' || communication_address?.house === undefined
                ? '-'
                : communication_address?.house}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('House');
                }}
                fontSize="width24"
              />
            )}{' '}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Street
          </Typography>
          {getQueryRaised('Street') !== undefined && (
            <Tooltip title={getQueryRaised('Street')}>
              <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.street === '' || communication_address?.street === undefined
                ? '-'
                : communication_address?.street}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Street');
                }}
                fontSize="width24"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Landmark
          </Typography>
          {getQueryRaised('Landmark') !== undefined && (
            <Tooltip title={getQueryRaised('Landmark')}>
              <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.landmark === '' ||
              communication_address?.landmark === undefined
                ? '-'
                : communication_address?.landmark}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Landmark');
                }}
                fontSize="width24"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="bod5" color="grey.label">
            City/Town/Village
          </Typography>
          {getQueryRaised('City/Town/Village') !== undefined && (
            <Tooltip title={getQueryRaised('City/Town/Village')}>
              <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {villageName === '' || villageName === undefined ? '-' : villageName}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('City/Town/Village');
                }}
                fontSize="width24"
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
            {getQueryRaised('District') !== undefined && (
              <Tooltip title={getQueryRaised('District')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
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
                fontSize="width24"
              />
            )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Sub District
          </Typography>
          {getQueryRaised('Sub District') !== undefined && (
            <Tooltip title={getQueryRaised('Sub District')}>
              <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {subDistrictName === '' || subDistrictName === undefined ? '-' : subDistrictName}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Sub District');
                }}
                fontSize="width24"
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
            {getQueryRaised('State/Union Territory') !== undefined && (
              <Tooltip title={getQueryRaised('State/Union Territory')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
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
                fontSize="width24"
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
            {getQueryRaised('Country') !== undefined && (
              <Tooltip title={getQueryRaised('Country')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
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
                fontSize="width24"
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
            {getQueryRaised('Pincode') !== undefined && (
              <Tooltip title={getQueryRaised('Pincode')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {pincode === '' || pincode === undefined ? '-' : pincode}
            </Typography>
            {(data?.user_type === 3 || data?.user_type === 4) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Pincode');
                }}
                fontSize="width24"
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
