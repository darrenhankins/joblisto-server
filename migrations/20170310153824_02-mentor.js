
exports.up = function(knex, Promise) {
  return knex.schema.createTable('mentor', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.text('name').notNullable();
    table.text('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('mentor');
};
