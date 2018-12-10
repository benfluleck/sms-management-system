import bcrypt from 'bcryptjs';
import uuidv4 from 'uuidv4';

import Users from '../models/users';


export const signUp = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName, phoneNumber
    } = req.body;

    const userExists = await Users.query().findOne({ email })

    if (userExists) {
      return res.status(409).json({ status: 'error', message: "This email is already in use" });
    }
    const data = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    };

    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        return res.status(400).json({ status: 'error', message: 'Password Error, Please try again' });
      }

      bcrypt.hash(data.password, salt, async (error, hash) => {
        if (error) {
          throw error;
        }
        data.password = hash;
        const newUser = {
          id: uuidv4(),
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          phoneNumber: data.phoneNumber.trim(),
          password: data.password,
        };

        const createdUser = await Users
          .query()
          .allowInsert('[id, firstName, lastName, email, password, phoneNumber]')
          .insert(newUser)

        const { password, ...response } = createdUser

        res.status(201).json({ status: 'success', message: 'User Created Successfully', data: response });

      });
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Users.query().findOne({ email })
    if (!userExists) {
      return res.status(404).json({ status: 'error', message: "This user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password)

    if (isMatch) {
      req.session && (req.session.userId = userExists.id)

      res.json({
        status: 'success', message: `Welcome ${userExists.firstName}`,
        data: {
          id: userExists.id
        }
      });
    } else {
      return res.status(401).json({ status: 'error', message: 'Wrong Credentials' });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

