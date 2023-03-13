import { useEffect, useState } from 'react';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

// import { useSelector } from 'react-redux';
import {
  ActivateLicence,
  CollegeApproval,
  DashboardData,
  TrackApplication,
} from '../../../src/constants/common-data';
import { workSheetTheme } from '../../../src/helpers/functions/common-functions';
import { verboseLog } from '../../config/debug';
import { Button } from '../../ui/core';

const ExportFiles = ({ exportData, flag }) => {
  const [anchorEl, setAnchorEl] = useState(null);
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
      data = exportData;
    }
    if (flag === 'ActivateList') {
      setColumns(ActivateLicence);
      data = exportData?.data?.health_professional_details;
    }
    if (flag === 'dashboardTableDetails') {
      setColumns(DashboardData);
      data = exportData?.data?.dashboard_tolist;
    }
    if (flag === 'collegeApprovalData') {
      setColumns(CollegeApproval);
      data = exportData?.data?.college_details;
    }
    setCsvData(data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      if (docType === 'csv') {
        const buf = await workbook.csv.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.csv`);
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

  const open = Boolean(anchorEl);
  const id = open ? 'table-search-popover' : undefined;
  return (
    <Grid item md={1} xs={12} data-testid="exportButton">
      <Button
        data-testid="export_Button"
        sx={{
          padding: '17px 10px',
          width: {
            xs: '100%',
            md: 'fit-content',
          },
        }}
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        startIcon={<FileUploadOutlinedIcon sx={{ fontSize: '26px', transform: 'rotate(90deg)' }} />}
      ></Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton disablePadding>
              <ListItemText
                primary="Export as xlsx"
                onClick={() => {
                  onExportClick('xlsx');
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClose}>
              <ListItemText
                primary="Export as csv"
                onClick={() => {
                  onExportClick('csv');
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Grid>
  );
};

export default ExportFiles;
