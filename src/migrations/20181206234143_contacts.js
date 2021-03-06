
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table.string('firstName');
      table.string('lastName');
      table.string('email').unique();
      table.string('phoneNumber').unique();
      table.string('password');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('contacts', (table) => {
      table.uuid('id').primary();
      table.string('ownerId');
      table.string('firstName');
      table.string('email').nullable();
      table.string('lastName').nullable();
      table.string('phoneNumber').unique();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('messages', (table) => {
      table.uuid('id').primary();
      table.string('messageContents');
      table.integer('status').defaultTo(0);
      table.uuid('recipientId').notNullable().references('id').inTable('contacts').onDelete('CASCADE');
      table.uuid('senderId').notNullable().references('id').inTable('contacts').onDelete('CASCADE');;
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.raw('DROP TABLE contacts CASCADE'),
    knex.schema.dropTable('messages')
  ]);
};
