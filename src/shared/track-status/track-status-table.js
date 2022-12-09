import React from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../config/debug';
import { trackstatusData } from '../../constants/common-data';
import GenericTable from '../../shared/generic-component/generic-table';

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
function TrackStatusTable({ showTable, setShowTrackApplication, setShowTrackApplicationTable }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);

  const viewNameOfApplicant = (event, row) => {
    verboseLog('called', event, row);
    setShowTrackApplication(true);
    setShowTrackApplicationTable(false);
  };

  verboseLog('selectedRowData', selectedRowData);
  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
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
      title: 'College Verification Status',
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
    { title: 'Pendency', name: 'pendency', sorting: true, type: 'string' },
    {
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
  const newRowsData = trackstatusData.message?.map((application) => {
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
      {
        type:
          loggedInUserType === 'NMC'
            ? 'requestNMC'
            : loggedInUserType === 'SMC'
            ? 'requestSMC'
            : 'college',
        value: application.view,
      }
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
          count={showTable?.count || newRowsData.length}
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
