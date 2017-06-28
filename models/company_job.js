const Model = require('objection').Model;

class CompanyJob extends Model {
    static get tableName() {
        return 'company_job';
    }

    static get relationMappings() {
        return {
            company_mentor: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/company',
                join: {
                    from: 'compay.id',
                    to: 'company_job.company_id'
                }
            },
            job: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/job',
                join: {
                    from: 'job.id',
                    to: 'company_job.job_id'
                }
            }
        };
    }
}

module.exports = CompanyJob;
