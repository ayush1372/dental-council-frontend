import { useState } from 'react';

import CollegeApprovalTable from '../college-approval-table/college-approval-table';
import CollegeDetails from '../college-details/college-details';

export default function Dashboard() {
  const [showTable, setShowTable] = useState(true);
  const [showViewProfile, setShowViewPorfile] = useState(false);
  const [collegeDetails, setCollegeDetails] = useState(null);

  return (
    <>
      {showTable ? (
        <CollegeApprovalTable
          setShowViewPorfile={setShowViewPorfile}
          setShowTable={setShowTable}
          setCollegeDetails={setCollegeDetails}
        />
      ) : showViewProfile ? (
        <CollegeDetails collegeDetails={collegeDetails} setShowTable={setShowTable} />
      ) : null}
    </>
  );
}
