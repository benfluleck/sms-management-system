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
    this.updatedAt = new Date().toISOString();
  }

}


export default Users;
