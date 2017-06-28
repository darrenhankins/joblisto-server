const Model = require('objection').Model;

class CompanyMentor extends Model {
    static get tableName() {
        return 'company_mentor';
    }

    static get relationMappings() {
        return {
            company: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/company',
                join: {
                    from: 'company.id',
                    to: 'company_mentor.company_id'
                }
            },
            mentor: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/mentor',
                join: {
                    from: 'mentor.id',
                    to: 'company_mentor.mentor_id'
                }
            }
        };
    }
}

module.exports = CompanyMentor;
