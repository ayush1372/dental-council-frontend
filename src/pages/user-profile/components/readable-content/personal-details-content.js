import { useState } from 'react';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';
import { convertGender } from '../../../../utilities/common-validations';

const PersonalDetails = ({ personalDetails }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [queryRaisedField, setQueryRaisedField] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { personal_details } = personalDetails || {};
  const {
    full_name,
    aadhaar_token,
    date_of_birth,
    father_name,
    gender,
    mother_name,
    country_nationality,
    spouse_name,
  } = personal_details || {};

  const nationality = country_nationality?.name || '';

  const ClosePopup = () => {
    setOpenModal(false);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        {false && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Aadhaar Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography p={1} variant="subtitle2" color="inputTextColor.light">
                xxxx-xxxx-{aadhaar_token ? aadhaar_token : 'XXXX'}
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
        )}

        {false && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Salutation
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
          </Grid>
        )}
      </Grid>
      {/* //firstname */}
      <Grid container item spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              Dr. {full_name ? full_name : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Name');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Father&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {father_name ? father_name : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Fathers Name');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Mother&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {mother_name ? mother_name : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Mothers Name');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Spouse Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {spouse_name ? spouse_name : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Spouse Name');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>

      <Grid container item spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Gender
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {gender && convertGender(gender)}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Gender');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}

        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Date of Birth
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {date_of_birth ? date_of_birth : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Date of Birth');
                }}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}

        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Nationality
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {nationality}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Nationality');
                }}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2}></Grid>
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

export default PersonalDetails;
