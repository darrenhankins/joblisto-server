require("dotenv").config(); // or load()
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var knex = require('../../db/v2/knex');
var query = require('../../db/v2/query');
var authHelpers = require('../../auth/_helpers');
var localAuth = require('../../auth/local');


router.post('/signup', (req, res, next)=> {
  query.createUser(req.body)
    .then(response =>{
      console.log("response", response);
      return res.json(response);
    })
    .catch(err => {
      // console.log(message);
      // console.log(err);
      res.send(err);
    });
})

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let member;
  // console.log("body", req.body);
  // console.log("authHelpers.getMember", email);
  // check email
  return query.getUser(email)
  .then((response) => {
    if (response) {
      member = response;
      // console.log("member", member);
      // compare passwords
      if (query.comparePass(password, response.password)){

        // return localAuth.encodeTokenPromise(response);
        // .then((token) => {
        //   res.json({
        //     "response": {
        //       status: 'success',
        //       token: token,
        //       member: member,
        //       message: "Passwords Match"
        //     }
        //   });
        // })

        var token = localAuth.encodeToken(response);
        return res.json({
          "response": {
            status: 'success',
            token: token,
            member: member,
            message: "Passwords Match"
          }
        });

      } else {
        console.log("Wrong Password");
        return res.json({
          "response": {
            status: 'failure 2',
            message: "Wrong Password"
          }
        });
      }
    } else {
      console.log("Email Not Found");
      return res.json({
        "response": {
          status: 'failure 1',
          message: "Email Not Found"
        }
      });
    }
  })
  // .then((response) => { return localAuth.encodeToken(response); })
  // .then((token) => {
  //   console.log("Here");
  //   res.status(200).json({
  //     status: 'success',
  //     token: token,
  //     member: member
  //   });
  // })
  // .catch((err) => {
  //   // console.log("err", err);
  //   res.status(500).json({
  //     message: err,
  //     status: 'error'
  //   });
  // });
});


module.exports = router;
