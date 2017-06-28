require("dotenv").config(); // or load()
var express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('../db/v2/knex');
var token = require('./token');
const encrypt = require('./encrypt')
var router = express.Router();


// const knex = require('../db/knex');
const query = require("../db/v2/query");



router.post('/signup',(req, res, next) => {
  if(encrypt.validUser(req.body)) {
    // check to see if email is unique
    query
      .findUserByEmail(req.body.email)
      .then(user => {
        if(user){
          next(new Error('Email In Use'));
        } else {
          const user = {
            username: req.body.username,
            email: req.body.email
          }
          bcrypt.hash(req.body.password, 10, (error, hash) => {
            user.password = hash;
            query
            .createUser(user)
            .then(user => {
              res.json(user);
            });
          });
        }
      })
  } else {
    next(new Error('Invalid User'));
  }
});

router.post('/login',(req, res, next) => {
  if(encrypt.validUser(req.body)) {
    // check to see if email is unique
    query
      .findUserByEmail(req.body.email)
      .then(user => {
        if(user){
          bcrypt.compareSync(req.body.password, user.password,(err, res) => {
              if (res == true) {
                token.encodeToken(user)
                res.json({message:'good'})
                // console.log("Correct Password");
              } else {
                res.json({message:'Incorrect Password'})
                // console.log("Incorrect Password");
              }
          });
        } else {
          next(new Error('No User in Database'));
          // bcrypt.hash(req.body.password, 10, (error, hash) => {
          //   user.password = hash;
          //   query
          //   .createUser(user)
          //   .then(user => {
          //     res.json(user);
          //   });
          // });
        }
      })
  } else {
    next(new Error('Invalid User'));
  }
})

router.post('/login2', (req, res, next) => {
  if(encrypt.validUser(req.body)) {
    return query.findUserByEmail(req.body.email)
    .then(user => {
      if(user){
        // return token.comparePass(req.body.password, user.password)
        // .then(user => {
        bcrypt.compare(req.body.password, user.password,(err, res) => {
            if (res == true) {
              // token.encodeToken(user)
              // res.json({message:'good'})




              // .then(response => {
              // token.encodeToken(user)
              // })
              // .then((user) => {
              //   res.status(200).json({
              //     status: 'success',
              //     token: token
              //   });
              // })
              // .catch((err) => {
              //   console.log(err);
              //   res.status(500).json({
              //     message: err,
              //     status: 'error'
              //   });
              // });

            } else {
              res.json({message:'Incorrect Password'})
              console.log("Incorrect Password");
            }
        })
      } else {
        console.log("No user in DB");
        // next(new Error('No User in Database'));
      }


      // console.log(user);
      // const password = req.body.password;
      // encrypt.comparePass(password, user.password);
      // return user;
    })


    .then(response => {
      return token.encodeToken(response);
    })
    .then(token => {
      res.status(200).json({
        status: 'success',
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: 'error'
      });
    });

  }
});




module.exports = router;
