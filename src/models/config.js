import Knex from 'knex';
import { Model } from 'objection';

import connection from '../../knexfile';

const knexConnection = Knex(connection);

Model.knex(knexConnection);

export default Model;
