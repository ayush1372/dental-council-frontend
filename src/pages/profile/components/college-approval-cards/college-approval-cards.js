import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import CircularLoader from '../../../../shared/circular-loader/circular-loader';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import CollegeApprovalTable from '../college-approval-table/college-approval-table';
import CollegeDetails from '../college-details/college-details';

export default function Dashboard() {
  const [showTable, setShowTable] = useState(true);
  const [showViewProfile, setShowViewPorfile] = useState(false);
  const { initiateCollegeWorkFlow } = useSelector((state) => state.college);
  const [successModalPopup, setSuccessModalPopup] = useState(false);

  useEffect(() => {
    if (initiateCollegeWorkFlow?.data?.message === 'Success') {
      setSuccessModalPopup(true);
    }
  }, [initiateCollegeWorkFlow?.data?.message]);

  return (
    <>
      {showTable ? (
        <CollegeApprovalTable setShowViewPorfile={setShowViewPorfile} setShowTable={setShowTable} />
      ) : showViewProfile ? (
        <>
          {initiateCollegeWorkFlow?.isLoading ? (
            <Box alignItems={'center'}>
              <CircularLoader />
            </Box>
          ) : (
            <CollegeDetails setShowTable={setShowTable} />
          )}
        </>
      ) : null}

      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'Your requested has Approved/Rejected Successfully'}
        />
      )}
    </>
  );
}
