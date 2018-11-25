import { checkLengthMap, checkLengthErrorMessages } from './validation';

const fieldMap = ({
  '/signin': [
    'email',
    'password' ],

  '/signup': [ 'email',
    'password',
    'firstName',
    'lastName' ],
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
  const allFields = fieldMap[ path ]
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
