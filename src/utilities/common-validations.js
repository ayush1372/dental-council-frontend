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
  required: 'Enter valid  Password',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,100}$/,
    message:
      'Create valid password with eight characters including an uppercase, a lowercase, a number and a special character.',
  },
};

export const LoginPasswordRegexValidation = {
  required: 'Please enter Password',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,100}$/,
    message: 'Enter correct password',
  },
};
export const AadharRegexValidation = {
  required: 'Enter a valid aadhaar number',
  pattern: {
    value: /^[0-9]{4}$/,
    message: 'Provide a valid aadhaar number',
  },
};

export const QueryRaisedValidation = {
  required: 'This field is required',
  pattern: {
    value: /^[\s\S]{1,150}$/,
    message: 'Maximum word limit exceeded',
  },
};

export const EmailRegexValidation = {
  required: 'Email ID is required',
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
    message: 'Provide a valid Email ID',
  },
};

export const PostalCodeRegexValidation = {
  required: 'Postal code is required',
  pattern: {
    value: /^\d{6}$/,
    message: 'Should only contain 6 digits',
  },
};

export const MobileNumberRegexValidation = {
  required: 'Mobile Number is required',
  pattern: {
    value: /^\d{10}$/i,
    message: 'Please enter a valid 10-digit mobile number',
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
