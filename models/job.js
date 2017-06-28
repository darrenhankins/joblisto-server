const Model = require('objection').Model;
// const Group = require('./group');

class Job extends Model {
  static get tableName() {
    return 'job';
  }

  static get relationMappings() {
    return {
      // Model: item can have one user
      // an item can have 1 user
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'job.user_id',
          to: 'user.id'
        }
      },
      // Model: item has many groups
      // an item can have many groups
      group: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/company',
        join:{
          from: 'job.id',
          through: {
            from: 'company_job.job_id',
            to: 'company_job.company_id'
          },
          to: 'company.id'
        }
      },
      // Model: item can have one item_status
      // an item can have 1 item_status
      // item_status: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: __dirname + '/item_status',
      //   join: {
      //     from: 'item.id',
      //     to: 'item_status.item_id'
      //   }
      // },
      // Model: item can have one item_sell
      // an item can have 1 item_sell
      // item_sell: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: __dirname + '/item_sell',
      //   join: {
      //     from: 'item.id',
      //     to: 'item_sell.item_id'
      //   }
      // }
    };
  }
}

module.exports = Job;
