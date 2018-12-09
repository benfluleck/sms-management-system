import { checkLengthMap, checkLengthErrorMessages } from './validation';

const fieldMap = (contactId) => ({
  '/signin': [
    'email',
    'password' ],

  '/signup': [
    'email',
    'password',
    'firstName',
    'lastName',
    'phoneNumber'
  ],
  '/': [
    'firstName',
    'phoneNumber',
  ],

  [ `/${contactId}` ]: [ 'firstName', 'phoneNumber' ],
  [ `/${contactId}/messages` ]: [ 'messageContents' ]
});

/**
 * middleware to check for null validations and other bad requests
 * @param {object} req
 *
 * @param {object} res
 *
 * @param {function} next
 *
 * @returns {void|response} res
 */
export default (req, res, next) => {

  const { path } = req;
  const { contactId } = req.params;

  const allFields = fieldMap(contactId)[ path ]
    .find((field) => {
      if (req.body[ field ]) {
        const validationFn = checkLengthMap[ field ];
      
        return !validationFn.every((fn) => fn(req.body[ field ]));
      }
      return true;
    });

  if (allFields) {
    return res.status(400).send({
      status: 'error',
      message: checkLengthErrorMessages[ allFields ]

    });
  }
  next();
};
