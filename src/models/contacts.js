import Model from './config';
import Sms from './sms';
import Users from './users';

class Contacts extends Model {
  static get tableName() {
    return 'contacts';
  }

  static get relationMappings() {
    return {
      phoneOwner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'contacts.ownerId',
          to: 'users.id'
        }
      },
      senders: {
        relation: Model.HasManyRelation,
        modelClass: Sms,
        join: {
          from: 'contacts.id',
          to: 'sms.senderId'
        }
      },
      recipients: {
        relation: Model.HasManyRelation,
        modelClass: Sms,
        join: {
          from: 'contacts.id',
          to: 'sms.recipientId',
        }
      }
    };
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

}


export default Contacts;
