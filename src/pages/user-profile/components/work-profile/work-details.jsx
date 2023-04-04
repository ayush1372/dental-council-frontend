import { useEffect, useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { natureOfWork, workStatusOptions } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
import {
  getCitiesList,
  getDistrictList,
  getStatesList,
  getSubDistrictsList,
} from '../../../../store/actions/common-actions';
import { getFacilitiesData } from '../../../../store/actions/doctor-user-profile-actions';
import { Button, Checkbox, RadioGroup, Select, TextField } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';
import FacilityDetailsTable from './facility-details-table';
import WorkDetailsTable from './work-details-table';

const WorkDetails = ({ getValues, register, setValue, errors, handleSubmit, watch }) => {
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);
  // const [showHeader, setShowHeader] = useState(true);
  const [workExpierence, setWorkExpierence] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [facilityChecked, setFacilityChecked] = useState(true);
  const [organizationChecked, setOrganizationChecked] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const onSubmit = () => {
    const currentWorkDetails = {
      work_organization: getValues().workingOrganizationName,
      organization_type: getValues().organizationType,
      address: {
        id: null,
        address_line1: getValues().Address,
        street: getValues().Street,
        landmark: getValues().Landmark,
        locality: getValues().Locality,
        country: getCountryData(getValues().Country),
        state: getStateData(getValues().state),
        district: getDistrictData(getValues().District),
        sub_district: getSubDistrictData(getValues().SubDistrict),
        village: getVillageData(getValues().Area),
        url: getValues().telecommunicationURL,
        pincode: getValues().pincode,
        work_details: {
          work_nature: getWorkNature(getValues().NatureOfWork),
          work_status: getWorkStatus(getValues().workStatus),
        },
      },
    };
    // eslint-disable-next-line no-console
    console.log('currentWorkDetails', currentWorkDetails);
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
    setTabValue(value);
  };
  const searchFacilitiesHandler = () => {
    const values = getValues();
    const searchFacilities = {
      pincode: values.pincode || '',
      page: values.page || 0,
      facilityId: values.facilityId || '',
      facilityName: values.facilityName || '',
      ownershipCode: values.facilityName || '',
      stateLGDCode: values.stateLGDCode || '',
      districtLGDCode: values.districtLGDCode || '',
      subDistrictLGDCode: values.subDistrictLGDCode || '',
      resultsPerPage: values.resultsPerPage || 1,
    };
    dispatch(getFacilitiesData(searchFacilities))
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response?.data);
      })
      .catch((error) => {
        successToast(
          error?.data?.response?.data?.error,
          'RegistrationError',
          'error',
          'top-center'
        );
      });
    setShowTable(true);
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

  const fetchDisricts = (stateId) => {
    if (stateId) dispatch(getDistrictList(stateId));
  };

  const fetchSubDistricts = (districtId) => {
    if (districtId) dispatch(getSubDistrictsList(districtId));
  };

  const fetchCities = (subDistrictId) => {
    if (subDistrictId) dispatch(getCitiesList(subDistrictId));
  };

  useEffect(() => {
    fetchState(watchCountry);
  }, [watchCountry]);

  useEffect(() => {
    fetchDisricts(watchState);
  }, [watchState]);

  useEffect(() => {
    // searchFacilitiesHandler();
    fetchDisricts(watchFacilityStateCode);
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
  const getStateData = (State) => {
    let stateData = [];

    statesList?.map((elementData) => {
      if (elementData.id === State) {
        stateData.push(elementData);
      }
    });

    return stateData[0];
  };
  const getDistrictData = (District) => {
    let DistrictData = [];
    districtsList?.map((elementData) => {
      if (elementData.id === District) {
        DistrictData.push(elementData);
      }
    });
    return DistrictData[0];
  };

  const getSubDistrictData = (subDistrict) => {
    let subDistrictData = [];
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
      citiesList?.map((elementData) => {
        if (elementData.id === nature) {
          workNatureData.push(elementData);
        }
      });
    return workNatureData[0];
  };
  const getWorkStatus = (status) => {
    let workStatusData = [];
    Array.isArray(workStatusOptions) &&
      citiesList?.map((elementData) => {
        if (elementData.id === status) {
          workStatusData.push(elementData);
        }
      });
    return workStatusData[0];
  };

  return (
    <>
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
              setWorkExpierence(workExpierence + 1);
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="body1" color="inputTextColor.main">
          Language Spoken
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <AutoComplete
          name="LanguageSpoken"
          options={languagesList?.data || []}
          value={languages}
          error={languages?.length === 0 && errors.LanguageSpoken?.message}
          multiple={true}
          // required={true}
          {...register('LanguageSpoken', {
            // required: 'Language is Required',
          })}
          onChange={(value) => {
            handleLanguageSpokenChange('LanguageSpoken', value);
          }}
        />
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
      <Grid item xs={12} ml={2}>
        <Checkbox
          sx={{ padding: '0 8px 0 0' }}
          value={facilityChecked}
          defaultChecked={true}
          // defaultValue={facilityChecked}
          onChange={(e) => {
            setFacilityChecked(e.target.checked);
          }}
          label="Facility"
        />
        <Checkbox
          sx={{ padding: '0 8px 0 0' }}
          value={organizationChecked}
          onChange={(e) => {
            setOrganizationChecked(e.target.checked);
          }}
          label="Organization"
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
              <Tab label="Facility Id" />
              <Tab label="Facility Name" />
              <Tab label="On The Map" />
            </Tabs>
          </Grid>
          {tabValue === 0 && (
            <Grid container spacing={2} mt={2} ml={1}>
              <Grid item md={8} display="flex" alignItems="end">
                <Box>
                  <TextField
                    fullWidth
                    error={errors?.facilityId?.message}
                    name="facilityId"
                    label="Enter Facility Id(If Known)"
                    placeholder="Facility Id"
                    defaultValue={getValues()?.facilityId}
                    required={true}
                    {...register(`facilityId`, {
                      required: 'Facility is Required',
                    })}
                  />
                </Box>
                <Box ml={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      searchFacilitiesHandler();
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Grid>
              {showTable && (
                <Grid item xs={12} padding="10px 0 !important">
                  <WorkDetailsTable />
                </Grid>
              )}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2} mt={2} ml={1}>
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
                  name={'stateLGDCode'}
                  defaultValue={getValues().stateLGDCode}
                  required={true}
                  {...register('stateLGDCode', {
                    required: 'This field is required',
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
                  name={'districtLGDCode'}
                  defaultValue={getValues().districtLGDCode}
                  required={true}
                  {...register('districtLGDCode', {
                    required: 'This field is required',
                  })}
                  options={createSelectFieldData(districtsList)}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  Facility Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  fullWidth
                  error={errors.facilityName?.message}
                  name={'facilityName'}
                  defaultValue={getValues().facilityName}
                  {...register('facilityName', {
                    required: 'This field is required',
                  })}
                  options={[]}
                />
              </Grid>
              <Grid item xs={12} padding="10px 0 !important">
                <WorkDetailsTable />
              </Grid>
            </Grid>
          )}
          {tabValue === 2 && (
            <Grid item md={8}>
              map
            </Grid>
          )}
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
                defaultValue={getValues().Street}
                {...register('Street', {
                  required: 'This field is required',
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
                placeholder="Landmark"
                defaultValue={getValues().Landmark}
                {...register('Landmark', {
                  required: 'This field is required',
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
                placeholder="Locality"
                defaultValue={getValues().Locality}
                {...register('Locality', {
                  required: 'This field is required',
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
                required={true}
                {...register('state', {
                  required: 'This field is required',
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
                required={true}
                defaultValue={getValues().SubDistrict}
                {...register('SubDistrict', {
                  required: 'This field is required',
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
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Postal code
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>

              <TextField
                variant="outlined"
                name={'pincode'}
                required={true}
                placeholder="pincode"
                fullWidth
                error={errors.Pincode?.message}
                defaultValue={getValues().pincode}
                {...register('pincode', {
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
        </Grid>
      )}
      {!showTable && tabValue === 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Declared Place Of Work
            </Typography>
          </Grid>
          <Grid item xs={12} padding="10px 0 !important">
            <FacilityDetailsTable />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WorkDetails;
