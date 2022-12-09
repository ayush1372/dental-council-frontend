import React from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';

import { verboseLog } from '../../../config/debug';
import { applications } from '../../../constants/common-data';
import GenericTable from '../../../shared/generic-component/generic-table';
import TableSearch from '../components/table-search/table-search';

function createData(
  SNo,
  registrationNo,
  nameofApplicant,
  nameofStateCouncil,
  councilVerificationStatus,
  collegeVerificationStatus,
  NMCVerificationStatus,
  dateofSubmission,
  pendency,
  view
) {
  return {
    SNo,
    registrationNo,
    nameofApplicant,
    nameofStateCouncil,
    councilVerificationStatus,
    collegeVerificationStatus,
    NMCVerificationStatus,
    dateofSubmission,
    pendency,
    view,
  };
}
function TrackAppicationTable({ userType, setShowTrackApplication, setShowTrackApplicationTable }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});

  const viewNameOfApplicant = (event, row) => {
    verboseLog('called', event, row);
  };

  verboseLog('selectedRowData', selectedRowData);
  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'Request ID',
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

    { title: 'Date of Submission', name: 'dateofSubmission', sorting: true, type: 'date' },
    {
      title: 'Current Status',
      name: 'councilVerificationStatus',
      sorting: true,
      type: 'date',
    },
    { title: 'Pendency', name: 'pendency', sorting: true, type: 'string' },
    { title: 'Action', name: 'view', sorting: true, type: 'string' },
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
  const newRowsData = applications.message?.map((application) => {
    return createData(
      { type: 'SNo', value: application.SNo },
      {
        type: 'registrationNo',
        value: application?.registrationNo,
      },
      {
        type: 'nameofApplicant',
        value: application.nameofApplicant,
        callbackNameOfApplicant: viewNameOfApplicant,
      },
      {
        type: 'nameofStateCouncil',
        value: application.nameofStateCouncil,
      },
      { type: 'councilVerificationStatus', value: application.councilVerificationStatus },
      {
        type: 'collegeVerificationStatus',
        value: application.collegeVerificationStatus,
      },
      { type: 'NMCVerificationStatus', value: application.NMCVerificationStatus },
      { type: 'dateofSubmission', value: application.dateofSubmission },
      { type: 'pendency', value: application.pendency },
      { type: 'view', value: application.view, onClickCallback: viewCallback }
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
    <Grid sx={{ m: 2 }}>
      <Typography variant="h2" py={2}>
        Applications Pending List
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
