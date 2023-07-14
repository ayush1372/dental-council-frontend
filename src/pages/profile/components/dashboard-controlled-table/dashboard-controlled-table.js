import React, { useEffect } from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import GenericTable from '../../../../shared/generic-component/generic-table';
import { getDashboardTableData } from '../../../../store/actions/dashboard-actions';
import { setSelectedAcademicStatus } from '../../../../store/reducers/common-reducers';
import TableSearch from '../table-search/table-search';

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
  view,
  profileID
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
    { title: 'Name of State Council', name: 'nameofStateCouncil', sorting: true, type: 'string' },
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
    { title: 'Date of Submission', name: 'dateofSubmission', sorting: true, type: 'date' },
    { title: 'Pendency (in days)', name: 'pendency', sorting: true, type: 'string' },
    { title: 'View', name: 'view', sorting: false, type: 'string' },
  ];

  const viewCallback = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
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
  useEffect(() => {
    if (
      orderBy?.name !== undefined &&
      orderBy?.name !== null &&
      orderBy?.name !== '' &&
      order !== undefined &&
      order !== null &&
      order !== ''
    ) {
      const requestObj = {
        work_flow_status_id: '',
        application_type_id: props?.selectedCardData?.applicationTypeID
          ? props?.selectedCardData?.applicationTypeID.toString()
          : '',
        user_group_status: props?.selectedCardData?.responseKey
          ? props?.selectedCardData?.responseKey
          : '',
        smc_id: searchQueryParams ? searchQueryParams?.RegistrationCouncilId : '',
        name: searchQueryParams ? searchQueryParams?.filterByName : '',
        nmr_id: searchQueryParams ? searchQueryParams?.filterByRegNo : '',
        search: searchQueryParams ? searchQueryParams?.search : '',
        value: searchQueryParams ? searchQueryParams?.value : '',
        page_no: 1,
        offset: 10,
        sortBy: orderBy?.name,
        sortOrder: order,
      };

      dispatch(getDashboardTableData(requestObj));
    }
  }, [order, orderBy, dispatch]);

  const newRowsData = dashboardTableDetails?.data?.dashboard_tolist?.map((application, index) => {
    const formattedDate = moment(application?.created_at).format('DD-MM-YYYY');
    const capitalize = (str) => {
      if (!str) {
        return '';
      }
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
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
      },
      {
        type: 'nameofStateCouncil',
        value: application?.council_name,
      },
      { type: 'councilVerificationStatus', value: capitalize(application?.smc_status) },
      {
        type: 'collegeVerificationStatus',
        value:
          application?.application_type_id === 7
            ? capitalize(application?.nbe_status)
            : capitalize(application?.college_status),
      },
      { type: 'NMCVerificationStatus', value: capitalize(application?.nmc_status) },
      { type: 'dateofSubmission', value: formattedDate },
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
  };

  useEffect(() => {
    getTableData(1, 10);
  }, []);

  const getTableData = (pageNo, noOfRecords) => {
    const requestObj = {
      work_flow_status_id: '',
      application_type_id: props?.selectedCardData?.applicationTypeID
        ? props?.selectedCardData?.applicationTypeID.toString()
        : '',
      user_group_status: props?.selectedCardData?.responseKey
        ? props?.selectedCardData?.responseKey
        : '',
      smc_id: searchQueryParams ? searchQueryParams?.RegistrationCouncilId : '',
      name: searchQueryParams ? searchQueryParams?.filterByName : '',
      nmr_id: searchQueryParams ? searchQueryParams?.filterByRegNo : '',
      search: searchQueryParams ? searchQueryParams?.search : '',
      value: searchQueryParams ? searchQueryParams?.value : '',
      page_no: pageNo,
      offset: noOfRecords,
      orderBy: '',
      sortOrder: '',
    };
    dispatch(
      setSelectedAcademicStatus(
        props?.selectedCardData?.name === 'Update Request Received'
          ? props?.selectedCardData?.name
          : props?.selectedCardData?.responseKey
      )
    );
    dispatch(getDashboardTableData(requestObj));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const searchParams = (data) => {
    setSearchQueryParams(data);

    let reqObj = {
      work_flow_status_id: '',
      application_type_id: props?.selectedCardData?.applicationTypeID
        ? props?.selectedCardData?.applicationTypeID.toString()
        : '',
      user_group_status: props?.selectedCardData?.responseKey
        ? props?.selectedCardData?.responseKey
        : '',
      smc_id: searchQueryParams ? searchQueryParams?.RegistrationCouncilId : '',
      name: searchQueryParams ? searchQueryParams?.filterByName : '',
      nmr_id: searchQueryParams ? searchQueryParams?.filterByRegNo : '',
      page_no: data.pageNo,
      offset: data.offset,
      sort_by: '',
      sort_order: '',
      search: data.search,
      value: data.value,
    };

    dispatch(getDashboardTableData(reqObj));
  };
  return (
    <Grid sx={{ m: 2 }}>
      <TableSearch
        searchParams={searchParams}
        exportData={dashboardTableDetails}
        flag={'dashboardTableDetails'}
        value={props?.selectedCardData?.value}
      />
      <GenericTable
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        tableHeader={dataHeader}
        data={newRowsData}
        rowsPerPage={rowsPerPage}
        page={page}
      />
      <Box>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={dashboardTableDetails?.data?.total_no_of_records}
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
