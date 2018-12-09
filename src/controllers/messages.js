import uuidv4 from 'uuidv4';

import Contacts from "../models/contacts";

import Messages from '../models/messages';
import validateUUID from '../validators/checkUUID';


export const sendMessage = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const {
      messageContents,
      recipientId,
    } = req.body;

    if (!validateUUID(contactId)) {
      return res.status(403).json({ status: 'error', message: 'This Contact Id is invalid' });
    }
    if (!validateUUID(recipientId)) {
      return res.status(403).json({ status: 'error', message: 'This Recipient Id is invalid' });
    }

    const contactExists = await Contacts.query().findById(contactId)

    if (!contactExists) {
      return res.status(404).json({ status: 'error', message: "This Contact Id does not exist" });
    }

    const newMessage = {
      id: uuidv4(),
      messageContents,
      recipientId,
      senderId: contactId,
      status: 1,
    };

    const sentMessage = await Messages
      .query()
      .allowInsert('[id, messageContents, recipientId, senderId,  status]')
      .insert(newMessage)

    res.status(201).json({ status: 'success', message: 'Message Sent Successfully', data: sentMessage });

  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }

};

export const getContactsMessages = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { status } = req.query

    if (!validateUUID(contactId)) {
      return res.status(403).json({ status: 'error', message: 'This Contact Id is invalid' });
    }

    const contactExists = await Contacts.query().findById(contactId)

    if (!contactExists) {
      return res.status(404).json({ status: 'error', message: "This Contact Id does not exist" });
    }


    let allMessages;
    switch(status) {
      case('sent'):
        allMessages = await Messages
          .query()
          .where('senderId', contactId)
        break;
      case('received'):
        allMessages = await Messages
          .query()
          .where('recipientId', contactId)
        break;
      default:
        allMessages = await Messages
          .query()
          .where('senderId', contactId)
          .orWhere('recipientId', contactId)
        break;
    }

    res.status(200).json({ status: 'success', data: allMessages });

  }
  catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}

export const deleteMessage = async(req, res, next) => {
  try {
    const { messageId } = req.params;

    if (!validateUUID(messageId)) {
      return res.status(403).json({ status: 'error', message: "This Message Id is invalid" });
    }

    const messageExists = await Messages.query().findById(messageId)

    if (!messageExists) {
      return res.status(404).json({ status: 'error', message: 'This Message does not exist' });
    }

    await Messages
      .query()
      .deleteById(messageId);
    res.status(202).json({ status: 'success', message: 'Message Successfully Deleted' });

  }
  catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}

export const getAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Messages
      .query()

    res.status(200).json({ status: 'success', data: allMessages });
  }
  catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }

}
