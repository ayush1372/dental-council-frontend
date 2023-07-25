import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Dialog, Grid, TablePagination, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { capitalizeFirstLetter } from '../../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import GenericTable from '../../../../shared/generic-component/generic-table';
import { deleteWorkProfileDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
// import successToast from '../../../../ui/core/toaster';

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

function FacilityDetailsTable({ declaredFacilityData, currentWorkDetails }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [defaultFacilityData, setDefaultFacilityData] = useState(declaredFacilityData);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState('');
  const [successDeLinkModalPopup, setSuccessDeLinkModalPopup] = useState(false);

  const dispatch = useDispatch();

  const viewCallback = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    setConfirmationModal(true);
  };

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
    { title: 'Department', name: 'department', type: 'string', flag: 'declareFacility' },
    { title: 'Designation', name: 'designation', type: 'string', flag: 'declareFacility' },
    { title: 'Status', name: 'status', type: 'string' },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const newRowsData = defaultFacilityData?.current_work_details?.map((application) => {
    return createData(
      {
        type: 'name',
        value: application?.work_organization || '-',
      },
      {
        type: 'address',
        value: application?.address?.address_line1 || '-',
      },
      {
        type: 'state',
        value: capitalizeFirstLetter(application?.address?.state?.name) || '-',
      },
      {
        type: 'district',
        value: capitalizeFirstLetter(application?.address?.district?.name) || '-',
      },
      {
        type: 'type',
        value: application?.organization_type || '-',
      },

      { type: 'systemOfMedicine', value: application?.system_of_medicine || '-' },
      { type: 'department', value: application?.department || '-' },
      { type: 'designation', value: application?.designation || '-' },
      { type: 'status', onClickCallback: viewCallback }
    );
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const facilityDeLinkHandler = (facilityIndex) => {
    let facilityID = {
      facility_id: [currentWorkDetails?.[facilityIndex]?.facility_id],
    };
    dispatch(deleteWorkProfileDetailsData(facilityID))
      .then((response) => {
        if (response?.data) {
          setDefaultFacilityData(response?.data);
        }
      })
      .then(() => {
        setConfirmationModal(false);
        setSuccessDeLinkModalPopup(true);
      });
  };

  return (
    <>
      <Grid sx={{ mx: 2 }} p={'0px'}>
        <GenericTable
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          tableHeader={dataHeader}
          data={newRowsData}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        {newRowsData?.length !== 0 && (
          <Box>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={newRowsData?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </Box>
        )}
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
              Are you sure you want to delete this facilty?
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mt={1}>
            <Button
              onClick={() => {
                facilityDeLinkHandler(selectedRowIndex);
              }}
              color="secondary"
              variant="contained"
              sx={{
                margin: '0 4px',
              }}
            >
              Yes
            </Button>
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
          </Box>
        </Box>
      </Dialog>
      {successDeLinkModalPopup && (
        <SuccessModalPopup
          open={successDeLinkModalPopup}
          workDetails={true}
          setOpen={() => setSuccessDeLinkModalPopup(false)}
          text={'Your Work-Details has been De-Linked successfully.'}
        />
      )}
    </>
  );
}

export default React.memo(FacilityDetailsTable);
