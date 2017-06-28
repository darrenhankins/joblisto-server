
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_barter', table => {
    table.increments();
    table.integer('item_id').references('item.id').unsigned().onDelete('cascade');
    table.text('barter_list');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('item_barter');
};
