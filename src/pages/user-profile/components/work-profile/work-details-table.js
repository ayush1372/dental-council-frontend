import React from 'react';

// import { useState } from 'react';
import { Box, Grid, TablePagination } from '@mui/material';

// import { Button } from '../../../../ui/core';
import { verboseLog } from '../../../../config/debug';
// import { useDispatch, useSelector } from 'react-redux';
import GenericTable from '../../../../shared/generic-component/generic-table';
// import { Checkbox } from '../../../../ui/core';

function createData(
  name,
  address,
  state,
  district,
  type,
  systemOfMedicine,
  department,
  designation
) {
  return {
    name,
    address,
    state,
    district,
    type,
    systemOfMedicine,
    department,
    designation,
  };
}

function WorkDetailsTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});
  //   const dispatch = useDispatch();
  verboseLog('selectedRowData', selectedRowData, props);

  const dataHeader = [
    {
      title: 'Name',
      name: 'name',
      //   sorting: true,
      type: 'string',
    },
    {
      title: 'Address',
      name: 'address',
      //   sorting: true,
      type: 'string',
    },
    {
      title: 'State',
      name: 'state',
      //   sorting: true,
      type: 'string',
    },
    { title: 'District', name: 'district', type: 'string' },
    {
      title: 'Type',
      name: 'type',
      //   sorting: true,
      type: 'string',
    },
    { title: 'System of Medicine', name: 'systemOfMedicine', type: 'string' },
    { title: 'Department', name: 'department', type: 'string' },
    { title: 'Designation', name: 'designation', type: 'string' },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const newRowsData = [
    {
      name: 'krishna',
      address: 'eluru',
      state: 'andhra',
      district: 'eluru',
      type: 'nursing',
      systemOfMedicine: 'nursing',
      department: 'nursing',
      designation: 'senior',
    },
  ].map((application) => {
    return createData(
      {
        type: 'name',
        value: application?.name,
      },
      {
        type: 'address',
        value: application?.address,
      },
      {
        type: 'state',
        value: application?.state,
      },
      {
        type: 'district',
        value: application.district,
      },
      {
        type: 'type',
        value: application?.type,
      },

      { type: 'systemOfMedicine', value: application?.systemOfMedicine },
      { type: 'department', value: application?.department },
      { type: 'designation', value: application?.designation }
    );
  });

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //     // props.getTableData(newPage + 1);
  //     window.scrollTo({
  //       top: 0,
  //       behavior: 'smooth',
  //     });
  //     let finalSearchData = { ...props.trackValues, pageNo: newPage };
  //     dispatch(trackStatus(finalSearchData));
  //   };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid sx={{ mx: 2 }} p={'0px'}>
      {/* <TableSearch trackApplication /> */}

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
          count={props?.trackStatusData?.total_no_of_records || '0'}
          rowsPerPage={rowsPerPage}
          page={page}
          //   onPageChange={handleChangePage}
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

export default React.memo(WorkDetailsTable);
