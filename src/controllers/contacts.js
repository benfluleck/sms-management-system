import uuidv4 from 'uuidv4';

import Contacts from "../models/contacts";
import validateUUID from '../validators/checkUUID';



export const addContact = async (req, res, next) => {
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
      ownerId: userId,
    };
    const createdContact = await Contacts
      .query()
      .allowInsert('[id, firstName, lastName, email, phoneNumber, ownerId]')
      .skipUndefined()
      .insert(newContact)

    res.status(201).json({ status: 'success', message: 'Contact Created Successfully', data: createdContact });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await Contacts
      .query()

    res.status(200).json({ status: 'success', message: 'Contact list generated Successfully', data: allContacts });
  }
  catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }

}

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const {
      firstName, lastName, email, phoneNumber,
    } = req.body;

    if (!validateUUID(contactId)) {
      return res.status(403).json({ status: 'error', message: "This Contact Id is invalid" });
    }

    const contactExists = await Contacts.query().findById(contactId)

    if (!contactExists) {
      return res.status(404).json({ status: 'error', message: "This Contact Id does not exist" });
    }

    const updatedContact = await Contacts
      .query()
      .updateAndFetchById(contactId, { firstName, lastName, email, phoneNumber });

    res.status(200).json({ status: 'success', message: 'Contact Successfully Updated', data: updatedContact });

  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!validateUUID(contactId)) {
      return res.status(403).json({ status: 'error', message: "This Contact Id is invalid" });
    }

    const contactExists = await Contacts.query().findById(contactId)

    if (!contactExists) {
      return res.status(404).json({ status: 'error', message: 'This Contact Id does not exist' });
    }

    await Contacts
      .query()
      .deleteById(contactId);
    res.status(202).json({ status: 'success', message: 'Contact Successfully Deleted' });

  }
  catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}
