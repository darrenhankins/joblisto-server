
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM item_sell; ALTER SEQUENCE item_sell_id_seq RESTART WITH 1')
    .then(function(){
      const item_sell = [{
        item_id: 1,
        price: 45.00
      }];
      return knex('item_sell').insert(item_sell);
    });
};
