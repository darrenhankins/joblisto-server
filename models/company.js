const Model = require('objection').Model;

class Company extends Model {
    static get tableName() {
        return 'company';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/user',
                join: {
                    from: 'company.user_id',
                    to: 'user.id'
                }
            },
            job: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/job',
                join: {
                    from: 'company.id',
                    through: {
                        from: 'company_job.company_id',
                        to: 'company_job.job_id'
                    },
                    to: 'job.id'
                }
            },
            mentor: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/mentor',
                join: {
                    from: 'company.id',
                    through: {
                        from: 'company_mentor.company_id',
                        to: 'company_mentor.mentor_id'
                    },
                    to: 'mentor.id'
                }
            }
        };
    }
}

module.exports = Company;
