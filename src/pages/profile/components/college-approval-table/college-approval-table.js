import React, { useEffect } from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import GenericTable from '../../../../shared/generic-component/generic-table';
import { getCollegeAdminProfileData } from '../../../../store/actions/college-actions';
import { getCollegeApprovalData } from '../../../../store/actions/nmc-actions';
import successToast from '../../../../ui/core/toaster';
import TableSearch from '../table-search/table-search';

function createData(
  SNo,
  id,
  collegeId,
  collegeName,
  nameofStateCouncil,
  councilVerificationStatus,
  dateofSubmission,
  pendency,
  view
) {
  return {
    SNo,
    id,
    collegeId,
    collegeName,
    nameofStateCouncil,
    councilVerificationStatus,
    dateofSubmission,
    pendency,
    view,
  };
}
function CollegeApprovalTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  //const [selectedRowData, setRowData] = React.useState({});
  const [searchQueryParams, setSearchQueryParams] = React.useState();
  const { collegeApprovalData } = useSelector((state) => state.nmc);
  const { initiateCollegeWorkFlow } = useSelector((state) => state.college);

  verboseLog('selectedRowData', initiateCollegeWorkFlow);
  const dispatch = useDispatch();

  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'College ID',
      name: 'collegeId',
      sorting: true,
      type: 'string',
    },
    {
      title: 'College Name',
      name: 'collegeName',
      sorting: true,
      type: 'string',
    },
    { title: 'State Medical Council', name: 'nameofStateCouncil', sorting: true, type: 'string' },
    {
      title: 'Council Status',
      name: 'councilVerificationStatus',
      sorting: true,
      type: 'string',
    },
    { title: 'Submission Date', name: 'dateofSubmission', sorting: true, type: 'date' },
    { title: 'Pendency (in days)', name: 'pendency', sorting: true, type: 'string' },
    { title: 'View', name: 'view', sorting: false, type: 'string' },
  ];

  const searchParams = (data) => {
    setSearchQueryParams(data);
  };

  useEffect(() => {
    setPage(0);
    getTableData(1, 10);
  }, [searchQueryParams]);

  const getTableData = (pageNo, noOfRecords) => {
    const queryObj = {
      pageNo: pageNo,
      offset: noOfRecords,
      // search: searchQueryParams ? searchQueryParams?.search : '',
      // id: searchQueryParams ? searchQueryParams?.filterByRegNo : '',
      // name: searchQueryParams ? searchQueryParams?.filterByName : '',
      // council: searchQueryParams ? searchQueryParams?.RegistrationCouncilId : '',
    };
    if (searchQueryParams) {
      queryObj.search = searchQueryParams?.search;
      queryObj.id = searchQueryParams?.filterByRegNo;
      queryObj.name = searchQueryParams?.filterByName;
      queryObj.council = searchQueryParams?.RegistrationCouncilId;
    }
    dispatch(getCollegeApprovalData(queryObj));
  };

  const handleDataRowClick = () => {
    //setRowData(dataRow);
  };

  const viewCallback = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    // setRowData(row);
    props.setShowViewPorfile(true);
    props.setShowTable(false);
    dispatch(getCollegeAdminProfileData(row?.id?.value)).catch((error) => {
      successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const newRowsData = collegeApprovalData?.data?.college_details?.map((collegeApproval, index) => {
    return createData(
      { type: 'SNo', value: index + 1 },
      {
        type: 'id',
        value: collegeApproval?.id,
      },
      {
        type: 'College Id',
        value: collegeApproval?.college_id,
      },
      {
        type: 'College Name',
        value: collegeApproval?.college_name,
      },
      {
        type: 'nameofStateCouncil',
        value: collegeApproval?.council_name,
      },
      {
        type: 'councilVerificationStatus',
        value: collegeApproval?.status,
      },

      {
        type: 'dateofSubmission',
        value: moment(collegeApproval?.submitted_on).format('DD-MM-YYYY'),
      },
      { type: 'pendency', value: collegeApproval?.pendency },
      { type: 'view', value: 'View', onClickCallback: viewCallback }
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
    setPage(0);
  };

  return (
    <Grid sx={{ m: 2 }}>
      <Typography variant="h2" py={2}>
        College Applications Pending List
      </Typography>
      <TableSearch
        searchParams={searchParams}
        exportData={collegeApprovalData}
        flag={'collegeApprovalData'}
      />
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
          rowsPerPageOptions={[]}
          component="div"
          count={collegeApprovalData?.data?.total_no_of_records || 0}
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

export default React.memo(CollegeApprovalTable);
