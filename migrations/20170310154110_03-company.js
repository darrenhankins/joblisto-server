
exports.up = function(knex, Promise) {
  return knex.schema.createTable('company', table =>{
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.text('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('company');
};
