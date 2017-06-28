const bcrypt = require('bcryptjs');
const knex = require('../db/v2/knex');
var localAuth = require('./local');


function createMember(req) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  return knex('user')
  .insert({
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  .returning('*');
}



function getMember(email){
  // console.log("getMember", email)
     return knex('user')
     .where('email', email).first()
}


function comparePass(userPassword, databasePassword) {
  console.log(userPassword, databasePassword)
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  // if (!bool) throw new Error('bad password');
  if (!bool) return false;
  else return true;
}


function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
     } else {
      // check if the user still exists in the db
      return knex('user').where({id: parseInt(payload.member.id)}).first()
      .then((logged) => {
        return knex("location")
            .then(data => {
                var result = {
                    location: data,
                    logged: logged
                };
                res.json(result);
            });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error'
        });
      });
    }
  });
}

module.exports = {
  createMember,
  getMember,
  comparePass,
  ensureAuthenticated
};
