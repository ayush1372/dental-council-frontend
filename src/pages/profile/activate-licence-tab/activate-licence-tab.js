import { useEffect, useState } from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../../config/debug';
import ApproveLicenseModal from '../../../shared/activate-licence-modals/approve-modal';
import RejectLicenseModal from '../../../shared/activate-licence-modals/reject-modal';
import GenericTable from '../../../shared/generic-component/generic-table';
import ViewProfile from '../../../shared/view-profile/view-profile';
import {
  getActivateLicenseList,
  reActivateLicenseStatus,
} from '../../../store/actions/common-actions';
import successToast from '../../../ui/core/toaster';
import UserProfile from '../../user-profile';
import TableSearch from '../components/table-search/table-search';

const ActivateLicence = (props) => {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState({});
  const [showViewProfile, setShowViewPorfile] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedRowData, setRowData] = useState({});
  verboseLog(selectedRowData);
  const { activateLicenseList } = useSelector((state) => state?.common);
  const dispatch = useDispatch();

  function createData(
    SNo,
    registrationNo,
    nameofApplicant,
    dateOfSubmission,
    reactivationFromDate,
    typeOfSuspension,
    Remark,
    Action
  ) {
    return {
      SNo,
      registrationNo,
      nameofApplicant,
      dateOfSubmission,
      reactivationFromDate,
      typeOfSuspension,
      Remark,
      Action,
    };
  }

  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
    {
      title: 'IMR ID/ Registration No.',
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
    { title: 'Date of Submission', name: 'dateOfSubmission', sorting: true, type: 'date' },

    { title: 'Reactivation from Date', name: 'reactivationFromDate', sorting: true, type: 'date' },
    {
      title: 'Type of Suspension',
      name: 'typeOfSuspension',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Remark',
      name: 'Remark',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Action',
      name: 'Action',
      sorting: true,
      type: 'string',
    },
  ];
  const viewNameOfApplicant = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
    setShowViewPorfile(true);
    props.setShowHeader(false);
  };

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData =
    activateLicenseList?.data?.health_professional_details?.length >= 1 &&
    activateLicenseList?.data.health_professional_details.map((application, index) => {
      return createData(
        { type: 'SNo', value: index + 1 },
        {
          type: 'registrationNo',
          value: application?.health_professional_id,
        },
        {
          type: 'nameofApplicant',
          value: application.health_professional_name,
          callbackNameOfApplicant: viewNameOfApplicant,
        },
        {
          type: 'dateOfSubmission',
          value: application.submitted_date,
        },
        {
          type: 'reactivationFromDate',
          value: application.reactivation,
        },
        { type: 'typeOfSuspension', value: application.suspension_type },
        {
          type: 'Remark',
          value: application.remarks,
        }
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
  const customPopupOptions = ['NMC', 'SMC'].includes(loggedInUserType)
    ? [
        {
          keyName: 'Approve',
          dataValue: 'approve',
          onClick: (row, rowIndex) => {
            fetchReActivateLicenseHealthProfessionalId();
            setIsApproveModalOpen(true);
            verboseLog(row, rowIndex + 'event,row,rowIndex');
          },
        },
        {
          keyName: 'Reject',
          dataValue: 'reject',
          onClick: () => {
            setIsRejectModalOpen(true);
          },
        },
      ]
    : undefined;

  useEffect(() => {
    let ActivateLicenseListbody = {
      pageNo: page + 1,
      offset: rowsPerPage,
    };
    try {
      dispatch(getActivateLicenseList(ActivateLicenseListbody)).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  }, [page, rowsPerPage]);

  const fetchReActivateLicenseHealthProfessionalId = () => {
    let reActivateLicenseHealthProfessionalIdBody = {
      request_id: 'NMR50055',
      application_type_id: 5,
      actor_id: loggedInUserType === 'SMC' ? 2 : 0,
      action_id: 4,
      hp_profile_id: 411,
      start_date: '2023-02-16T05:43:15.204Z',
      end_date: '2023-02-16T05:43:15.204Z',
      remarks: 'Test',
    };
    try {
      dispatch(reActivateLicenseStatus(reActivateLicenseHealthProfessionalIdBody)).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };

  return (
    <>
      {showViewProfile ? (
        <Box bgcolor="grey1.lighter">
          <ViewProfile />
          <UserProfile showViewProfile={true} />
        </Box>
      ) : (
        <Grid sx={{ m: 2 }} lg={12} md={12}>
          <Grid item>
            <Typography variant="h2" data-testid="tab-heading">
              Application Requests
            </Typography>
          </Grid>
          <Grid mt={3}>
            <TableSearch activateLicence />
          </Grid>
          <GenericTable
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            tableHeader={dataHeader}
            data={newRowsData}
            handleRowClick={handleDataRowClick}
            rowsPerPage={rowsPerPage}
            page={page}
            customPopupOptions={customPopupOptions}
            setIsApproveModalOpen={setIsApproveModalOpen}
          />

          <Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 35, 45]}
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
      )}
      {isApproveModalOpen && (
        <ApproveLicenseModal
          ClosePopup={() => {
            setIsApproveModalOpen(false);
          }}
        />
      )}
      {isRejectModalOpen && (
        <RejectLicenseModal
          ClosePopup={() => {
            setIsRejectModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ActivateLicence;
