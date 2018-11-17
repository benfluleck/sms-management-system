import { query } from '../models/config';
import { queries } from '../models/user';
import bcrypt from 'bcryptjs';
import uuidv4 from 'uuidv4';


export const signup = (req, res) => {
  // const { errors, isValid } = usersValidation.validateSignupInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json({ status: 'error', data: errors });
  // }

  // let userImage = process.env.USER_DEFAULT_IMAGE;
  // if (req.file) {
  //   userImage = req.file.path;
  // }

  const {
    email, password, firstName, lastName
  } = req.body;
  const userExists = queries.userExists;
  const valuesExists = [
    email,
  ];

  query(userExists, valuesExists).then((dbResponse) => {
    if (dbResponse.rows[ 0 ]) {
      const emailExistResponse = {
        email: 'Email Already Exist',
      };

      res.status(409).json({ status: 'error', data: emailExistResponse });
    }
    const data = {
      email,
      password,
      firstName,
      lastName,
      roleType: 1,
    };

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(400).json({ status: 'error', message: 'Password Error, Please try again' });
      }

      bcrypt.hash(data.password, salt, (error, hash) => {
        if (error) {
          throw error;
        }
        data.password = hash;
        const createUser = queries.userInsert;
        const newUser = [
          uuidv4(),
          data.firstName.trim(),
          data.lastName.trim(),
          data.email.trim(),
          data.password,
          data.roleType,
          new Date(),
        ];

        query(createUser, newUser).then((dbres) => {
          const response = {
            id: dbres.rows[ 0 ].id,
            firstName: dbres.rows[ 0 ].name,
            lastName: dbres.rows[ 0 ].name,
            email: dbres.rows[ 0 ].email,
            roleType: dbres.rows[ 0 ].type,
          };

          res.status(201).json({ status: 'success', message: 'User Created Successfully', data: response });
        });
      });
    });
  }).catch((error) => {
    res.status(400).json({ status: 'error', message: error.message });
  });
};

