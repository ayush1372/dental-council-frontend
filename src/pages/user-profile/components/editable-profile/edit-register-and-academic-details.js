import { useEffect, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// import { createEditFieldData } from '../../../../helpers/functions/common-functions';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
// import { SearchableDropdown } from '../../../../shared/autocomplete/searchable-dropdown';
import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import {
  getRegistrationDetailsData,
  updateDoctorRegistrationDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getRegistrationDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Button, RadioGroup, Select, TextField } from '../../../../ui/core';
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
    id: '',
    FEstate: '',
    FEcollege: '',
    FEuniversity: '',
  },
];

const EditRegisterAndAcademicDetails = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);
  const { countriesList, coursesList, universitiesList, statesList, collegesList, councilNames } =
    useSelector((state) => state?.common);
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { personalDetails, updatedPersonalDetails } = useSelector(
    (state) => state?.doctorUserProfileReducer
  );

  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
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

  // eslint-disable-next-line no-unused-vars
  const smcName = state_medical_council?.name || '';
  // eslint-disable-next-line array-callback-return

  let registeredCouncil = [];

  // TO identify the default registered Council
  councilNames.forEach((councilData) => {
    if (councilData?.name === state_medical_council?.name) {
      registeredCouncil.push(councilData);
    }
    return;
  });

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    unregister,
    control,
    // clearErrors,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      RegisteredWithCouncil: registeredCouncil[0],
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
    registration_detail.state_medical_council = RegisteredWithCouncil;
    registration_detail.is_renewable = registration;
    registration_detail.renewable_registration_date = RenewalDate;

    // this below code is storing qualification details
    const { qualification } = getValues();

    const isInternational = qualification?.[0]?.qualificationfrom === 'International';
    let updatedObj = [];
    let fmgeObj = {};

    if (qualification?.length > 0) {
      updatedObj = qualification?.map((q) => ({
        id: qualification_detail_response_tos[0]?.id
          ? qualification_detail_response_tos[0]?.id
          : '',
        country: countriesList.find((x) => x.id === q?.country?.id),
        course: isInternational
          ? coursesList.data?.find((x) => x.id === q?.qualification)
          : coursesList.data?.find((x) => x.id === q?.qualification?.id),
        university: isInternational
          ? { name: q?.FEuniversity }
          : universitiesList.data?.find((x) => x.id === q?.university),
        state: isInternational ? { name: q?.FEstate } : statesList?.find((x) => x.id === q?.state),
        college: isInternational
          ? { name: q?.FEcollege }
          : collegesList.data?.find((x) => x.id === q?.college),
        qualification_year: q?.year,
        qualification_month: q?.month,
        qualification_from: q?.qualificationfrom,
      }));
      if (isInternational) {
        fmgeObj = {
          roll_no: qualification[0]?.rollno,
          passport_number: qualification[0]?.passportNumber,
          marks_obtained: qualification[0]?.marksobtained,
          user_result: qualification[0]?.result,
          month_of_passing: qualification[0]?.monthfmge,
          year_of_passing: qualification[0]?.yearfmge,
        };
      }
    }

    qualification_details = [...updatedObj];

    finalResult = { registration_detail, qualification_details, hp_nbe_details: { ...fmgeObj } };
    cloneObj.registration_detail_to = registration_detail;
    cloneObj.qualification_detail_response_tos = [{ ...(qualification_details?.[0] || {}) }];
    cloneObj.nbe_response_to = { ...fmgeObj };

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
          ? updatedPersonalDetails?.hp_profile_id
          : loggedInUserType === 'SMC' && personalDetails?.hp_profile_id
      )
    ).then(() => {
      if (moveToNext) handleNext();
    });
  };

  useEffect(() => {
    dispatch(
      getRegistrationDetailsData(
        updatedPersonalDetails?.hp_profile_id === undefined
          ? personalDetails?.hp_profile_id
          : updatedPersonalDetails?.hp_profile_id
      )
    )
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

  useEffect(() => {
    const details = registrationDetails?.qualification_detail_response_tos?.[0] || {};
    const fmgeDetails = registrationDetails?.nbe_response_to || {};
    const obj = { ...qualificationObjTemplate[0] };

    const isInternational = details?.qualification_from === 'International';
    // basic qualification
    obj.university = isInternational ? details?.university?.name : details?.university?.id;
    obj.qualification = details?.course?.id;
    obj.college = isInternational ? details?.FEcollege?.name : details?.college?.id;
    obj.year = details?.qualification_year;
    obj.country = details?.country?.id;
    obj.state = isInternational ? details?.FEstate?.name : details?.state?.id;
    obj.qualificationfrom = details?.qualification_from;
    obj.month = details?.qualification_month;
    obj.nameindegree = details?.is_name_change;

    // FMGE qualification
    obj.rollno = fmgeDetails?.roll_no;
    obj.passportNumber = fmgeDetails?.passport_number;
    obj.marksobtained = fmgeDetails?.marks_obtained;
    obj.result = fmgeDetails?.user_result;
    obj.monthfmge = fmgeDetails?.month_of_passing;
    obj.yearfmge = fmgeDetails?.year_of_passing;

    update(0, { ...obj });
  }, [registrationDetails]);

  useEffect(() => {
    setValue('RegisteredWithCouncil', registeredCouncil[0]);
  }, []);
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
            {personalDetails?.personal_details?.is_new ? (
              <Select
                // style={{ backgroundColor: isSameAddress ? '#F0F0F0' : '' }}
                fullWidth
                // error={errors.State?.message}
                name="RegisteredWithCouncil"
                defaultValue={registeredCouncil[0]?.name}
                // value={getValues().RegisteredWithCouncil}
                required={true}
                disabled={loggedInUserType === 'SMC' || !personalDetails?.personal_details?.is_new}
                {...register(
                  'RegisteredWithCouncil'
                  // getValues()?.RegisteredWithCouncil?.length <= 0 && {
                  //   required: 'State/Union territory is required',
                  // }
                )}
                options={createSelectFieldData(councilNames)}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            ) : (
              <TextField
                variant="outlined"
                name={'RegisteredWithCouncil'}
                required={true}
                fullWidth
                // defaultValue={getValues()?.RegisteredWithCouncil?.name}
                value={getValues()?.RegisteredWithCouncil?.name}
                {...register('RegisteredWithCouncil', {
                  required: 'Registered with council is Required',
                })}
                error={errors?.RegisteredWithCouncil?.message}
                sx={{
                  input: {
                    backgroundColor:
                      loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                        ? ''
                        : 'grey2.main',
                  },
                }}
                InputProps={{
                  readOnly:
                    loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                      ? false
                      : true,
                }}
              />
            )}
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
                  backgroundColor:
                    loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                      ? ''
                      : 'grey2.main',
                },
              }}
              InputProps={{
                readOnly:
                  loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                    ? false
                    : true,
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
              type="date"
              defaultValue={getValues().RegistrationDate}
              {...register('RegistrationDate', {
                required: 'Registration Date is Required',
              })}
              sx={{
                height: '48px',
                width: '60%',
                input: {
                  color: 'black',
                  textTransform: 'uppercase',
                  backgroundColor:
                    loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                      ? ''
                      : 'grey2.main',
                },
              }}
              InputProps={{
                readOnly:
                  loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                    ? false
                    : true,
              }}
              InputLabelProps={{
                shrink: true,
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
                inputProps={{
                  min: new Date().toISOString().split('T')[0],
                }}
              />
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={8} xl={6}>
            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              fileData={registrationFileData}
              setFileData={setRegistrationFileData}
              uploadFileLabel="Upload the registration certificate"
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
