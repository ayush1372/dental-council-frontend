import { useEffect, useState } from 'react';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Grid, IconButton, Tooltip } from '@mui/material';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';

import {
  ActivateLicence,
  CollegeApproval,
  DashboardData,
  TrackApplication,
  TrackStatus,
} from '../../../src/constants/common-data';
import { userActionId, workSheetTheme } from '../../../src/helpers/functions/common-functions';
import { verboseLog } from '../../config/debug';

const ExportFiles = ({ exportData, flag }) => {
  
  const [csvData, setCsvData] = useState([]);
  const [docType, setDocType] = useState();
  const [columns, setColumns] = useState([]);

  const workbook = new Excel.Workbook();
  const workSheetName = 'Worksheet-1';

  const onExportClick = (type) => {
    setDocType(type);
    let data;

    if (flag === 'trackApplicationData') {
      setColumns(TrackApplication);

      data = exportData?.map((elementData) => {
        if (elementData.created_at) {
          return {
            request_id: elementData.request_id,
            application_type_name: elementData?.application_type_name,
            created_at: moment(elementData?.created_at).format('DD-MM-YYYY hh:mm A'),
            doctor_status: elementData?.doctor_status,
            pendency: elementData?.pendency,
          };
        } else {
          return elementData;
        }
      });
    }
    if (flag === 'trackStatusData') {
      setColumns(TrackStatus);

      data = exportData?.health_professional_applications?.map((elementData) => {
        if (elementData?.created_at) {
          return {
            request_id: elementData?.request_id,
            registration_no: elementData?.registration_no,
            applicant_full_name: elementData?.applicant_full_name,
            council_name: elementData?.council_name,
            smc_status: elementData?.smc_status,
            college_status: elementData?.college_status,
            nmc_status: elementData?.nmc_status,
            created_at: moment(elementData?.created_at).format('DD-MM-YYYY hh:mm A'),
            pendency: elementData?.pendency,
          };
        } else {
          return elementData;
        }
      });
    }
    if (flag === 'ActivateList') {
      setColumns(ActivateLicence);
      data = exportData?.data?.health_professional_details?.map((elementData) => {
        return {
          registration_id: elementData.registration_id,
          health_professional_name: elementData?.health_professional_name,
          submitted_date: moment(elementData?.reactivation).format('DD-MM-YYYY hh:mm A'),
          created_at: moment(elementData?.submitted_date).format('DD-MM-YYYY hh:mm A'),
          typeOfSuspension: userActionId(elementData.type_of_suspension),
          remarks: elementData?.remarks,
          request_id: elementData.request_id,
        };
      });
    }
    if (flag === 'dashboardTableDetails') {
      setColumns(DashboardData);
      data = exportData?.data?.dashboard_tolist?.map((elementData) => {
        if (elementData.created_at) {
          return {
            registration_no: elementData.registration_no,
            applicant_full_name: elementData?.applicant_full_name,
            council_name: elementData.council_name,
            college_dean_status: elementData?.college_status,
            smc_status: elementData?.smc_status,
            nmc_status: elementData.nmc_status,
            created_at: moment(elementData?.created_at).format('DD-MM-YYYY HH:mm'),
            doctor_status: elementData?.doctor_status,
            pendency: elementData?.pendency,
          };
        } else {
          return elementData;
        }
      });
    }
    if (flag === 'collegeApprovalData') {
      setColumns(CollegeApproval);
      data = exportData?.data?.college_details;
    }
    setCsvData(data);
  };

  useEffect(() => {
    if (csvData?.length > 0) {
      saveExcel();
    }
  }, [csvData]);

  const saveExcel = async () => {
    try {
      const fileName = 'Application_Data';
      const worksheet = workbook.addWorksheet('Council_Info');

      worksheet.columns = columns;
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = workSheetTheme;
      worksheet.columns.forEach((column) => {
        if (column.header === 'Date of Submission') {
          column.header = 'Date of Submission (DD-MM-YYYY HH:MM )';
        }
        if (column.header === 'Pendency') {
          column.header = 'Pendency (Days)';
        }
        column.width = column.header.length + 20;
      });

      csvData.forEach((singleData) => {
        worksheet.addRow(singleData);
      });

      worksheet.eachRow({ includeEmpty: false }, (row) => {
        const currentCell = row._cells;
        currentCell.forEach((singleCell) => {
          const cellAddress = singleCell._address;
          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });

      if (docType === 'xlsx') {
        const buf = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
      }
    } catch (error) {
      verboseLog('<<<ERRROR>>>', error);
      verboseLog('Something Went Wrong', error.message);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet(workSheetName);
      setCsvData([]);
    }
  };

  return (
    <Grid item md={1} xs={12} data-testid="exportButton">
      <Tooltip title={'Export'}>
        <IconButton
          disabled={exportData.data.dashboard_tolist.length === 0}
          data-testid="export_Button"
          aria-label="fontSize-options"
          aria-controls="menu-appbar"
          variant="contained"
          aria-haspopup="true"
          sx={{
            width: 60,
            height: 60,
          }}
          onClick={(e) => {
            e.preventDefault();
            onExportClick('xlsx');
          }}
        >
          <FileDownloadOutlinedIcon
            sx={{
              width: 40,
              height: 40,
              color: exportData.data.dashboard_tolist.length === 0? '' : 'blue',
            }}
          />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default ExportFiles;
