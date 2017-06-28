
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM company_job; ALTER SEQUENCE company_job_id_seq RESTART WITH 1')
    .then(function(){
      const company_jobs = [{
        job_id: 1,
        company_id: 1
      },{
        job_id: 1,
        company_id: 2
      },{
        job_id: 1,
        company_id: 3
      }];
      return knex('company_job').insert(company_jobs);
    });
};
