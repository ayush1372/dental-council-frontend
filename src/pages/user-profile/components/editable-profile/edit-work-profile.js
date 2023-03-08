import { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
// import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { natureOfWork, workStatusOptions } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
//  import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
import {
  getCitiesList,
  getDistrictList,
  getSubDistrictsList,
} from '../../../../store/actions/common-actions';
import { updateDoctorWorkDetails } from '../../../../store/actions/doctor-user-profile-actions';
import { getDistricts } from '../../../../store/reducers/common-reducers';
import { getWorkProfileDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Button, RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
import successToast from '../../../../ui/core/toaster';

const EditWorkProfile = ({ handleNext, handleBack, showSuccessModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [workProof, setWorkProof] = useState([]);
  const [subSpecialities, setSubSpecialities] = useState([]);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const {
    statesList,
    specialitiesList,
    countriesList,
    districtsList,
    subDistrictList,
    citiesList,
  } = useSelector((state) => state?.common);
  const { workProfileDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const { work_details, speciality_details, current_work_details } = workProfileDetails || {};
  const { is_user_currently_working, work_nature, work_status } = work_details || {};
  const { broad_speciality, super_speciality: subSpecialityOptions } = speciality_details || {};
  const { address, url, work_organization, facility_id } = current_work_details?.[0] || {};
  const {
    state: stateDetails,
    country,
    district: districtDetails,
    sub_district: subDistrictDetails,
    pincode,
    address_line1,
    village,
  } = address || {};
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      subSpeciality: [],
      currentWorkingSelection: is_user_currently_working,
      NatureOfWork: work_nature?.id,
      Speciality: broad_speciality?.id,
      workStatus: work_status?.id,
      state: stateDetails?.id,
      Country: country?.id,
      Area: village?.id,
      District: districtDetails?.id,
      SubDistrict: subDistrictDetails?.id,
      workingOrganizationName: work_organization,
      Address: address_line1,
      Pincode: pincode,
      telecommunicationURL: url,
      selection: facility_id,
    },
  });

  useEffect(() => {
    dispatch(getDistricts([]));
    if (subSpecialityOptions) {
      setSubSpecialities([...subSpecialityOptions]);
      setValue('subSpeciality', [...subSpecialityOptions]);
    }
  }, []);

  const fetchDisricts = (stateId) => {
    if (stateId) dispatch(getDistrictList(stateId));
  };

  const fetchSubDistricts = (districtId) => {
    if (districtId) {
      dispatch(getSubDistrictsList(districtId))
        .then(() => {})
        .catch((allFailMsg) => {
          successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
        });
    }
  };

  const fetchCities = (subDistrictId) => {
    try {
      dispatch(getCitiesList(subDistrictId)).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };

  const changedState = watch('state');
  const selectedDistrict = watch('District');
  const selectedSubDistrict = watch('SubDistrict');

  useEffect(() => {
    fetchDisricts(changedState);
  }, [changedState]);

  useEffect(() => {
    fetchSubDistricts(selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    fetchCities(selectedSubDistrict);
  }, [selectedSubDistrict]);

  const handleBackButton = () => {
    handleBack();
  };

  // const onHandleOptionNext = () => {
  //   handleSave();
  // };
  const handleselection = (event) => {
    setValue(event.target.name, event.target.value, true);
  };

  const handleWorkStatus = (event) => {
    setValue(event.target.name, event.target.value);
  };

  const handleSave = () => {
    const {
      currentWorkingSelection,
      NatureOfWork,
      Speciality,
      workStatus,
      state,
      District,
      workingOrganizationName,
      Address,
      Pincode,
      telecommunicationURL,
      selection,
    } = getValues();

    const workDetails = {
      ...(work_details || {}),
      is_user_currently_working: currentWorkingSelection,
      work_nature: natureOfWork.find((x) => x.id === NatureOfWork),
      work_status: workStatusOptions.find((x) => x.id === parseInt(workStatus)),
    };

    const specialityDetails = {
      ...(speciality_details || {}),
      broad_speciality: specialitiesList.data?.find((x) => x.id === Speciality),
      super_speciality: [...subSpecialities],
    };
    const currentWorkDetails = {
      ...(current_work_details[0] || {}),
      url: telecommunicationURL,
      work_organization: workingOrganizationName,
      address: {
        state: statesList?.find((x) => x.id === state),
        district: districtsList?.find((x) => x.id === District),
        pincode: Pincode,
        address_line1: Address,
        facility: selection,
      },
    };

    const stateObj = {
      work_details: { ...workDetails },
      speciality_details: { ...specialityDetails },
      current_work_details: [{ ...currentWorkDetails }],
    };

    const updatedDoctorProfile = { ...workProfileDetails, ...stateObj };

    dispatch(getWorkProfileDetails(JSON.parse(JSON.stringify(updatedDoctorProfile))));
    fetchUpdateDoctorWorkDetails(workProfileDetails);
  };

  const fetchUpdateDoctorWorkDetails = (workDetails) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(workDetails));
    formData.append('proof', workProof?.[0].file);

    dispatch(updateDoctorWorkDetails(formData, loginData.data.profile_id))
      .then(() => {
        setSuccessModalPopup(true);
        handleNext();
      })
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  // const onHandleOption = () => {
  //   onHandleOptionNext();
  //   fetchUpdateDoctorWorkDetails(workProfileDetails);
  // };

  return (
    <Box>
      {/* <Typography variant="h2" color="textPrimary.main">
        Work Details
      </Typography> */}
      <Grid container mt={2}>
        {/* layer 1 */}
        {/* <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Speciality Details*
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              error={errors.Speciality?.message}
              name="Speciality"
              label="Broad Speciality"
              defaultValue={getValues().Speciality}
              required={true}
              {...register('Speciality', {
                required: 'This field is required',
              })}
              options={createSelectFieldData(specialitiesList.data)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Super Specialty
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <AutoComplete
              name="subSpeciality"
              options={subSpecialityOptions || []}
              value={getValues().subSpeciality}
              error={subSpecialities?.length === 0 && errors.subSpeciality?.message}
              multiple={true}
              {...register('subSpeciality', {
                required: 'This field is required',
              })}
              onChange={(value) => {
                setValue('subSpeciality', value);
                setSubSpecialities(value);
              }}
            />
          </Grid>
        </Grid> */}
        {/* layer 2 */}
        <Grid container>
          {/* <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Work Details*
            </Typography>
          </Grid> */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Are you currently working
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <RadioGroup
              onChange={handleselection}
              name={'currentWorkingSelection'}
              size="small"
              defaultValue={getValues().currentWorkingSelection}
              items={[
                {
                  value: 1,
                  label: 'Yes',
                },
                {
                  value: 0,
                  label: 'No',
                },
              ]}
              required={true}
              error={errors.currentWorkingSelection?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              error={errors.NatureOfWork?.message}
              name="NatureOfWork"
              label="Nature of work"
              defaultValue={getValues().NatureOfWork}
              required={true}
              placeholder={'Nature Of Work'}
              {...register('NatureOfWork', {
                required: 'This field is required',
              })}
              options={createSelectFieldData(natureOfWork)}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={12}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Choose work status
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <RadioGroup
              onChange={handleWorkStatus}
              name={'workStatus'}
              size="small"
              defaultValue={getValues().workStatus}
              items={createSelectFieldData(workStatusOptions)}
              required={true}
              error={errors.workStatus?.message}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Upload the proof of work for govt.such as Appointment letter, Last pay slip, Recent
              transfer order etc.
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
              fileData={workProof}
              setFileData={setWorkProof}
            />
          </Grid>
        </Grid>
        {/* layer 3 */}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Current Work Details*
            </Typography>
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <RadioGroup
              onChange={handleselection}
              name={'selection'}
              size="small"
              defaultValue={getValues().selection}
              items={[
                {
                  value: 0,
                  label: 'Facility',
                },
                {
                  value: 1,
                  label: 'Organization',
                },
              ]}
              required={true}
              error={errors.selection?.message}
            />
          </Grid> */}
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={5} lg={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Name of the organization where you work
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'workingOrganizationName'}
              placeholder="Name Of The Organization"
              fullWidth
              defaultValue={getValues().workingOrganizationName}
              {...register('workingOrganizationName', {
                required: 'This field is required',
                maxLength: {
                  value: 300,
                  message: 'Length should be less than 300.',
                },
              })}
              error={errors.workingOrganizationName?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Organization Type
            </Typography>
            <TextField
              variant="outlined"
              name={'organizationType'}
              placeholder="Organization Type"
              fullWidth
              defaultValue={getValues().organizationType}
              {...register('organizationType', {
                maxLength: {
                  value: 100,
                  message: 'organizationType Is Reuired.',
                },
              })}
              error={errors.organizationType?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Address
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Address'}
              required={true}
              fullWidth
              placeholder="Address"
              defaultValue={getValues().Address}
              {...register('Address', {
                required: 'This field is required',
                maxLength: {
                  value: 300,
                  message: 'Should be less than 300 characters',
                },
              })}
              error={errors.Address?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Street
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Street'}
              required={true}
              fullWidth
              placeholder="Street"
              defaultValue={getValues().Address}
              {...register('Street', {
                required: 'This field is required',
                maxLength: {
                  value: 300,
                  message: 'Should be less than 300 characters',
                },
              })}
              error={errors.Address?.message}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Landmark
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Landmark'}
              required={true}
              fullWidth
              placeholder="Landmark"
              defaultValue={getValues().Address}
              {...register('Landmark', {
                required: 'This field is required',
                maxLength: {
                  value: 300,
                  message: 'Should be less than 300 characters',
                },
              })}
              error={errors.Address?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Locality
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Locality'}
              required={true}
              fullWidth
              placeholder="Locality"
              defaultValue={getValues().Address}
              {...register('Locality', {
                required: 'This field is required',
                maxLength: {
                  value: 300,
                  message: 'Should be less than 300 characters',
                },
              })}
              error={errors.Address?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              error={errors.Country?.message}
              name="Country"
              label="Country"
              defaultValue={getValues().Country}
              required={true}
              {...register('Country', {
                required: 'Country is required',
              })}
              options={
                countriesList?.length > 0
                  ? createSelectFieldData(
                      countriesList?.filter(function (item) {
                        return item.name === 'India';
                      })
                    )
                  : []
              }
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              State
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Select
              fullWidth
              error={errors.state?.message}
              name={'state'}
              defaultValue={getValues().state}
              required={true}
              {...register('state', {
                required: 'This field is required',
              })}
              options={createSelectFieldData(statesList)}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              District
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Select
              fullWidth
              error={errors.District?.message}
              name={'District'}
              defaultValue={getValues().District}
              required={true}
              {...register('District', {
                required: 'This field is required',
              })}
              options={createSelectFieldData(districtsList)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Sub District
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <Select
              fullWidth
              error={errors.SubDistrict?.message}
              name="SubDistrict"
              placeholder="Sub District"
              defaultValue={getValues().SubDistrict}
              {...register('SubDistrict')}
              options={createSelectFieldData(subDistrictList, 'iso_code')}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              City/Town/Village
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Select
              fullWidth
              error={errors.Area?.message}
              name="Area"
              defaultValue={getValues().Area}
              required={true}
              {...register('Area', {
                required: 'City/Town/Village is required',
              })}
              options={createSelectFieldData(citiesList)}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Pincode
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'Pincode'}
              required={true}
              placeholder="Pincode"
              fullWidth
              error={errors.Pincode?.message}
              defaultValue={getValues().Pincode}
              {...register('Pincode', {
                required: 'This field is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Should only contains 6 digits',
                },
              })}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Telecommunication URL
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'telecommunicationURL'}
              required={true}
              placeholder="Telecommunication URL"
              fullWidth
              error={errors.telecommunicationURL?.message}
              defaultValue={getValues().telecommunicationURL}
              {...register('telecommunicationURL', {
                required: 'This field is required',
              })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="space-between" alignItems="center" mt={5}>
        <Grid item xs={12} md={8} lg={6}>
          {/* // onClick={handleSubmit(onHandleOption)} */}
          <Button
            onClick={handleSubmit(handleSave)}
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
            {t('Submit')}
          </Button>
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
            {t('Cancel')}
          </Button>
        </Grid>

        {/* <Grid item xs={12} md="auto" display="flex" justifyContent="end" lg={2}>
          <Button
            onClick={handleSubmit(onHandleOption)}
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
        </Grid> */}
      </Grid>

      {showSuccessModal && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'Your Work Details has been successfully changed'}
        />
      )}
    </Box>
  );
};

export default EditWorkProfile;
