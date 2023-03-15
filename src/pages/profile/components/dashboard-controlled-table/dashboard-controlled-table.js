import React, { useEffect } from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import GenericTable from '../../../../shared/generic-component/generic-table';
import { getDashboardTableData } from '../../../../store/actions/dashboard-actions';
import { setSelectedAcademicStatus } from '../../../../store/reducers/common-reducers';
import TableSearch from '../table-search/table-search';

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
  view,
  profileID
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
    profileID,
  };
}
function DashboardControlledTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  // const [selectedRowData, setRowData] = React.useState({});
  const dispatch = useDispatch();
  const [searchQueryParams, setSearchQueryParams] = React.useState();

  const { dashboardTableDetails } = useSelector((state) => state.dashboard);

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
    { title: 'Name of State Council', name: 'nameofStateCouncil', sorting: true, type: 'string' },
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
    { title: 'Date of Submission', name: 'dateofSubmission', sorting: true, type: 'date' },
    { title: 'Pendency', name: 'pendency', sorting: true, type: 'string' },
    { title: 'View', name: 'view', sorting: false, type: 'string' },
  ];

  const viewCallback = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    // setRowData(row);
    props.setShowViewPorfile(true);
    props.setShowDashboard(false);
    props.setShowTable(false);
    props.getSelectedRowData(row);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData = dashboardTableDetails?.data?.dashboard_tolist?.map((application, index) => {
    return createData(
      { type: 'SNo', value: index + 1 },
      {
        type: 'registrationNo',
        value: application?.registration_no,
      },
      {
        type: 'nameofApplicant',
        value: application?.applicant_full_name,
      },
      {
        type: 'nameofStateCouncil',
        value: application?.council_name,
      },
      { type: 'councilVerificationStatus', value: application?.smc_status },
      {
        type: 'collegeVerificationStatus',
        value:
          application?.college_dean_status === 'NOT YET RECEIVED' &&
          application?.college_registrar_status === 'NOT YET RECEIVED'
            ? 'NOT YET RECEIVED'
            : 'PENDING',
      },
      { type: 'NMCVerificationStatus', value: application?.nmc_status },
      { type: 'dateofSubmission', value: application?.created_at },
      { type: 'pendency', value: application?.pendency },
      { type: 'view', value: 'View', onClickCallback: viewCallback },
      { type: 'profileID', value: application?.hp_profile_id }
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getTableData(newPage + 1, 10);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  useEffect(() => {
    getTableData(1, 10);
  }, [searchQueryParams]);

  const getTableData = (pageNo, noOfRecords) => {
    const requestObj = {
      work_flow_status_id: '',
      application_type_id: props?.selectedCardDataData?.applicationTypeID
        ? props?.selectedCardDataData?.applicationTypeID.toString()
        : '',
      user_group_status: props?.selectedCardDataData?.responseKey
        ? props?.selectedCardDataData?.responseKey
        : '',
      smc_id: searchQueryParams ? searchQueryParams?.RegistrationCouncilId : '',
      name: searchQueryParams ? searchQueryParams?.filterByName : '',
      nmr_id: searchQueryParams ? searchQueryParams?.filterByRegNo : '',
      search: searchQueryParams ? searchQueryParams?.search : '',
      page_no: pageNo,
      offset: noOfRecords,
      sort_by: '',
      sort_order: '',
    };
    dispatch(setSelectedAcademicStatus(props?.selectedCardDataData?.responseKey));
    dispatch(getDashboardTableData(requestObj));
  };

  const searchParams = (data) => {
    dispatch(getDashboardTableData(data));
    setSearchQueryParams(data);
  };

  return (
    <Grid sx={{ m: 2 }}>
      <Typography variant="h2" py={2}>
        {`${props?.selectedCardDataData?.responseKey} Applications`}
      </Typography>
      <TableSearch
        searchParams={searchParams}
        exportData={dashboardTableDetails}
        flag={'dashboardTableDetails'}
      />
      <GenericTable
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        tableHeader={dataHeader}
        data={newRowsData}
        // handleRowClick={handleDataRowClick}
        rowsPerPage={rowsPerPage}
        page={page}
      />
      <Box>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={dashboardTableDetails?.data?.total_no_of_records || '0'}
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

export default React.memo(DashboardControlledTable);
