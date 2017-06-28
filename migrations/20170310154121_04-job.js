
exports.up = function(knex, Promise) {
  return knex.schema.createTable('job', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.text('name').notNullable();
    table.text('location');
    table.text('contact');
    table.text('job_title');
    table.text('description');
    table.text('cover_letter');
    table.text('image_url');
    table.text('listing_url');
    table.boolean('applied').defaultTo('false');
    // table.timestamp('emailed').defaultTo(null);
    table.boolean('emailed').defaultTo('false');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('job');
};
