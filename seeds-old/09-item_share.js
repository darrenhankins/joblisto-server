
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM item_share; ALTER SEQUENCE item_share_id_seq RESTART WITH 1')
    .then(function(){
      const item_share = [{
        item_id: 2
        // start_date:
        // end_date:
      }];
      return knex('item_share').insert(item_share);
    });
};
