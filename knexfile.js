// Update with your config settings.
require("dotenv").config(); // or load()
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/job-app',
    connection_url: 'http://localhost:3000/'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL+'?ssl=true'
  }
};
