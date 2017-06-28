
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_status', table => {
    table.increments();
    table.integer('item_id').references('item.id').unsigned().onDelete('cascade');
    table.integer('friend_id').references('friend.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('item_status');
};
