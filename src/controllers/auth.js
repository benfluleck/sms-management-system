import { query } from '../models/config';
import { queries } from '../models/user';
import bcrypt from 'bcryptjs';
import uuidv4 from 'uuidv4';


export const signup = (req, res) => {

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

      return res.status(409).json({ status: 'error', data: emailExistResponse });
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
        return res.status(400).json({ status: 'error', message: 'Password Error, Please try again' });
      }

      bcrypt.hash(data.password, salt, (error, hash) => {
        if (error) {
          throw error;
        }
        data.password = hash;
        const createUser = queries.createUser;
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

          return res.status(201).json({ status: 'success', message: 'User Created Successfully', data: response });
        });
      });
    });
  }).catch((error) => {
    return res.status(400).json({ status: 'error', message: error.message });
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;

  const userExists = queries.userExists;
  const valuesExist = [
    email
  ];

  query(userExists, valuesExist).then((dbResponse) => {

    if (dbResponse.rowCount === 0) {
      const message = 'User cannot be found';

      return res.status(404).json({ status: 'error', message });
    }

    const userData = dbResponse.rows[ 0 ];

    bcrypt.compare(password, userData.password)
      .then((isMatch) => {
        if (isMatch) {

          res.json({
            status: 'success', message: `Welcome ${userData.firstname}`,
            data: {
              id: userData.id,
              email: userData.email,
              firstName: userData.firstname,
              lastName: userData.lastname,
            } });
        } else {
          res.status(401).json({ status: 'error', message: 'Wrong Credentials' });
        }
      });
  }).catch(() => {
    return res.status(400).json({ status: 'error', message: 'Error Logging in user, Please try again' });
  });
};

