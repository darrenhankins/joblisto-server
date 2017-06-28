var bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 1')
    .then(function() {
      const users = [{
        username: 'darren',
        email: 'darren@gmail.com',
        password:  bcrypt.hashSync('darren', 10)
      },{
        username: 'jesse',
        email: 'jesse@gmail.com',
        password: bcrypt.hashSync('jesse', 10)
      },{
        username: 'doug',
        email: 'doug@gmail.com',
        password: bcrypt.hashSync('doug', 10)
      }];
      return knex('user').insert(users);
    });
};
