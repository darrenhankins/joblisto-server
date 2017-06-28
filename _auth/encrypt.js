const bcrypt = require('bcryptjs');
const knex = require('../db/v2/knex');

// check to make sure item is blank and a string
function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '';
  return validEmail && validPassword;
}

function createUser(req) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  return knex('user')
  .insert({
    email: req.body.email,
    password: hash,
  })
  .returning('*');
}

function bcryptPassword() {
  const hash = bcrypt.hashSync(req.body.password, 10);
}


function getUser(email) {
  return knex('user').where({email}).first();
}

function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('bad password');
  else return true;
}


module.exports = {
  validUser,
  createUser,
  getUser,
  comparePass
};
