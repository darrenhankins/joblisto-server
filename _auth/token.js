const knex = require('../db/v2/knex');
const moment = require('moment');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');


function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  // if (!bool) throw new Error('bad password');
  if (!bool) return false;
  else return true;
}

function encodeToken(user) {
  // console.log(user);
  // console.log("Encode Token");
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    user: user
  };
  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
}

function checkAuthentication(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  console.log(header[1]);
  decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
    } else {
      // check if the user still exists in the db
      return knex('user').where({id: parseInt(payload.user.id)}).first()
      .then((logged) => {
        return knex("sticker")
            .then(data => {
                var result = {
                    stickers: data,
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
  encodeToken,
  decodeToken,
  checkAuthentication
};
