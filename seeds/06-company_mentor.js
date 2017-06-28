
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM company_mentor; ALTER SEQUENCE company_mentor_id_seq RESTART WITH 1')
    .then(function(){
      const company_mentors = [{
        // darren - family - david
        // user_id: 1,
        company_id: 1,
        mentor_id: 1
      },{
        // darren - family- doug
        // user_id: 2,
        company_id: 1,
        mentor_id: 2
      },{
        // darren - co-workers - phil
        // user_id: 2,
        company_id: 3,
        mentor_id: 8
      },{
        // darren - co-workers - matt
        // user_id: 2,
        company_id: 3,
        mentor_id: 9
      },{
        // darren - co-workers - paul
        // user_id: 2,
        company_id: 2,
        mentor_id: 10
      },{
        // darren - friends- jesse
        // user_id: 2,
        company_id: 2,
        mentor_id: 3
      },{
        // jesse - family- robert
        // user_id: 2,
        company_id: 4,
        mentor_id: 4
      },{
        // jesse - friend - paul
        // user_id: 2,
        company_id: 5,
        mentor_id: 5
      },{
        // doug - family - david
        // user_id: 3,
        company_id: 6,
        mentor_id: 6
      },{
        // doug - family - darren
        // user_id: 3,
        company_id: 6,
        mentor_id: 7
      }];
      return knex('company_mentor').insert(company_mentors);
    });
};
