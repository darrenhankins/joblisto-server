const express = require('express');
const router = express.Router();
const Member = require('../db/v2/member');

const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.json({
        message: ('😍')
    });
});

function validUser(user) {
    const validEmail = typeof user.email == 'string' &&
        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && //varifies its a string
        user.password.trim() != '' &&
        user.password.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if (validUser(req.body)) {
        Member.getOneByEmail(req.body.email)
            .then(member => {
                console.log('member', member)
                if (!member) {


                  //hash password
                  bcrypt.hash(req.body.password, 10 )
                  .then((hash) => {

                  //newmemeber
                    const member = {
                      username:req.body.username,
                      email:req.body.email,
                      date: new Date(),
                      password:hash

                    };

                    Member.create(member)
                    .then( id =>{
                      res.json({
                          id,
                          message: '😱'
                      });
                    })
                  //insert user into db
                  //redirect

                  });
                } else {
                  //email in use
                    next(new Error('Email in use'));
                }
            });
    } else {
        next(new Error('Invalid user'))
    }
});


router.post('/login', (req, res, next) => {
  if(validUser(req.body)){
    //check to see if in db
Member.getOneByEmail(req.body.email)
.then(member => {
  console.log('member', member)
  if(member){
    //compare pass word with hashed password
    bcrypt.compare(req.body.password, member.password)
    .then((result) => {
      if(result){
        //setting the set-cookie header
     const isSecure = req.app.get('env') != 'development';
        res.cookie('member_id', member.id, {
          httpOny:true,
          secure:isSecure,
          signed:true

        });
        res.json({
        message:'Logged in 🔓...'
        });
      }else{
        next(new Error('Invalid login'));
      }
    });
  } else {
    next(new Error('Invalid Email'));
  }
});
  }else{
    next(new Error('invalid login'));
  }
});

module.exports = router;
