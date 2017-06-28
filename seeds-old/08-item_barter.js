
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM item_barter; ALTER SEQUENCE item_barter_id_seq RESTART WITH 1')
    .then(function(){
      const item_barter = [{
        item_id: 2,
        barter_list: 'boat, ATV'
      }];
      return knex('item_barter').insert(item_barter);
    });
};
