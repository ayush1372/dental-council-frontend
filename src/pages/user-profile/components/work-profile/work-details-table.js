import React from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import { Checkbox } from '@mui/material';

import { verboseLog } from '../../../../config/debug';
import { capitalizeFirstLetter, toUpperCase } from '../../../../helpers/functions/common-functions';
import GenericTable from '../../../../shared/generic-component/generic-table';
import { TextField } from '../../../../ui/core';

function createData(
  name,
  address,
  state,
  district,
  type,
  systemOfMedicine,
  department,
  designation,
  select
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
    select,
  };
}

function WorkDetailsTable({
  statesList,
  FacilityData,
  trackStatusData,
  facilityDistrict,
  declaredFacilityData,
  setFacilityResponseData,
  setDeclaredFacilityDistrict,
}) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRowData, setRowData] = React.useState({});
  const [currentRowIndex, setCurrentRowIndex] = React.useState(0);

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
    { title: 'Select', name: 'select', type: 'string' },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const viewCallback = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
  };

  const getStateISOCode = (State) => {
    let stateData = [];

    statesList?.map((elementData) => {
      if (elementData.iso_code === State) {
        stateData.push(elementData);
      }
    });

    return stateData[0]?.name;
  };
  const getDistrictISOCode = (District) => {
    let DistrictData = [];
    facilityDistrict?.map((elementData) => {
      if (elementData.iso_code === District) {
        DistrictData.push(elementData);
      }
    });
    return DistrictData[0]?.name;
  };

  const newRowsData = FacilityData?.map((application) => {
    return createData(
      {
        type: 'name',
        value: toUpperCase(application?.name),
      },
      {
        type: 'address',
        value: application?.address?.addressLine1,
      },
      {
        type: 'state',
        value: capitalizeFirstLetter(getStateISOCode(application?.address?.state, true)),
      },
      {
        type: 'district',
        value: getDistrictISOCode(application?.address?.district, true),
      },
      {
        type: 'type',
        value: application?.facilityType,
      },

      { type: 'systemOfMedicine', value: application?.systemOfMedicine },
      {
        type: 'department',
        value: (
          <TextField
            variant="outlined"
            name={'department'}
            fullWidth
            defaultValue={''}
            onChange={(e) => {
              FacilityData[currentRowIndex].department = e.target.value;
              setFacilityResponseData([...FacilityData]);
            }}
          />
        ),
        onClickCallback: viewCallback,
      },
      {
        type: 'designation',
        value: (
          <TextField
            variant="outlined"
            name={'designation'}
            fullWidth
            defaultValue={''}
            onChange={(e) => {
              FacilityData[currentRowIndex].designation = e.target.value;
              setFacilityResponseData([...FacilityData]);
            }}
          />
        ),
        onClickCallback: viewCallback,
      },
      {
        type: 'select',
        value: (
          <Checkbox
            defaultChecked={false}
            onChange={(e) => {
              if (e.target.checked) {
                declaredFacilityData.push(FacilityData[currentRowIndex]);
                setDeclaredFacilityDistrict([...declaredFacilityData]);
              } else {
                declaredFacilityData.splice(currentRowIndex, 1);
                setDeclaredFacilityDistrict([...declaredFacilityData]);
              }
            }}
          />
        ),
        onClickCallback: viewCallback,
      }
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
        data={newRowsData}
        handleRowClick={handleDataRowClick}
        rowsPerPage={rowsPerPage}
        page={page}
        sx={{
          bgcolor: 'red',
        }}
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
