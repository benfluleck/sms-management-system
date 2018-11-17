import { invalidFieldMap, inValidFieldErrorMessages } from './validation';

const fieldMap = {
  '/signup': [ 'email' ]
};

/**
 * @description middleware for field format validations
 *
 * @param {object} req - request object
 *
 * @param {object} res - respond object
 *
 * @param {function} next
 *
 * @returns {bool} validation error
 */
export default (req, res, next) => {
  const path = req.path;
  const invalidField = fieldMap[ path ]
    .find((field) => {
      if (req.body[ field ]) {
        const validationFn = invalidFieldMap[ field ];

        return !validationFn.every((fn) => fn(req.body[ field ]));
      }
      return true;
    });

  if (invalidField) {
    return res.status(422).send({
      status: 'error',
      message: inValidFieldErrorMessages[ invalidField ]
    });
  }
  next();
};
