import React, { useEffect } from 'react';

import { Box, Button, Grid, TablePagination, Dialog, DialogContent, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Download } from '@mui/icons-material';

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
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [workFlowStatus, setWorkFlowStatus] = React.useState(props?.selectedCardData?.name)
  // const [selectedRowData, setRowData] = React.useState({});
  const dispatch = useDispatch();
  const [searchQueryParams, setSearchQueryParams] = React.useState();
  const { dashboardTableDetails } = useSelector((state) => state.dashboard);
  const smcProfile = useSelector((state) => state?.smc?.smcProfileData?.data?.state_medical_council);
  const nmcProfile = useSelector((state) => state?.nmc?.nmcProfileData?.data?.state_medical_council);
  const userProfile = useSelector((state) => state?.loginReducer?.loginData?.data?.user_type)

  const [stateId, setStateId] = React.useState(userProfile == 4 ?
    nmcProfile?.id : smcProfile?.id)

  if (workFlowStatus == 'Pending by SDC') {
    setWorkFlowStatus('Pending');
  }
  if (workFlowStatus == 'Approved by SDC') {
    setWorkFlowStatus('Approved');
  }
  if (workFlowStatus == 'Query Raised by SDC') {
    setWorkFlowStatus('Query Raised');
  }
  if (workFlowStatus == 'Rejected by SDC') {
    setWorkFlowStatus('Rejected');
  }


  const downloadButtonClickHandler = () => {
    setOpen(true);
    setLoading(true);
    const applicationTypeId = props?.selectedCardData?.applicationTypeID;
    const baseUrl = process.env.REACT_APP_V1_API_URL;
    const endpoint = baseUrl
      + `/csv/download?applicationTypeId=${applicationTypeId}&userGroupStatus=${workFlowStatus}&stateId=${stateId}`;

    const url = new URL(endpoint);

    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.blob();
      })
      .then(blob => {
        const link = document.createElement('a');
        link.download = `${applicationTypeId == '8' ? 'Additional Qualification' : 'Basic Qualification'} ${workFlowStatus}.csv`;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
      
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 5000)
  };


  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'Request ID',
      name: 'requestId',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Registration Number',
      name: 'registrationNo',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Applicant Name',
      name: 'nameofApplicant',
      sorting: true,
      type: 'string',
    },
    { title: 'State Dental Council', name: 'nameofStateCouncil', sorting: true, type: 'string' },
    {
      title: 'Council Status',
      name: 'councilVerificationStatus',
      sorting: true,
      type: 'string',
    },
    {
      title: 'College/NBE Status',
      name: 'collegeVerificationStatus',
      sorting: true,
      type: 'string',
    },

    { title: 'Submission Date', name: 'dateofSubmission', sorting: true, type: 'date' },
    { title: 'Pendency (Days)', name: 'pendency', sorting: true, type: 'string' },
    { title: 'Action', name: 'view', sorting: false, type: 'string' },
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
    const capitalize = (str) => {
      if (!str) {
        return '';
      }
      if (str === 'College/NBE Verified') {
        return 'College/NBE verified';
      }
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    return createData(
      { type: 'SNo', value: index + 1 },
      {
        type: 'requestId',
        value: application?.request_id,
        onClickCallback: viewCallback,
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
      { type: 'dateofSubmission', value: application?.created_at },
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
        props?.selectedCardData?.name === 'Pending'
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
      <Grid container>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <TableSearch
            searchParams={searchParams}
            exportData={dashboardTableDetails}
            flag={'dashboardTableDetails'}
            value={props?.selectedCardData?.value}
            setStateId={setStateId}
          />
        </Grid>
        <Grid item lg={1}
          sx={{ display: 'flex', justifyContent: 'right', alignItems: 'start' }} >
          <Button onClick={downloadButtonClickHandler}
            variant="contained"
            color="secondary"
          >
            <Download sx={{ fontSize: "1.5em" }} />
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open}>
        <DialogContent sx={{ textAlign: "center" }}>
          <Box>
            {loading && <CircularProgress size={90} />}
          </Box>
          <h4 style={{ margin: '0' }}>Generating csv... Please Wait.</h4>
        </DialogContent>
      </Dialog>
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
            count={dashboardTableDetails?.data?.total_no_of_records || 0}
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
      )}
    </Grid>
  );
}

export default React.memo(DashboardControlledTable);
