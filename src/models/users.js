import Model from './config';
import Contacts from './contacts';

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      phoneOwner: {
        relation: Model.HasManyRelation,
        modelClass: Contacts,
        join: {
          from: 'users.id',
          to: 'contacts.phoneOwner'
        }
      },
    };
  }

  $beforeUpdate() {
    // eslint-disable-next-line camelcase
    this.updated_at = knexConnection.fn.now();
  }

}


export default Users;
