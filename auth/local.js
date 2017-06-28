require("dotenv").config(); // or load()
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(member) {
  console.log(member);
    const playload = {
      exp: moment().add(14, 'days').unix(),
      iat: moment().unix(),
      member: member
    };
    return jwt.encode(playload, process.env.TOKEN_SECRET);
}

// As a Promise
// function encodeTokenPromise(member) {
//   console.log(member);
//   return new Promise(function(resolve, reject){
//     const playload = {
//       exp: moment().add(14, 'days').unix(),
//       iat: moment().unix(),
//       member: member
//     };
//     resolve(jwt.encode(playload, process.env.TOKEN_SECRET));
//   });
// }

function decodeToken(token, callback) {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
}

module.exports = {
  encodeToken,
  decodeToken
};
