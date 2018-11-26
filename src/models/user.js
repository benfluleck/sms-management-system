import Model from './config';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

}


export default User;
