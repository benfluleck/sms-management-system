import Model, { knexConnection } from './config';
import Messages from './messages';
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
        modelClass: Messages,
        join: {
          from: 'contacts.id',
          to: 'messages.senderId'
        }
      },
      recipients: {
        relation: Model.HasManyRelation,
        modelClass: Messages,
        join: {
          from: 'contacts.id',
          to: 'messages.recipientId',
        }
      }
    };
  }

  $beforeUpdate() {
    // eslint-disable-next-line camelcase
    this.updated_at = knexConnection.fn.now();
  }

}


export default Contacts;
