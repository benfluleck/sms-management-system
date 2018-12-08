import uuidv4 from 'uuidv4';

import Contacts from "../models/contacts";

export const addContact = async(req, res, next) => {
  try {
    const { userId } = req.session;
    const {
      firstName, lastName, email, phoneNumber,
    } = req.body;

    const contactExists = await Contacts.query().findOne({ phoneNumber })
    if (contactExists) {
      return res.status(409).json({ status: 'error', message: "A contact with this number already exists" });
    }

    const newContact = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phoneNumber,
      phoneOwner: userId,
    };
    const createdContact = await Contacts
      .query()
      .allowInsert('[id, firstName, lastName, email, phoneNumber, phoneOwner]')
      .skipUndefined()
      .insert(newContact)

    res.status(201).json({ status: 'success', message: 'Contact Created Successfully', data: createdContact });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }

}
