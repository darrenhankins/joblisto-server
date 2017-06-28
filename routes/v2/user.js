require("dotenv").config(); // or load()
var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

// const knex = require('../db/knex');
const query = require("../../db/v2/query");

// http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
// Get all jobs for user => GET /user/:id/jobs
// Get one job for user => GET /user/:id/jobs/:job_id
// Create new job for user => POST /user/:id/jobs
// Delete one job for user => DELETE /user/:id/jobs/:job_id
// Update one job for user => PATCH /user/:id/jobs/:job_id

// ****** JOBS ******* //

// Get all jobs [company, job_status, job_sell]
router.get('/:id/jobs', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getJobs(req.params.id)
      .then(jobs => {
        res.json(jobs);
      });
  } else {
    resError(res, 500, "Job Not Found")
  }
});

// Creates new job
router.post('/:id/jobs', (req, res, next) => {
  console.log(req.body);
  query
    .createJob(req.body)
    .then(job => {
      res.json(job);
    });
});

// router.patch('/:id/jobs/:job_id', (req, res, next) => {
router.post('/:id/jobs/:job_id', (req, res, next) => {
  console.log("UPDATE job: COMPANIES: ", req.body[1]);
  let job = req.body[0];
  let companies = req.body[1];
  query
    .updateJob(req.params.job_id, job)
    .then(job => {
        for(let y=0; y<companies.length; y++){
          if (companies[y].checked == true) {
            console.log("ID: ", companies[y].id);
            query
              .createJobCompany(req.params.job_id, companies[y].id)
              .then(company => {
                console.log("COMPANY - JOB added..... ", companies[y]);
              });
          } else {
            query
              .deleteJobCompany(req.params.job_id, companies[y].id)
              .then(company => {
                console.log("COMPANY - JOB deleted..... ", companies[y]);
                // for (let y=0; y<company.friends.length; y++){
                //   console.log("TEST !!!! => ", company.friends[y].name);
                // }
                // res.json(company);
              });
          }
      }

      res.json(job);
    });
});

router.delete('/:id/jobs/:job_id', function(req, res, next) {
  query
    .deleteJob(req.params.job_id)
    .then(function(job) {
      return res.json(job);
    });
});


router.delete('/:id/companies/:company_id', (req, res, next) => {
  console.log("DELETE Hit");
  console.log(req.params.company_id);
  query
    .deleteCompany(req.params.company_id)
    .then(company => {
      res.json(company);
    });
});


// Get 1 job [companies, job_status, job_sell]
router.get('/:id/jobs/:job_id', function(req, res, next) {
    query.getJobById(req.params.job_id)
        .then(function(job) {
          query.getAllCompaniesForUser(req.params.id)
            .then(function(companies) {
              console.log("JOB: ", job);
              console.log("COMPANIES: ", companies);
              let data = [];
              data.push(job);
              data.push(companies);
              return res.json(data);
            })
        })
        .catch(err => {
            res.send(err);
        });
});
// Claim an job
router.patch('/claim/jobs/:job_id', function(req, res, next) {
  console.log("route hit");
  query.updateJobAndUUID(req.params.job_id)
    .then(function(job) {
      console.log("Job - Here -->");
    })
});

// ****** FRIENDS ******* //

// get all companies of user
router.get('/:id/friends', (req, res, next) => {
  if(!isNaN(req.params.id)){
    console.log("Route Hit");
    query.getAllCompaniesForUser(req.params.id)
      .then(companies => {
        query.getAllMentorsAndCompaniesByUserId(req.params.id)
          .then(friends => {
            // res.json(friends);
            let data = [];
            data.push(friends);
            data.push(companies);
            res.json(data);
          });
        });
  } else {
    resError(res, 500, "Mentors Not Found")
  }
});
router.post('/:id/friends', (req, res, next) => {
    console.log(req.body);
    query
      .createFriend(req.body)
      .then(friend => {
        res.json(friend);
      });
});

router.patch('/:id/friends/:friend_id', (req, res, next) => {
  console.log(req.body);
  query
    .updateFriend(req.body)
    .then(friend => {
      res.json(friend);
    });
});

router.delete('/:id/friends/:friend_id', (req, res, next) => {
  console.log("DELETE Hit");
  console.log(req.params.friend_id);
  query
    .deleteFriend(req.params.friend_id)
    .then(friend => {
      res.json(friend);
    });
});
router.get('/:id/jobs/:job_id/friend/:friend_id/uuid/:uuid', function(req, res, next) {
    query.getJobAndUUID(req.params.job_id)
        .then(function(job) {
            // return res.json(job);
            if (req.params.uuid == job.uuid) {
              console.log("THE Match!!!");
                // console.log(req.params.friend_id);
            }
        })
        .catch(err => {
            res.send(err);
        });
});

// ****** COMPANIES ******* //
// Retrieve a User's Companies [friends] and Mentors in that company
router.get('/:id/companies', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getCompanies(req.params.id)
      .then(companies => {
        query.getAllMentorsByUserId(req.params.id)
          .then(friends => {
            let data = [];
            data.push(companies);
            data.push(friends);
            res.json(data);
          });
      });
  } else {
    resError(res, 500, "Companies Not Found")
  }
});

