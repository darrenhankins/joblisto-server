
exports.up = function(knex, Promise) {
  return knex.schema.createTable('company_job', table => {
    table.increments();
    table.integer('job_id').references('job.id').unsigned().onDelete('cascade');
    table.integer('company_id').references('company.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('company_job');
};
