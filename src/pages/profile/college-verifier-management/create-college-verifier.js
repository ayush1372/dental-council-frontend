import React, { useState } from 'react'
import { Button, TextField } from '../../../ui/core';
import { Box, Grid, Typography } from '@mui/material';
import { councilList } from '../../../constants/common-data';
import { useForm } from 'react-hook-form';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import { toast } from 'react-toastify';
import { POST } from '../../../constants/requests';


const CreateCollegeVerifier = ({ handleClose, handleGetCollegeVerifierList, collegeList }) => {

    const baseUrl = process.env.REACT_APP_V1_API_URL;

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
            CollegeName: "",
            CollegeID: "",
            email_id: "",
            mobile_no: "",
        },
    });

    const onsubmit = async () => {
        const body_data =
        {
            name: getValues()?.CollegeName,
            college_id: getValues()?.CollegeID,
            email_id: getValues()?.email_id,
            mobile_no: getValues()?.mobile_no,
        }
        try {
            const resp = await fetch(`${baseUrl}/addCollegeVerifier`, {
                method: POST,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data),
            });

            if (resp.ok) {
                toast.success('College Verifier Created Successfully!')
                reset();
                handleGetCollegeVerifierList();
                handleClose();
            } else {
                toast.error('Failed to Create College Verifier:', resp.statusText)
                console.error('Failed to Create user:', resp.statusText);
            }
        } catch (error) {
            toast.error('Failed to Create College Verifier:', error)
            console.error('Failed to create user:', error);
        } finally {
            reset();
        }



    }
    return (
        <Box>
            <Grid container item spacing={2} mt={0}>
                <Grid item xs={12} md={5}>
                    <Typography variant="body3" color="grey.label">
                        College Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <SearchableDropdown
                        name="CollegeName"
                        items={createEditFieldData(collegeList)}
                        placeholder="Select College"
                        clearErrors={clearErrors}
                        error={errors.CollegeName?.message}
                        {...register('CollegeName', {
                            required: 'Please select college',
                        })}
                        value={{
                            id: getValues()?.CollegeID !== undefined ? getValues()?.CollegeID : '',
                            name: getValues()?.CollegeName !== undefined ? getValues()?.CollegeName : '',
                        }}
                        onChange={(currentValue) => {
                            setValue('CollegeID', currentValue?.id);
                            setValue('CollegeName', currentValue?.name);
                        }}
                    />

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

export default CreateCollegeVerifier