router.post('/:id/companies', (req, res, next) => {
    console.log(req.body);
    query
      .createCompany(req.body)
      .then(company => {
        res.json(company);
      });
});

router.patch('/:id/companies/:company_id', (req, res, next) => {
  console.log(req.params.company_id, req.body);
  query
    .updateCompany(req.params.company_id,req.body)
    .then(company => {
      res.json(company);
    });
});

router.post('/:id/companies/:company_id', (req, res, next) => {
  console.log("HITTTTTT");
  query
    .updateCompany(req.params.company_id, req.body)
    .then(company => {
      for(let y=0; y<req.body.friends.length; y++){
        console.log("CompanyFriend POST: ", req.params.company_id, req.body.friends[y]);
        if (req.body.friends[y].checked == true) {
          console.log("HEERRERERER.....");
          query
            .createCompanyMentors(req.params.company_id, req.body.friends[y].id)
            .then(company => {
              console.log("COMPANY..... ", company);
              // for (let y=0; y<company.friends.length; y++){
              //   console.log("TEST !!!! => ", company.friends[y].name);
              // }
              // res.json(company);
            });
        } else {
          query
            .deleteCompanyMentors(req.params.company_id, req.body.friends[y].id)
            .then(company => {
              console.log("DELETE COMPANY..... ", company);
              // for (let y=0; y<company.friends.length; y++){
              //   console.log("TEST !!!! => ", company.friends[y].name);
              // }
              // res.json(company);
            });
        }
    }
  })
});

router.post('/:id/friends/:friend_id', (req, res, next) => {
  console.log("HITTTTTT");
  query
    .updateFriend(req.params.friend_id, req.body)
    .then(friend => {
      for(let y=0; y<req.body.companies.length; y++){
        console.log("CompanyFriend POST: ", req.params.friend_id, req.body.companies[y]);
        if (req.body.companies[y].checked == true) {
          console.log("HEERRERERER.....");
          query
            .createCompanyMentors(req.body.companies[y].id, req.params.friend_id)
            .then(friend => {
              console.log("FRIEND..... ", friend);
              // for (let y=0; y<company.friends.length; y++){
              //   console.log("TEST !!!! => ", company.friends[y].name);
              // }
              // res.json(company);
            });
        } else {
          query
            .deleteCompanyMentors(req.body.companies[y].id, req.params.friend_id)
            .then(friend => {
              console.log("DELETE FRIEND..... ", friend);
              // for (let y=0; y<company.friends.length; y++){
              //   console.log("TEST !!!! => ", company.friends[y].name);
              // }
              // res.json(company);
            });
        }
    }
  })
});

router.delete('/:id/companies/:company_id', (req, res, next) => {
  console.log("DELETE Hit");
  console.log(req.params.company_id);
  query
    .deleteCompany(req.params.company_id)
    .then(company => {
      res.json(company);
    });
});

router.post('/:id/company', (req, res, next) => {
    // check to stee if email is unique
    console.log(req.body);
    query
      .createCompany(req.body)
      .then(company => {
        res.json(company);
      });
});

// Send email to companies
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "sharesumstuff@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    }
});

router.get('/:id/jobs/:job_id/sendemail', function(req, res, next) {
    query.getCompanyEmails(req.params.job_id)
        .then(function(emails) {
            // return res.json(emails);
            console.log(emails);
            var job_id = emails.id;
            var user_id = emails.user_id;
            var image_url = emails.image_url;
            var uuid = emails.uuid;
            var companies = emails.company;
            if (emails.free){
              var cost = "FREE";
            } else {
              var cost = emails.job_sell.price;
              console.log(cost);
            }
            // var friends = companies[0].friend;
            // console.log(companies[0].friend.length);

            // for (let i = 0; i < companies.length; i++) {
                // let friends = companies[i].friend;
                // for (let j = 0; j < friends.length; j++) {
                    // let friend_id = friends[j].id;
                    // let friend_name = friends[j].name;
                    // let friend_email = friends[j].email;

                    let friend_id = 3;
                    let friend_name = "Darren";
                    let friend_email = "sharesumstuff@gmail.com";
                    // console.log(friend_name);
                    // console.log(friend_email);
                    // console.log("https//sharesumstuff.com/user/"+user_id+"/jobs/"+job_id+"/uuid/"+uuid);
                    var mailOptions = {
                        to: friend_email,
                        subject: "Something you may be interested in...$"+cost,
                        text: "Hi " + friend_name + ",\n\nPlease take a look at this job I am wanting to get rid of...\n"
                          +image_url+"\n\nPlease select the link below to claim this job..."+"\n\nhttp://localhost:3005/claim/job/"+job_id+"/friend/"+friend_id+"/uuid/"+uuid
                    }
                    // console.log(mailOptions);
                    smtpTransport.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            console.log(error);
                            res.end("error");
                        } else {
                            console.log("Message sent: " + response.message);
                            res.end("sent");
                        }
                    });
                // }
            // }
        })
        .catch(err => {
            res.send(err);
        });
});



module.exports = router;
