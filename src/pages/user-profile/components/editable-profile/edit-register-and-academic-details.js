import { useEffect, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import {
  getRegistrationDetailsData,
  updateDoctorRegistrationDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getRegistrationDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Button, RadioGroup, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
import successToast from '../../../../ui/core/toaster';
import EditQualificationDetails from './edit-qualification-details';
const qualificationObjTemplate = [
  {
    qualification: '',
    country: '',
    state: '',
    college: '',
    university: '',
    month: '',
    year: '',
    nameindegree: '',
    files: '',
    qualificationfrom: '',
  },
];

const EditRegisterAndAcademicDetails = ({ handleNext, handleBack }) => {
  const { t } = useTranslation();
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);
  const dispatch = useDispatch();
  const { countriesList, coursesList, universitiesList, statesList, collegesList } = useSelector(
    (state) => state?.common
  );
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { registration_detail_to, qualification_detail_response_tos } = registrationDetails || {};
  const {
    registration_date,
    registration_number,
    state_medical_council,
    is_renewable,
    renewable_registration_date,
    is_name_change,
    registration_certificate,
  } = registration_detail_to || {};
  const { degree_certificate } = qualification_detail_response_tos?.[0] || {};
  const [registrationFileData, setRegistrationFileData] = useState(
    registration_certificate ? [{ file: registration_certificate }] : []
  );
  const [qualificationFilesData, setQualificationFilesData] = useState(
    degree_certificate ? [{ file: degree_certificate }] : []
  );
  const [viewCertificate, setViewCertificate] = useState({
    registration: registration_certificate,
    qualification: degree_certificate,
  });

  const smcName = state_medical_council?.name || '';

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    unregister,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      RegisteredWithCouncil:
        loggedInUserType === 'SMC' || loggedInUserType === 'Doctor' ? smcName : '',
      RegistrationNumber:
        loggedInUserType === 'SMC' || loggedInUserType === 'Doctor' ? registration_number : '',
      RegistrationDate:
        loggedInUserType === 'SMC' || loggedInUserType === 'Doctor'
          ? registration_date?.length > 10
            ? registration_date?.substring(0, 10)
            : registration_date
          : '',

      registration: loggedInUserType === 'SMC' || loggedInUserType === 'Doctor' ? is_renewable : '',
      RenewalDate:
        loggedInUserType === 'SMC' || loggedInUserType === 'Doctor'
          ? renewable_registration_date?.length > 10
            ? renewable_registration_date?.substring(0, 10)
            : renewable_registration_date
          : '',
      registrationCertificate:
        loggedInUserType === 'SMC' ? 'No' : loggedInUserType === 'Doctor' ? is_name_change : '',
      qualification: [...qualificationObjTemplate],
    },
  });
  const { fields, update } = useFieldArray({
    control,
    name: 'qualification',
  });

  const isRenewable = watch('registration');

  const onHandleSave = (moveToNext = false) => {
    const {
      RegisteredWithCouncil,
      RegistrationNumber,
      RegistrationDate,
      registration,
      RenewalDate,
    } = getValues();

    const cloneObj = JSON.parse(JSON.stringify(registrationDetails));

    let finalResult = {};
    let registration_detail = {};
    let qualification_details = {};

    registration_detail.registration_date = RegistrationDate;
    registration_detail.registration_number = RegistrationNumber;
    registration_detail.state_medical_council = { id: 14 };
    registration_detail.state_medical_council.name = RegisteredWithCouncil;
    registration_detail.is_renewable = registration;
    registration_detail.renewable_registration_date = RenewalDate;

    // this below code is storing qualification details
    const { qualification } = getValues();
    let updatedObj = [];
    if (qualification?.length > 0) {
      updatedObj = qualification?.map((q) => ({
        country: countriesList.find((x) => x.id === q?.country),
        course: coursesList.data?.find((x) => x.id === q?.qualification),
        university: universitiesList.data?.find((x) => x.id === q?.university),
        state: statesList?.find((x) => x.id === q?.state),
        college: collegesList.data?.find((x) => x.id === q?.college),
        qualification_year: q?.year,
        qualification_month: q?.month,
        qualification_from: q?.qualificationfrom,
      }));
    }

    qualification_details = [...updatedObj];

    finalResult = { registration_detail, qualification_details };
    cloneObj.registration_detail_to = registration_detail;
    cloneObj.qualification_detail_response_tos = [{ ...(qualification_details?.[0] || {}) }];

    dispatch(
      getRegistrationDetails({
        ...JSON.parse(JSON.stringify(cloneObj)),
      })
    );

    fetchUpdateDoctorRegistrationDetails(finalResult, moveToNext);
  };

  const fetchUpdateDoctorRegistrationDetails = (finalResult, moveToNext = false) => {
    const formData = new FormData();

    const doctorRegistrationDetailsJson = JSON.stringify(finalResult);
    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });
    formData.append('data', doctorRegistrationDetailsBlob);
    formData.append('degreeCertificate', qualificationFilesData[0].file);

    formData.append('registrationCertificate', registrationFileData[0].file);
    dispatch(
      updateDoctorRegistrationDetails(
        formData,
        loggedInUserType === 'Doctor'
          ? registrationDetails?.hp_profile_id
          : loggedInUserType === 'SMC' && personalDetails?.hp_profile_id
      )
    ).then(() => {
      if (moveToNext) handleNext();
    });
  };

  // const [test, setTest] = useState(true);

  useEffect(() => {
    // if (test) {
    dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id))
      .then((response) => {
        viewCertificate.qualification =
          response?.data?.qualification_detail_response_tos[0]?.degree_certificate;
        setViewCertificate();
        const QualificationFile = new File(
          [response?.data?.qualification_detail_response_tos[0]?.degree_certificate],
          'Qualification Certificate',
          { type: 'image/png' }
        );
        const RegistrationFile = new File(
          [response?.data?.registration_detail_to?.registration_certificate],
          'Registration Certificate',
          { type: 'image/png' }
        );

        setRegistrationFileData([{ file: RegistrationFile }]);
        setQualificationFilesData([{ file: QualificationFile }]);
      })
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
    // setTest(false);
    // }
  }, []);

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  const onHandleOptionNext = () => {
    onHandleSave(true);
  };

  const handleBackButton = () => {
    handleBack();
  };
  const handleRegistration = (event) => {
    setValue(event.target.name, event.target.value, true);
  };
  const formattedDate = moment(getValues().RegistrationDate).format('DD-MM-YYYY');

  useEffect(() => {
    const details =
      registrationDetails && Object.values(registrationDetails).length > 3
        ? registrationDetails.qualification_detail_response_tos[0]
        : {};
    const obj = { ...qualificationObjTemplate[0] };
    obj.university = details?.university?.id;
    obj.qualification = details?.course?.id;
    obj.college = details?.college?.id;
    obj.year = details?.qualification_year;
    obj.country = details?.country?.id;
    obj.state = details?.state?.id;
    obj.qualificationfrom = details?.qualification_from;
    obj.month = details?.qualification_month;
    obj.nameindegree = details?.is_name_change;

    update(0, { ...obj });
  }, [registrationDetails]);
  return (
    <Box
      boxShadow={1}
      sx={{
        padding: {
          xs: '0px 10px 10px 10px',
          md: '0px 41px 44px 41px',
        },
      }}
    >
      <Grid container spacing={2} mt={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Registration Details*
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registered With Council
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'RegisteredWithCouncil'}
              required={true}
              fullWidth
              defaultValue={getValues().RegisteredWithCouncil}
              {...register('RegisteredWithCouncil', {
                required: 'Registered with council is Required',
              })}
              error={errors?.RegisteredWithCouncil?.message}
              sx={{
                input: {
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{
                readOnly: loggedInUserType === 'SMC' ? false : true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'RegistrationNumber'}
              Registration
              Number
              required={true}
              fullWidth
              defaultValue={getValues().RegistrationNumber}
              sx={{
                input: {
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{
                readOnly: loggedInUserType === 'SMC' ? false : true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Date(if available)
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'RegistrationDate'}
              required={true}
              fullWidth
              defaultValue={formattedDate}
              {...register('RegistrationDate', {
                required: 'Registration Date is Required',
              })}
              sx={{
                input: {
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{
                readOnly: loggedInUserType === 'SMC' ? false : true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Is This Registration Permanent Or Renewable?
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <RadioGroup
              onChange={handleRegistration}
              name={'registration'}
              size="small"
              defaultValue={getValues().registration}
              items={[
                {
                  value: '0',
                  label: 'Permanent',
                },
                {
                  value: '1',
                  label: 'Renewable',
                },
              ]}
              required={true}
              error={errors.registration?.message}
            />
          </Grid>
          {isRenewable === '1' && (
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Due Date of Renewal
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>

              <TextField
                variant="outlined"
                name={'RenewalDate'}
                required={true}
                fullWidth
                type="date"
                defaultValue={getValues().RenewalDate}
                {...register('RenewalDate', {
                  required: 'Registration Date is Required',
                })}
                // sx={{
                //   input: {
                //     backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                //   },
                // }}
                // InputProps={{
                //   readOnly: loggedInUserType === 'SMC' ? false : true,
                // }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0],
                }}
              />
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="inputTextColor.main" mb={1}>
              Upload the registration certificate
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              fileData={registrationFileData}
              setFileData={setRegistrationFileData}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Qualification Details*
            </Typography>
          </Grid>
        </Grid>
        {fields.map((qualification, index) => {
          const showDeleteIcon = index > 0;
          return (
            <EditQualificationDetails
              key={qualification.id}
              index={index}
              showDeleteIcon={showDeleteIcon}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              fields={fields}
              watch={watch}
              register={register}
              unregister={unregister}
              qualificationFilesData={qualificationFilesData}
              handleQualificationFilesData={setQualificationFilesData}
            />
          );
        })}
        {/* {
          <Typography
            variant="subtitle2"
            color="primary.main"
            onClick={(e) => {
              e.preventDefault();
              setAttachmentViewProfile(true);
            }}
          >
            View attachment
          </Typography>
        } */}
      </Grid>
      {false && (
        <Box width="100%">
          <Button variant="outlined" color="primary">
            Add Additional Qualification
          </Button>
          <br />
          <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
            <InfoOutlinedIcon fontSize="18px" />
            Add upto 6 qualification
          </Typography>
        </Box>
      )}

      <Grid container display="flex" justifyContent="space-between" alignItems="center" mt={5}>
        <Grid item xs={12} md={8} lg={6}>
          <Button
            onClick={handleBackButton}
            color="grey"
            variant="contained"
            sx={{
              margin: {
                xs: '5px 0',
                md: '0',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
          >
            {t('Back')}
          </Button>
        </Grid>
        <Grid item xs={12} md="auto" display="flex" justifyContent="end" lg={4}>
          <Button
            onClick={handleSubmit(onHandleSave)}
            size="medium"
            variant="outlined"
            color="secondary"
            sx={{
              margin: {
                xs: '5px 0',
                md: '0',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
                height: '52px',
              },
            }}
          >
            {t('Save')}
          </Button>
        </Grid>
        <Grid item xs={12} md="auto" display="flex" justifyContent="end" lg={2}>
          <Button
            size="medium"
            onClick={handleSubmit(onHandleOptionNext)}
            variant="contained"
            color="secondary"
            sx={{
              margin: {
                xs: '5px 0',
                md: '0',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
          >
            {t('Save & Next')}
          </Button>
        </Grid>
      </Grid>
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={viewCertificate?.qualification}
          closePopup={CloseAttachmentPopup}
          alt={'Qualification Certificate'}
        />
      )}
    </Box>
  );
};

export default EditRegisterAndAcademicDetails;
