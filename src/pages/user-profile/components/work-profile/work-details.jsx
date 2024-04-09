import { useEffect, useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { natureOfWork, workStatusOptions } from '../../../../constants/common-data';
import { ErrorMessages } from '../../../../constants/error-messages';
import { doctorTabs } from '../../../../helpers/components/sidebar-drawer-list-item';
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
import { changeUserActiveTab } from '../../../../store/reducers/common-reducers';
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
  clearErrors,
  setCurrentlyWorking,
  currentWorkingSelection,
  setDefaultFacilityData,
}) => {
  const dispatch = useDispatch();

  const { loginData } = useSelector((state) => state.loginReducer);
  const { registrationDetails } = useSelector((state) => state.doctorUserProfileReducer);
  const { work_details, languages_known_ids } = useSelector(
    (state) => state?.doctorUserProfileReducer?.workProfileDetails
  );
  const { languagesList, statesList, countriesList, districtsList, subDistrictList, citiesList } =
    useSelector((state) => state?.common);

  const getDefaultLanguageData = (language) => {
    let languageData = [];
    Array.isArray(language) &&
      language?.map((elementID) => {
        languagesList?.data?.map((element) => {
          if (element?.id === elementID) {
            languageData.push(element);
          }
        });
      });
    return languageData;
  };

  const [tabValue, setTabValue] = useState(0);
  const [languages, setLanguages] = useState(getDefaultLanguageData(languages_known_ids));
  const [showTable, setShowTable] = useState(false);
  const [workExpierence, setWorkExpierence] = useState(
    work_details?.experience_in_years ? Number(work_details?.experience_in_years) : 0
  );
  const [languageError, setLanguageError] = useState(false);
  const [facilityDistrict, setFacilityDistrict] = useState([]);
  const [facilityChecked, setFacilityChecked] = useState(true);
  const [currentWorkPlace, setCurrentWorkPlace] = useState('facility');
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [facilityResponseData, setFacilityResponseData] = useState([]);
  const [workExperianceError, setWorkExperianceError] = useState(false);
  const [organizationChecked, setOrganizationChecked] = useState(false);
  const [declaredFacilityData, setDeclaredFacilityDistrict] = useState([]);
  const [facilityIDError, setFacilityIDError] = useState(false);
  const [facilityStateError, setFacilityStateError] = useState(false);
  const [facilityNameError, setFacilityNameError] = useState(false);
  const [facilityTableError, setFacilityTableError] = useState(false);
  const [facilityDistrictError, setFacilityDistrictError] = useState(false);
  const [facilityDeclarationError, setFacilityDeclarationError] = useState(false);

  const onSubmit = () => {
    if (
      getValues().workStatus !== '0' &&
      declaredFacilityData?.length === 0 &&
      !organizationChecked
    ) {
      setFacilityDeclarationError(true);
      return;
    } else {
      setFacilityDeclarationError(false);
    }
    const currentWorkDetails = {
      work_details: {
        is_user_currently_working: currentWorkingSelection === 'yes' ? 0 : 1,
        work_nature:
          getWorkNature(getValues().NatureOfWork) === undefined
            ? getWorkNature(work_details?.work_nature?.id)
            : getWorkNature(getValues().NatureOfWork),
        work_status: getWorkStatus(getValues().workStatus),
        experience_in_years: workExpierence,
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
            country: getCountryData(356),
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
          ...(organizationChecked && {
            department: getValues().department,
            designation: getValues().designation,
          }),
        },
      ],
      hp_profile_id: loginData?.data?.profile_id,
      languages_known_ids:
        getLanguageData(getValues().LanguageSpoken)?.length === 0
          ? getLanguageData(languages)
          : getLanguageData(getValues().LanguageSpoken),
    };
    if (declaredFacilityData?.length > 0) {
      declaredFacilityData?.map((elementData, index) => {
        fetchDistricts(declaredFacilityData[index]?.state_lgdcode, true);
        let facilityDetailsDeclared = {
          facility_id: elementData?.id,
          organization_type: getValues().organizationType || elementData?.facility_type,
          work_organization: elementData?.name,
          url: getValues().telecommunicationURL,
          address: {
            pincode: elementData?.address?.pincode,
            country: {
              id: 386,
              name: 'india',
            },
            state: {
              id: elementData?.state_id,
              name: elementData?.state_name,
              iso_code: elementData?.state_lgdcode,
            },
            district: {
              id: elementData?.district_id,
              name: elementData?.district_name,
              iso_code: elementData?.district_lgdcode,
            },
            village: {
              iso_code: elementData?.villageCityTownLGDCode,
              name: elementData?.villageCityTownName,
            },
            sub_district: {
              iso_code: elementData?.subDistrictLGDCode,
              name: elementData?.subDistrictName,
            },
            address_line1: elementData?.address?.addressLine1,
            street: getValues().Street,
            landmark: getValues().Landmark,
          },
          registration_no: registrationDetails?.registration_detail_to?.registration_number,
          experience_in_years: workExpierence,
          system_of_medicine: elementData?.system_of_medicine,
          department: elementData?.department,
          designation: elementData?.designation,
        };
        currentWorkDetails?.current_work_details.push(facilityDetailsDeclared);
      });
    }
    if (!organizationChecked) {
      currentWorkDetails?.current_work_details.splice(0, 1);
    }
    console.log('------------------------', currentWorkDetails);
    if (facilityChecked) {
      if (declaredFacilityData?.length > 0 || organizationChecked) {
        updateWorkStatus(currentWorkDetails);
      }
    } else {
      updateWorkStatus(currentWorkDetails);
    }
  };

  //Helper Function to make the facility error as false
  const handleFacilityError = () => {
    setFacilityIDError(false);
    setFacilityStateError(false);
    setFacilityTableError(false);
    setFacilityDistrictError(false);
    setFacilityNameError(false);
  };

  const updateWorkStatus = (currentWorkDetails) => {
    dispatch(updateDoctorWorkDetails(currentWorkDetails, loginData?.data?.profile_id)).then(() => {
      setSuccessModalPopup(true);
    });
  };

  const handleWorkStatus = (event) => {
    setValue(event.target.name, event.target.value);
  };

  const handleWorkPlaceChange = (event) => {
    const workPlace = event.target.value;
    if (workPlace === 'facility') {
      setFacilityChecked(true);
      setOrganizationChecked(false);
    } else {
      setOrganizationChecked(true);
      setFacilityChecked(false);
    }
    setCurrentWorkPlace(workPlace);
  };

  const handleLanguageSpokenChange = (key, value) => {
    setValue(key, value);
    setLanguages(value);
  };

  const handleResetFacilityNameSearch = () => {
    setValue('stateLGDCode', undefined);
    setValue('districtLGDCode', undefined);
    setValue('facilityName', undefined);
    setFacilityStateError(false);
    setFacilityDistrictError(false);
    setFacilityNameError(false);
    setShowTable(false);
    setFacilityDeclarationError(false);
  };

  const handleResetFacilityIdSearch = () => {
    setValue('facilityId', '');
    setFacilityDeclarationError(false);
    setFacilityIDError(false);
    setShowTable(false);
  };

  const handleTabChange = (_, value) => {
    handleResetFacilityIdSearch();
    handleResetFacilityNameSearch();
    handleFacilityError();
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

  const searchFacilitiesHandler = (page) => {
    const values = getValues();
    let facilityResponse;
    let ownerCode =
      values?.workStatus === '0'
        ? 'G'
        : values?.workStatus === '1'
          ? 'P'
          : values?.workStatus === '2'
            ? 'PP'
            : '';

    const searchFacilities = {
      page: page || 0,
      ownershipCode: ownerCode,
      resultsPerPage: 10,
      facilityId: values.facilityId || null,
      facilityName: values.facilityName || null,
      stateLGDCode: getStateISOCode(values.stateLGDCode) || '',
      districtLGDCode: getDistrictISOCode(values.districtLGDCode) || '',
    };
    dispatch(getFacilitiesData(searchFacilities))
      .then((response) => {
        if (response?.data) {
          setFacilityResponseData(response?.data?.facilities);
          facilityResponse = response?.data?.facilities;
        }
      })
      .catch(() => {
        successToast(ErrorMessages.inValidFacilityDetails, 'auth-error', 'error', 'top-center');
      });
    setShowTable(true);
    return facilityResponse;
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

  const getWorkStatus = (statusID) => {
    let workStatusData = [];
    [
      {
        id: 0,
        name: 'Private Practice only',
      },
      {
        id: 1,
        name: 'Government only',
      },
      {
        id: 2,
        name: 'Both',
      },
    ]?.map((elementData) => {
      if (elementData.id === Number(statusID)) {
        workStatusData.push(elementData);
      }
    });
    return workStatusData[0];
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

  const workDetailsErrorHandler = () => {
    if (facilityChecked) {
      if (
        tabValue === 0 &&
        (getValues()?.facilityId === undefined || getValues()?.facilityId === '')
      ) {
        setFacilityIDError(true);
      } else if (tabValue === 1) {
        if (getValues()?.stateLGDCode === undefined || getValues()?.stateLGDCode === '') {
          setFacilityStateError(true);
        }
        // if (getValues()?.districtLGDCode === undefined || getValues()?.districtLGDCode === '') {
        //   setFacilityDistrictError(true);
        // }
        if (getValues()?.facilityName === undefined || getValues()?.facilityName === '') {
          setFacilityNameError(true);
        }
      }
      if (declaredFacilityData?.length === 0) {
        setFacilityTableError(true);
      } else if (declaredFacilityData?.length > 0) {
        onSubmit();
      }
    } else if (!facilityChecked && !organizationChecked) {
      onSubmit();
    }
  };

  useEffect(() => {
    handleFacilityError();
  }, [facilityChecked]);

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
          label="Nature of Work"
          defaultValue={work_details?.work_nature?.id || ''}
          required={true}
          placeholder={'Select nature of work'}
          {...register('NatureOfWork', {
            required: 'Please select the nature of work',
          })}
          error={errors.NatureOfWork?.message}
          options={createSelectFieldData(natureOfWork)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="inputTextColor.main">
          Choose Work Status
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>

        <RadioGroup
          onChange={handleWorkStatus}
          name={'workStatus'}
          size="small"
          defaultValue={work_details?.work_status?.id}
          items={createSelectFieldData(workStatusOptions)}
          required={true}
          error={errors.workStatus?.message}
          {...register('workStatus', {
            required: `Please choose the work status`,
          })}
        />
      </Grid>{' '}
      <Grid item xs={12} md={4}>
        <Typography variant="body1" color="inputTextColor.main">
          Work Experience in Years
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
              setWorkExpierence((exp) =>
                exp ? (exp - 1 === 0 ? (setWorkExperianceError(true), exp - 1) : exp - 1) : 0
              );
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
          <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="body2" color="error">
            <SvgImageComponent color={'error'} icon={'error'} />
            Please add the work experience
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
          placeholder={'Select language'}
          multiple={true}
          {...register('LanguageSpoken')}
          onChange={(value) => {
            setLanguageError(false);
            handleLanguageSpokenChange('LanguageSpoken', value);
          }}
        />
        {languageError && (
          <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="body2" color="error">
            <SvgImageComponent color={'error'} icon={'error'} />
            {`Please select the language spoken`}
          </Typography>
        )}

        <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
          <InfoOutlinedIcon sx={{ fontSize: 'large', padding: '2px' }} />
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
        {/* <Box>
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
        </Box> */}

        <RadioGroup
          size="small"
          value={currentWorkPlace}
          onChange={handleWorkPlaceChange}
          required={true}
          items={[
            {
              value: 'facility',
              label: 'Facility',
            },
            {
              value: 'org',
              label: 'Organization',
            },
          ]}
        />
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
              <Tab label="Facility ID" />
              <Tab label="Facility Name" />
            </Tabs>
          </Grid>
          {tabValue === 0 && (
            <Grid container spacing={2} mt={2} ml={1}>
              <Grid
                item
                md={8}
                display="flex"
                alignItems={facilityIDError || errors?.facilityId?.message ? 'center' : 'end'}
              >
                <Box>
                  <TextField
                    fullWidth
                    error={
                      (facilityIDError || errors?.facilityId?.message) &&
                      'Please enter a valid facility ID'
                    }
                    name={'facilityId'}
                    label="Facility ID"
                    required={true}
                    placeholder="Enter facility ID"
                    defaultValue={getValues()?.facilityId}
                    {...register(`facilityId`, {
                      required: 'Please enter a facility ID',
                      pattern: {
                        value: /^(?!^\s)[a-zA-Z0-9-]*$/,
                        message: 'Please enter the valid facility ID',
                      },
                    })}
                    onChange={(e) => {
                      let pattern = /^(?!^\s)[a-zA-Z0-9-]*$/;
                      if (e.target.value !== '' && pattern.test(e.target.value)) {
                        setFacilityIDError(false);
                        clearErrors('facilityId', '');
                      }
                      if (!pattern.test(e.target.value)) setFacilityIDError(true);
                    }}
                  />
                </Box>
                <Box ml={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ paddingTop: '14px', paddingBottom: '14px' }}
                    onClick={() => {
                      setFacilityDeclarationError(false);
                      getValues()?.facilityId?.length > 0
                        ? searchFacilitiesHandler()
                        : setFacilityIDError(true);
                    }}
                  >
                    Search
                  </Button>
                </Box>
                <Box ml={1}>
                  <Button
                    color="grey"
                    variant="contained"
                    sx={{ paddingTop: '14px', paddingBottom: '14px' }}
                    onClick={handleResetFacilityIdSearch}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
              {facilityTableError && (
                <Grid item xs={12} padding="10px 0 !important" ml={1}>
                  <Typography p={1} component="div" color="error.main" variant="h3">
                    Please declare facility details
                  </Typography>
                </Grid>
              )}
              {showTable && (
                <Grid item xs={12}>
                  <WorkDetailsTable
                    FacilityData={facilityResponseData}
                    register={register}
                    setFacilityResponseData={setFacilityResponseData}
                    setDeclaredFacilityDistrict={setDeclaredFacilityDistrict}
                    declaredFacilityData={declaredFacilityData}
                    setFacilityTableError={setFacilityTableError}
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
                  error={
                    (facilityStateError || errors?.stateLGDCode?.message) && 'Please select state'
                  }
                  name={'stateLGDCode'}
                  required={true}
                  {...register('stateLGDCode', {
                    required: 'Please select state',
                  })}
                  options={createSelectFieldData(statesList)}
                  placeholder={'Select State'}
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      setFacilityStateError(false);
                      clearErrors('stateLGDCode', '');
                      fetchDistricts(e.target.value, true);
                      setValue('stateLGDCode', e.target.value);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  District
                </Typography>
                <Select
                  fullWidth
                  name={'districtLGDCode'}
                  error={
                    (facilityDistrictError || errors?.districtLGDCode?.message) &&
                    'Please select district'
                  }
                  {...register('districtLGDCode')}
                  options={createSelectFieldData(facilityDistrict)}
                  placeholder={'Select District'}
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      clearErrors('districtLGDCode', '');
                      setFacilityDistrictError(false);
                      setValue('districtLGDCode', e.target.value);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  Facility Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>

                <TextField
                  fullWidth
                  name={'facilityName'}
                  defaultValue={getValues().facilityName}
                  error={
                    (facilityNameError || errors.facilityName?.message) &&
                    'Please enter facility Name'
                  }
                  {...register('facilityName', {
                    required: 'Please enter the facility name',
                    pattern: {
                      value: /^[a-zA-Z0-9-' ]*$/,
                      message: 'Please enter the valid facility name',
                    },
                    maxLength: {
                      value: 300,
                      message: 'Length should be less than 300.',
                    },
                  })}
                  placeholder={'Enter Name'}
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      clearErrors('facilityName', '');
                      setFacilityNameError(false);
                      setValue('facilityName', e.target.value);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3} mt={3} display={'flex'}>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ paddingTop: '14px', paddingBottom: '14px' }}
                    onClick={() => {
                      // setFacilityDeclarationError(true);
                      if (
                        getValues()?.stateLGDCode !== undefined &&
                        getValues()?.stateLGDCode !== '' &&
                        // getValues()?.districtLGDCode !== undefined &&
                        // getValues()?.districtLGDCode !== '' &&
                        getValues()?.facilityName !== undefined &&
                        getValues()?.facilityName !== ''
                      ) {
                        searchFacilitiesHandler();
                      } else {
                        if (
                          getValues()?.stateLGDCode === undefined ||
                          getValues()?.stateLGDCode === ''
                        ) {
                          setFacilityStateError(true);
                        }
                        // if (
                        //   getValues()?.districtLGDCode === undefined ||
                        //   getValues()?.districtLGDCode === ''
                        // ) {
                        //   setFacilityDistrictError(true);
                        // }
                        if (
                          getValues()?.facilityName === undefined ||
                          getValues()?.facilityName === ''
                        ) {
                          setFacilityNameError(true);
                        }
                      }
                    }}
                    disabled={
                      getValues()?.stateLGDCode?.length > 0 &&
                      getValues()?.districtLGDCode?.length > 0
                    }
                  >
                    Search
                  </Button>
                </Box>

                <Box ml={1}>
                  <Button
                    color="grey"
                    variant="contained"
                    sx={{ paddingTop: '14px', paddingBottom: '14px' }}
                    onClick={handleResetFacilityNameSearch}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
              {facilityTableError && (
                <Grid item xs={12} padding="10px 0 !important" ml={1}>
                  <Typography p={1} component="div" color="error.main" variant="h3">
                    Please declare complete Facility details.
                  </Typography>
                </Grid>
              )}
              {showTable && (
                <Grid item xs={12} padding="10px 0 !important">
                  <WorkDetailsTable
                    FacilityData={facilityResponseData}
                    register={register}
                    setFacilityResponseData={setFacilityResponseData}
                    setDeclaredFacilityDistrict={setDeclaredFacilityDistrict}
                    declaredFacilityData={declaredFacilityData}
                    setFacilityTableError={setFacilityTableError}
                    searchFacilitiesHandler={searchFacilitiesHandler}
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
                Current Work Details
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2} mt={1}>
            <Grid item xs={12} md={5} lg={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Organisation Name
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>

              <TextField
                variant="outlined"
                name={'workingOrganizationName'}
                placeholder="Enter organisation name"
                fullWidth
                defaultValue={getValues().workingOrganizationName}
                {...register('workingOrganizationName', {
                  required: 'Please enter the organisation name',
                  pattern: {
                    value: /^(?!^\s)[a-zA-Z0-9 -']*$/,
                    message: 'Please enter the valid organisation name',
                  },
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
                Organisation Type
              </Typography>
              <TextField
                variant="outlined"
                name={'organizationType'}
                placeholder=" Enter organisation type"
                fullWidth
                defaultValue={getValues().organizationType}
                {...register('organizationType', {
                  pattern: {
                    value: /^(?!^\s)[a-zA-Z0-9 -']*$/,
                    message: 'Please enter the valid organisation type',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Please enter the organisation type.',
                  },
                })}
                error={errors.organizationType?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Street Name
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'Street'}
                required={true}
                fullWidth
                placeholder="Enter street name"
                defaultValue={getValues().Street}
                {...register('Street', {
                  required: 'Please enter the street name',
                  pattern: {
                    value: /^(?!^\s)[a-zA-Z0-9 -']*$/,
                    message: 'Please enter the valid street name',
                  },
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
                placeholder="Enter address"
                defaultValue={getValues().Address}
                {...register('Address', {
                  required: 'Please enter the address',
                  maxLength: {
                    value: 400,
                    message: 'Should be less than 300 characters',
                  },
                })}
                error={errors.Address?.message}
              />
            </Grid>
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
                placeholder="Enter landmark"
                defaultValue={getValues().Landmark}
                {...register('Landmark', {
                  required: 'Please enter the landmark',
                  maxLength: {
                    value: 300,
                    message: 'Should be less than 300 characters',
                  },
                })}
                error={errors.Landmark?.message}
              />
            </Grid>
          </Grid>

          <Grid container item spacing={2} mt={1}>
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
                placeholder="Enter locality"
                defaultValue={getValues().Locality}
                {...register('Locality', {
                  required: 'Please enter the locality',
                  maxLength: {
                    value: 300,
                    message: 'Should be less than 300 characters',
                  },
                })}
                error={errors.Locality?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Country
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Select
                fullWidth
                name="Country"
                placeholder={'Select Country'}
                defaultValue={356}
                value={356}
                disabled={true}
                {...register('Country')}
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
                placeholder={'Select state'}
                name={'state'}
                defaultValue={getValues().state}
                required={statesList?.length > 0 ? true : false}
                {...register('state', {
                  required: statesList?.length > 0 ? 'Please select a state' : '',
                })}
                options={createSelectFieldData(statesList)}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2} mt={1}>
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
                placeholder={'Select District'}
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
                {/* <Typography component="span" color="error.main">
                  *
                </Typography> */}
              </Typography>

              <Select
                fullWidth
                error={errors.SubDistrict?.message}
                name="SubDistrict"
                placeholder="Select sub district"
                required={
                  subDistrictList?.length > 0 && districtsList?.length > 0 && statesList?.length > 0
                    ? true
                    : false
                }
                defaultValue={getValues().SubDistrict}
                {...register('SubDistrict', {
                  // required:
                  //   subDistrictList?.length > 0 &&
                  //     districtsList?.length > 0 &&
                  //     statesList?.length > 0
                  //     ? 'Please select sub district'
                  //     : '',
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
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                City/Town/Village
                {/* <Typography component="span" color="error.main">
                  *
                </Typography> */}
              </Typography>

              <Select
                fullWidth
                error={errors.Area?.message}
                placeholder={'Select City/Town/Village'}
                name="Area"
                defaultValue={getValues().Area}
                required={
                  subDistrictList?.length > 0 && districtsList?.length > 0 && statesList?.length > 0
                    ? true
                    : false
                }
                {...register('Area', {
                  // required:
                  //   subDistrictList?.length > 0 &&
                  //     districtsList?.length > 0 &&
                  //     statesList?.length > 0
                  //     ? ' Please select a City/Town/Village'
                  //     : '',
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
          </Grid>
          <Grid container item spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Department
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'department'}
                required={true}
                fullWidth
                placeholder="Enter department"
                defaultValue={getValues().department}
                {...register('department', {
                  required: 'Please enter your department',
                })}
                error={errors.department?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Designation
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'designation'}
                required={true}
                fullWidth
                placeholder="Enter designation"
                defaultValue={getValues().designation}
                {...register('designation', {
                  required: 'Please enter your designation',
                })}
                error={errors.designation?.message}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Pincode
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>

              <TextField
                variant="outlined"
                name={'pincode'}
                required={true}
                placeholder="Enter pincode"
                fullWidth
                error={errors.pincode?.message}
                defaultValue={getValues().pincode}
                {...register('pincode', {
                  required: 'Please enter the pincode',
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
      {facilityDeclarationError && (
        <Grid item xs={12} md={6} pb={0}>
          <h4 style={{ color: 'red' }}>Please Declare your facility</h4>
        </Grid>
      )}
      <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={3}
        ml={3}
      >
        <Grid
          item
          xs={12}
          display="flex"
          pt={2}
          justifyContent="end"
          sx={{ borderTop: 'solid 1px', borderColor: 'inputBorderColor.main' }}
        >
          <Button
            onClick={
              organizationChecked ? handleSubmit(onSubmit) : handleSubmit(workDetailsErrorHandler)
            }
            variant="contained"
            color="secondary"
            sx={{ paddingTop: '14px', paddingBottom: '14px' }}
          >
            Submit
          </Button>
          <Button
            color="grey"
            variant="contained"
            sx={{
              marginLeft: '8px',
              paddingTop: '14px',
              paddingBottom: '14px',
            }}
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeUserActiveTab(doctorTabs[0].tabName));
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
            setDefaultFacilityData={setDefaultFacilityData}
            setCurrentlyWorking={setCurrentlyWorking}
            text={'Work details has been submitted'}
          />
        )}
      </Grid>
    </>
  );
};

export default WorkDetails;
