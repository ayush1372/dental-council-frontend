import { useState } from 'react';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ReportIcon from '@mui/icons-material/Report';
import { Grid, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';
import { convertGender } from '../../../../utilities/common-validations';

const PersonalDetails = ({ personalDetails, selectedDataIndex }) => {
  const { data } = useSelector((state) => state.loginReducer?.loginData);
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

  const [queryRaisedField, setQueryRaisedField] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const dashboardTableDetailsData = useSelector((state) => state?.dashboard?.dashboardTableDetails);
  const { college_status: dashboardTableDetails } =
    (dashboardTableDetailsData?.data?.dashboard_tolist &&
      dashboardTableDetailsData?.data?.dashboard_tolist[selectedDataIndex]) ||
    [];
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

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query?.query_comment;
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
              {((data?.user_type === 4 &&
                (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
                data?.user_type === 3) &&
                dashboardTableDetails !== 'Approved' && (
                  <ContactSupportOutlinedIcon
                    cursor="pointer"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    fontSize="width24"
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
      <Grid container item spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Name
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Name') !== undefined && (
              <Tooltip title={getQueryRaised('Name')}>
                <ReportIcon color="secondary" ml={2} />
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              Dr. {full_name ? full_name : ''}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Name');
                  }}
                  fontSize="width24"
                />
              )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Father&apos;s Name
          </Typography>
          {getQueryRaised('Fathers Name') !== undefined && (
            <Tooltip title={getQueryRaised('Fathers Name')}>
              <ReportIcon color="secondary" ml={2} />
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {father_name ? father_name : ''}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Fathers Name');
                  }}
                  fontSize="width24"
                />
              )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Mother&apos;s Name
          </Typography>
          {getQueryRaised('Mothers Name') !== undefined && (
            <Tooltip color="secondary" title={getQueryRaised('Mothers Name')}>
              <ReportIcon color="secondary" ml={2} />
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {mother_name === '' || mother_name === undefined ? '-' : mother_name}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Mothers Name');
                  }}
                  fontSize="width24"
                />
              )}{' '}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Spouse Name
          </Typography>
          {getQueryRaised('Spouse Name') !== undefined && (
            <Tooltip title={getQueryRaised('Spouse Name')}>
              <ReportIcon color="secondary" ml={2} />
            </Tooltip>
          )}
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {spouse_name === '' || spouse_name === undefined ? '-' : spouse_name}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Spouse Name');
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
            Gender
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Gender') !== undefined && (
              <Tooltip title={getQueryRaised('Gender')}>
                <ReportIcon color="secondary" ml={2} />
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {gender && convertGender(gender)}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Gender');
                  }}
                  fontSize="width24"
                />
              )}{' '}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Date of Birth
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Date of Birth') !== undefined && (
              <Tooltip title={getQueryRaised('Date of Birth')}>
                <ReportIcon color="secondary" ml={2} />
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {date_of_birth ? moment(date_of_birth).format('DD-MM-YYYY') : ''}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Date of Birth');
                  }}
                  fontSize="width24"
                />
              )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="body5" color="grey.label">
            Nationality
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Nationality') !== undefined && (
              <Tooltip title={getQueryRaised('Nationality')}>
                <ReportIcon color="secondary" ml={2} />
              </Tooltip>
            )}
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {nationality}
            </Typography>
            {((data?.user_type === 4 && (data?.user_sub_type !== 6 || data?.user_sub_type === 7)) ||
              data?.user_type === 3) &&
              dashboardTableDetails !== 'Approved' && (
                <ContactSupportOutlinedIcon
                  cursor="pointer"
                  color="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setQueryRaisedField('Nationality');
                  }}
                  fontSize="width24"
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
