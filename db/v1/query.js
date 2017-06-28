const knex = require('./knex');
const uuidV4 = require('uuid/v4');

module.exports = {

  getAllItems: function(user_id){
    return knex('item')
    .where('user_id', user_id);
  },
  getItem: function(user_id, item_id){
    return knex('item')
    .where({
      user_id: user_id,
      id: item_id
    });
  },
  addItem: function(user_id, item){
    // Generate a v4 UUID (random)
    uuid = uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
    item.user_id = user_id;
    item.uuid = uuid;
    return knex('item')
    .insert(item,'*')
    .then(items => {
      return knex('item')
      .where('user_id', user_id);
    });
  },
  updateItem: function(user_id, item_id, item){
    return knex('item')
    .where({
      user_id: user_id,
      id: item_id
    })
    .update(item,'*')
    .then(items => {
      return knex('item')
      .where('user_id', user_id);
    });
  },
  deleteItem: function(user_id, item_id) {
    return knex('item')
    .where('id', item_id)
    .del()
    .then( items => {
      return knex('item')
    })
  }
  //,
  //getGroup: function(user_id) {
  //   return knex.table('users')
  //   .innerJoin('accounts', 'users.id', '=', 'accounts.user_id')
  //   Outputs:
  //   select * from `users` inner join `accounts` on `users`.`id` = `accounts`.`user_id`
  // }
}
