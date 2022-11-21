import React from 'react';

import { Grid, TablePagination, Typography } from '@mui/material';

import { applications } from '../../../../constants/utils';
import GenericTable from '../../../../shared/generic-table';
// import SearchFilter from '../../../../shared/search-filter';

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
function DashboardControlledTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});
  // const { isLoggedInUserType } = useSelector((state) => state.recruiter);
  // eslint-disable-next-line no-console
  console.log('selectedRowData', selectedRowData);
  // const [searchQuery, setSearchQuery] = React.useState({ value: '' });

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
    { title: 'View', name: 'view', sorting: true, type: 'string' },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const viewCallback = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
    props.setShowViewPorfile(true);
    props.setShowDashboard(false);
    props.setShowTable(false);
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
      <Typography variant="h2" pt={2} pb={2}>
        Application List
      </Typography>
      {/* <SearchFilter searchQuery={searchQuery} changeSearchQuery={setSearchQuery} /> */}
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

      <div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.showTable?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Grid>
  );
}

export default React.memo(DashboardControlledTable);
