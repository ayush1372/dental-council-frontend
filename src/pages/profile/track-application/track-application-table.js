import React, { useEffect } from 'react';

import { Box, Grid, TablePagination } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import GenericTable from '../../../shared/generic-component/generic-table';
import {
  getDoctorTrackApplicationData,
  getDoctorTrackApplicationStatus,
} from '../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../ui/core/toaster';
import TableSearch from '../components/table-search/table-search';

function createData(
  SNo,
  registration_no,
  request_id,
  applicant_full_name,
  application_type_name,
  nameofStateCouncil,
  doctor_status,
  collegeVerificationStatus,
  NMCVerificationStatus,
  created_at,
  smc_action_date,
  college_registrar_action_date,
  college_dean_action_date,
  nmc_action_date,
  smc_status,
  nmc_status,
  pendency,
  view
) {
  return {
    SNo,
    registration_no,
    request_id,
    applicant_full_name,
    application_type_name,
    nameofStateCouncil,
    doctor_status,
    collegeVerificationStatus,
    NMCVerificationStatus,
    created_at,
    smc_action_date,
    college_registrar_action_date,
    college_dean_action_date,
    nmc_action_date,
    smc_status,
    nmc_status,
    pendency,
    view,
  };
}
function TrackAppicationTable({
  userType,
  setShowTrackApplication,
  setShowTrackApplicationTable,
  setShowUserProfile,
  getTableData,
  profileId,

  setRowData,
}) {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const tableData = useSelector((state) => state.common.trackApplicationTableData);

  let trackData = {
    pageNo: 1,
    offset: 10,
  };

  useEffect(() => {
    if (orderBy && getTableData && page !== null && profileId)
      dispatch(getTableData(profileId, trackData));
  }, [orderBy, getTableData, page, profileId]);
  useEffect(() => {
    dispatch(getTableData(profileId, trackData));
    window.scrollTo(0, 0);
  }, []);

  const viewNameOfApplicant = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
    setShowUserProfile(true);
    setShowTrackApplicationTable(false);
  };

  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'Request ID',
      name: 'registration_no',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Type of Application',
      name: 'application_type_name',
      sorting: true,
      type: 'string',
    },

    { title: 'Date of Submission', name: 'created_at', sorting: true, type: 'date' },
    {
      title: 'Current Status',
      name: 'doctor_status',
      sorting: true,
      type: 'string',
    },
    { title: 'Pendency (in days)', name: 'pendency', sorting: true, type: 'string' },
    { title: 'Action', name: 'view', sorting: false, type: 'string' },
  ];

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };
  const viewCallback = (event, row) => {
    dispatch(getDoctorTrackApplicationStatus(row?.request_id?.value))
      .then(() => {
        setShowTrackApplication(true);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setShowTrackApplicationTable(false);
        event.preventDefault();
        event.stopPropagation();
        setRowData(row);
      })
      .catch((error) => {
        successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData = tableData?.data?.data?.health_professional_applications?.map(
    (data, index) => {
      return createData(
        { type: 'SNo', value: index + 1 },

        {
          type: 'registration_no',
          value: data?.request_id,
        },
        {
          type: 'request_id',
          value: data?.request_id,
        },
        {
          type: 'applicant_full_name',
          value: data?.applicant_full_name,
          callbackNameOfApplicant: viewNameOfApplicant,
        },

        {
          type: 'application_type_name',
          value: data?.application_type_name,
        },

        {
          type: 'nameofStateCouncil',
          value: data?.council_name,
        },
        {
          type: 'doctor_status',
          value:
            data?.work_flow_status_id === 1
              ? 'PENDING'
              : data?.work_flow_status_id === 2
              ? 'APPROVED'
              : data?.work_flow_status_id === 3
              ? 'QUERY RAISED'
              : data?.work_flow_status_id === 4
              ? 'REJECTED'
              : data?.work_flow_status_id === 5
              ? 'SUSPENDED'
              : 'SUSPENDED',
        },

        {
          type: 'collegeVerificationStatus',
          value: data?.college_dean_status,
        },
        { type: 'NMCVerificationStatus', value: data?.college_registrar_status },
        { type: 'created_at', value: moment(data?.created_at).format('DD-MM-YYYY') },
        { type: 'smc_action_date', value: data?.smc_action_date },
        { type: 'college_registrar_action_date', value: data?.college_registrar_action_date },
        { type: 'college_dean_action_date', value: data?.college_dean_action_date },
        { type: 'nmc_action_date', value: data?.nmc_action_date },
        {
          type: 'smc_status',
          value: data?.smc_status,
        },
        {
          type: 'nmc_status',
          value: data?.nmc_status,
        },
        { type: 'pendency', value: data?.pendency },

        { type: 'view', value: data?.view || 'View', onClickCallback: viewCallback }
      );
    }
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  let updatedvalue = 0;
  const handleChangePage = (event, newPage) => {
    if (page < newPage) {
      setPage(newPage);
      updatedvalue = newPage + 1;
    }
    if (page > newPage) {
      setPage(newPage);
      updatedvalue(page - 1);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    let finalTrackData = { ...trackData, pageNo: updatedvalue };
    dispatch(getTableData(profileId, finalTrackData));
  };

  const searchParams = (data, profileId) => {
    dispatch(getDoctorTrackApplicationData(profileId, data));
  };

  return (
    <Grid>
      {/* <Typography variant="h2" py={3} bgcolor={`${theme.palette.white.main}`} mb={2} px={3}>
        Track Application
      </Typography>    */}
      <TableSearch
        searchParams={searchParams}
        trackApplication={userType}
        exportData={tableData?.data?.data?.health_professional_applications}
        flag={'trackApplicationData'}
      />
      <Box>
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
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={tableData?.data?.data?.total_no_of_records || 0}
          page={page}
          rowsPerPage={rowsPerPage}
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

export default React.memo(TrackAppicationTable);
