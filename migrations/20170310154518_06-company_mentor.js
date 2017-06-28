
exports.up = function(knex, Promise) {
  return knex.schema.createTable('company_mentor', table => {
    table.increments();
    table.integer('company_id').references('company.id').unsigned().onDelete('cascade');
    table.integer('mentor_id').references('mentor.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('company_mentor');
};
