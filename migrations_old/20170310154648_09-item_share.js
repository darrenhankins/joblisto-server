
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_share', table => {
    table.increments();
    table.integer('item_id').references('item.id').unsigned().onDelete('cascade');
    table.dateTime('start_date');
    table.dateTime('end_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('item_share');
};
