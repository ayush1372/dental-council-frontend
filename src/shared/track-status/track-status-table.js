import React from 'react';
import { useState } from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import UserProfile from '../../../src/pages/user-profile';
import { verboseLog } from '../../config/debug';
import { capitalize } from '../../helpers/functions/common-functions';
import TableSearch from '../../pages/profile/components/table-search/table-search';
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

  verboseLog('selectedRowData', selectedRowData, props);
  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'Request ID',
      name: 'requestId',
      sorting: true,
      type: 'string',
    },
    {
      title: 'IMR ID/ Registration No.',
      name: 'registrationNo',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Name of Applicant',
      name: 'nameofApplicant',
      sorting: true,
      type: 'string',
    },
    { title: 'Name of State Council', name: 'nameofStateCouncil', sorting: true, type: 'date' },
    {
      title: 'Council Verification Status',
      name: 'councilVerificationStatus',
      sorting: true,
      type: 'string',
    },
    {
      title: 'College/NBE Verification Status',
      name: 'collegeVerificationStatus',
      sorting: true,
      type: 'string',
    },
    {
      title: 'NMC Verification Status',
      name: 'NMCVerificationStatus',
      sorting: true,
      type: 'string',
    },
    { title: 'Date of Submission', name: 'dateofSubmission', sorting: true, type: 'string' },
    { title: 'Pendency (in days)', name: 'pendency', sorting: true, type: 'string' },
    { title: 'Pending with user', name: 'pending', sorting: true, type: 'string' },
    loggedInUserType !== 'College' && {
      title:
        loggedInUserType === 'NMC'
          ? 'Action'
          : loggedInUserType === 'SMC'
          ? 'Request NMC'
          : 'Request NMC',
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

  const newRowsData = props?.trackStatusData?.health_professional_applications?.map(
    (application, index) => {
      const formattedDate = moment(application?.created_at).format('DD-MM-YYYY:HH:MM:SS.SSSSSS');

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

          // value:
          //   application?.college_dean_status === ('NOT YET RECEIVED' || 'PENDING') &&
          //   application?.college_registrar_status === 'Approved'
          //     ? 'Pending'
          //     : application?.college_dean_status === 'APPROVED' &&
          //       application?.college_registrar_status === 'APPROVED'
          //     ? 'Approved'
          //     : 'Not yet received',
        },
        {
          type: 'NMCVerificationStatus',
          value: application?.nmc_status ? capitalize(application?.nmc_status) : '',
        },

        { type: 'dateofSubmission', value: formattedDate },
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
    let finalSearchData = { ...props.trackValues, pageNo: newPage };
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
      <TableSearch exportData={props.trackStatusData} flag={'trackStatusData'} />
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
          count={props?.trackStatusData?.total_no_of_records}
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
