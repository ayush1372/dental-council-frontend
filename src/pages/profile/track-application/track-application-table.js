import React, { useEffect } from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import { useDispatch } from 'react-redux';

import GenericTable from '../../../shared/generic-component/generic-table';
import TableSearch from '../components/table-search/table-search';

function createData(
  SNo,
  registration_no,
  request_id,
  applicant_full_name,
  application_type_name,
  nameofStateCouncil,
  doctor_status,
  collegeVerificationStatus,
  NMCVerificationStatus,
  created_at,
  smc_status,
  nmc_status,
  pendency,
  view
) {
  return {
    SNo,
    registration_no,
    request_id,
    applicant_full_name,
    application_type_name,
    nameofStateCouncil,
    doctor_status,
    collegeVerificationStatus,
    NMCVerificationStatus,
    created_at,
    smc_status,
    nmc_status,
    pendency,
    view,
  };
}
function TrackAppicationTable({
  userType,
  setShowTrackApplication,
  setShowTrackApplicationTable,
  setShowUserProfile,
  getTableData,
  profileId,
  tableData,
  setRowData,
}) {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  // const theme = useTheme();
  let trackData = {
    pageNo: 1,
    offset: 10,
  };
  useEffect(() => {
    if (orderBy && getTableData && page !== null && profileId)
      dispatch(getTableData(profileId, trackData));
  }, [orderBy, getTableData, page, profileId]);

  const viewNameOfApplicant = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
    setShowUserProfile(true);
    setShowTrackApplicationTable(false);
  };

  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: false, type: 'string' },
    {
      title: 'Request ID',
      name: 'registration_no',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Name of Applicant',
      name: 'applicant_full_name',
      sorting: true,
      type: 'string',
    },

    { title: 'Date of Submission', name: 'created_at', sorting: true, type: 'date' },
    {
      title: 'Current Status',
      name: 'doctor_status',
      sorting: true,
      type: 'date',
    },
    { title: 'Pendency', name: 'pendency', sorting: true, type: 'string' },
    { title: 'Action', name: 'view', sorting: false, type: 'string' },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const viewCallback = (event, row) => {
    setShowTrackApplication(true);
    setShowTrackApplicationTable(false);
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData = (tableData?.data?.data?.health_professional_applications || [])?.map(
    (data, index) => {
      return createData(
        { type: 'SNo', value: index + 1 },
        {
          type: 'registration_no',
          value: data?.request_id,
        },
        {
          type: 'request_id',
          value: data?.request_id,
        },
        {
          type: 'applicant_full_name',
          value: data?.applicant_full_name,
          callbackNameOfApplicant: viewNameOfApplicant,
        },

        {
          type: 'application_type_name',
          value: data?.application_type_name,
        },
        {
          type: 'nameofStateCouncil',
          value: data?.council_name,
        },
        { type: 'doctor_status', value: data?.doctor_status },
        {
          type: 'collegeVerificationStatus',
          value: data?.college_dean_status,
        },
        { type: 'NMCVerificationStatus', value: data?.nmc_status },
        { type: 'created_at', value: data?.created_at },
        {
          type: 'smc_status',
          value: data?.smc_status,
        },
        {
          type: 'nmc_status',
          value: data?.nmc_status,
        },
        { type: 'pendency', value: data?.pendency },
        { type: 'view', value: data?.view || 'view', onClickCallback: viewCallback }
      );
    }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    let finalTrackData = { ...trackData, pageNo: newPage };
    dispatch(getTableData(profileId, finalTrackData));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid>
      {/* <Typography variant="h2" py={3} bgcolor={`${theme.palette.white.main}`} mb={2} px={3}>
        Track Application
      </Typography>    */}
      <TableSearch trackApplication={userType} />
      <Box>
        <GenericTable
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          tableHeader={dataHeader}
          data={newRowsData}
          handleRowClick={handleDataRowClick}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={tableData?.data?.data?.total_no_of_records || '0'}
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

export default React.memo(TrackAppicationTable);
