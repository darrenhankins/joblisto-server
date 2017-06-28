
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM job; ALTER SEQUENCE job_id_seq RESTART WITH 1')
    .then(function() {
      const jobs = [{
        user_id: 1,
        name: 'ABC Web Development',
        location: 'Boulder',
        contact: 'Joe Smow',
        job_title: 'Web Developer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dsunt in culpa qui officia deserunt mollit anim id est laborum.',
        cover_letter: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        listing_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        applied: false,
        emailed: false
        },{
        user_id: 1,
        name: 'Big Dog',
        location: 'Denver',
        contact: 'Jim John',
        job_title: 'Wordpress Developer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dsunt in culpa qui officia deserunt mollit anim id est laborum.',
        cover_letter: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        listing_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        applied: true,
        emailed: false
        },{
        user_id: 1,
        name: 'Denver Web Dev',
        location: 'Tech Center',
        contact: 'John Doe',
        job_title: 'PHP Developer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dsunt in culpa qui officia deserunt mollit anim id est laborum.',
        cover_letter: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        listing_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        applied: false,
        emailed: true
        }];
      return knex('job').insert(jobs);
    });
};
