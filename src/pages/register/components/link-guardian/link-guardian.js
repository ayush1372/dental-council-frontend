import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Link, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useForm } from 'react-hook-form';

import { validateAadharNumber } from '../../../../constants/common-data';
import { Button, TextField } from '../../../../ui/core';
import { RadioGroup } from '../../../../ui/core/form/radio-group/radio-group';
import MobileNumber from '../../../../ui/core/mobile-number/mobile-number';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import { OtpComponentLinkGuardian } from './otp-component-link-guardian';
import { RelationProof } from './relation-proof';

export const LinkGuardian = ({ onNext, nextStep }) => {
  const [selectedVerificationOption, setSelectedVerificationOption] = useState('Mobile Number');
  const [fileData, setFileData] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [verifyNumber, setVerifyNumber] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);

  const [otp, setOtp] = useState(null);
  const handleChange = (event) => {
    setVerifyNumber(false);
    setSelectedVerificationOption(event.target.value);
    setValue(event.target.name, event.target.value, true);
  };
  const verifyOnClickNumber = () => {
    setVerifyNumber(true);
  };
  const verifyOnClickOtp = () => {
    setVerifyOtp(true);
  };
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobileNo: '',
      verifyOption: 'Mobile Number',
      aadhaarNumber: '',
      abhaNumber: '',
    },
  });
  const verifiedSteps = {
    step1: selectedVerificationOption !== null,
    step2: verifyNumber,
    step3: verifyOtp && otp?.length === 6,
    step4: fileData.length === 1 && selectedMember !== undefined && selectedRelation !== undefined,
  };
  return (
    <>
      <Typography variant="body1" fontWeight={600}>
        Link Your Guardian
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'grey.main',
            display: 'flex',
            alignItems: 'center',
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: '12px 0px',
            },
          }}
        >
          <Typography
            sx={{ width: 'auto' }}
            component="span"
            color={selectedVerificationOption === null ? 'textPrimary.main' : 'primary.main'}
          >
            Step1:
          </Typography>
          <CheckCircleIcon color={selectedVerificationOption === null ? 'grey1' : 'success'} />
          <Typography
            component="span"
            color={
              selectedVerificationOption === null ? 'textPrimary.secondary' : 'textPrimary.main'
            }
            fontWeight={selectedVerificationOption === null ? '' : '500'}
          >
            Link your Guardian with any of the below option
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ fontWeight: '500', width: 'auto' }} component="span">
            Choose any one of the below options
          </Typography>
          <Box
            borderRadius="3px"
            border="1px solid"
            borderColor="inputBorderColor.main"
            p="14px 20px"
          >
            <RadioGroup
              value={getValues().verifyOption}
              onChange={handleChange}
              name={'verifyOption'}
              defaultValue="Mobile Number"
              data-testid="linkguardian"
              items={[
                { value: 'ABHA Number', label: 'ABHA Number' },
                { value: 'Mobile Number', label: 'Mobile Number' },
                { value: 'Aadhaar Number', label: 'Aadhaar Number' },
              ]}
            />
          </Box>
        </AccordionDetails>
        <Typography variant="caption" color="messageBlue.main">
          <InfoOutlinedIcon
            sx={{ fontSize: '15px', verticalAlign: 'middle', marginRight: '5px' }}
          />
          Don&apos;t have Guardian&apos;s ABHA Number?
        </Typography>
        <Link
          href="/register"
          color="secondary"
          underline="always"
          variant="body1"
          sx={{ fontWeight: '457' }}
        >
          Click here to Create ABHA Number.
        </Link>
      </Accordion>

      <Accordion disabled={!verifiedSteps.step1}>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'grey.main',
            display: 'flex',
            alignItems: 'center',
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: '12px 0px',
            },
          }}
        >
          <Typography
            sx={{ width: 'auto' }}
            component="span"
            color={!verifiedSteps.step2 ? 'textPrimary.main' : 'primary.main'}
          >
            Step2:
          </Typography>
          <CheckCircleIcon color={!verifiedSteps.step2 ? 'grey1' : 'success'} />
          <Typography
            component="span"
            color={!verifiedSteps.step2 ? 'textPrimary.secondary' : 'textPrimary.main'}
            fontWeight={!verifiedSteps.step2 ? '' : '500'}
          >
            Enter your {selectedVerificationOption ? selectedVerificationOption : 'Mobile Number'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {selectedVerificationOption === 'Mobile Number' ? (
            <MobileNumber
              register={register}
              getValues={getValues}
              errors={errors}
              label={'Enter your Mobile Number'}
              showVerify={true}
              verifyOnClick={handleSubmit(verifyOnClickNumber)}
            />
          ) : selectedVerificationOption === 'ABHA Number' ? (
            <Box>
              <TextField
                label={'Enter your ABHA Number'}
                data-testid={'abha-no-testid'}
                name={'abhaNumber'}
                maxLength={14}
                placeholder={'ABHA Number'}
                defaultValue={getValues().abhaNumber}
                error={errors.abhaNumber?.message}
                sx={{ width: '30%' }}
                {...register('abhaNumber', {
                  required: 'ABHA Number is required',
                  pattern: {
                    value: /^\d{2}-?\d{4}-?\d{4}-?\d{4}$/i,
                    message: 'ABHA Number is not valid',
                  },
                })}
              />
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginLeft: '20px' }}
                onClick={handleSubmit(verifyOnClickNumber)}
              >
                Verify
              </Button>
            </Box>
          ) : (
            <Box sx={{ width: '1' }}>
              <TextField
                type={'number'}
                name={'aadhaarNumber'}
                label={'Enter your Aadhaar Number'}
                inputProps={{ maxLength: 12 }}
                onInput={(e) => {
                  if (e.target.value.length > 0) {
                    e.target.value = isNaN(e.target.value)
                      ? e.target.value.toString().slice(0, -1)
                      : Math.max(0, parseInt(e.target.value)).toString().slice(0, 12);
                  }
                }}
                placeholder={'Aadhaar Number'}
                onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                defaultValue={getValues().aadhaarNumber}
                error={errors.aadhaarNumber?.message}
                sx={{ width: '30%' }}
                {...register('aadhaarNumber', {
                  required: 'Aadhaar Number is required',
                  validate: (value) =>
                    validateAadharNumber(value) || 'Aadhaar Number is not valid ',
                  pattern: {
                    value: /^(\d{12})$/i,
                    message: 'Aadhaar Number is not valid',
                  },
                })}
              />
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginLeft: '20px' }}
                onClick={handleSubmit(verifyOnClickNumber)}
              >
                Verify
              </Button>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={!verifiedSteps.step1 || !verifiedSteps.step2}>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'grey.main',
            display: 'flex',
            alignItems: 'center',
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: '12px 0px',
            },
          }}
        >
          <Typography
            sx={{ width: 'auto' }}
            component="span"
            color={!verifiedSteps.step3 ? 'textPrimary.main' : 'primary.main'}
          >
            Step3:
          </Typography>
          <CheckCircleIcon color={!verifiedSteps.step3 ? 'grey1' : 'success'} />
          <Typography
            component="span"
            color={!verifiedSteps.step3 ? 'textPrimary.secondary' : 'textPrimary.main'}
            fontWeight={!verifiedSteps.step3 ? '' : '500'}
          >
            Confirm OTP
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OtpComponentLinkGuardian
            setOtp={setOtp}
            userMobileNumber={getValues().mobileNo}
            verifyOnClick={verifyOnClickOtp}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={!verifiedSteps.step1 || !verifiedSteps.step2 || !verifiedSteps.step3}>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'grey.main',
            display: 'flex',
            alignItems: 'center',
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: '12px 0px',
            },
          }}
        >
          <Typography
            sx={{ width: 'auto' }}
            component="span"
            color={!verifiedSteps.step4 ? 'textPrimary.main' : 'primary.main'}
          >
            Step4:
          </Typography>
          <CheckCircleIcon color={!verifiedSteps.step4 ? 'grey1' : 'success'} />
          <Typography
            component="span"
            color={!verifiedSteps.step4 ? 'textPrimary.secondary' : 'textPrimary.main'}
            fontWeight={!verifiedSteps.step4 ? '' : '500'}
          >
            Add Proof Of Relationship
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {' '}
          <RelationProof
            fileData={fileData}
            setFileData={setFileData}
            selectedRelation={selectedRelation}
            setSelectedRelation={setSelectedRelation}
            setSelectedMember={setSelectedMember}
            selectedMember={selectedMember}
          />
        </AccordionDetails>
      </Accordion>
      <ButtonGroupWizard
        handleNext={() => onNext()}
        labelNext={`Continue : Step ${nextStep}`}
        disabledNext={!fileData.length || selectedRelation === undefined}
      ></ButtonGroupWizard>
    </>
  );
};
