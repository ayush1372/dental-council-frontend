import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button, Dialog, DialogContent, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import tableCellClasses from '@mui/material/TableCell/tableCellClasses';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#224468',
        color: 'white',
        textAlign: 'center', // Center the text in header cells
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        textAlign: 'center',
    },
}));

const baseUrl = process.env.REACT_APP_V1_API_URL;

const StateWiseReport = () => {
    const [loading, setLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [stateWiseData, setStateWiseData] = useState([])

    const handleGetStateWiseReport = async () => {
        setLoading(true)
        try {
            const resp = await fetch(`${baseUrl}/dashboards/statusWiseReport`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            const data = await resp.json();
            setStateWiseData(data);

        } catch (error) {
            console.error('Failed to change user user status:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleCsvDownload = async () => {
        setDownloadLoading(true)
        try {
            const resp = await fetch(`${baseUrl}/dashboards/statusWiseReport?excel=true`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }

            const textData = await resp.text();

            const lines = textData.split('\n');
            const originalHeaders = lines[0];
            const dataRows = lines.slice(1);
            const newHeaders = 'State Dental Council,Draft,Pending with SDC,Forwarded to College,Approved,Query Raised,Rejected';

            const modifiedCsvContent = [newHeaders, ...dataRows].join('\n');

            const blob = new Blob([modifiedCsvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'StateWiseReport.csv');
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download CSV:', error);
            toast.error("Failed to download CSV");
        } finally {
            setDownloadLoading(false);
        }
    };


    useEffect(() => {
        handleGetStateWiseReport();
    }, [])


    return (
        <Paper sx={{ padding: '1rem 1rem 0' }}>
            {downloadLoading &&
                <Dialog open={true}>
                    <DialogContent sx={{ textAlign: "center" }}>
                        <Box>
                            {downloadLoading && <CircularProgress size={90} />}
                        </Box>
                        <h4 style={{ margin: '0' }}>Generating csv... Please Wait.</h4>
                    </DialogContent>
                </Dialog>}
            <Grid container spacing={2} >
                <Grid item xs={12} sm="auto"
                    sx={{
                        mr: { xs: 0, sm: 'auto' },
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <h1 style={{
                        fontSize: '1.8em',
                        marginTop: 0,
                        marginBottom: 0
                    }}>
                        State Wise Report
                    </h1>
                </Grid>

                <Grid item xs={12} sm="auto">
                    <Button
                        fullWidth
                        size='small'
                        variant="contained"
                        color="secondary"
                        justifyContent="center"
                        onClick={handleCsvDownload}
                    >
                        <FileDownloadIcon sx={{ mr: '5px' }} />
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ maxHeight: '510px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell rowSpan={2} width='70px'>S. No.</StyledTableCell>
                            <StyledTableCell rowSpan={2}>State Dental Council</StyledTableCell>
                            <StyledTableCell rowSpan={2} width="100px">Draft</StyledTableCell>
                            <StyledTableCell colSpan={2}>Pending</StyledTableCell>
                            <StyledTableCell rowSpan={2}>Approved</StyledTableCell>
                            <StyledTableCell rowSpan={2} width="100px">Query Raised</StyledTableCell>
                            <StyledTableCell rowSpan={2}>Rejected</StyledTableCell>
                        </TableRow>
                        <TableRow sx={{
                            position: 'sticky',
                            top: '57px',
                        }}>
                            <StyledTableCell >With SDC</StyledTableCell>
                            <StyledTableCell >Forwarded to College </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ?
                            (
                                <StyledTableCell colSpan={8} align='center'
                                >Loading...</StyledTableCell>
                            ) :
                            stateWiseData?.map((row, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{row[0]}</StyledTableCell>
                                    <StyledTableCell>{row[1]}</StyledTableCell>
                                    <StyledTableCell>{row[2]}</StyledTableCell>
                                    <StyledTableCell>{row[3]}</StyledTableCell>
                                    <StyledTableCell>{row[4]}</StyledTableCell>
                                    <StyledTableCell>{row[5]}</StyledTableCell>
                                    <StyledTableCell>{row[6]}</StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StateWiseReport;
