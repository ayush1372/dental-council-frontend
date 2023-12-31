import { useEffect, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportIcon from '@mui/icons-material/Report';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import {
  getRegistrationDetailsData,
  updateDoctorRegistrationDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getRegistrationDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Button, DatePicker, RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
// import successToast from '../../../../ui/core/toaster';
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
    diffadharfiles: '',
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
  const { work_flow_status_id, hp_profile_status_id } = personalDetails || {};
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

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
    file_name,
    file_type,
  } = registration_detail_to || {};
  const { degree_certificate, name_change_proof_attach } =
    qualification_detail_response_tos?.[0] || {};

  const [registrationFileData, setRegistrationFileData] = useState(
    registration_certificate ? [{ file: registration_certificate }] : []
  );
  const [nameChangeFileData, setNameChangeFileData] = useState(
    registration_detail_to?.name_change_proof_attach
      ? [{ file: registration_detail_to?.name_change_proof_attach }]
      : []
  );
  const [qualificationFilesData, setQualificationFilesData] = useState({
    'qualification.0.files': degree_certificate ? [{ file: degree_certificate }] : [],
  });
  const [registrationFileUpdated, setRegistrationFileUpdated] = useState(false);
  const [nameChangeFileUpdated, setNameChangedFileUpdated] = useState(false);
  const [qualificationFileUpdated, setQualificationFileUpdated] = useState(false);
  const [qualificationFilesNameChangeData, setQualificationFilesNameChangeData] = useState({
    'qualification.0.diffadharfiles': name_change_proof_attach
      ? [{ file: name_change_proof_attach }]
      : [],
  });
  const [qualificationNameChangeFileUpdated, setQualificationNameChangeFileUpdated] =
    useState(false);

  const [viewCertificate] = useState({
    registration: registration_certificate,
    qualification: degree_certificate,
  });

  let registeredCouncil = [];

  // TO identify the default registered Council
  councilNames?.forEach((councilData) => {
    if (
      councilData?.name === state_medical_council?.name ||
      councilData?.name === state_medical_council?.id
    ) {
      registeredCouncil.push(councilData);
    }
    return;
  });

  const {
    formState: { errors },
    register,
    setValue,
    setError,
    getValues,
    unregister,
    clearErrors,
    handleSubmit,
    control,
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
      registrationname: '1',
      RenewalDate:
        loggedInUserType === 'SMC' || loggedInUserType === 'Doctor'
          ? renewable_registration_date?.length > 10
            ? renewable_registration_date?.substring(0, 10)
            : renewable_registration_date
          : '',
      registrationCertificate:
        loggedInUserType === 'SMC' ? 'No' : loggedInUserType === 'Doctor' ? is_name_change : '',
      proofOfRegistrationNameChange: '',
      qualification: [...qualificationObjTemplate],
    },
  });
  const { fields, update } = useFieldArray({
    control,
    name: 'qualification',
  });

  watch('registration');
  watch('registrationname');
  //const isRenewable = watch('registration');

  const getRegistrationCouncilData = (RegisteredWithCouncil) => {
    let councilData = [];
    councilNames?.map((elementData) => {
      if (
        elementData?.id === RegisteredWithCouncil ||
        elementData?.id === RegisteredWithCouncil ||
        RegisteredWithCouncil?.id === elementData?.id ||
        RegisteredWithCouncil?.name === elementData?.name ||
        RegisteredWithCouncil === elementData?.name
      ) {
        councilData.push(elementData);
      }
    });
    return councilData[0];
  };

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

    registration_detail.registration_date = RegistrationDate?.split('/')?.reverse()?.join('-');
    registration_detail.registration_number =
      work_flow_status_id === 3
        ? getQueryRaised('Registration Date')
          ? RegistrationNumber
          : RegistrationNumber
        : loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
        ? RegistrationNumber
        : RegistrationNumber;

    registration_detail.state_medical_council = getRegistrationCouncilData(RegisteredWithCouncil);
    registration_detail.is_renewable = registration || is_renewable;
    registration_detail.renewable_registration_date = RenewalDate?.split('/')?.reverse()?.join('-');

    // this below code is storing qualification details
    const { qualification } = getValues();

    const isInternational = qualification?.[0]?.qualificationfrom === 'International';
    let updatedObj = [];
    let fmgeObj = {};
    let countryData = { id: 356, name: 'India', nationality: 'Indian' };

    if (qualification?.length > 0) {
      updatedObj = qualification?.map((q) => ({
        id:
          qualification_detail_response_tos[0]?.id &&
          qualification_detail_response_tos[0]?.qualification_from === q?.qualificationfrom
            ? qualification_detail_response_tos[0]?.id
            : '',
        country: isInternational
          ? countriesList.find((item) => item.id === q?.country)
          : countryData,
        course: isInternational
          ? typeof q?.qualification === 'string'
            ? coursesList.data?.find((x) => x.name === q?.qualification)
            : coursesList.data?.find((x) => x.id === q?.qualification)
          : coursesList.data?.find((x) => x.id === q?.qualification),
        university: isInternational
          ? { name: q?.university }
          : universitiesList.data?.find((x) => x.id === q?.university),
        state: isInternational ? { name: q?.state } : statesList?.find((x) => x.id === q?.state),
        college: isInternational
          ? { name: q?.college }
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

    const registrationFile = registrationFileData[0]?.file;
    const nameChangeFile = nameChangeFileData[0]?.file;

    const qualificationFile = Object.values(qualificationFilesData)[0]?.[0]?.file;

    formData.append('data', doctorRegistrationDetailsBlob);

    if (qualificationFileUpdated) formData.append('degreeCertificate', qualificationFile);
    if (registrationFileUpdated) formData.append('registrationCertificate', registrationFile);
    if (nameChangeFileUpdated) formData.append('proofOfRegistrationNameChange', nameChangeFile);
    if (qualificationNameChangeFileUpdated)
      formData.append(
        'proofOfQualificationNameChange',
        qualificationFilesNameChangeData[`qualification.${0}.diffadharfiles`]?.[0]?.file
      );

    dispatch(
      updateDoctorRegistrationDetails(
        formData,
        loggedInUserType === 'Doctor'
          ? updatedPersonalDetails?.hp_profile_id
          : loggedInUserType === 'SMC' && personalDetails?.hp_profile_id
      )
    ).then(() => {
      if (moveToNext === true) handleNext();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  };

  useEffect(() => {
    setValue('RegisteredWithCouncil', registeredCouncil[0]);

    dispatch(
      getRegistrationDetailsData(
        updatedPersonalDetails?.hp_profile_id === undefined
          ? personalDetails?.hp_profile_id
          : updatedPersonalDetails?.hp_profile_id
      )
    );
  }, []);

  useEffect(() => {
    if (registrationFileData?.length > 0) {
      setValue('registrationCertificate', registrationFileData);
      clearErrors('registrationCertificate', '');
      if (registrationFileData[0]?.fileName !== undefined) {
        setRegistrationFileUpdated(true);
      } else {
        setRegistrationFileUpdated(false);
      }
    }
    if (registrationFileData?.length === 0) {
      setValue('registrationCertificate', []);
    }
  }, [registrationFileData]);

  useEffect(() => {
    if (nameChangeFileData?.length > 0) {
      setValue('proofOfRegistrationNameChange', nameChangeFileData);
      clearErrors('proofOfRegistrationNameChange', '');
      if (nameChangeFileData[0]?.fileName !== undefined) {
        setNameChangedFileUpdated(true);
      } else {
        setNameChangedFileUpdated(false);
      }
    }
    if (nameChangeFileData?.length === 0) {
      setValue('proofOfRegistrationNameChange', []);
    }
  }, [nameChangeFileData]);

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  const onHandleOptionNext = () => {
    onHandleSave(true);
  };

  const handleBackButton = () => {
    handleBack();
  };
  // const handleRegistration = (event) => {
  //   setValue(event.target.name, event.target.value, true);
  // };
  useEffect(() => {
    const details = registrationDetails?.qualification_detail_response_tos?.[0] || {};
    const fmgeDetails = registrationDetails?.nbe_response_to || {};
    const obj = { ...qualificationObjTemplate[0] };

    const isInternational = details?.qualification_from === 'International';
    // basic qualification

    obj.university = isInternational ? details?.university?.name : details?.university?.id;
    obj.qualification = details?.course?.course_name;
    obj.college = isInternational ? details?.college?.name : details?.college?.id;
    obj.year = details?.qualification_year;
    obj.country = details?.country?.id;
    obj.state = isInternational ? details?.state?.name : details?.state?.id;
    obj.qualificationfrom = details?.qualification_from;
    obj.month = details?.qualification_month;
    obj.nameindegree = details?.is_name_change;

    // FMGE qualification
    obj.rollno = fmgeDetails?.roll_no;
    obj.passportNumber = fmgeDetails?.passport_number;
    obj.marksobtained = fmgeDetails?.marks_obtained;
    obj.result = fmgeDetails?.result;
    obj.monthfmge = fmgeDetails?.month;
    obj.yearfmge = fmgeDetails?.year;

    update(0, { ...obj });
  }, [registrationDetails]);

  const handleQualificationFilesData = (fileName, files) => {
    qualificationFilesData[fileName] = files;
    setQualificationFilesData({ ...qualificationFilesData });
    if (files?.length > 0) {
      if (files[0]?.fileName !== undefined) {
        setQualificationFileUpdated(true);
      } else {
        setQualificationFileUpdated(false);
      }
    }
    if (files?.length === 0) {
      setQualificationFilesData([]);
      setValue('qualificationCertificate', []);
    }
  };

  const handleQualificationNmeChangeFilesData = (fileName, files) => {
    if (files?.length > 0) {
      qualificationFilesNameChangeData[fileName] = files;
      setQualificationFilesNameChangeData({ ...qualificationFilesNameChangeData });

      if (files[0]?.fileName !== undefined) {
        setQualificationNameChangeFileUpdated(true);
      } else {
        setQualificationNameChangeFileUpdated(false);
      }
    }
    if (files?.length === 0) {
      setQualificationFilesNameChangeData([]);
      setValue('proofOfQualificationNameChange', []);
    }
  };
  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query === undefined;
  };
  const getQueryRaisedComment = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query?.query_comment;
  };

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
              Registration Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registered Council Name
              <Typography component="span" color="error.main">
                *
                {getQueryRaised('Registered with council') === false && (
                  <Tooltip title={getQueryRaisedComment('Registered with council')}>
                    <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                  </Tooltip>
                )}
              </Typography>
            </Typography>
            {personalDetails?.personal_details?.is_new ? (
              <Select
                fullWidth
                name="RegisteredWithCouncil"
                defaultValue={registeredCouncil[0]?.id}
                required={true}
                disabled={
                  loggedInUserType === 'SMC' ||
                  !personalDetails?.personal_details?.is_new ||
                  (work_flow_status_id === 3 && getQueryRaised('Registered with council'))
                }
                // style={{
                //   backgroundColor:
                //     work_flow_status_id === 3 && getQueryRaised('Registered with council')
                //       ? 'grey2.main'
                //       : '',
                // }}
                {...register('RegisteredWithCouncil')}
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
                value={getValues()?.RegisteredWithCouncil?.name}
                {...register('RegisteredWithCouncil', {
                  required: 'Registered with council is Required',
                })}
                error={errors?.RegisteredWithCouncil?.message}
                disabled={
                  loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                    ? false
                    : true
                }
                //   input: {
                //     backgroundColor:
                //       loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                //         ? ''
                //         : 'grey2.main',
                //   },
                // }}
                // InputProps={{
                //   readOnly:
                //     loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                //       ? false
                //       : true,
                // }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Number
              <Typography component="span" color="error.main">
                *
              </Typography>
              {getQueryRaised('Registration Number') === false && (
                <Tooltip title={getQueryRaisedComment('Registration Number')}>
                  <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                </Tooltip>
              )}
            </Typography>
            <TextField
              variant="outlined"
              name={'RegistrationNumber'}
              type="number"
              required
              fullWidth
              defaultValue={getValues().RegistrationNumber}
              error={errors.RegistrationNumber?.message}
              {...register('RegistrationNumber', {
                required: 'Please enter registration number',
                pattern: { message: 'Please Enter Valid Registration number' },
              })}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('Registration Number')
                  : loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                  ? false
                  : true
              }
              // sx={{
              //   input: {
              //     backgroundColor:
              //       getQueryRaised('Registration Number') === false
              //         ? false
              //         : work_flow_status_id === 3
              //         ? 'grey2.main'
              //         : loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
              //         ? ''
              //         : 'grey2.main',
              //   },
              // }}
              // InputProps={{
              //   readOnly:
              //     work_flow_status_id === 3
              //       ? getQueryRaised('Registration Number')
              //       : loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
              //       ? false
              //       : true,
              // }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Date
              <Typography component="span" color="error.main">
                *
              </Typography>
              {getQueryRaised('Registration Date') === false && (
                <Tooltip title={getQueryRaisedComment('Registration Date')}>
                  <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                </Tooltip>
              )}
            </Typography>
            <DatePicker
              onChangeDate={(newDateValue) => {
                setValue('RegistrationDate', new Date(newDateValue)?.toLocaleDateString('en-GB'));
                clearErrors('RegistrationDate', '');
              }}
              data-testid="RegistrationDate"
              id="RegistrationDate"
              name={'RegistrationDate'}
              required={true}
              defaultValue={
                getValues()?.RegistrationDate ? new Date(getValues()?.RegistrationDate) : undefined
              }
              error={errors?.RegistrationDate?.message}
              {...register(
                'RegistrationDate',
                getValues().RegistrationDate === undefined ||
                  getValues().RegistrationDate === 'Invalid Date'
                  ? { required: 'Please select a valid date' }
                  : { required: false }
              )}
              disabled={
                getQueryRaised('Registration Date') === false
                  ? false
                  : hp_profile_status_id === 3
                  ? getQueryRaised('Registration Date')
                  : hp_profile_status_id === 2
                  ? true
                  : false
              }
              disableFuture
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Type
              <Typography component="span" color="error.main">
                *
              </Typography>
              {getQueryRaised('Registration') === false && (
                <Tooltip title={getQueryRaisedComment('Registration')}>
                  <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                </Tooltip>
              )}
            </Typography>

            <RadioGroup
              name={'registration'}
              size="small"
              defaultValue={is_renewable !== undefined ? is_renewable : '0'}
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
              {...register('registration')}
              disabled={
                getQueryRaised('Registration') === false
                  ? false
                  : hp_profile_status_id === 3
                  ? getQueryRaised('Registration')
                  : hp_profile_status_id === 2
                  ? true
                  : !personalDetails?.personal_details?.is_new
                  ? true
                  : false
              }
              // disabled={work_flow_status_id === 3 ? getQueryRaised('Registration') : false}
            />
          </Grid>
          {(getValues().registration === '1' ||
            hp_profile_status_id === 2 ||
            is_renewable === '1') && (
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Due Date of Renewal
                <Typography component="span" color="error.main">
                  *
                </Typography>
                {getQueryRaised('Due Date of Renewal') === false && (
                  <Tooltip title={getQueryRaisedComment('Due Date of Renewal')}>
                    <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                  </Tooltip>
                )}
              </Typography>

              <DatePicker
                onChangeDate={(newDateValue) => {
                  setValue('RenewalDate', new Date(newDateValue)?.toLocaleDateString('en-GB'));
                }}
                data-testid="RenewalDate"
                id="RenewalDate"
                name="RenewalDate"
                required={true}
                defaultValue={getValues().RenewalDate}
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 5))}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
                // backgroundColor={
                //   work_flow_status_id === 3
                //     ? '#F0F0F0'
                //     : loggedInUserType === 'SMC' || personalDetails?.personal_details?.is_new
                //     ? '#F0F0F0'
                //     : ''
                // }
                value={
                  renewable_registration_date ? new Date(renewable_registration_date) : new Date()
                }
                disabled={
                  getQueryRaised('Registration') === false
                    ? false
                    : getQueryRaised('Due Date of Renewal') === false
                    ? false
                    : hp_profile_status_id === 3
                    ? getQueryRaised('Due Date of Renewal')
                    : hp_profile_status_id === 2
                    ? true
                    : false
                }
                // disabled={work_flow_status_id === 3 ? getQueryRaised('Due Date of Renewal') : false}
                // disabled={
                //   work_flow_status_id === 3 &&
                //   (getQueryRaised('Due Date of Renewal') === false ||
                //     getQueryRaised('Due Date of Renewal') === undefined)
                //     ? getQueryRaised('Due Date of Renewal')
                //     : false
                // }
              />
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12}>
            <UploadFile
              uploadDisabled={
                getQueryRaised('Upload the registration certificate') === false
                  ? false
                  : hp_profile_status_id === 3
                  ? getQueryRaised('Upload the registration certificate')
                  : hp_profile_status_id === 2
                  ? true
                  : false
              }
              queryRaiseIcon={
                getQueryRaised('Upload the registration certificate') === false ? true : false
              }
              fileID={'registrationFileData'}
              uploadFiles="single"
              sizeAllowed={5}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
              fileMessage={`PDF, PNG, JPG, JPEG file types are supported.
               Maximum size allowed is 5MB.`}
              fileData={registrationFileData}
              clearErrors={clearErrors}
              setError={setError}
              name={'registrationCertificate'}
              isError={errors.registrationCertificate?.message}
              setFileData={setRegistrationFileData}
              uploadFileLabel="Upload Registration Certificate"
              fileName={file_name + '.' + file_type}
              fileDisabled={
                getQueryRaised('Upload the registration certificate') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Upload the registration certificate')
                  : false
              }
              toolTipData={getQueryRaisedComment('Upload the registration certificate')}
              {...register(
                'registrationCertificate',
                registrationFileData?.length === 0 && {
                  required: 'Please upload the registration certificate.',
                }
              )}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Is your name in registration certificate, different from your name in Aadhaar?
              {getQueryRaised('Registration') === false && (
                <Tooltip title={getQueryRaisedComment('Registration')}>
                  <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                </Tooltip>
              )}
            </Typography>

            <RadioGroup
              //onChange={handleRegistration}
              name={'registrationname'}
              size="small"
              defaultValue={
                registration_detail_to?.name_change_proof_attach
                  ? '0'
                  : getValues().registrationname
              }
              items={[
                {
                  value: '0',
                  label: 'Yes',
                },
                {
                  value: '1',
                  label: 'No',
                },
              ]}
              {...register('registrationname')}
              disabled={
                getQueryRaised('registrationname') === false
                  ? false
                  : hp_profile_status_id === 3
                  ? getQueryRaised('registrationname')
                  : hp_profile_status_id === 2
                  ? true
                  : !personalDetails?.personal_details?.is_new
                  ? true
                  : false
              }
              // disabled={work_flow_status_id === 3 ? getQueryRaised('Registration') : false}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12}>
            {getValues().registrationname === '0' && (
              <UploadFile
                uploadDisabled={
                  getQueryRaised('Upload the registration name change certificate') === false
                    ? false
                    : hp_profile_status_id === 3
                    ? getQueryRaised('Upload the registration name change certificate')
                    : hp_profile_status_id === 2
                    ? true
                    : false
                }
                queryRaiseIcon={
                  getQueryRaised('Upload the registration name change certificate') === false
                    ? true
                    : false
                }
                fileID={'nameChangeFileData'}
                uploadFiles="single"
                sizeAllowed={5}
                fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
                fileMessage={`Upload copy of Gazette of India / other legal documents where your name change is reflected.
                                Max Allowed File Size 5 MB. (Allowed Formats : PDF, PNG, JPEG, JPG)`}
                fileData={nameChangeFileData}
                clearErrors={clearErrors}
                setError={setError}
                name={'proofOfRegistrationNameChange'}
                isError={errors.proofOfRegistrationNameChange?.message}
                setFileData={setNameChangeFileData}
                uploadFileLabel="Upload Proof Of Name Change"
                fileName={file_name + '.' + file_type}
                fileDisabled={
                  getQueryRaised('Upload the registration name change certificate') === false
                    ? false
                    : work_flow_status_id === 3
                    ? getQueryRaised('Upload the registration name change certificate')
                    : false
                }
                toolTipData={getQueryRaisedComment(
                  'Upload the registration name change certificate'
                )}
                {...register(
                  'proofOfRegistrationNameChange'
                  // nameChangeFileData?.length === 0 && {
                  //   required: 'Please upload the name change certificate.',
                  // }
                )}
              />
            )}
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
              Qualification Details
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
              qualification={qualification}
              watch={watch}
              register={register}
              unregister={unregister}
              qualificationFilesData={qualificationFilesData}
              qualificationFilesNameChangeData={qualificationFilesNameChangeData}
              handleQualificationFilesData={handleQualificationFilesData}
              handleQualificationNmeChangeFilesData={handleQualificationNmeChangeFilesData}
              fileName={
                qualification_detail_response_tos?.[index]?.file_name +
                '.' +
                qualification_detail_response_tos?.[index]?.file_type
              }
              isVerified={qualification_detail_response_tos?.[index]?.is_verified}
              clearErrors={clearErrors}
            />
          );
        })}
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
          <Grid item xs={12} md="auto" display="flex" justifyContent="end" ml={{ xs: 0, md: 2 }}>
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
                },
              }}
            >
              {t('Save')}
            </Button>
          </Grid>
          <Grid item xs={12} md="auto" display="flex" ml={{ xs: 0, md: 2 }}>
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
