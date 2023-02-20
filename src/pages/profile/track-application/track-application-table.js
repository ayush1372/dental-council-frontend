import React, { useEffect } from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import GenericTable from '../../../shared/generic-component/generic-table';
import TableSearch from '../components/table-search/table-search';

function createData(
  SNo,
  registration_no,
  request_id,
  applicant_full_name,
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
    nameofStateCouncil,
    doctor_status,
    smc_status,
    nmc_status,
    collegeVerificationStatus,
    NMCVerificationStatus,
    created_at,
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

  useEffect(() => {
    if (orderBy && getTableData && page !== null && profileId) dispatch(getTableData(profileId));
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
  const newRowsData = (tableData?.data || [])?.map((data, index) => {
    return createData(
      { type: 'SNo', value: index + 1 },
      {
        type: 'registration_no',
        value: data?.registration_no,
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
        type: 'nameofStateCouncil',
        value: data?.nameofStateCouncil,
      },
      { type: 'doctor_status', value: data?.doctor_status },
      {
        type: 'collegeVerificationStatus',
        value: data?.collegeVerificationStatus,
      },
      { type: 'NMCVerificationStatus', value: data?.NMCVerificationStatus },
      { type: 'created_at', value: data?.created_at },
      {
        type: 'SMC Status',
        value: data?.smc_status,
      },
      {
        type: 'NMC Status',
        value: data?.nmc_status,
      },
      { type: 'pendency', value: data?.pendency },
      { type: 'view', value: data?.view || 'view', onClickCallback: viewCallback }
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid>
      <Typography variant="h2" py={2}>
        Track Application
      </Typography>
      <TableSearch trackApplication={userType} />
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
      <Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={newRowsData.length}
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
