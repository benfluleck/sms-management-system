import Model from './config';
import Contacts from './contacts';

class Sms extends Model {
  static get tableName() {
    return 'sms';
  }

  static get relationMappings() {
    return {
      senders: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contacts,
        join: {
          from: 'sms.senderId',
          to: 'contacts.id'
        }
      },
      recipients: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contacts,
        join: {
          from: 'sms.recipientId',
          to: 'contacts.id',
        }
      },
    };
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

}


export default Sms;
