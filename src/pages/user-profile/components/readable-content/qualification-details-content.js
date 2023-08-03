import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ReportIcon from '@mui/icons-material/Report';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { capitalizeFirstLetter } from '../../../../helpers/functions/common-functions';
import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = ({ registrationDetails, selectedDataIndex }) => {
  const { data } = useSelector((state) => state.loginReducer?.loginData);
  const { selectedAcademicStatus } = useSelector((state) => state.common);

  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);
  const { count } = useSelector((state) => state?.dashboard);
  const [attachmentViewIndex, setAttachmentViewIndex] = useState();

  const { college_status } = useSelector((state) =>
    count > 0
      ? state?.dashboard?.dashboardTableDetails?.data?.dashboard_tolist?.[selectedDataIndex]
      : ''
  );

  const [openModal, setOpenModal] = useState(false);
  const [queryRaisedField, setQueryRaisedField] = useState('');
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);

  const { qualification_detail_response_tos, nbe_response_to } = registrationDetails || {};

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  const ClosePopup = () => {
    setOpenModal(false);
  };

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName, elementData) => {
    let query;

    if (raisedQueryData?.length > 0) {
      query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    } else if (elementData?.length > 0) {
      query = elementData?.find((obj) => obj.field_name === fieldName);
    }
    return query?.query_comment;
  };

  return attachmentViewProfile ? (
    <AttachmentViewPopup
      certificate={qualification_detail_response_tos[attachmentViewIndex]?.degree_certificate}
      closePopup={CloseAttachmentPopup}
      alt={'Qualification Certificate'}
      certFileType={qualification_detail_response_tos[attachmentViewIndex]?.file_type}
    />
  ) : qualification_detail_response_tos?.length > 0 ? (
    qualification_detail_response_tos?.map((element, index) => {
      return (
        <Grid
          container
          spacing={1}
          mt={1}
          key={index}
          borderBottom={
            qualification_detail_response_tos?.length > 1 &&
            index < qualification_detail_response_tos?.length - 1
              ? 1
              : 'none'
          }
          borderColor={
            qualification_detail_response_tos?.length > 1 &&
            index < qualification_detail_response_tos?.length - 1
              ? 'grey2.light'
              : 'none'
          }
        >
          <Grid item xs={12} md={8}>
            <Typography variant="h3" color="grey.label">
              {index === 0 ? 'Basic Qualification' : `Additional Qualification ${index}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {element?.is_verified === 1 ? (
              <Typography color="success.main" display={'flex'} justifyContent={'flex-end'}>
                Approved
              </Typography>
            ) : element?.is_verified === 0 ? (
              <Typography color="secondary.main" display={'flex'} justifyContent={'flex-end'}>
                Pending Approval
              </Typography>
            ) : element?.is_verified === 2 ? (
              <Typography color="error.main" display={'flex'} justifyContent={'flex-end'}>
                Rejected
              </Typography>
            ) : (
              ''
            )}
          </Grid>

          <Grid container item spacing={1} mt={0.5}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="grey.label">
                Degree Name
                <Typography component="span" color="error.main">
                  *
                </Typography>
                {element?.queries?.length > 0 &&
                  getQueryRaised('Name of the Degree Obtained', element?.queries) !== undefined && (
                    <Tooltip
                      title={getQueryRaised('Name of the Degree Obtained', element?.queries)}
                    >
                      <ReportIcon color="secondary" ml={2} />
                    </Tooltip>
                  )}
              </Typography>
              <Grid display="flex" alignItems="center">
                <Typography color="textPrimary.main" variant="subtitle2">
                  {element?.course?.course_name}
                </Typography>
                {(data?.user_type === 2 ||
                  data?.user_type === 3 ||
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
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
                {element?.queries?.length > 0 &&
                  getQueryRaised('Country Name', element?.queries) !== undefined && (
                    <Tooltip title={getQueryRaised('Country Name', element?.queries)}>
                      <ReportIcon color="secondary" ml={2} />
                    </Tooltip>
                  )}
              </Typography>
              <Grid display="flex" alignItems="center">
                <Typography variant="subtitle2" color="textPrimary.main">
                  {element?.country?.name}
                </Typography>
                {(data?.user_type === 2 ||
                  data?.user_type === 3 ||
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
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
                {element?.queries?.length > 0 &&
                  getQueryRaised('State', element?.queries) !== undefined && (
                    <Tooltip title={getQueryRaised('State', element?.queries)}>
                      <ReportIcon color="secondary" ml={2} />
                    </Tooltip>
                  )}
              </Typography>
              <Grid display="flex" alignItems="center">
                <Typography color="textPrimary.main" variant="subtitle2">
                  {capitalizeFirstLetter(element?.state?.name)}
                </Typography>
                {(data?.user_type === 2 ||
                  data?.user_type === 3 ||
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
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
          <Grid container item spacing={1} mt={0.5}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="grey.label">
                College Name
                <Typography component="span" color="error.main">
                  *
                </Typography>
                {element?.queries?.length > 0 &&
                  getQueryRaised('Name of the College', element?.queries) !== undefined && (
                    <Tooltip title={getQueryRaised('Name of the College', element?.queries)}>
                      <ReportIcon color="secondary" ml={2} />
                    </Tooltip>
                  )}
              </Typography>
              <Grid display="flex" alignItems="center">
                <Typography variant="subtitle2" color="textPrimary.main">
                  {element?.college?.name}
                </Typography>

                {(data?.user_type === 2 ||
                  data?.user_type === 3 ||
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
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
                University Name
                <Typography component="span" color="error.main">
                  *
                </Typography>
                {element?.queries?.length > 0 &&
                  getQueryRaised('University', element?.queries) !== undefined && (
                    <Tooltip title={getQueryRaised('University', element?.queries)}>
                      <ReportIcon color="secondary" ml={2} />
                    </Tooltip>
                  )}
              </Typography>
              <Grid display="flex" alignItems="center">
                <Typography variant="subtitle2" color="textPrimary.main">
                  {element?.university?.name}
                </Typography>{' '}
                {(data?.user_type === 2 ||
                  data?.user_type === 3 ||
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
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
                Month & Year of Degree Awarded
                {element?.queries?.length > 0 &&
                  getQueryRaised('Month & Year of Degree Awarded', element?.queries) !==
                    undefined && (
                    <Tooltip
                      title={getQueryRaised('Month & Year of Degree Awarded', element?.queries)}
                    >
                      <ReportIcon color="secondary" ml={2} />
                    </Tooltip>
                  )}
              </Typography>
              <Grid display="flex" alignItems="center">
                <Typography variant="subtitle2" color="textPrimary.main">
                  {element?.qualification_month ? element?.qualification_month : ''},{' '}
                  {element?.qualification_year ? element?.qualification_year : ''}
                </Typography>{' '}
                {(data?.user_type === 2 ||
                  data?.user_type === 3 ||
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
                      color="primary"
                      onClick={() => {
                        setOpenModal(true);
                        setQueryRaisedField('Month & Year of Degree Awarded');
                      }}
                      fontSize="width24"
                    />
                  )}
              </Grid>
            </Grid>

            {index === 0 && element?.country?.name !== 'India' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h3" color="grey.label">
                    {'FMGE Details'}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="grey.label">
                    Roll no.
                  </Typography>
                  {element?.queries?.length > 0 &&
                    getQueryRaised('Roll no.', element?.queries) !== undefined && (
                      <Tooltip title={getQueryRaised('Roll no.', element?.queries)}>
                        <ReportIcon color="secondary" ml={2} />
                      </Tooltip>
                    )}
                  <Grid display="flex" alignItems="center">
                    <Typography variant="subtitle2" color="textPrimary.main">
                      {nbe_response_to?.roll_no ? nbe_response_to?.roll_no : '-'}
                    </Typography>{' '}
                    {(data?.user_type === 2 ||
                      data?.user_type === 3 ||
                      (data?.user_type === 4 && index !== 0) ||
                      data?.user_type === 5) &&
                      element.is_verified !== 1 &&
                      (selectedAcademicStatus === 'Pending' ||
                        selectedAcademicStatus === 'Pending') &&
                      college_status !== 'Approved' &&
                      !data?.is_admin && (
                        <ContactSupportOutlinedIcon
                          cursor="pointer"
                          color="primary"
                          onClick={() => {
                            setOpenModal(true);
                            setQueryRaisedField('Roll no.');
                          }}
                          fontSize="width24"
                        />
                      )}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="grey.label">
                    Passport number
                  </Typography>
                  {element?.queries?.length > 0 &&
                    getQueryRaised('Passport number', element?.queries) !== undefined && (
                      <Tooltip title={getQueryRaised('Passport number', element?.queries)}>
                        <ReportIcon color="secondary" ml={2} />
                      </Tooltip>
                    )}
                  <Grid display="flex" alignItems="center">
                    <Typography variant="subtitle2" color="textPrimary.main">
                      {nbe_response_to?.passport_number ? nbe_response_to?.passport_number : '-'}
                    </Typography>{' '}
                    {(data?.user_type === 2 ||
                      data?.user_type === 3 ||
                      (data?.user_type === 4 && index !== 0) ||
                      data?.user_type === 5) &&
                      element.is_verified !== 1 &&
                      (selectedAcademicStatus === 'Pending' ||
                        selectedAcademicStatus === 'Pending') &&
                      college_status !== 'Approved' &&
                      !data?.is_admin && (
                        <ContactSupportOutlinedIcon
                          cursor="pointer"
                          color="primary"
                          onClick={() => {
                            setOpenModal(true);
                            setQueryRaisedField('Passport number');
                          }}
                          fontSize="width24"
                        />
                      )}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="grey.label">
                    Marks obtained
                  </Typography>
                  {element?.queries?.length > 0 &&
                    getQueryRaised('Marks obtained', element?.queries) !== undefined && (
                      <Tooltip title={getQueryRaised('Marks obtained', element?.queries)}>
                        <ReportIcon color="secondary" ml={2} />
                      </Tooltip>
                    )}
                  <Grid display="flex" alignItems="center">
                    <Typography variant="subtitle2" color="textPrimary.main">
                      {nbe_response_to?.marks_obtained ? nbe_response_to?.marks_obtained : '-'}
                    </Typography>{' '}
                    {(data?.user_type === 2 ||
                      data?.user_type === 3 ||
                      (data?.user_type === 4 && index !== 0) ||
                      data?.user_type === 5) &&
                      element.is_verified !== 1 &&
                      (selectedAcademicStatus === 'Pending' ||
                        selectedAcademicStatus === 'Pending') &&
                      college_status !== 'Approved' &&
                      !data?.is_admin && (
                        <ContactSupportOutlinedIcon
                          cursor="pointer"
                          color="primary"
                          onClick={() => {
                            setOpenModal(true);
                            setQueryRaisedField('Marks obtained');
                          }}
                          fontSize="width24"
                        />
                      )}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="grey.label">
                    Result
                  </Typography>
                  {element?.queries?.length > 0 &&
                    getQueryRaised('Result', element?.queries) !== undefined && (
                      <Tooltip title={getQueryRaised('Result', element?.queries)}>
                        <ReportIcon color="secondary" ml={2} />
                      </Tooltip>
                    )}
                  <Grid display="flex" alignItems="center">
                    <Typography variant="subtitle2" color="textPrimary.main">
                      {nbe_response_to?.result ? nbe_response_to?.result : '-'}
                    </Typography>{' '}
                    {(data?.user_type === 2 ||
                      data?.user_type === 3 ||
                      (data?.user_type === 4 && index !== 0) ||
                      data?.user_type === 5) &&
                      element.is_verified !== 1 &&
                      (selectedAcademicStatus === 'Pending' ||
                        selectedAcademicStatus === 'Pending') &&
                      college_status !== 'Approved' &&
                      !data?.is_admin && (
                        <ContactSupportOutlinedIcon
                          cursor="pointer"
                          color="primary"
                          onClick={() => {
                            setOpenModal(true);
                            setQueryRaisedField('Result');
                          }}
                          fontSize="width24"
                        />
                      )}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="grey.label">
                    Month & Year of FMGE qualified
                  </Typography>
                  {element?.queries?.length > 0 &&
                    getQueryRaised('Month & Year of FMGE qualified', element?.queries) !==
                      undefined && (
                      <Tooltip
                        title={getQueryRaised('Month & Year of FMGE qualified', element?.queries)}
                      >
                        <ReportIcon color="secondary" ml={2} />
                      </Tooltip>
                    )}
                  <Grid display="flex" alignItems="center">
                    <Typography variant="subtitle2" color="textPrimary.main">
                      {nbe_response_to?.month ? nbe_response_to?.month + ',' : '-'}{' '}
                      {nbe_response_to?.year ? nbe_response_to?.year : ''}
                    </Typography>{' '}
                    {(data?.user_type === 2 ||
                      data?.user_type === 3 ||
                      (data?.user_type === 4 && index !== 0) ||
                      data?.user_type === 5) &&
                      element.is_verified !== 1 &&
                      (selectedAcademicStatus === 'Pending' ||
                        selectedAcademicStatus === 'Pending') &&
                      college_status !== 'Approved' &&
                      !data?.is_admin && (
                        <ContactSupportOutlinedIcon
                          cursor="pointer"
                          color="primary"
                          onClick={() => {
                            setOpenModal(true);
                            setQueryRaisedField('Month & Year of FMGE qualified');
                          }}
                          fontSize="width24"
                        />
                      )}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <Grid container item spacing={1} mt={0.5}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="grey.label">
                Upload Qualification Degree
                <Typography component="span" color="error.main">
                  *
                </Typography>
                {element?.queries?.length > 0 &&
                  getQueryRaised('Upload Qualification Degree', element?.queries) !== undefined && (
                    <Tooltip
                      title={getQueryRaised('Upload Qualification Degree', element?.queries)}
                    >
                      <ReportIcon color="secondary" ml={2} />
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
                    setAttachmentViewIndex(index);
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
                  (data?.user_type === 4 && index !== 0) ||
                  data?.user_type === 5) &&
                  element.is_verified !== 1 &&
                  (selectedAcademicStatus === 'Pending' || selectedAcademicStatus === 'Pending') &&
                  college_status !== 'Approved' &&
                  !data?.is_admin && (
                    <ContactSupportOutlinedIcon
                      cursor="pointer"
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
        </Grid>
      );
    })
  ) : (
    ''
  );
};

export default QualificationDetailsContent;
