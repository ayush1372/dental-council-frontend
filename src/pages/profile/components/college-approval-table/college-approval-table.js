import React from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';

import { verboseLog } from '../../../../config/debug';
import { collegeApprovalsList } from '../../../../constants/common-data';
import GenericTable from '../../../../shared/generic-component/generic-table';
import TableSearch from '../table-search/table-search';

function createData(
  SNo,
  collegeId,
  collegeName,
  nameofStateCouncil,
  dateofSubmission,
  pendency,
  view
) {
  return {
    SNo,
    collegeId,
    collegeName,
    nameofStateCouncil,
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
  const [selectedRowData, setRowData] = React.useState({});

  verboseLog('selectedRowData', selectedRowData);
  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'College Id',
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
    { title: 'Name of State Council', name: 'nameofStateCouncil', sorting: true, type: 'string' },
    { title: 'Date of Submission', name: 'dateofSubmission', sorting: true, type: 'date' },
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
    props.setShowTable(false);
    props.setCollegeDetails({ ...collegeApprovalsList.message[row['SNo'].value - 1] });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData = collegeApprovalsList.message?.map((collegeApproval) => {
    return createData(
      { type: 'SNo', value: collegeApproval.SNo },
      {
        type: 'College Id',
        value: collegeApproval?.collegeId,
      },
      {
        type: 'College Name',
        value: collegeApproval.collegeName,
      },
      {
        type: 'nameofStateCouncil',
        value: collegeApproval.nameofStateCouncil,
      },
      { type: 'dateofSubmission', value: collegeApproval.dateofSubmission },
      { type: 'pendency', value: collegeApproval.pendency },
      { type: 'view', value: collegeApproval.view, onClickCallback: viewCallback }
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
        College Applications Pending List
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

export default React.memo(CollegeApprovalTable);
