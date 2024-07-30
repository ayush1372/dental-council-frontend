import React, { useState } from 'react'
import { Button, TextField } from '../../../ui/core';
import { Box, Grid, Typography } from '@mui/material';
import { councilList } from '../../../constants/common-data';
import { useForm } from 'react-hook-form';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import { toast } from 'react-toastify';
import { POST } from '../../../constants/requests';


const CreateUser = ({ handleClose, handlegetSdcProfileList }) => {

    const baseUrl = process.env.REACT_APP_V1_API_URL;
    const [smcId, setSmcId] = useState(undefined);
    const [apiloading, setApiLoading] = useState(false);
    const {
        register,
        handleSubmit,
        clearErrors,
        setValue,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            user_id: "",
            first_name: "",
            last_name: "",
            display_name: "",
            council: "",
            email_id: "",
            mobile_no: "",
        },
    });

    const onsubmit = async () => {
        const body_data =
        {
            state_medical_council_id: smcId,
            first_name: getValues()?.first_name,
            last_name: getValues()?.last_name,
            middle_name: "",
            display_name: getValues()?.display_name,
            email_id: getValues()?.email_id,
            mobile_no: getValues()?.mobile_no,
        }
        try {
            const resp = await fetch(`${baseUrl}/addSdcVerifier`, {
                method: POST, 
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(body_data), 
            });

            if (resp.ok) {
                toast.success('User Created Successfully!')
                reset();
                setSmcId(undefined);
                handlegetSdcProfileList();
                handleClose();
            } else {
                toast.error('Failed to Create User:', resp.statusText)
                console.error('Failed to Create user:', resp.statusText);
            }
        } catch (error) {
            toast.error('Failed to Create User:', error)
            console.error('Failed to create user:', error);
        } finally {
            reset();
            setSmcId(undefined)
        }



    }
    return (
        <Box>
            <Grid container item spacing={2} mt={0}>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        First Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'first_name'}
                        placeholder={'Enter first name'}
                        // defaultValue={getValues()?.first_name}
                        error={errors.first_name?.message}
                        {...register('first_name', {
                            required: 'Please enter first name',
                            pattern: {
                                value: /^[A-Za-z0-9()-,.' ]*$/,
                                message: 'Please enter a valid first name',
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Last Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'last_name'}
                        placeholder={'Enter last name'}
                        // defaultValue={getValues()?.last_name}
                        error={errors.last_name?.message}
                        {...register('last_name', {
                            required: 'Please enter last name',
                            pattern: {
                                value: /^[A-Za-z0-9()-,.' ]*$/,
                                message: 'Please enter a valid last name',
                            },
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Display Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'display_name'}
                        placeholder={'Enter display name'}
                        // defaultValue={getValues()?.display_name}
                        error={errors.display_name?.message}
                        {...register('display_name', {
                            required: 'Please enter display name',
                            pattern: {
                                value: /^[A-Za-z0-9()-,.' ]*$/,
                                message: 'Please enter a valid display name',
                            },
                        })}
                    />
                </Grid>

            </Grid>
            <Grid container item spacing={2} mt={0}>
                <Grid item xs={12} md={5}>
                    <Typography variant="body3" color="grey.label">
                        State Medical Council
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    {/* <SearchableDropdown
                        name="CouncilID"
                        items={createEditFieldData(councilList)}
                        placeholder="Select State Medical Council"
                        clearErrors={clearErrors}
                        error={errors.CouncilName?.message}
                        {...register('CouncilID', {
                            required: 'Please select State Medical Council',
                        })}
                        value={{
                            id: getValues()?.CouncilID !== undefined ? getValues()?.CouncilID : '',
                            name: getValues()?.CouncilName !== undefined ? getValues()?.CouncilName : '',
                        }}
                        onChange={(currentValue) => {
                            console.log(currentValue?.id)
                            setValue('CouncilID', currentValue?.id);
                            setValue('CouncilName', currentValue?.name);
                        }}
                    /> */}
                    <SearchableDropdown
                        fullWidth
                        name="council"
                        items={createEditFieldData(councilList)}
                        error={errors.council?.message}
                        placeholder="Select State Medical Council"
                        clearErrors={clearErrors}
                        {...register('council', {
                            required: 'Please select State Medical Council',
                        })}
                        onChange={(currentValue) => {
                            setSmcId(currentValue?.id)
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="body3" color="grey.label">
                        Mobile Number
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'mobile_no'}
                        placeholder={'Enter mobile number'}
                        // defaultValue={getValues()?.mobile_no}
                        error={errors.mobile_no?.message}
                        {...register('mobile_no', {
                            required: 'Please enter the mobile number',
                            pattern: {
                                value: /^\d{10}$/i,
                                message: 'Please enter a valid 10 digit mobile number',
                            },
                        })} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Email
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
                        required
                        placeholder={'Enter email id'}
                        name={'email_id'}
                        // defaultValue={getValues().email_id}
                        error={errors.email_id?.message}
                        {...register('email_id', {
                            required: 'Please enter an email id',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                                message: 'Please enter a valid email id',
                            },
                        })}
                    />
                </Grid>


            </Grid>


            <Box display="flex" mt={3} md="auto" justifyContent={'flex-end'}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        mr: 2,
                        width: {
                            xs: '100%',
                            md: 'fit-content',
                        },
                    }}
                    onClick={handleSubmit(onsubmit)}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="grey"
                    sx={{
                        width: {
                            xs: '100%',
                            md: 'fit-content',
                        },
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CreateUser