// ONLY Knex Setup
var config = require('../../knexfile')[process.env.NODE_ENV || 'development'];
module.exports = require('knex')(config);