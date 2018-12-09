import { isLength, isAlpha, isMobilePhone } from 'validator';

const fieldLength = {
  password: { max: 30, min: 5 },
  lastName: { max: 30, min: 2 },
  firstName: { max: 30, min: 2 },
  phoneNumber: { max: 15, min: 9 },
  email: { max: 50, min: 5 },
  messageContents: { min: 5, max: 550 },
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"|"_+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = (emailAddress) => emailRegex.test(emailAddress);


const validatePhoneNumber = (phoneNumber) => isMobilePhone(phoneNumber);

const modifiedIsLength = (field) => (val) => isLength(val, fieldLength[ field ] || {});

export const invalidFieldMap = {
  email: [ validateEmail ],
  phoneNumber: [ validatePhoneNumber ]
};


export const inValidFieldErrorMessages = {
  email: 'This email address you have provided is invalid',
  phoneNumber: 'This phone number is invalid'
};

export const checkLengthMap = {
  email: [ modifiedIsLength('email') ],
  messageContents: [ modifiedIsLength('messageContents') ],
  password: [ modifiedIsLength('password') ],
  phoneNumber: [ modifiedIsLength('phoneNumber'), isMobilePhone ],
  firstName: [ modifiedIsLength('firstName'), isAlpha ],
  lastName: [ modifiedIsLength('lastName'), isAlpha ],
};

export const checkLengthErrorMessages = {
  email: 'Please provide a valid email address',
  firstName: 'firstName field is in an invaild format',
  lastName: 'lastName field is in an invaild format',
  password: 'Please enter a valid password',
  phoneNumber: 'The phone number entered is invalid',
  messageContents: 'Message should be between 5 and 300 characters'
};
