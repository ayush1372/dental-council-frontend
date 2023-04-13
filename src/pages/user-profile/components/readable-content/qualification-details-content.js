import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = ({ registrationDetails }) => {
  const { data } = useSelector((state) => state.loginReducer?.loginData);
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

  const [openModal, setOpenModal] = useState(false);
  const [queryRaisedField, setQueryRaisedField] = useState('');
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);

  const { qualification_detail_response_tos } = registrationDetails || {};

  // let requestId = registrationDetails?.request_id;

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  const ClosePopup = () => {
    setOpenModal(false);
  };

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query?.query_comment;
  };

  return qualification_detail_response_tos?.length > 0
    ? qualification_detail_response_tos?.map((element, index) => {
        return (
          <Grid
            container
            spacing={2}
            mt={2}
            key={index}
            borderBottom={qualification_detail_response_tos?.length > 1 ? 1 : 'none'}
            borderColor={qualification_detail_response_tos?.length > 1 ? 'grey2.light' : 'none'}
            // backgroundColor={element.request_id === requestId ? 'red' : ''}
          >
            {element.is_verified ? (
              <Typography ml={2} spacing={2} color="success.main">
                Approved
              </Typography>
            ) : index !== 0 ? (
              <Typography ml={2} spacing={2} color="error.main">
                Pending Approval
              </Typography>
            ) : (
              ''
            )}
            <Grid container item spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="grey.label">
                  Name of the Degree Obtained
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                  {getQueryRaised('Name of the Degree Obtained') !== undefined && (
                    <Tooltip title={getQueryRaised('Name of the Degree Obtained')}>
                      <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                    </Tooltip>
                  )}
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography color="textPrimary.main" variant="subtitle2">
                    {element?.course?.course_name}
                  </Typography>
                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('Name of the Degree Obtained');
                        }}
                        fontSize="width24"
                      />
                    )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="grey.label">
                  Country Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                  {getQueryRaised('Country Name') !== undefined && (
                    <Tooltip title={getQueryRaised('Country Name')}>
                      <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                    </Tooltip>
                  )}
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textPrimary.main">
                    {element?.country?.name}
                  </Typography>
                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('Country Name');
                        }}
                        fontSize="width24"
                      />
                    )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="grey.label">
                  State
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                  {getQueryRaised('State') !== undefined && (
                    <Tooltip title={getQueryRaised('State')}>
                      <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                    </Tooltip>
                  )}
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography color="textPrimary.main" variant="subtitle2">
                    {element?.state?.name}
                  </Typography>
                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('State');
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
                  Name of the College
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                  {getQueryRaised('Name of the College') !== undefined && (
                    <Tooltip title={getQueryRaised('Name of the College')}>
                      <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                    </Tooltip>
                  )}
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textPrimary.main">
                    {element?.college?.name}
                  </Typography>

                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('Name of the College');
                        }}
                        fontSize="width24"
                      />
                    )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="grey.label">
                  University
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                  {getQueryRaised('University') !== undefined && (
                    <Tooltip title={getQueryRaised('University')}>
                      <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                    </Tooltip>
                  )}
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textPrimary.main">
                    {element?.university?.name}
                  </Typography>{' '}
                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('University');
                        }}
                        fontSize="width24"
                      />
                    )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="grey.label">
                  Month & Year of Awarding Degree
                </Typography>
                {getQueryRaised('Month & Year of Awarding Degree') !== undefined && (
                  <Tooltip title={getQueryRaised('Month & Year of Awarding Degree')}>
                    <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                  </Tooltip>
                )}
                <Grid display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textPrimary.main">
                    {element?.qualification_month ? element?.qualification_month : ''} ,{' '}
                    {element?.qualification_year ? element?.qualification_year : ''}
                  </Typography>{' '}
                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('Month & Year of Awarding Degree');
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
                  Upload Qualification Degree
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                  {getQueryRaised('Upload Qualification Degree') !== undefined && (
                    <Tooltip title={getQueryRaised('Upload Qualification Degree')}>
                      <InfoOutlinedIcon ml={2}></InfoOutlinedIcon>
                    </Tooltip>
                  )}
                </Typography>
                <Grid display="flex" alignItems="center">
                  <Typography
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
                    View Attachment
                  </Typography>
                  {(data?.user_type === 2 ||
                    data?.user_type === 3 ||
                    data?.user_type === 4 ||
                    data?.user_type === 5) &&
                    element.is_verified !== 1 &&
                    index !== 0 && (
                      <ContactSupportOutlinedIcon
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setQueryRaisedField('Upload Qualification Degree');
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
                certificate={element?.degree_certificate}
                closePopup={CloseAttachmentPopup}
                alt={'Qualification Certificate'}
              />
            )}
          </Grid>
        );
      })
    : '';
};

export default QualificationDetailsContent;
