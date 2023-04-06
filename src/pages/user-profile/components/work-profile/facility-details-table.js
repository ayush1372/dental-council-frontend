import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
// import { useState } from 'react';
import { Box, Button, Dialog, Grid, TablePagination, Typography } from '@mui/material';

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
  designation,
  status
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
    status,
  };
}

function FacilityDetailsTable({ declaredFacilityData, trackStatusData }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [selectedRowData, setRowData] = React.useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  //   const dispatch = useDispatch();
  verboseLog('selectedRowData', selectedRowData);

  const handleStatusClick = () => {
    setConfirmationModal(true);
  };

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
    { title: 'Department', name: 'department', type: 'string', flag: 'declareFacility' },
    { title: 'Designation', name: 'designation', type: 'string', flag: 'declareFacility' },
    { title: 'Status', name: 'status', type: 'string' },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const newRowsData = declaredFacilityData.map((application) => {
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
      { type: 'designation', value: application?.designation },
      { type: 'status', onClickCallback: handleStatusClick }
    );
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
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
            count={trackStatusData?.total_no_of_records || '0'}
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
      <Dialog
        open={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
        }}
      >
        <Box p={2} width="410px" height="200">
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            data-testid="message"
          >
            <ErrorIcon color="error" sx={{ fontSize: '30px' }} />
            <Typography color="textPrimary.main" variant="h3" p={1}>
              Alert!
            </Typography>
            <CloseIcon
              onClick={() => {
                setConfirmationModal(false);
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography color="textPrimary.main">
              Are you sure you want to delink this facilty?
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mt={1}>
            <Button
              onClick={() => {
                setConfirmationModal(false);
              }}
              data-testid="confirmModal"
              color="grey"
              variant="contained"
              sx={{
                margin: '0 4px',
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {}}
              color="secondary"
              variant="contained"
              sx={{
                margin: '0 4px',
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default React.memo(FacilityDetailsTable);
