
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM item_status; ALTER SEQUENCE item_status_id_seq RESTART WITH 1')
    .then(function(){
      const item_status = [{
        item_id: 1,
        friend_id: 1
      }];
      return knex('item_status').insert(item_status);
    });
};
