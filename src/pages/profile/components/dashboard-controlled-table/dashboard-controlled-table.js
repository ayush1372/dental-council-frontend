import React, { useEffect } from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import { applications } from '../../../../constants/common-data';
import GenericTable from '../../../../shared/generic-component/generic-table';
import { getDashboardTableData } from '../../../../store/actions/dashboard-actions';
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
  const [selectedRowData, setRowData] = React.useState({});
  const dispatch = useDispatch();

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
    props.getSelectedRowData(row);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData = applications.message?.map((application, index) => {
    return createData(
      { type: 'SNo', value: index + 1 },
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
      { type: 'view', value: application.view, onClickCallback: viewCallback },
      { type: 'profileID', value: application.hp_profile_id }
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

  // eslint-disable-next-line no-console
  console.log('12345 props?.selectedCardDataData', props?.selectedCardDataData);

  useEffect(() => {
    const requestObj = {
      work_flow_status_id: '',
      application_type_id: props?.selectedCardDataData?.applicationTypeID
        ? props?.selectedCardDataData?.applicationTypeID.toString()
        : '',
      user_group_status: props?.selectedCardDataData?.responseKey
        ? props?.selectedCardDataData?.responseKey
        : '',
      smc_id: '',
      name: '',
      nmr_id: '',
      search: '',
      page_no: 0,
      size: 10,
      sort_by: '',
      sort_order: '',
    };
    dispatch(getDashboardTableData(requestObj));
  }, []);

  return (
    <Grid sx={{ m: 2 }}>
      <Typography variant="h2" py={2}>
        Applications Pending List
      </Typography>
      <TableSearch />
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
          count={props.showTable?.count || newRowsData.length}
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
