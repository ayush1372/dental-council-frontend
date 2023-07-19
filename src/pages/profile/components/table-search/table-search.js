import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  ActivateLicenceFieldList,
  applicationStatus,
  applicationType,
  CollegeApprovalFieldList,
  DashBoardCardsFieldList,
  emptyData,
  filterDropDownData,
} from '../../../../../src/constants/common-data';
import { createEditFieldData } from '../../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../../shared/autocomplete/searchable-dropdown';
import ExportFiles from '../../../../shared/export-component/export-file';
import { Button, TextField } from '../../../../ui/core';

export function TableSearch({ trackApplication, searchParams, exportData, flag }) {
  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  const [applicationTypeValue, setApplicationTypeValue] = useState(false);
  const [statusTypeValue, setStatusTypeValue] = useState(false);
  const [filterId, setFilterId] = useState('');
  const [dashBoardCardId, setDashBoardCardId] = useState();
  const { userActiveTab } = useSelector((state) => state.common);

  useEffect(() => {
    if (filterId === 'workFlowStatusId') {
      setApplicationTypeValue(false);
      setStatusTypeValue(true);
    }
    if (filterId === 'applicationTypeId') {
      setApplicationTypeValue(true);
      setStatusTypeValue(false);
    }
  }, [filterId]);

  let trackData = {
    pageNo: 1,
    offset: 10,
  };
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      filterByName: '',
      filterByRegNo: '',
      registrationCouncil: '',
      RegistrationCouncilId: '',
      search: '',
      FilterValue: '',
      Filter: '',
      Status: '',
      StatusId: '',
      collegeApproval: '',
      collegeApprovalId: '',
      collegeApprovalFilter: '',
      ActivateLicence: '',
      ActivateLicenceId: '',
      ActivateLicenceFilter: '',
      dashBoardCard: '',
      dashBoardCardFilter: '',
    },
  });
  const onClickSearchButtonHandler = () => {
    if (exportData?.data?.dashboard_tolist) {
      trackData.value = getValues().dashBoardCardFilter;
      trackData.search = dashBoardCardId;
      searchParams(trackData);
    }

    if (exportData?.data?.health_professional_details) {
      trackData.search = getValues().ActivateLicenceId;
      trackData.value = getValues().ActivateLicenceFilter;
      searchParams(trackData);
    }
    if (trackApplication) {
      trackData.value = getValues().StatusId;
      trackData.search = filterId;
      searchParams(trackData, profileId);
    }
    if (exportData?.data?.college_details) {
      trackData.search = getValues().collegeApprovalId;
      trackData.value = getValues().collegeApprovalFilter;
      searchParams(trackData);
    }

    reset({
      filterByName: '',
      filterByRegNo: '',
      registrationCouncil: '',
      RegistrationCouncilId: '',
      search: '',
    });
  };

  const onApplicationChange = (currentValue) => {
    if (currentValue !== null && currentValue !== undefined) setFilterId(currentValue.id);
  };
  return (
    <Box data-testid="table-search" mb={2}>
      <Grid container>
        <Grid item xs={11} mt={userActiveTab === 'Activate Licence' ? 3 : 0}>
          <Grid
            container
            item
            xs={12}
            data-testid="filterByName"
            sx={{ alignItems: 'center', display: 'flex', gap: 1 }}
          >
            {trackApplication === true && (
              <>
                <Grid item md={3} xs={12}>
                  <SearchableDropdown
                    fullWidth
                    name="Filter"
                    data-testid="filterByName"
                    placeholder="Select"
                    clearErrors={clearErrors}
                    {...register('Filter')}
                    items={createEditFieldData(filterDropDownData)}
                    onChange={(currentValue) => {
                      if (currentValue === null) {
                        setValue('Status', '');
                        setValue('StatusId', '');
                      }
                      onApplicationChange(currentValue);
                    }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <SearchableDropdown
                    fullWidth
                    name="Status"
                    data-testid="freesearch"
                    items={
                      applicationTypeValue
                        ? createEditFieldData(applicationType)
                        : statusTypeValue
                        ? createEditFieldData(applicationStatus)
                        : createEditFieldData(emptyData)
                    }
                    placeholder="Select"
                    clearErrors={clearErrors}
                    {...register('Status')}
                    onChange={(currentValue) => {
                      setValue('StatusId', currentValue?.id);
                      setValue('Status', currentValue?.name);
                    }}
                    value={{ name: getValues()?.Status || '', id: getValues()?.StatusId || '' }}
                  />
                </Grid>
              </>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12}>
                {exportData?.data?.health_professional_details ? (
                  <SearchableDropdown
                    fullWidth
                    name="ActivateLicence"
                    items={createEditFieldData(ActivateLicenceFieldList)}
                    placeholder="Please Select"
                    clearErrors={clearErrors}
                    {...register('ActivateLicence')}
                    onChange={(currentValue) => {
                      setValue('ActivateLicenceId', currentValue?.id);
                      if (currentValue === null) {
                        setValue('ActivateLicenceFilter', null);
                      }
                    }}
                  />
                ) : exportData?.data?.dashboard_tolist ? (
                  <SearchableDropdown
                    fullWidth
                    value={dashBoardCardId}
                    name="dashBoardCard"
                    items={createEditFieldData(DashBoardCardsFieldList)}
                    placeholder="Select"
                    clearErrors={clearErrors}
                    {...register('dashBoardCard')}
                    onChange={(currentValue) => {
                      setDashBoardCardId(currentValue?.id);
                      if (currentValue === null) {
                        setValue('dashBoardCardFilter', null);
                      }
                    }}
                  />
                ) : (
                  exportData?.data?.college_details && (
                    <SearchableDropdown
                      fullWidth
                      data-testid="freesearch"
                      name="collegeApproval"
                      items={createEditFieldData(CollegeApprovalFieldList)}
                      placeholder="Select"
                      clearErrors={clearErrors}
                      {...register('collegeApproval')}
                      onChange={(currentValue) => {
                        setValue('collegeApprovalId', currentValue?.id);
                        if (currentValue === null) {
                          setValue('collegeApprovalFilter', null);
                        }
                      }}
                    />
                  )
                )}
              </Grid>
            )}
            {trackApplication !== true && (
              <Grid item md={3} xs={12}>
                {exportData?.data?.health_professional_details ? (
                  <TextField
                    data-testid="filter_By_RegNo"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    name="ActivateLicenceFilter"
                    required={false}
                    placeholder={'Enter keywords'}
                    defaultValue={getValues().ActivateLicenceFilter}
                    error={errors.ActivateLicenceFilter?.message}
                    {...register('ActivateLicenceFilter')}
                  />
                ) : exportData?.data?.dashboard_tolist ? (
                  <TextField
                    data-testid="filter_By_RegNo"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    name={'dashBoardCardFilter'}
                    placeholder={'Enter keywords'}
                    defaultValue={getValues().dashBoardCardFilter}
                    {...register('dashBoardCardFilter', {})}
                    error={errors.dashBoardCardFilter?.message}
                  />
                ) : (
                  exportData?.data?.college_details && (
                    <TextField
                      data-testid="filter_By_RegNo"
                      inputProps={{ maxLength: 100 }}
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      name="collegeApprovalFilter"
                      required={false}
                      placeholder={'Enter keywords'}
                      defaultValue={getValues().collegeApprovalFilter}
                      error={errors.collegeApprovalFilter?.message}
                      {...register('collegeApprovalFilter')}
                    />
                  )
                )}
              </Grid>
            )}
            {(trackApplication !== true || trackApplication === true) && (
              <Grid item md="auto" xs={12}>
                <Button
                  data-testid="filterButton"
                  sx={{
                    padding: '13px 10px',
                    m: {
                      md: '0px',
                    },
                    width: {
                      xs: '100%',
                      md: 'fit-content',
                    },
                  }}
                  variant="contained"
                  onClick={handleSubmit(onClickSearchButtonHandler)}
                >
                  Search
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md="auto"
          sx={{
            position: exportData?.health_professional_applications ? 'absolute' : '',
            right: exportData?.health_professional_applications ? '10%' : '',
            bottom: exportData?.health_professional_applications ? '60%' : '',
          }}
        >
          {' '}
          <ExportFiles exportData={exportData} flag={flag} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableSearch;
