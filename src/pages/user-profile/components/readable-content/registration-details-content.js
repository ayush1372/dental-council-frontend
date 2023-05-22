import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import { useSelector } from 'react-redux';

import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const RegistrationDetailsContent = () => {
  const { data } = useSelector((state) => state.loginReducer?.loginData);
  const { registrationDetails } = useSelector((state) => state.doctorUserProfileReducer);
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

  const [openModal, setOpenModal] = useState(false);
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const [queryRaisedField, setQueryRaisedField] = useState('');

  const ClosePopup = () => {
    setOpenModal(false);
  };
  const { registration_detail_to } = registrationDetails || {};
  const {
    registration_date,
    registration_number,
    state_medical_council,
    is_renewable,
    renewable_registration_date,
    registration_certificate,
  } = registration_detail_to || {};

  const smcName = state_medical_council?.name || '';

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query?.query_comment;
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registered with Council
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Registered with council') !== undefined && (
              <Tooltip title={getQueryRaised('Registered with council')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {smcName ? smcName : ''}
            </Typography>

            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Registered with council');
                }}
                fontSize="width24"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registration Number
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Registration Number') !== undefined && (
              <Tooltip title={getQueryRaised('Registration Number')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex">
            <Typography color="textPrimary.main" variant="subtitle2">
              {registration_number ? registration_number : ''}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Registration Number');
                }}
                fontSize="width24"
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
            {getQueryRaised('Registration Date') !== undefined && (
              <Tooltip title={getQueryRaised('Registration Date')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex">
            <Typography color="textPrimary.main" variant="subtitle2">
              {registration_date && moment(registration_date).format('DD-MM-YYYY')}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Registration Date');
                }}
                fontSize="width24"
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
            {getQueryRaised('Registration') !== undefined && (
              <Tooltip title={getQueryRaised('Registration')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="textPrimary.main">
              {is_renewable === '0' ? 'Permanent' : is_renewable === '1' ? 'Renewable' : ''}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Registration');
                }}
                fontSize="width24"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Due Date of Renewal
          </Typography>
          {getQueryRaised('Due Date of Renewal') !== undefined && (
            <Tooltip title={getQueryRaised('Due Date of Renewal')}>
              <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
            </Tooltip>
          )}
          <Grid display="flex">
            <Typography color="textPrimary.main" variant="subtitle2">
              {renewable_registration_date && is_renewable === '1'
                ? moment(renewable_registration_date).format('DD-MM-YYYY')
                : ''}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Due Date of Renewal');
                }}
                fontSize="width24"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Upload the Registration Certificate
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Upload the registration certificate') !== undefined && (
              <Tooltip title={getQueryRaised('Upload the registration certificate')}>
                <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              sx={{ cursor: 'pointer' }}
              variant="subtitle2"
              color="textPrimary.main"
              onClick={(e) => {
                e.preventDefault();
                setAttachmentViewProfile(true);
              }}
            >
              <IconButton>
                <AttachFileIcon fontSize="10px" />
              </IconButton>
              View attachment
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Upload the registration certificate');
                }}
                fontSize="width24"
              />
            )}
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
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={registration_certificate}
          closePopup={CloseAttachmentPopup}
          alt={'Registration Certificate'}
        />
      )}
    </Grid>
  );
};

export default RegistrationDetailsContent;
