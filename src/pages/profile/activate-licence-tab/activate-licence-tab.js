import { useEffect, useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, Grid, IconButton, TablePagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { workflowStatusId } from '../../../helpers/functions/common-functions';
import ApproveLicenseModal from '../../../shared/activate-licence-modals/approve-modal';
import RejectLicenseModal from '../../../shared/activate-licence-modals/reject-modal';
import GenericTable from '../../../shared/generic-component/generic-table';
import AttachmentViewPopup from '../../../shared/query-modal-popup/attachement-view-popup';
import ViewProfile from '../../../shared/view-profile/view-profile';
import { getActivateLicenseList } from '../../../store/actions/common-actions';
import successToast from '../../../ui/core/toaster';
import UserProfile from '../../user-profile';
import BreadcrumbsCompnent from '../components/breadcrums';
import TableSearch from '../components/table-search/table-search';

const ActivateLicence = () => {
  const dispatch = useDispatch();

  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { activateLicenseList } = useSelector((state) => state?.common);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRowData, setRowData] = useState({});
  const [showViewProfile, setShowViewPorfile] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [reactiveLicenseRequestHPApplicationData, setReactiveLicenseRequestHPApplicationData] =
    useState();
  const [attachmentViewIndex, setAttachmentViewIndex] = useState();
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);

  function createData(
    SNo,
    registrationNo,
    nameofApplicant,
    dateOfSubmission,
    reactivationFromDate,
    typeOfSuspension,
    Remark,
    RequestId,
    attachments,
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
      RequestId,
      attachments,
      Action,
    };
  }

  const dataHeader = [
    { title: 'S.No.', name: 'SNo', sorting: true, type: 'string' },
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
    { title: 'Submission Date', name: 'dateOfSubmission', sorting: true, type: 'date' },

    { title: 'Reactivation From Date', name: 'reactivationFromDate', sorting: true, type: 'date' },
    {
      title: 'Suspension Type',
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
      title: 'Request ID',
      name: 'RequestId',
      sorting: true,
      type: 'string',
    },
    { title: 'Attachment', name: 'attachments', sorting: false },
    {
      title: 'Action',
      name: 'Action',
      sorting: true,
      type: 'string',
    },
  ];

  useEffect(() => {
    setPage(0);
    getTableData(1);
  }, []);

  const getTableData = (pageNo) => {
    let ActivateLicenseListbody = {
      pageNo: pageNo,
      offset: 10,
    };

    try {
      dispatch(getActivateLicenseList(ActivateLicenseListbody)).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };
  const viewNameOfApplicant = (event, row) => {
    event.preventDefault();
    event.stopPropagation();
    setRowData(row);
    setShowViewPorfile(true);
  };

  const handleDataRowClick = (dataRow) => {
    setRowData(dataRow);
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
      let ActivateLicenseListbody = {
        pageNo: 1,
        offset: 10,
        sortBy: orderBy?.name,
        sortOrder: order,
      };
      dispatch(getActivateLicenseList(ActivateLicenseListbody));
    }
  }, [order, orderBy, dispatch]);

  const newRowsData =
    activateLicenseList?.data?.health_professional_details?.length >= 1
      ? activateLicenseList?.data.health_professional_details.map((application, index) => {
          return createData(
            { type: 'SNo', value: index + 1 },
            {
              type: 'registrationNo',
              value: application?.registration_id,
            },
            {
              type: 'nameofApplicant',
              value: application?.health_professional_name,
              callbackNameOfApplicant: viewNameOfApplicant,
            },
            {
              type: 'dateOfSubmission',
              value: application?.submitted_date,
            },
            {
              type: 'reactivationFromDate',
              value: application?.reactivation,
            },
            { type: 'typeOfSuspension', value: workflowStatusId(application?.type_of_suspension) },
            {
              type: 'Remark',
              value: application?.remarks,
            },
            {
              type: 'RequestId',
              value: application?.request_id,
            },
            {
              type: 'attachments',
              isIcon: true,
              iconToolTip: 'View Attachment',
              value: (
                <Box>
                  <IconButton>
                    <AttachFileIcon
                      fontSize="10px"
                      onClick={(e) => {
                        e.preventDefault();
                        setAttachmentViewIndex(index);
                        setAttachmentViewProfile(true);
                      }}
                    />
                  </IconButton>
                </Box>
              ),
            }
          );
        })
      : [];

  const searchParams = (data) => {
    let ActivateLicenseListbody = {
      pageNo: 1,
      offset: 10,
    };
    if (data) {
      ActivateLicenseListbody.search = data?.search;
      ActivateLicenseListbody.value = data?.value;
      try {
        dispatch(getActivateLicenseList(ActivateLicenseListbody)).then(() => {});
      } catch (allFailMsg) {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getTableData(newPage + 1);
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
          onClick: () => {},
        },
        {
          keyName: 'Reject',
          dataValue: 'reject',
          onClick: (event, selectedRow) => {
            setReactiveLicenseRequestHPApplicationData(selectedRow);
            // setIsRejectModalOpen(true);
          },
        },
      ]
    : undefined;

  // const fetchReActivateLicenseHealthProfessionalId = (selectedRow, selectedStatus) => {
  //   let reActivateLicenseHealthProfessionalIdBody = {
  //     request_id: selectedRow?.Action.value,
  //     application_type_id: 5,
  //     actor_id: loggedInUserType === 'SMC' ? 2 : loggedInUserType === 'NMC' ? 3 : 0,
  //     action_id: selectedStatus === 'approve' ? 4 : 5,
  //     hp_profile_id: selectedRow?.registrationNo?.value,
  //     start_date: selectedRow?.dateOfSubmission?.value,
  //     end_date: selectedRow?.reactivationFromDate?.value,
  //     remarks: selectedRow?.Remark?.value,
  //   };
  //   try {
  //     dispatch(reActivateLicenseStatus(reActivateLicenseHealthProfessionalIdBody)).then(
  //       (response) => {
  //         if (response.data.message === 'Success') {
  //           setIsApproveModalOpen(true);
  //           setReactiveLicenseRequestHPApplicationData(selectedRow);
  //         }
  //       }
  //     );
  //   } catch (allFailMsg) {
  //     successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
  //   }
  // };

  function handleBreadCrumClick(event) {
    event.preventDefault();
    if (event.target.id === '1') {
      setShowViewPorfile(false);
    } else if (event.target.id === '2') {
      setShowViewPorfile(false);
    }
  }
  const onClickBackButtonHandler = () => {
    if (showViewProfile) {
      setShowViewPorfile(false);
    }
  };

  return (
    <Grid p={1}>
      <Grid item xs={12} sm="auto" sx={{ mr: { xs: 0, sm: 'auto' } }} p={2}>
        <Typography variant="h2" color="textPrimary.main">
          Activate Licence
        </Typography>
      </Grid>
      {showViewProfile ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              <BreadcrumbsCompnent
                showViewProfile={showViewProfile}
                handleBreadCrumClick={handleBreadCrumClick}
                levelOneText="Activate License Applications"
                levelthreeText="View Profile"
              />
            </Grid>
            <Grid item xs={6}>
              <Box align="right" mt={2} mr={2}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white.main',
                    ml: 2,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'white.main',
                    },
                  }}
                  onClick={onClickBackButtonHandler}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box px={2}>
            <ViewProfile />
            <UserProfile
              showViewProfile={true}
              selectedRowData={
                activateLicenseList?.data.health_professional_details[
                  selectedRowData?.SNo?.value - 1
                ]
              }
              tabName={'Activate License'}
            />
          </Box>
        </>
      ) : (
        <Grid sx={{ m: 2 }} lg={12} md={12}>
          <Grid>
            <TableSearch
              data-testid="tab-heading"
              searchParams={searchParams}
              exportData={activateLicenseList}
              flag={'ActivateList'}
            />
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
          {newRowsData?.length !== 0 && (
            <Box>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={activateLicenseList?.data?.total_no_of_records || 0}
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
      )}
      {isApproveModalOpen && (
        <ApproveLicenseModal
          ClosePopup={() => {
            setIsApproveModalOpen(false);
          }}
          reactiveLicenseRequestHPApplicationData={reactiveLicenseRequestHPApplicationData}
        />
      )}
      {isRejectModalOpen && (
        <RejectLicenseModal
          ClosePopup={() => {
            setIsRejectModalOpen(false);
          }}
          reactiveLicenseRequestHPApplicationData={reactiveLicenseRequestHPApplicationData}
        />
      )}
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={
            activateLicenseList?.data.health_professional_details[attachmentViewIndex]
              ?.reactivation_file
          }
          closePopup={() => {
            setAttachmentViewProfile(false);
          }}
          alt={'Re-Activation Certificate'}
          certFileType={
            activateLicenseList?.data.health_professional_details[attachmentViewIndex]?.file_type
          }
        />
      )}
    </Grid>
  );
};

export default ActivateLicence;
