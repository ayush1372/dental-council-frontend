import React, { useEffect, useState } from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import UserProfile from '../../../src/pages/user-profile';
import { capitalize } from '../../helpers/functions/common-functions';
import GenericTable from '../../shared/generic-component/generic-table';
import ViewProfile from '../../shared/view-profile/view-profile';
import { trackStatus } from '../../store/actions/common-actions';
import { Button } from '../../ui/core';

function createData(
  SNo,
  requestId,
  registrationNo,
  nameofApplicant,
  nameofStateCouncil,
  councilVerificationStatus,
  collegeVerificationStatus,
  NMCVerificationStatus,
  dateofSubmission,
  pendency,
  pending,
  view,
  NMRID
) {
  return {
    SNo,
    requestId,
    registrationNo,
    nameofApplicant,
    nameofStateCouncil,
    councilVerificationStatus,
    collegeVerificationStatus,
    NMCVerificationStatus,
    dateofSubmission,
    pendency,
    pending,
    view,
    NMRID,
  };
}
function TrackStatusTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const dispatch = useDispatch();

  const [showViewProfile, setShowViewPorfile] = useState(false);
  const viewNameOfApplicant = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
    setShowViewPorfile(true);
    props?.setShowHeader(false);
    // Commenting the below Props.setState call as we are not passing any values from the parent.
    // props?.setShowTrackApplication(true);
    // props?.setShowTrackApplicationTable(false);
  };

  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'Request ID',
      name: 'requestId',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Registration Number',
      name: 'registrationNo',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Applicant Name',
      name: 'nameofApplicant',
      sorting: true,
      type: 'string',
    },
    { title: 'State Medical Council', name: 'nameofStateCouncil', sorting: true, type: 'date' },
    {
      title: 'Council Status',
      name: 'councilVerificationStatus',
      sorting: true,
      type: 'string',
    },
    {
      title: 'College/NBE Status',
      name: 'collegeVerificationStatus',
      sorting: true,
      type: 'string',
    },
    {
      title: 'NMC Status',
      name: 'NMCVerificationStatus',
      sorting: true,
      type: 'string',
    },
    { title: 'Submission Date', name: 'dateofSubmission', sorting: true, type: 'string' },
    { title: 'Pendency (Days)', name: 'pendency', sorting: true, type: 'string' },
    loggedInUserType !== 'College' && {
      title: 'Action',
      name: 'requestNMC',
      sorting: true,
      type: 'string',
    },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    let finalTrackData = { ...props.trackValues };
    finalTrackData.sortBy = orderBy?.name;
    finalTrackData.sortOrder = order;

    if (
      finalTrackData?.sortBy !== undefined &&
      finalTrackData?.sortBy !== null &&
      finalTrackData?.sortBy !== '' &&
      finalTrackData?.sortOrder !== undefined &&
      finalTrackData?.sortOrder !== null &&
      finalTrackData?.sortOrder !== ''
    )
      dispatch(trackStatus(finalTrackData));
  }, [order, orderBy, dispatch]);

  const newRowsData = props?.trackStatusData?.health_professional_applications?.map(
    (application, index) => {
      return createData(
        { type: 'SNo', value: index + 1 },
        {
          type: 'requestId',
          value: application?.request_id,
        },
        {
          type: 'registrationNo',
          value: application?.registration_no,
        },
        {
          type: 'nameofApplicant',
          value: application?.applicant_full_name,
          callbackNameOfApplicant: viewNameOfApplicant,
        },
        {
          type: 'nameofStateCouncil',
          value: application.council_name,
        },
        {
          type: 'councilVerificationStatus',
          value: application?.smc_status ? capitalize(application?.smc_status) : '',
        },
        {
          type: 'collegeVerificationStatus',
          value:
            application?.application_type_id === 7
              ? capitalize(application?.nbe_status)
              : capitalize(application?.college_status),
        },
        {
          type: 'NMCVerificationStatus',
          value: application?.nmc_status ? capitalize(application?.nmc_status) : '',
        },
        { type: 'dateofSubmission', value: moment(application?.created_at).format('DD-MM-YYYY') },
        { type: 'pendency', value: application?.pendency },
        { type: 'pending', value: '-' },
        { type: 'HPProfileId', value: application?.hp_profile_id },
        { type: 'NMRID', value: application?.nmr_id },
        {
          type:
            loggedInUserType === 'NMC'
              ? 'requestNMC'
              : loggedInUserType === 'SMC'
              ? 'requestSMC'
              : 'college',
          value: '-',
        }
      );
    }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // props.getTableData(newPage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    let finalSearchData = { ...props.trackValues, pageNo: newPage + 1 };
    dispatch(trackStatus(finalSearchData));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onClickBackButtonHandler = () => {
    setShowViewPorfile(false);
    props?.setShowHeader(true);
  };

  return showViewProfile ? (
    <Box bgcolor="grey1.lighter">
      <Box align="right" pt={2} pr={2}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            backgroundColor: 'white.main',
            ml: 2,
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'white.main',
            },
            height: '48px',
          }}
          onClick={onClickBackButtonHandler}
        >
          Back
        </Button>
      </Box>
      <Box>
        <ViewProfile />
        <UserProfile showViewProfile={true} selectedRowData={selectedRowData} />
      </Box>
    </Box>
  ) : (
    <Grid p={'0px'}>
      <GenericTable
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        tableHeader={dataHeader}
        data={newRowsData}
        handleRowClick={handleDataRowClick}
        rowsPerPage={rowsPerPage}
        page={page}
        applicationData={props?.trackStatusData?.health_professional_applications}
      />

      <Box>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={props?.trackStatusData?.total_no_of_records || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Box>
    </Grid>
  );
}

export default React.memo(TrackStatusTable);
