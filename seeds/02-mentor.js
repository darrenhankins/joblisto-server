
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM mentor; ALTER SEQUENCE mentor_id_seq RESTART WITH 1')
    .then(function() {
      const mentors = [{
        user_id: 1,
        name: 'david',
        email: 'david@user1.com'
      },{
        user_id: 1,
        name: 'doug',
        email: 'doug@user1.com'
      },{
        user_id: 1,
        name: 'jesse',
        email: 'jesse@user1.com'
      },{
        user_id: 2,
        name: 'robert',
        email: 'darren@user2.com'
      },{
        user_id: 2,
        name: 'paul',
        email: 'paul@user2.com'
      },{
        user_id: 3,
        name: 'david',
        email: 'david@user3.com'
      },{
        user_id: 3,
        name: 'darren',
        email: 'darren@user3.com'
      },{
        user_id: 1,
        name: 'phil',
        email: 'phil@user1.com'
      },{
        user_id: 1,
        name: 'matt',
        email: 'matt@user1.com'
      },{
        user_id: 1,
        name: 'paul',
        email: 'paul@user1.com'
      }];
      return knex('mentor').insert(mentors);
    });
};
