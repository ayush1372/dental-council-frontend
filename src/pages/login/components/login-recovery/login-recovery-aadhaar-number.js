import { verboseLog } from '../../../../config/debug';
import ConsentForm from '../../../../shared/consent-form/consent-form';
// import LoginRecoveryOtpForm from './login-recovery-aadhaar-otp-form';
// import LoginRecoveryMobileOtpForm from './login-recovery-mobile-otp-form';

// import styles from './login-recovery.module.scss';

export function LoginAbhaNumberRecovery({ onNext, type }) {
  const onSubmit = (data) => {
    onNext();
    verboseLog('LoginAbhaNumberRecovery', data);
  };

  return (
    <>
      {type === 'AADHAAR_OTP' && (
        <ConsentForm
          title={'Aadhaar_Number'}
          textFieldName={'AadhaarNumber'}
          placeholder={'Aadhaar_Number'}
          textFieldValidation={{
            required: 'Aadhaar Number is not valid',
            pattern: {
              value: /^(\d{12})$/i,
              message: 'Aadhaar Number is not valid',
            },
          }}
          body={'declaration_aadhaar_text'}
          checkboxName={'consentCheckbox'}
          checkboxValidation={{
            required: 'Consent is required',
          }}
          checkboxLabel={'I agree'}
          onClick={onSubmit}
        />
      )}

      {type === 'MOBILE_OTP' && (
        <ConsentForm
          title={'Enter Your Mobile Number'}
          textFieldName={'MobileNumber'}
          placeholder={'Enter Your Mobile Number'}
          textFieldValidation={{
            required: 'Mobile Number is not valid',
            pattern: {
              value: /^(\d{10})$/i,
              message: 'Mobile Number is not valid',
            },
          }}
          body={'declaration mobile text'}
          checkboxName={'consentCheckbox'}
          checkboxValidation={{
            required: 'Consent is required',
          }}
          checkboxLabel={'I agree'}
          onClick={onSubmit}
        />
      )}
    </>
  );
}

export default LoginAbhaNumberRecovery;
