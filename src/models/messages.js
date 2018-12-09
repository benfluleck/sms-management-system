import Model from './config';
import Contacts from './contacts';

class Messages extends Model {
  static get tableName() {
    return 'messages';
  }

  static get relationMappings() {
    return {
      senders: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contacts,
        join: {
          from: 'messages.senderId',
          to: 'contacts.id'
        }
      },
      recipients: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contacts,
        join: {
          from: 'messages.recipientId',
          to: 'contacts.id',
        }
      },
    };
  }

  $beforeUpdate() {
    // eslint-disable-next-line camelcase
    this.updated_at = knexConnection.fn.now();
  }

}


export default Messages;
