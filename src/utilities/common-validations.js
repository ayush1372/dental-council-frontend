import { StrictMode } from 'react';

import validator from 'validator';

export const TextValidation = (textinput) => {
  const pattern = /^(?=[A-Z])(?=.*[A-Z]$)(?!.*_\d)(?!.*\d_)\w+$/i;
  if (pattern.test(textinput)) {
    return true;
  }
};

export const EmailValidation = (Email) => {
  if (validator.isEmail(Email)) {
    return true;
  }
};

export const PhoneNoValidation = (phoneno) => {
  if (validator.isMobilePhone(phoneno, 'en-IN', StrictMode)) {
    return true;
  }
};

export const AgeValidation = (age) => {
  if (validator.isInt(age, { min: 1, max: 100 })) {
    return true;
  }
};

export const OTPValidation = (otp) => {
  const validotp = /^[0-9]{1,6}$/;
  if (validotp.test(otp)) return true;
};

export const PasswordValidation = (password) => {
  if (
    validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return true;
  }
};

export const ConfirmPasswordValidation = (confirmpassword) => {
  if (
    validator.isStrongPassword(confirmpassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return true;
  }
};

export const getMaskedMobileNumber = (mobileNumber) => {
  const maskedNumber =
    mobileNumber !== undefined && mobileNumber !== null
      ? 'XXXXXX' + mobileNumber.toString().slice(6)
      : 'XXXXXX****';
  return maskedNumber;
};

export const PasswordRegexValidation = {
  required: 'Enter valid  password',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,100}$/,
    message:
      'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
  },
};

export const NewPasswordRegexValidation = {
  required: 'Please enter a valid new password',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,100}$/,
    message:
      'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
  },
};
export const LoginPasswordRegexValidation = {
  required: 'Please enter the password',
  // pattern: {
  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,100}$/,
  //   message: 'Please enter a valid password',
  // },
};
export const AadharRegexValidation = {
  required: 'Enter a valid Aadhaar number',
  pattern: {
    value: /^[0-9]{4}$/,
    message: 'Please enter a valid Aadhaar number',
  },
};

export const QueryRaisedValidation = {
  required: 'This field is required',
  pattern: {
    value: /^\W*(?:\w+\b\W*){1,150}?$/i,
    message: 'Maximum word limit exceeded',
  },
};

export const EmailRegexValidation = {
  required: 'Please enter an email',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
    message: 'Please enter a valid email',
  },
};

export const PostalCodeRegexValidation = {
  required: 'Please enter pincode',
  pattern: {
    value: /^\d{6}$/,
    message: 'Should only contains 6 digits',
  },
};

export const MobileNumberRegexValidation = {
  required: 'Please enter the mobile number',
  pattern: {
    value: /^\d{10}$/i,
    message: 'Please enter a valid 10 digit mobile number',
  },
};

export const AddressLineValidation1 = {
  required: 'Please enter address line 1',
  pattern: {
    value: /^[a-zA-Z0-9\s\-.,]*$/,
    message: 'Please enter a valid address line 1',
  },
};

export const AddressLineValidation2 = {
  pattern: {
    value: /^[a-zA-Z0-9\s\-.,]*$/,
    message: 'Please enter a valid address line 1',
  },
};

export const convertGender = (gender) => {
  if (gender.length > 1) {
    return gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : '';
  } else {
    return gender?.toUpperCase() === 'M'
      ? 'Male'
      : gender?.toUpperCase() === 'F'
      ? 'Female'
      : gender?.toUpperCase() === 'O'
      ? 'Other'
      : '';
  }
};
