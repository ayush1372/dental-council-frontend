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
    styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { tableCellClasses } from '@mui/material/TableCell';
import EditProfile from './edit-profile';
import CreateUser from './create-user';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#224468',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const AdminUserManagement = () => {
    const [loading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [editProfile, setEditProfile] = useState(false);
    const [sdcProfileList, setSdcProfileList] = useState([]);
    const [currentProfile, setCurrentProfile] = useState(null);
    const baseUrl = process.env.REACT_APP_V1_API_URL;

    const getSdcProfileList = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${baseUrl}/sdc-list`);
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
        getSdcProfileList();
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
                            showTable ? "Admin User Management" : editProfile ? "Edit Profile" : "Add new user"
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
                            New User
                        </Button>}
                </Grid>
            </Grid>
            {loading ? (
                <Typography variant="h6" color="textSecondary">
                    Loading...
                </Typography>
            ) : showTable ?
                (<Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1rem' }}>
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ minWidth: '50px' }} align='center'>ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '100px' }} align='center'>SMC ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '150px' }} align='center'>Name</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Display Name</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Email ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '150px' }} align='center'>Mobile No</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '100px' }} align='center'>Status</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sdcProfileList.map((profile) => (
                                    <TableRow key={profile.id}>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.state_medical_council_id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.first_name} {profile.last_name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.display_name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.email_id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.mobile_no}</TableCell>
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
                                                    color="error">
                                                    Deactivate
                                                </Button> :
                                                <Button
                                                    variant="outlined"
                                                    size='small'
                                                    color="success">
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
                        <EditProfile profile={currentProfile} handleClose={handleClose} />
                    ) : (
                        <CreateUser handleClose={handleClose} />
                    )
            }
        </Box>
    )
}

export default AdminUserManagement;
