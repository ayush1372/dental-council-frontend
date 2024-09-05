import React, { useEffect, useState } from 'react';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Grid,
    styled,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { tableCellClasses } from '@mui/material/TableCell';
// import EditProfile from './edit-profile';
// import CreateUser from './create-user';
import { POST } from '../../../constants/requests';
import { toast } from 'react-toastify';
import { councilList } from '../../../constants/common-data';
import { useSelector } from 'react-redux';
import CreateCollegeVerifier from './create-college-verifier';
import EditCollegeVerifierProfile from './edit-college-verifier';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#224468',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const CollegeVerifierManagement = () => {
    const [loading, setLoading] = useState(false);
    const [statusChangeLoading, setStatusChangeLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [editProfile, setEditProfile] = useState(false);
    const [collegeVerifierList, setSdcProfileList] = useState([]);
    const [collegeList, setCollegeList] = useState([]);
    const [currentProfile, setCurrentProfile] = useState(null);

    const smcProfile = useSelector((state) => state?.smc?.smcProfileData?.data?.state_medical_council);
    const baseUrl = process.env.REACT_APP_V1_API_URL;

    const getCollegeVerifierList = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${baseUrl}/collegeVerifierList/${smcProfile?.id}`);
            if (resp.ok) {
                const data = await resp.json();
                setSdcProfileList(data);
            } else {
                console.error('Failed to fetch the list:', resp.statusText);
            }
        } catch (error) {
            console.error('Error fetching the list:', error);
        } finally {
            setLoading(false);
        }
    }

    const getCollegeList = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${baseUrl}/stateCollegeList/${smcProfile?.id}`);
            if (resp.ok) {
                const data = await resp.json();
                setCollegeList(data);
            } else {
                console.error('Failed to fetch the list:', resp.statusText);
            }
        } catch (error) {
            console.error('Error fetching the list:', error);
        } finally {
            setLoading(false);
        }
    }


    const handleChangeProfileStatus = async (user_id, status) => {
        setStatusChangeLoading(true)
        try {
            const resp = await fetch(`${baseUrl}/user/${user_id}/activate/${status}`, {
                method: POST,
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
            });

            if (resp.ok) {
                if (status === 1)
                    toast.success("User Activation Successful!");
                else toast.success("User Deactivation Successful!")
            } else {
                if (status === 1)
                    toast.error("User Activation Failed!");
                else toast.error("User Deactivation Failed!")
                console.error('Failed to change user status:');
            }
        } catch (error) {
            if (status === 1)
                toast.error("User Activation Failed!");
            else toast.error("User Deactivation Failed!")
            console.error('Failed to change user user status:', error);
        } finally {
            setStatusChangeLoading(false);
        }
    }

    const handleAddUserButtonClick = () => {
        setShowTable(!showTable);
        setEditProfile(false);
        setCurrentProfile(null);
    }

    const handleClose = () => {
        setShowTable(!showTable);
        setEditProfile(false);
        setCurrentProfile(null);
    }
    const editProfileDetails = (profile) => {

        setEditProfile(true);
        setCurrentProfile(profile);
        setShowTable(false);
    }

    useEffect(() => {
        if (statusChangeLoading === false)
            getCollegeVerifierList();
    }, [statusChangeLoading]);

    useEffect(() => {
        getCollegeVerifierList();
        getCollegeList();
        setCurrentProfile(null);
        setShowTable(true);
        setEditProfile(false);
    }, []);

    return (
        <Box sx={{ padding: "1em" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm="auto"
                    sx={{
                        mr: { xs: 0, sm: 'auto' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <h1 style={{
                        fontSize: '1.8em',
                        marginTop: 0,
                        marginBottom: 0
                    }}> {
                            showTable ? "College Verifiers" : editProfile ? "Edit College Verifier" : "Add College Verifier"
                        }
                    </h1>
                </Grid>

                <Grid item xs={12} sm="auto">
                    {showTable &&
                        <Button
                            fullWidth
                            size='small'
                            variant="contained"
                            color="secondary"
                            justifyContent="center"
                            onClick={handleAddUserButtonClick}
                        >
                            <PersonAddIcon sx={{ mr: '5px' }} />
                            New Verifier
                        </Button>}
                </Grid>
            </Grid>
            {loading || statusChangeLoading ? (
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px',
                }}>
                    <CircularProgress size="5rem" />
                    <Typography variant="h2" color="textSecondary" textAlign='center'>
                        Loading... Please Wait
                    </Typography>
                </Box>
            ) : showTable ?
                (<Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1rem' }}>
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ minWidth: '50px' }} align='center'>SL No</StyledTableCell>
                                    {/* <StyledTableCell sx={{ minWidth: '150px' }} align='center'>Name</StyledTableCell> */}
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>College Name</StyledTableCell>
                                    {/* <StyledTableCell sx={{ minWidth: '200px' }} align='center'>SDC</StyledTableCell> */}
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Email ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '150px' }} align='center'>Mobile No</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '100px' }} align='center'>Status</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {collegeVerifierList.map((profile, ind) => (
                                    <TableRow key={profile.id}>
                                        <TableCell sx={{ textAlign: 'center' }}>{ind + 1}</TableCell>

                                        {/* <TableCell sx={{ textAlign: 'center' }}>{profile.first_name} {profile.last_name}</TableCell> */}
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.name}</TableCell>
                                        {/* <TableCell sx={{ textAlign: 'center' }}>
                                            {councilList?.find(item => profile.state_medical_council_id === item.id)?.name}
                                        </TableCell> */}
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.email}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.mobile_number}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.delete_status ? "Inactive" : "Active"}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            padding: '1.5em 0',
                                            gap: '8px'
                                        }}>
                                            <Button
                                                disabled={profile?.delete_status}
                                                variant="contained"
                                                size='small'
                                                color="secondary"
                                                startIcon={<EditIcon sx={{ mr: 1 }} />}
                                                onClick={() => editProfileDetails(profile)}
                                            >
                                                Edit
                                            </Button>
                                            {profile.delete_status === false ?
                                                <Button variant="outlined"
                                                    size='small'
                                                    color="error"
                                                    onClick={() => handleChangeProfileStatus(profile?.user_id, 0)}>
                                                    Deactivate
                                                </Button> :
                                                <Button
                                                    variant="outlined"
                                                    size='small'
                                                    color="success"
                                                    onClick={() => handleChangeProfileStatus(profile?.user_id, 1)}>
                                                    Activate
                                                </Button>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                ) : editProfile ?
                    (
                        <EditCollegeVerifierProfile profile={currentProfile}
                            handleClose={handleClose}
                            handleGetCollegeVerifierList={getCollegeVerifierList}
                        />
                    ) : (
                        <CreateCollegeVerifier handleClose={handleClose}
                            handleGetCollegeVerifierList={getCollegeVerifierList}
                            collegeList={collegeList}
                        />
                    )
            }
        </Box>
    )
}

export default CollegeVerifierManagement;
