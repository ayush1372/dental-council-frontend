import { useEffect, useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { natureOfWork, workStatusOptions } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import {
  getCitiesList,
  getDistrictList,
  getStatesList,
  getSubDistrictsList,
} from '../../../../store/actions/common-actions';
import {
  getFacilitiesData,
  updateDoctorWorkDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { Button, Checkbox, RadioGroup, Select, TextField } from '../../../../ui/core';
import { SvgImageComponent } from '../../../../ui/core/svg-icons/index';
import successToast from '../../../../ui/core/toaster';
import { getFacilityDistrictList } from './district-api';
import WorkDetailsTable from './work-details-table';

const WorkDetails = ({
  getValues,
  register,
  setValue,
  errors,
  handleSubmit,
  watch,
  currentWorkingSelection,
}) => {
  const dispatch = useDispatch();

  const { loginData } = useSelector((state) => state.loginReducer);
  const { registrationDetails } = useSelector((state) => state.doctorUserProfileReducer);

  const [tabValue, setTabValue] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [workExpierence, setWorkExpierence] = useState(0);
  const [languageError, setLanguageError] = useState(false);
  const [facilityDistrict, setFacilityDistrict] = useState([]);
  const [facilityChecked, setFacilityChecked] = useState(true);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [facilityResponseData, setFacilityResponseData] = useState([]);
  const [workExperianceError, setWorkExperianceError] = useState(false);
  const [organizationChecked, setOrganizationChecked] = useState(false);
  const [declaredFacilityData, setDeclaredFacilityDistrict] = useState([]);

  const onSubmit = () => {
    const currentWorkDetails = {
      work_details: {
        is_user_currently_working: currentWorkingSelection === 'yes' ? 0 : 1,
        work_nature: getWorkNature(getValues().NatureOfWork),
      },
      current_work_details: [
        {
          facility_id: '',
          facility_type_id: '',
          organization_type: getValues().organizationType,
          work_organization: getValues().workingOrganizationName,
          url: getValues().telecommunicationURL,
          address: {
            id: null,
            country: getCountryData(getValues().Country),
            state: getStateData(getValues().state),
            district: getDistrictData(getValues().District),
            village: getVillageData(getValues().Area),
            sub_district: getSubDistrictData(getValues().SubDistrict),
            pincode: getValues().pincode,
            address_line1: getValues().Address,
            street: getValues().Street,
            landmark: getValues().Landmark,
            locality: getValues().Locality,
          },
          registration_no: registrationDetails?.registration_detail_to?.registration_number,
          experience_in_years: workExpierence,
        },
      ],
      hp_profile_id: loginData?.data?.profile_id,
      languages_known_ids: getLanguageData(getValues().LanguageSpoken),
    };
    if (declaredFacilityData?.length > 0) {
      let facilityDetailsDeclared = {
        facility_id: declaredFacilityData[0]?.id,
        organization_type: getValues().organizationType,
        work_organization: declaredFacilityData[0]?.name,
        url: getValues().telecommunicationURL,
        address: {
          pincode: declaredFacilityData[0]?.address?.pincode,
          country: {
            id: 386,
            name: 'india',
          },
          state: getStateData(declaredFacilityData[0]?.address?.state, true),
          district: getFacilityDistrict(declaredFacilityData[0]?.address?.district),
          village: {
            iso_code: declaredFacilityData[0]?.villageCityTownLGDCode,
            name: declaredFacilityData[0]?.villageCityTownName,
          },
          sub_district: {
            iso_code: declaredFacilityData[0]?.subDistrictLGDCode,
            name: declaredFacilityData[0]?.subDistrictName,
          },
          address_line1: declaredFacilityData[0]?.address?.addressLine1,
          street: getValues().Street,
          landmark: getValues().Landmark,
        },
        registration_no: registrationDetails?.registration_detail_to?.registration_number,
        experience_in_years: workExpierence,
        system_of_medicine: declaredFacilityData[0]?.systemOfMedicine,
        department: declaredFacilityData[0]?.department || 'department',
        designation: declaredFacilityData[0]?.designation || 'desgination',
      };
      currentWorkDetails?.current_work_details.push(facilityDetailsDeclared);
    }
    if (!organizationChecked) {
      currentWorkDetails?.current_work_details.splice(0, 1);
    }
    if (facilityChecked) {
      if (declaredFacilityData?.length > 0) {
        updateWorkStatus(currentWorkDetails);
      }
      if (organizationChecked) {
        updateWorkStatus(currentWorkDetails);
      }
    } else {
      updateWorkStatus(currentWorkDetails);
    }
  };

  const updateWorkStatus = (currentWorkDetails) => {
    dispatch(updateDoctorWorkDetails(currentWorkDetails, loginData?.data?.profile_id)).then(() => {
      setSuccessModalPopup(true);
    });
  };

  const { languagesList, statesList, countriesList, districtsList, subDistrictList, citiesList } =
    useSelector((state) => state?.common);

  const handleWorkStatus = (event) => {
    setValue(event.target.name, event.target.value);
  };

  const handleLanguageSpokenChange = (key, value) => {
    setValue(key, value);
    setLanguages(value);
  };

  const handleTabChange = (_, value) => {
    setFacilityResponseData([]);
    setDeclaredFacilityDistrict([]);
    setShowTable(false);
    setTabValue(value);
  };

  const getStateISOCode = (State) => {
    let stateData = [];

    statesList?.map((elementData) => {
      if (elementData.id === State) {
        stateData.push(elementData);
      }
    });

    return stateData[0]?.iso_code;
  };
  const getDistrictISOCode = (District) => {
    let DistrictData = [];
    facilityDistrict?.map((elementData) => {
      if (elementData.id === District) {
        DistrictData.push(elementData);
      }
    });
    return DistrictData[0]?.iso_code;
  };

  const searchFacilitiesHandler = () => {
    const values = getValues();

    let ownerCode =
      values?.workStatus === '3'
        ? 'G'
        : values?.workStatus === '2'
        ? 'P'
        : values?.workStatus === '1'
        ? 'PP'
        : '';
    const searchFacilities = {
      page: 0,
      ownership: ownerCode,
      resultsPerPage: 10,
      id: values.facilityId || null,
      facilityName: values.facilityName || null,
      state: getStateISOCode(values.stateLGDCode) || '',
      district: getDistrictISOCode(values.districtLGDCode) || '',
    };
    dispatch(getFacilitiesData(searchFacilities))
      .then((response) => {
        if (response?.data) {
          setFacilityResponseData(response?.data?.facilities);
        }
      })
      .catch(() => {
        successToast('ERR_INT:' + 'Invalid facility details', 'auth-error', 'error', 'top-center');
      });
    setShowTable(true);
  };

  const getFacilityDistrict = (District) => {
    let DistrictData = [];
    facilityDistrict?.map((elementData) => {
      if (elementData.iso_code === District) {
        DistrictData.push(elementData);
      }
    });
    return DistrictData[0];
  };
  // watches
  const watchCountry = watch('Country');
  const watchState = watch('state');
  const watchDistrict = watch('District');
  const watchSubDistrict = watch('SubDistrict');
  const watchFacilityStateCode = watch('stateLGDCode');

  const fetchState = (countryID) => {
    if (countryID) dispatch(getStatesList(countryID));
  };

  const fetchDistricts = (stateId, facility) => {
    if (stateId && facility) {
      dispatch(getFacilityDistrictList(stateId)).then((response) => {
        return setFacilityDistrict(response?.data);
      });
    } else {
      if (stateId) dispatch(getDistrictList(stateId));
    }
  };

  const fetchSubDistricts = (districtId) => {
    if (districtId) dispatch(getSubDistrictsList(districtId));
  };

  const fetchCities = (subDistrictId) => {
    if (subDistrictId) dispatch(getCitiesList(subDistrictId));
  };

  useEffect(() => {
    dispatch(getStatesList(356));
  }, []);

  useEffect(() => {
    fetchState(watchCountry);
  }, [watchCountry]);

  useEffect(() => {
    fetchDistricts(watchState, false);
  }, [watchState]);

  useEffect(() => {
    fetchDistricts(watchFacilityStateCode, true);
  }, [watchFacilityStateCode]);

  useEffect(() => {
    fetchSubDistricts(watchDistrict);
  }, [watchDistrict]);

  useEffect(() => {
    fetchCities(watchSubDistrict);
  }, [watchSubDistrict]);

  const getCountryData = (country) => {
    let CountryData = [];
    countriesList?.map((elementData) => {
      if (elementData.id === country) {
        CountryData.push(elementData);
      }
    });
    return CountryData[0];
  };

  const getStateData = (State, facility) => {
    let stateData = [];
    Array.isArray(statesList) &&
      statesList?.map((elementData) => {
        if (facility) {
          if (elementData.iso_code === State) {
            stateData.push(elementData);
          }
        } else {
          if (elementData.id === State) {
            stateData.push(elementData);
          }
        }
      });
    return stateData[0];
  };

  const getDistrictData = (District) => {
    let DistrictData = [];
    Array.isArray(districtsList) &&
      districtsList?.map((elementData) => {
        if (elementData.iso_code === District) {
          DistrictData.push(elementData);
        }
      });
    return DistrictData[0];
  };

  const getSubDistrictData = (subDistrict) => {
    let subDistrictData = [];
    Array.isArray(subDistrictList) &&
      subDistrictList?.map((elementData) => {
        if (elementData.iso_code === subDistrict) {
          subDistrictData.push(elementData);
        }
      });
    return subDistrictData[0];
  };

  const getVillageData = (village) => {
    let villageData = [];
    Array.isArray(citiesList) &&
      citiesList?.map((elementData) => {
        if (elementData.id === village) {
          villageData.push(elementData);
        }
      });
    return villageData[0];
  };
  const getWorkNature = (nature) => {
    let workNatureData = [];
    Array.isArray(natureOfWork) &&
      natureOfWork?.map((elementData) => {
        if (elementData.id === nature) {
          workNatureData.push(elementData);
        }
      });
    return workNatureData[0];
  };

  const getLanguageData = (language) => {
    let languageData = [];
    Array.isArray(languagesList?.data) &&
      languagesList?.data?.map((elementData) => {
        Array.isArray(language) &&
          language?.map((langdata) => {
            if (elementData.id === langdata.id) {
              languageData.push(elementData.id);
            }
          });
      });
    return languageData;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 1) {
      workExpierence === 0 ? setWorkExperianceError(true) : setWorkExperianceError(false);
      getValues()?.LanguageSpoken?.length === 0 ? setLanguageError(true) : setLanguageError(false);
    }
  }, [errors.NatureOfWork?.message, errors.workStatus?.message, errors?.LanguageSpoken?.message]);

  return (
    <>
      <Grid item xs={12} md={4}>
        <Select
          fullWidth
          name={'NatureOfWork'}
          label="Nature of work"
          defaultValue={getValues().NatureOfWork}
          required={true}
          placeholder={'Nature Of Work'}
          {...register('NatureOfWork', {
            required: 'Nature of work is required',
          })}
          error={errors.NatureOfWork?.message}
          options={createSelectFieldData(natureOfWork)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
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
          {...register('workStatus', {
            required: `work status is required`,
          })}
        />
      </Grid>{' '}
      <Grid item xs={12} md={4}>
        <Typography variant="body1" color="inputTextColor.main">
          Work Experience
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            svg: {
              cursor: 'pointer',
            },
          }}
        >
          <RemoveCircleOutlineRoundedIcon
            color="primary"
            onClick={() => {
              setWorkExperianceError(true);
              setWorkExpierence((exp) => (exp ? exp - 1 : 0));
            }}
          />
          <Box
            sx={{
              height: '40px',
              width: '40px',
              margin: '0 5px',
              border: '2px solid',
              borderColor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>{workExpierence}</Box>
          </Box>
          <AddCircleOutlineRoundedIcon
            color="primary"
            onClick={() => {
              setWorkExperianceError(false);
              setWorkExpierence(workExpierence + 1);
            }}
          />
        </Box>
        {workExperianceError && (
          <Typography
            color="suspendAlert.dark"
            component="div"
            display="inline-flex"
            variant="body2"
          >
            Please add the work experiance.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="body1" color="inputTextColor.main">
          Language Spoken
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <AutoComplete
          name={'LanguageSpoken'}
          options={languagesList?.data || []}
          value={languages}
          multiple={true}
          {...register('LanguageSpoken')}
          onChange={(value) => {
            setLanguageError(false);
            handleLanguageSpokenChange('LanguageSpoken', value);
          }}
        />
        {languageError && (
          <Typography
            style={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="error"
          >
            <SvgImageComponent color={'error'} icon={'error'} />
            {`Language spoken is required`}
          </Typography>
        )}

        <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
          <InfoOutlinedIcon sx={{ fontSize: '20px', padding: '2px' }} />
          Multiple languages can be selected
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          bgcolor="grey1.light"
          p={1}
          component="div"
          color="tabHighlightedBackgroundColor.main"
          variant="h3"
        >
          Are you currently in Facility/Organization
        </Typography>
      </Grid>
      <Grid item xs={12} ml={2} display="flex">
        <Box>
          <Checkbox
            sx={{ padding: '0 8px 0 0' }}
            value={facilityChecked}
            defaultChecked={true}
            onChange={(e) => {
              setFacilityChecked(e.target.checked);
            }}
            label="Facility"
          />
        </Box>
        <Box ml={2}>
          <Checkbox
            sx={{ padding: '0 8px 0 0' }}
            value={organizationChecked}
            onChange={(e) => {
              setOrganizationChecked(e.target.checked);
            }}
            label="Organization"
          />
        </Box>
      </Grid>
      {facilityChecked && (
        <Grid container item spacing={2}>
          <Grid item md={8}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                '.MuiButtonBase-root': {
                  alignItems: 'flex-start',
                  color: 'tabDefaultTextColor.main',
                  textTransform: 'capitalize',
                  borderBottom: '4px solid',
                  borderBottomColor: 'grey.main',
                  '&.Mui-selected': {
                    borderBottom: '4px solid',
                    borderBottomColor: 'primary.main',
                  },
                },
              }}
            >
              <Tab label="Facility Id" />
              <Tab label="Facility Name" />
              <Tab label="On The Map" />
            </Tabs>
          </Grid>
          {tabValue === 0 && (
            <Grid container spacing={2} mt={2} ml={1}>
              <Grid
                item
                md={8}
                display="flex"
                alignItems={errors?.facilityId?.message ? 'center' : 'end'}
              >
                <Box>
                  <TextField
                    fullWidth
                    error={errors?.facilityId?.message}
                    name={'facilityId'}
                    label="Enter Facility Id(If Known)"
                    required={true}
                    placeholder="Facility Id"
                    defaultValue={getValues()?.facilityId}
                    {...register(`facilityId`, {
                      required: 'Facility Id is required',
                    })}
                  />
                </Box>
                <Box ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      getValues()?.facilityId?.length > 0 && searchFacilitiesHandler();
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Grid>
              {showTable && (
                <Grid item xs={12} padding="10px 0 !important">
                  <WorkDetailsTable
                    FacilityData={facilityResponseData}
                    register={register}
                    setFacilityResponseData={setFacilityResponseData}
                    setDeclaredFacilityDistrict={setDeclaredFacilityDistrict}
                    declaredFacilityData={declaredFacilityData}
                  />
                </Grid>
              )}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2} mt={2} ml={1}>
              <Grid item xs={12} md={3} lg={3}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  State
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>

                <Select
                  fullWidth
                  error={getValues().stateLGDCode?.length === 0 && 'State is required'}
                  name={'stateLGDCode'}
                  defaultValue={getValues().stateLGDCode}
                  required={true}
                  {...register('stateLGDCode', {
                    required: 'State is required',
                  })}
                  options={createSelectFieldData(statesList)}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  District
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Select
                  fullWidth
                  error={getValues().districtLGDCode?.length === 0 && 'District is required'}
                  name={'districtLGDCode'}
                  defaultValue={getValues().districtLGDCode}
                  required={true}
                  {...register('districtLGDCode', {
                    required: 'District is required',
                  })}
                  options={createSelectFieldData(facilityDistrict)}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  Facility Name
                </Typography>
                <TextField
                  fullWidth
                  name={'facilityName'}
                  defaultValue={getValues().facilityName}
                  {...register('facilityName')}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3} mt={3}>
                <Box ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      typeof getValues()?.stateLGDCode === 'number' &&
                        typeof getValues()?.districtLGDCode === 'number' &&
                        searchFacilitiesHandler();
                    }}
                    disabled={
                      getValues()?.stateLGDCode?.length > 0 &&
                      getValues()?.districtLGDCode?.length > 0
                    }
                  >
                    Search
                  </Button>
                </Box>
              </Grid>
              {showTable && (
                <Grid item xs={12} padding="10px 0 !important">
                  <WorkDetailsTable
                    FacilityData={facilityResponseData}
                    register={register}
                    facilityDistrict={facilityDistrict}
                    setFacilityResponseData={setFacilityResponseData}
                    setDeclaredFacilityDistrict={setDeclaredFacilityDistrict}
                    declaredFacilityData={declaredFacilityData}
                  />
                </Grid>
              )}
            </Grid>
          )}
          {tabValue === 2 && <Typography>on the map</Typography>}
        </Grid>
      )}
      {organizationChecked && (
        <>
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
                placeholder="Enter name of the organization"
                fullWidth
                defaultValue={getValues().workingOrganizationName}
                {...register('workingOrganizationName', {
                  required: 'Name of the organization is required',
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
                placeholder=" Enter Organization Type"
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
                  required: 'Address is required',
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
                placeholder="Enter Street"
                defaultValue={getValues().Street}
                {...register('Street', {
                  required: 'Street is required',
                  maxLength: {
                    value: 300,
                    message: 'Should be less than 300 characters',
                  },
                })}
                error={errors.Street?.message}
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
                placeholder="Enter Landmark"
                defaultValue={getValues().Landmark}
                {...register('Landmark', {
                  required: 'Landmark is required',
                  maxLength: {
                    value: 300,
                    message: 'Should be less than 300 characters',
                  },
                })}
                error={errors.Landmark?.message}
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
                placeholder="Enter Locality"
                defaultValue={getValues().Locality}
                {...register('Locality', {
                  required: 'Locality is required',
                  maxLength: {
                    value: 300,
                    message: 'Should be less than 300 characters',
                  },
                })}
                error={errors.Locality?.message}
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
                  countriesList?.length > 0 ? createSelectFieldData(countriesList, 'id') : []
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
                required={statesList?.length > 0 ? true : false}
                {...register('state', {
                  required: statesList?.length > 0 ? 'State is required' : '',
                })}
                options={createSelectFieldData(statesList)}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
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
                required={districtsList?.length > 0 && statesList?.length > 0 ? true : false}
                {...register('District', {
                  required:
                    districtsList?.length > 0 && statesList?.length > 0
                      ? 'District is required'
                      : '',
                })}
                options={createSelectFieldData(districtsList, 'iso_code')}
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
                required={
                  subDistrictList?.length > 0 && districtsList?.length > 0 && statesList?.length > 0
                    ? true
                    : false
                }
                defaultValue={getValues().SubDistrict}
                {...register('SubDistrict', {
                  required:
                    subDistrictList?.length > 0 &&
                    districtsList?.length > 0 &&
                    statesList?.length > 0
                      ? 'Sub District is required'
                      : '',
                })}
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
                required={
                  subDistrictList?.length > 0 && districtsList?.length > 0 && statesList?.length > 0
                    ? true
                    : false
                }
                {...register('Area', {
                  required:
                    subDistrictList?.length > 0 &&
                    districtsList?.length > 0 &&
                    statesList?.length > 0
                      ? 'City/Town/Village is required'
                      : '',
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
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Pin Code
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>

              <TextField
                variant="outlined"
                name={'pincode'}
                required={true}
                placeholder="Enter Pin Code"
                fullWidth
                error={errors.pincode?.message}
                defaultValue={getValues().pincode}
                {...register('pincode', {
                  required: 'Pincode is required',
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
                Teleconsultation URL
              </Typography>

              <TextField
                variant="outlined"
                name={'teleconsultationURL'}
                placeholder="Enter teleconsultation URL"
                fullWidth
                error={errors.telecommunicationURL?.message}
                defaultValue={getValues().telecommunicationURL}
                {...register('teleconsultationURL')}
              />
            </Grid>
          </Grid>
        </>
      )}
      {(organizationChecked || facilityChecked) && (
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={5}
          ml={2}
        >
          <Grid item xs={12} md={8} lg={6} mb={1}>
            <Button
              onClick={handleSubmit(onSubmit)}
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
                  height: '52px',
                },
              }}
            >
              Submit
            </Button>
            <Button
              color="grey"
              variant="contained"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0 0 0 5px',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
            >
              Cancel
            </Button>
          </Grid>
          {successModalPopup && (
            <SuccessModalPopup
              open={successModalPopup}
              workDetails={true}
              setOpen={() => setSuccessModalPopup(false)}
              text={'Your Work-Details has been submitted successfully.'}
            />
          )}
        </Grid>
      )}
    </>
  );
};

export default WorkDetails;
