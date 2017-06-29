const knex = require('./knex');
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid/v4');
const objection = require('objection');

// require all models
const Mentor = require('../../models/mentor');
const Company = require('../../models/company');
const CompanyMentor = require('../../models/company_mentor');
const CompanyJob = require('../../models/company_job');
const Job_sell = require('../../models/item_sell');
// const Job_status = require('../../models/item_status');
const Job = require('../../models/job');
const User = require('../../models/user');


module.exports = {

    comparePass: function(userPassword, databasePassword) {
        console.log(userPassword, databasePassword)
        const bool = bcrypt.compareSync(userPassword, databasePassword);
        // if (!bool) throw new Error('bad password');
        if (!bool) return false;
        else return true;
    },
    getUser: function(email) {
        return knex('user')
            .where('email', email)
            .first()
            .catch(err => {
                // var response =  {
                //   status: "failure",
                //   message: "Email Already Exists"
                // };
                // return response;
                console.log('Email not found');
            });
    },
    createUser: function(user) {
        let hash = bcrypt.hashSync(user.password, 10);
        return User
            .query()
            .insert({
                username: user.username,
                email: user.email,
                password: hash
            })
            .then(user => {
                console.log(user instanceof User); // true
            })
            .catch(err => {
                var response = {
                    status: "failure",
                    message: "Email Already Exists"
                };
                return response;
                console.log('Didn\'t create user');
            });
    },
    // ****** Jobs ******* //
    getJobs: function(user_id) {
        return Job
            .query()
            .where('user_id', '=', user_id);
        // .eager('[item_status, item_sell]');
    },
    createJob: function(item) {
        return Job
            .query()
            .insert({
                user_id: item.user_id,
                name: item.name,
                description: item.description,
                image_url: item.image_url
            })
            .then(item => {
                console.log(job instanceof Job); // true
            })
            .catch(err => {
                console.log('Didn\'t create job');
            });
    },
    getJobById: function(job_id) {
        return Job
            .query()
            .findById(job_id)
            .eager('[company]');
        // .eager('[company, item_status.[friend], item_sell]');
    },
    updateJob: function(job_id, job) {
        return Job
            .query()
            .where('id', '=', job_id)
            .update({
                name: job.name,
                location: job.location,
                contact: job.contact,
                job_title: job.job_title,
                description: job.description,
                listing_url: job.listing_url,
                image_url: job.image_url,
                cover_letter: job.cover_letter
                // applied: job.applied,
                // emailed: job.emailed
            })
            .then(job => {
                console.log(job instanceof job); // true
            })
            .catch(err => {
                console.log('Didn\'t update job');
            });
    },
    deleteJob: function(item_id) {
        return Job
            .query()
            .delete()
            .where('id', '=', job_id)
            .then(job => {
                console.log(job instanceof job); // true
            })
            .catch(err => {
                console.log('Didn\'t delete job');
            });
    },
    // ****** FRIENDS ****** //
    createMentor: function(mentor) {
        return Mentor
            .query()
            .insert({
                user_id: mentor.user_id,
                name: mentor.name,
                email: mentor.email
            })
            .then(mentor => {
                console.log(mentor instanceof Mentor); // true
            })
            .catch(err => {
                console.log('Didn\'t create mentor');
            });
    },

    updateMentor: function(id, mentor) {
        return Mentor
            .query()
            // .where('id', '=', friend.friend_id)
            .where('id', '=', id)
            .update({
                name: mentor.name,
                email: mentor.email
            })
            .then(mentor => {
                console.log(mentor instanceof Mentor); // true
            })
            .catch(err => {
                console.log('Didn\'t update mentor');
            });
    },

    deleteMentor: function(mentor) {
        return Mentor
            .query()
            .delete()
            .where('id', '=', mentor)
            .then(friend => {
                console.log(mentor instanceof Mentro); // true
            })
            .catch(err => {
                console.log('Didn\'t delete mentor');
            });
    },

    // ****** Companies ******* //

    createCompany: function(company) {
        return Company
            .query()
            .insert({
                user_id: company.user_id,
                name: company.name
            })
            .then(company => {
                console.log(company instanceof Company); // true
            })
            .catch(err => {
                console.log('Didn\'t create company');
            });
    },

    createJobCompany: function(job_id, company_id) {
        return CompanyJob
            .query()
            .insert({
                job_id: job_id,
                company_id: company_id
            })
            .then(companyJob => {
                console.log("CREATE JOB COMPANY: ", companyJob instanceof CompanyJob);
            })
            .catch(err => {
                console.log('Didn\'t create Company - Job');
            });
    },

    deleteJobCompany: function(job_id, company_id) {
        return CompanyJob
            .query()
            .delete()
            .where('job_id', '=', job_id)
            .andWhere('company_id', '=', company_id)
            .then(companyJob => {
                console.log(companyJob instanceof CompanyJob);
            })
    },

    updateCompany: function(id, company) {
        return Company
            .query()
            .where('id', '=', id)
            .update({
                name: company.name
            })
            .then(company => {
                console.log("updateCompany => ", company instanceof Company); // true
            })
            .catch(err => {
                console.log('Didn\'t update company');
            });
    },

    createCompanyMentors: function(company_id, mentor_id) {
        console.log("COMPANY-----> ID", company_id);
        console.log("MENTOR-----> ID", mentor_id);
        return CompanyMentor
            .query()
            .insert({
                company_id: company_id,
                mentor_id: mentor_id
            })
            // .insert({group_id: 11, friend_id: 13})
            .then(companyMentor => {
                console.log(companyMentor instanceof CompanyMentor); // true
            })
            .catch(err => {
                console.log("Didn't create CompanyMentor");
                console.log(err);

            });
    },

    deleteCompanyMentors: function(company_id, mentor_id) {
        return CompanyMentor
            .query()
            .delete()
            .where('company_id', '=', company_id)
            .andWhere('mentor_id', '=', mentor_id)
            .then(companyMentor => {
                console.log(companyMentor instanceof CompanyMentor); // true
            })
            .catch(err => {
                console.log("Didn't delete CompanyMentor")
            })
    },

    deleteCompany: function(company) {
        return Company
            .query()
            .delete()
            .where('id', '=', company)
            .then(company => {
                console.log(company instanceof Company); // true
            })
            .catch(err => {
                console.log('Didn\'t delete company');
            });
    },
    // Get all groups [friends]
    getCompanies: function(user_id) {
        console.log("Get Companies");
        return Company
            .query()
            .where('user_id', '=', user_id)
            .eager('[mentor]');
    },

    // Get all groups [friends]
    getAllCompaniesForUser: function(user_id) {
        console.log("Get Companies");
        return Company
            .query()
            .where('user_id', '=', user_id);
    },

    getAllMentorsByUserId: function(user_id) {
        console.log("Get Mentors");
        return Mentor
            .query()
            .where('user_id', '=', user_id)
            .eager('[user]');
    },

    getAllMentorsAndCompaniesByUserId: function(user_id) {
        console.log("Get Mentors");
        return Mentor
            .query()
            .where('user_id', '=', user_id)
            .eager('[company]');
    },
    // new one
    getMentorsInCompanies: function(group_id) {
        console.log("Get Mentors in Companies");
        return CompanyMentor
            .query()
            .where('company_id', '=', company_id)
            .eager('[mentor]');

    },

    getJobAndUUID: function(job_id) {
        return Job
            .query()
            .findById(job_id)
    },

    updateJobAndUUID: function(job_id) {
        return Job
            .query()
            // .patch({ available: false })
            .patchAndFetchById(job_id, {
                available: false
            })
            // .where('item_id', '=', item_id)
            .then(job => {
                console.log(job instanceof Job); // true
            })
            .catch(err => {
                console.log('Didn\'t create job');
            });
    },

    getCompanyEmails: function(user_id) {
        return Job
            .query()
            .findById(user_id)
            .eager('[company, company.[mentor]]');
            // .eager('[item_status, item_sell, group, group.[friend]]');
    }

};



function throwNotFound() {
    var error = new Error();
    error.statusCode = 404;
    throw error;
}
