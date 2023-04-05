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

function WorkDetailsTable({ FacilityData, trackStatusData }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});
  verboseLog('selectedRowData', selectedRowData, FacilityData, trackStatusData);

  const dataHeader = [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'string',
    },
    {
      title: 'State',
      name: 'state',
      type: 'string',
    },
    { title: 'District', name: 'district', type: 'string' },
    {
      title: 'Type',
      name: 'type',
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

  [
    {
      facilityId: 'IN0910000076',
      facilityName: 'King Georges Medical University Lucknow',
      ownership: 'Government',
      ownershipCode: 'G',
      stateName: 'UTTAR PRADESH',
      stateLGDCode: '9',
      districtName: 'LUCKNOW',
      subDistrictName: 'Malihabad',
      districtLGDCode: '162',
      subDistrictLGDCode: '819',
      villageCityTownLGDCode: '',
      address: 'main road, ',
      pincode: '110092',
      latitude: '28.6958080000001',
      longitude: '77.2061630000001',
      systemOfMedicineCode: 'M',
      systemOfMedicine: 'Modern Medicine(Allopathy)',
      facilityTypeCode: '5',
      facilityStatus: 'Submitted',
      facilityType: 'Hospital',
    },
  ]?.map((application) => {
    return createData(
      {
        type: 'name',
        value: application?.facilityName,
      },
      {
        type: 'address',
        value: application?.address,
      },
      {
        type: 'state',
        value: application?.stateName,
      },
      {
        type: 'district',
        value: application.districtName,
      },
      {
        type: 'type',
        value: application?.facilityType,
      },

      { type: 'systemOfMedicine', value: application?.systemOfMedicine },
      { type: 'department', value: application?.department },
      { type: 'designation', value: application?.designation }
    );
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid sx={{ mx: 2 }} p={'0px'}>
      <GenericTable
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        tableHeader={dataHeader}
        data={FacilityData ? FacilityData : []}
        handleRowClick={handleDataRowClick}
        rowsPerPage={rowsPerPage}
        page={page}
      />
      <Box>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={trackStatusData?.total_no_of_records || '0'}
          rowsPerPage={rowsPerPage}
          page={page}
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
