import { useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { natureOfWork, workStatusOptions } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
import { Button, Checkbox, RadioGroup, Select, TextField } from '../../../../ui/core';
import WorkDetailsTable from './work-details-table';

const WorkDetails = ({ getValues, register, setValue, errors, handleSubmit }) => {
  const [showTable, setShowTable] = useState(false);
  // const [showHeader, setShowHeader] = useState(true);
  const [workExpierence, setWorkExpierence] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [facilityChecked, setFacilityChecked] = useState(true);
  const [organizationChecked, setOrganizationChecked] = useState(false);
  const [tabValue, setTabValue] = useState(0);

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
  const onSubmit = () => {
    // const trackData = {
    //   smcId: getValues().RegistrationCouncilId,
    //   registrationNo: parseInt(getValues().RegistrationNumber),
    //   pageNo: 1,
    //   offset: 10,
    //   sortBy: 'createdAt',
    //   sortType: 'desc',
    // };
    // dispatch(trackStatus(trackData))
    //   .then(() => {})
    //   .catch((error) => {
    //     successToast(
    //       error?.data?.response?.data?.error,
    //       'RegistrationError',
    //       'error',
    //       'top-center'
    //     );
    //   });
    setShowTable(true);
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
          {...register('LanguageSpoken')}
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
                    error={errors?.facilityid?.message}
                    name="FACILITYID"
                    label="Enter Facility Id(If Known)"
                    placeholder="Facility Id"
                    defaultValue={getValues()?.facilityid}
                    required={true}
                    {...register(`facilityid`, {
                      required: 'Facility is Required',
                    })}
                  />
                </Box>
                <Box ml={1}>
                  <Button variant="contained" color="secondary" onClick={onSubmit}>
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
              <Grid item xs={12} md={4} lg={4}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  Facility Name
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Select
                  fullWidth
                  error={errors.facilityname?.message}
                  name={'facilityname'}
                  defaultValue={getValues().facilityname}
                  {...register('facilityname', {
                    required: 'This field is required',
                  })}
                  options={[]}
                />
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
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Postal code
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
    </>
  );
};

export default WorkDetails;
