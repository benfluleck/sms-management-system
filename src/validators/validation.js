import { isLength, isAlpha } from 'validator';

const fieldLength = {
  password: { max: 30, min: 5 },
  lastName: { max: 30, min: 2 },
  firstName: { max: 30, min: 2 },
  email: { max: 50, min: 5 },
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"|"_+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = (emailAddress) => emailRegex.test(emailAddress);

const modifiedIsLength = (field) => (val) => isLength(val, fieldLength[ field ] || {});

export const invalidFieldMap = {
  email: [ validateEmail ]
};

export const inValidFieldErrorMessages = {
  email: 'This email address you have provided is invalid'
};

export const checkLengthMap = {
  email: [ modifiedIsLength('email') ],
  password: [ modifiedIsLength('password') ],
  firstName: [ modifiedIsLength('firstname'), isAlpha ],
  lastName: [ modifiedIsLength('lastname'), isAlpha ],
};

export const checkLengthErrorMessages = {
  email: 'Please provide a valid email address',
  firstName: 'Firstname is in an invaild format',
  lastName: 'Lastname is in an invaild format',
  password: 'Please enter a valid password'
};
