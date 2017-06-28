const knex = require('./knex');
const bcrypt = require('bcryptjs');

module.exports = {
getAllMembers: function(id){
  return knex('user')
           .select()

},
getSingleMemberById: function(id){
    return knex('user')
        .select()
        .where('id', id)
        .first()
},
getOneByEmail: function(email){
     return knex('user')
     .where('email', email)
     .first();
},

create: function(member){
  return knex('user').insert(member, 'id')
  .then(ids => {
    return ids[0];
  });
}
}
