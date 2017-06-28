
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_sell', table => {
    table.increments();
    table.integer('item_id').references('item.id').unsigned().onDelete('cascade');
    table.decimal('price').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('item_sell');

};
