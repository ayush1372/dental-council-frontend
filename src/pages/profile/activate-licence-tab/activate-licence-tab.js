import { useState } from 'react';

import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../../config/debug';
import { ActivateLicenceData } from '../../../constants/common-data';
import ApproveLicenseModal from '../../../shared/activate-licence-modals/approve-modal';
import RejectLicenseModal from '../../../shared/activate-licence-modals/reject-modal';
import GenericTable from '../../../shared/generic-component/generic-table';
import ViewProfile from '../../../shared/view-profile/view-profile';
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
    { title: 'Date of submission', name: 'dateOfSubmission', sorting: true, type: 'date' },

    { title: 'Reactivation from date', name: 'reactivationFromDate', sorting: true, type: 'date' },
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
  const newRowsData = ActivateLicenceData.message?.map((application) => {
    return createData(
      { type: 'SNo', value: application.SNo },
      {
        type: 'registrationNo',
        value: application?.registrationNo,
      },
      {
        type: 'nameofApplicant',
        value: application.ApplicantName,
        callbackNameOfApplicant: viewNameOfApplicant,
      },
      {
        type: 'dateOfSubmission',
        value: application.DateOfSubmission,
      },
      {
        type: 'reactivationFromDate',
        value: application.DateOfReactivation,
      },
      { type: 'typeOfSuspension', value: application.TypeOfsuspension },
      {
        type: 'Remark',
        value: application.Remark,
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
          onClick: () => {
            setIsApproveModalOpen(true);
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

  return (
    <>
      {showViewProfile ? (
        <Box bgcolor="grey1.lighter">
          <ViewProfile />
          <UserProfile showViewProfile={true} />
        </Box>
      ) : (
        <Grid sx={{ m: 2 }} lg={12} md={10}>
          <Grid item>
            <Typography variant="h2" data-testid="tab-heading">
              Application Requests
            </Typography>
          </Grid>
          <Grid mt={3}>
            <TableSearch />
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
